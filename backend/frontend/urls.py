# urls.py
from django.urls import path
from .views import blog_posts

urlpatterns = [
    path('blog/', blog_posts, name='blog-posts'),
]
