from django.shortcuts import render, redirect
from .forms import RegistrationForm
from .models import Registration

def index_registration(request):
    """
    Function for the registration page

    If the request method is POST, it processes the submitted form data.
    If the form is valid and the provided username and email do not already exist in the database,
    it creates a new registration entry and redirects to the main page.
    If the username or email already exists, it displays an error message.
    If the request method is GET, it renders the registration page with an empty form.
    
    """
    if request.method == 'POST':
        form = RegistrationForm(request.POST)

        if form.is_valid():

            """
            replase registration function !!!


            cd = form.cleaned_data
            user = username = cd['User_Name'], password = cd['Password'], email = cd['Email'] 
            
            """
            username = form.cleaned_data['User_Name']
            password = form.cleaned_data['Password']
            email = form.cleaned_data['Email']

            # Check if a registration entry with the provided username or email already exist
            # filter replase on sql request!!!
            if Registration.objects.filter(User_Name=username).exists() or \
               Registration.objects.filter(Email=email).exists():
                return render(request, 'main/registration.html', {'form': form, 'error_message': 'Username or email already exists'})
            
            # Create a new registration entry
            registration = Registration(User_Name=username, Password=password, Email=email)
            registration.save()
            
            return redirect('main:main')
    else:
        form = RegistrationForm()
    
    return render(request, 'main/registration.html', {'form': form})