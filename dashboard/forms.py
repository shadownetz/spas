from django import forms
from .models import Group
from home.models import User, StudentProfile, StaffProfile


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


class AvatarUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['avatar']


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        exclude = ['is_active', 'is_staff', 'is_superuser', 'last_login', 'created_at', 'updated_at', 'avatar']

        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'form-control form-control-lg'
            }),
            'name': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            }),
            'address': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            })
        }


class StudentProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = StudentProfile
        exclude = ['student']

        widgets = {
            'department': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            }),
            'faculty': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            }),
            'level': forms.NumberInput(attrs={
                'class': 'form-control form-control-lg'
            }),
            'reg_no': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            }),
        }


class StaffProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = StaffProfile
        exclude = ['staff']

        widgets = {
            'role': forms.Select(attrs={
                'class': 'form-control form-control-lg'
            }),
            'staffId': forms.TextInput(attrs={
                'class': 'form-control form-control-lg'
            }),
        }


class PasswordChangeForm(forms.ModelForm):
    confirm = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control form-control-lg'
    }))

    def clean(self):
        cleaned_data = super(PasswordChangeForm, self).clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm")
        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match")

    class Meta:
        model = User
        fields = ['password']

        widgets = {
            'password': forms.PasswordInput(attrs={
                'class': 'form-control form-control-lg'
            })
        }
