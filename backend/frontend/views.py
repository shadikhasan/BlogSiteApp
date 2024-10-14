# views.py
import requests
from django.shortcuts import render

API_BASE_URL = "http://127.0.0.1:8000/api/"  # Your API base URL

def blog_posts(request):
    response = requests.get(f"{API_BASE_URL}posts/")  # Fetch posts from the API
    posts = response.json()  # Assuming the response is in JSON format
    return render(request, 'frontend/blog_list.html', {'posts': posts})
