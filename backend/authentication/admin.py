from django.contrib import admin
from .models import AdminUser  # Import your AdminUser model

# Create an admin class if you want to customize the admin interface
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type', 'is_staff', 'is_active', 'created_at')

# Register the AdminUser model with the custom admin class
admin.site.register(AdminUser, AdminUserAdmin)
