from django.shortcuts import render, get_object_or_404
from create.models import Photos

def index_main(request, query=None): 
    """
    Function for main

    If a query parameter is provided, it filters the Photos model based on the Name field containing the query.
    If no query parameter is provided, it retrieves all Photos objects.

    """
    if query:
        # Filter the Photos
        photos = Photos.objects.filter(Name__icontains=query) 
    else:
        # Retrieve all Photos objects
        photos = Photos.objects.all() 
    return render(request, 'main/main.html', {'photos': photos, 'query': query})


def search(request):
    # Function for search
    query = request.GET.get('query')
    return index_main(request, query)


def photo_detail(request, ps):
    # Function for displaying the details of a photo
    photo = get_object_or_404(Photos, pk=ps)
    return render(request, 'main/photos.html', {'photo': photo})