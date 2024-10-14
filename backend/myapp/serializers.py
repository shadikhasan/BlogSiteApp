from rest_framework import serializers
from .models import Post, Category
from authentication.models import AdminUser

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        # List only the fields you want to expose to the public
        fields = [
            'id',  # Unique identifier for the user
            'username',  # Public username
            'first_name',  # First name (optional to include)
            'last_name',  # Last name (optional to include)
            'email',  # Public email
            'profile_picture',  # Public profile picture
            'address',  # Public address (optional)
            'created_at',  # When the user was registered
            'updated_at',  # Last profile update timestamp
            'bio',  # Public bio
            'interested_in',  # Public interests
        ]


class PostSerializer(serializers.ModelSerializer):
    author_id = serializers.IntegerField(source='author.id', read_only=True)  # Custom field for author ID
    author_username = serializers.CharField(source='author.username', read_only=True)  # Custom field for author username
    category_name = serializers.CharField(source='category.name', read_only=True)  # Custom field for category name
    
    class Meta:
        model = Post
        fields = '__all__'  # You can also explicitly list fields if needed
        read_only_fields = ['views', 'author',]  # Specify read-only fields as needed
