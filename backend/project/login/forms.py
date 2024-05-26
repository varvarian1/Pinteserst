from django.forms import ModelForm, TextInput, PasswordInput, EmailInput
from registration.models import Registration

class RegistrationForm(ModelForm):
    class Meta:
        model = Registration
        fields = ['User_Name', 'Password']
        widgets = {
            'User_Name': TextInput(attrs={
                'id':'username',
                'class': 'login-input',
                'placeholder': 'Enter username'
            }),
            'Password': PasswordInput(attrs={
                'id': 'password',
                'class': 'login-input',
                'placeholder': 'Enter password'
            }),
        }