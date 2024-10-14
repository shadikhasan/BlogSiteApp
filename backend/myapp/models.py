from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from authentication.models import *
from ckeditor.fields import RichTextField


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextField()
    author = models.ForeignKey(AdminUser, on_delete=models.CASCADE)  # Use the custom user model
    date_posted = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)  # Thumbnail field
    views = models.PositiveIntegerField(default=0)
    
    
    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name
    
