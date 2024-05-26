from django.forms import ModelForm, TextInput, FileInput
from create.models import Photos

class PhotosForm(ModelForm):
    class Meta:
        model = Photos
        fields = ['Name', 'Description', 'Photo', 'Tags']  
        widgets = {
            'Name': TextInput(),
            'Description': TextInput(), 
            'Photo': FileInput(),  
            'Tags': TextInput(),
        }