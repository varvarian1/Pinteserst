from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('<int:acc>/', views.account_detail, name='account_detail'),
    path('<int:acc>/edit/', views.index_edit, name='edit'),
    path('int:acc/board/', views.index_board, name='board')
] 