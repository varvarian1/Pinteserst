from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from rest.views import PhotoAPIView
from rest.views import RegistrationAPIView
from rest.views import PhotoPagination, PhotoPaginationList
from rest.views import RegistrationAPIView
from rest.views import LoginAPIView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls', namespace='main')),
    path('login/', include('login.urls', namespace='login')),
    path('registration/', include('registration.urls', namespace='registration')),
    path('create/', include('create.urls', namespace='create')),
    path('account/', include('account.urls', namespace='account')),
    
    path('api/photos/', PhotoAPIView.as_view()),
    path('api/users/', RegistrationAPIView.as_view()),
    path('api/Pagination/photos/', PhotoPaginationList.as_view()),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
