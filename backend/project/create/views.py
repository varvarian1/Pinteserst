from django.shortcuts import render, redirect
from create.forms import PhotosForm

def index_create(request):
    if request.method == 'POST':
        form = PhotosForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('main:main')
    else:
        form = PhotosForm()

    return render(request, 'main/create.html', {'form': form})