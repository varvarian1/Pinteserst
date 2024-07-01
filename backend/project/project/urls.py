from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from rest.views import PhotoAPIView
from rest.views import RegistrationAPIView
#from rest.views import PhotoPagination, PhotoPaginationList
#from rest.views import RegistrationAPIView

from rest_framework import permissions

from login.views import LoginView
from registration.views import RegistrationView


from drf_yasg.views import get_schema_view 
from drf_yasg import openapi

#from rest.views import UserRegistrationView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


schema_view = get_schema_view(
   openapi.Info(
      title="API Title",
      default_version='v1',
      description="API Description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@yourdomain.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls', namespace='main')),
    path('create/', include('create.urls', namespace='create')),
    path('account/', include('account.urls', namespace='account')),

    path('api/registration/', RegistrationView.as_view(), name='registration'),
    path('api/login/', LoginView.as_view(), name='login'),
    
    path('api/photos/', PhotoAPIView.as_view()),
    path('api/users/', RegistrationAPIView.as_view()),
    #path('api/Pagination/photos/', PhotoPaginationList.as_view()),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

