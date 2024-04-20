from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest.views import PhotoAPIView
from rest.views import RegistrationAPIView
from rest.views import PhotoPagination, PhotoPaginationList


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls', namespace='main')),
    path('login/', include('login.urls', namespace='login')),
    path('registration/', include('registration.urls', namespace='registration')),
    path('create/', include('create.urls', namespace='create')),
    path('account/', include('account.urls', namespace='account')),
    path('api/photos/', PhotoAPIView.as_view()),
    path('api/users/', RegistrationAPIView.as_view()),
    path('api/Pagination/photos/', PhotoPaginationList.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
