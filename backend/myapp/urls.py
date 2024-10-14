from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'admins', AdminUserViewSet)
router.register(r'my-posts', MyPostsViewSet, basename='my-posts')
router.register(r'popular-posts', PopularPostViewSet, basename='popular-posts')
router.register(r'author-posts/(?P<author_id>[^/.]+)', AuthorPostViewSet, basename='author-posts')


urlpatterns = [
    path('', include(router.urls)),
    path('category-post-count/', CategoryPostCountView.as_view(), name='category-post-count'),
    path('posts/<int:pk>/related/', RelatedPostsViewSet.as_view({'get': 'get_related_posts'}), name='related-posts'),
    # Other URLs for your frontend views can still be here if you need them.
]
