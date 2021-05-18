from django import forms
from .models import Group


class CreateGroupForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(CreateGroupForm, self).__init__(*args, **kwargs)

    def clean_created_by(self):
        return self.request.user

    class Meta:
        model = Group
        exclude = ['context', 'default', 'created_at', 'updated_at']

        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control'
            }),
            'members': forms.SelectMultiple(attrs={
                'class': 'form-select form-control form-control-lg',
                'data-search': "on"
            })
        }
