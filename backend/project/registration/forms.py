from django.forms import ModelForm, TextInput, PasswordInput, EmailInput
from .models import Registration

class RegistrationForm(ModelForm):
    class Meta:
        model = Registration
        fields = ['User_Name', 'Password', 'Email']
        widgets = {
            'User_Name': TextInput(attrs={
                'id': 'username',
                'class': 'form__input',
                'placeholder': 'Введите имя пользователя'
            }),
            'Password': PasswordInput(attrs={
                'id': 'password',
                'class': 'form__input',
                'placeholder': 'Введите пароль'
            }),
            'Email': EmailInput(attrs={
                'id': 'email',
                'class': 'form__input',
                'placeholder': 'Введите email'
            }),
        }