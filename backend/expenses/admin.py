from django.contrib import admin
from .models import Category, Expense, Budget

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'user']
    search_fields = ['name']

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['title', 'amount', 'category', 'date', 'user']
    search_fields = ['title']
    list_filter = ['category', 'date']

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ['user', 'category', 'amount', 'month']
    list_filter = ['month']