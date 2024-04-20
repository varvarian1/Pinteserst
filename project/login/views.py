from django.shortcuts import render, redirect
from registration.models import Registration
from .forms import RegistrationForm

def index_login(request):
    """
    Function for the login page

    If the request method is POST, it processes the submitted form data.
    If the form is valid and the user is found in the database, it redirects to the account detail page.
    If the user is not found, it displays an error message.
    If the request method is GET, it renders the login page with an empty form.

    """
    if request.method == 'POST':
        form = RegistrationForm(request.POST)

        if form.is_valid():
            user_name = form.cleaned_data['User_Name']
            password = form.cleaned_data['Password']

            try:
            # Find user in the Registration model username and password
                registration = Registration.objects.get(User_Name=user_name, Password=password)
                request.session['user_id'] = registration.id
                return redirect('account:account_detail', acc=registration.id)
            
            except Registration.DoesNotExist:
                error_message = 'Invalid username or password'
    else:
        form = RegistrationForm()
        error_message = None

    return render(request, 'main/login.html', {'form': form, 'error_message': error_message})



"""
from django.shortcuts import render, redirect 
from django.contrib.auth import authenticate, login 
from django.http import HttpResponse 
from registration.models import Registration 
from .forms import RegistrationForm 
 
def index_login(request): 

    error_message = None 
 
    if request.method == 'POST': 
        form = RegistrationForm(request.POST) 
 
        if form.is_valid(): 
            cd = form.cleaned_data 
            user = authenticate(username = cd['User_Name'], password = cd['Password']) 
 
            print(form) 
            if user is not None: 
                if user.is_active: 
                    login(request, user) 
 
            return redirect('main:main', acc=user.id) 
 
    else: 
        form = RegistrationForm() 
 
    return render(request, 'main/login.html', {'form': form, 'error_message': error_message})
"""