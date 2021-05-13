from django.urls import path, include
from .views import *
from dashboard.views import (register_student, register_success)

app_name = 'home'

urlpatterns = [
    path('', index, name='index'),
    path('register/student', register_student, name='register_student'),
    path('register/success/<int:userid>', register_success, name='register_success'),
    path('dashboard/', include('dashboard.urls'))
]
