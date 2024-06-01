from django.urls import path
from . import views 

app_name = 'main'

urlpatterns = [
    path('', views.index_main, name='main'),
    path('search/', views.search, name='search'),
    path('<int:ps>/', views.photo_detail, name='photo_detail')
]