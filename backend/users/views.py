from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import UserProfile
from .ai_service import analyze_expenses
from expenses.models import Expense
from groq import Groq
import os

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    UserProfile.objects.create(user=user)

    return Response(
        {'message': 'User created successfully'},
        status=status.HTTP_201_CREATED
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    try:
        user_profile = UserProfile.objects.get(user=user)
        avatar_url = request.build_absolute_uri(
            user_profile.avatar.url
        ) if user_profile.avatar else None
    except UserProfile.DoesNotExist:
        avatar_url = None

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'avatar': avatar_url,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_avatar(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        if 'avatar' in request.FILES:
            user_profile.avatar = request.FILES['avatar']
            user_profile.save()
            avatar_url = request.build_absolute_uri(
                user_profile.avatar.url
            )
            return Response({
                'message': 'Avatar uploaded successfully',
                'avatar': avatar_url,
            })
        return Response(
            {'error': 'No image provided'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except UserProfile.DoesNotExist:
        return Response(
            {'error': 'Profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    username = request.data.get('username')
    email = request.data.get('email')

    if username:
        user.username = username
    if email:
        user.email = email
    user.save()

    return Response({'message': 'Profile updated successfully!'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ai_analysis(request):
    expenses = Expense.objects.filter(
        user=request.user
    ).values('title', 'amount', 'date')

    expenses_list = list(expenses)
    for exp in expenses_list:
        exp['amount'] = str(exp['amount'])
        exp['date'] = str(exp['date'])

    analysis = analyze_expenses(expenses_list)
    return Response({'analysis': analysis})

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def manage_income(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)

    if request.method == 'POST':
        income = request.data.get('monthly_income')
        if income:
            user_profile.monthly_income = income
            user_profile.save()
            return Response({
                'message': 'Income updated!',
                'monthly_income': str(user_profile.monthly_income)
            })
        return Response({'error': 'No income provided'}, status=400)

    return Response({'monthly_income': str(user_profile.monthly_income)})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_chat(request):
    try:
        message = request.data.get('message')
        expenses = request.data.get('expenses', [])
        currency = request.data.get('currency', 'PKR')

        expense_text = "\n".join([
            f"- {exp['title']}: {currency} {exp['amount']} on {exp['date']}"
            for exp in expenses
        ]) if expenses else "No expenses recorded yet."

        prompt = f"""You are a helpful personal finance assistant.

User expenses:
{expense_text}

User question: {message}

Give a helpful, concise answer."""

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            max_tokens=500,
        )

        reply = chat_completion.choices[0].message.content
        return Response({'reply': reply})

    except Exception as e:
        return Response(
            {'reply': 'AI service temporarily unavailable. Please try again!'},
            status=200
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_weekly_report(request):
    try:
        user = request.user
        expenses = Expense.objects.filter(
            user=user
        ).values('title', 'amount', 'date')

        total = sum(float(e['amount']) for e in expenses)

        expense_list = "\n".join([
            f"- {e['title']}: {e['amount']} on {e['date']}"
            for e in expenses
        ])

        message = f"""
Hi {user.username}!

Here is your FinanceAI Expense Report:

{expense_list if expense_list else "No expenses recorded yet."}

Total Expenses: {total:.2f}

Stay financially smart!

- FinanceAI Team
Developed by Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer
        """

        send_mail(
            subject='FinanceAI Your Expense Report',
            message=message,
            from_email=os.environ.get('EMAIL_HOST_USER'),
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({'message': 'Report sent to your email!'})

    except Exception as e:
        return Response(
            {'error': f'Failed to send email: {str(e)}'},
            status=500
        )