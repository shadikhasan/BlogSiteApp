# myapp/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import AdminUser  # Adjust this import to match your model's location

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = AdminUser  # Use your custom user model
        fields = ('username', 'email', 'profile_picture', 'phone_number')  # Include any other fields you want to collect
