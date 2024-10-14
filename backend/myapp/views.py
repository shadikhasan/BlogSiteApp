from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from django.core.exceptions import PermissionDenied
from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import action

class PostViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions for the Post model,
    allowing all users to view posts and only authenticated users
    to create and modify their own posts.
    """
    queryset = Post.objects.all().order_by('-date_posted')
    serializer_class = PostSerializer
    http_method_names = ['get', 'patch', 'delete', 'post']

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]  # Allow any user to view posts

    def perform_create(self, serializer):
        """Automatically set the author of the post to the current user."""
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        """Check if the user is the author before updating."""
        post = self.get_object()
        if post.author != self.request.user:
            raise PermissionDenied("You do not have permission to edit this post.")
        serializer.save()

    def perform_destroy(self, instance):
        """Check if the user is the author before deleting."""
        if instance.author != self.request.user:
            raise PermissionDenied("You do not have permission to delete this post.")
        instance.delete()

    def retrieve(self, request, *args, **kwargs):
        """Retrieve a post and increment its view count."""
        post = self.get_object()  # Get the requested post
        post.views += 1  # Increment the view count
        post.save()  # Save the updated view count
        serializer = self.get_serializer(post)  # Serialize the post
        return Response(serializer.data)  # Return the serialized data

    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """Increment the views count for a post."""
        post = self.get_object()
        post.views += 1
        post.save()
        return Response({'views': post.views})


class MyPostsViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return posts authored by the authenticated user
        return Post.objects.filter(author=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']

class AdminUserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer
    
    
class PopularPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` actions for the top 5 most viewed posts.
    """
    serializer_class = PostSerializer
    http_method_names = ['get']
    
    def get_queryset(self):
        # Return the top 5 posts ordered by views in descending order
        return Post.objects.order_by('-views')[:5]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryPostCountView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        category_post_counts = []

        for category in categories:
            post_count = Post.objects.filter(category=category).count()
            category_post_counts.append({
                "category": category.name,
                "post_count": post_count,
            })

        return Response(category_post_counts, status=status.HTTP_200_OK)
    
class AuthorPostViewSet(viewsets.ModelViewSet):
    """
    A viewset to retrieve posts by a specific author.
    """
    http_method_names = ['get']
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Dynamically filters posts by the author based on the URL parameter.
        """
        author_id = self.kwargs.get('author_id')
        return Post.objects.filter(author__id=author_id).order_by('-date_posted')


class RelatedPostsViewSet(viewsets.ViewSet):
    """
    A viewset for retrieving related posts.
    """

    @action(detail=True, methods=['get'], url_path='related')
    def get_related_posts(self, request, pk=None):
        try:
            post = Post.objects.get(id=pk)  # Get the post instance by primary key (pk)

            # Fetch related posts from the same category, excluding the current post
            related_posts = Post.objects.filter(category=post.category).exclude(id=post.id)[:5]  # Limit to 5 related posts
            
            # Serialize the related posts
            serializer = PostSerializer(related_posts, many=True)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)