# myapp/forms.py
from django import forms
from .models import Post, Category
from ckeditor.widgets import CKEditorWidget

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'category']  # Include the category field

        widgets = {
            'content': CKEditorWidget(),  # Use CKEditor widget for rich text formatting
        }

    # Optional: You can customize the labels and widgets if desired
    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)
        self.fields['title'].label = "Post Title"
        self.fields['content'].label = "Post Content"
        self.fields['category'].label = "Select Category"
