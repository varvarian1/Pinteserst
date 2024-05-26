from django.urls import path
from . import views

app_name = 'create'

urlpatterns = [
    path('', views.index_create, name='create')
]