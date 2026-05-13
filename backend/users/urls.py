from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    register,
    profile,
    ai_analysis,
    upload_avatar,
    update_profile,
    manage_income,
    ai_chat,
    send_weekly_report,
)

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', profile, name='profile'),
    path('upload-avatar/', upload_avatar, name='upload_avatar'),
    path('update-profile/', update_profile, name='update_profile'),
    path('ai-analysis/', ai_analysis, name='ai_analysis'),
    path('income/', manage_income, name='manage_income'),
    path('ai-chat/', ai_chat, name='ai_chat'),
    path('send-report/', send_weekly_report, name='send_weekly_report'),
]