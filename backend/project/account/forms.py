from django.forms import ModelForm, TextInput, PasswordInput, EmailInput, FileInput
from registration.models import Registration

class RegistrationForm(ModelForm):
    class Meta:

        model = Registration
        fields = ['User_Name', 'User_Photo', 'Password', 'Email']

        widgets = {
            'User_Photo': FileInput(),          
            'User_Name': TextInput(attrs={
                'class': 'input-group',
                'placeholder': 'Enter username',
                'value': 'User_Name'
            }),

            'Password': PasswordInput(attrs={
                'class': 'input-group',
                'placeholder': 'Enter password',
                'value': 'Password'
            }),
            
            'Email': EmailInput(attrs={
                'class': 'input-group',
                'placeholder': 'Enter email',
                'value': 'Email'
            }),                        
        }