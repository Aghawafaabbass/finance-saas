from rest_framework import serializers
from .models import Category, Expense, Budget

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['user']

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', 
        read_only=True
    )
    
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['user']

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'
        read_only_fields = ['user']