from django.db import models
from django.contrib.auth.models import AbstractUser

class AdminUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin User'),
    ]
    
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPE_CHOICES,
        default='admin'
    )
    
    # Profile details
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)  # Profile picture
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional phone number
    address = models.CharField(max_length=100, blank=True, null=True)  # Optional location
    date_of_birth = models.DateField(blank=True, null=True)  # Optional date of birth
    created_at = models.DateTimeField(auto_now_add=True)  # When the user registered
    updated_at = models.DateTimeField(auto_now=True)  # When the user's profile was last updated
    bio = models.TextField(blank=True, null=True)  # Optional bio field
    interested_in = models.CharField(max_length=100, blank=True, null=True)  # Field to specify interests

    # Social media fields
    facebook_url = models.URLField(max_length=200, blank=True, null=True)
    linkedin_url = models.URLField(max_length=200, blank=True, null=True)
    youtube_url = models.URLField(max_length=200, blank=True, null=True)
    github_url = models.URLField(max_length=200, blank=True, null=True)

    # Redefine first_name, last_name, and email
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True)  # You can make this field unique to ensure no duplicates

    def __str__(self):
        return self.username
