from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)
    currency = models.CharField(max_length=10, default='PKR')
    monthly_income = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Profile"