from django.urls import path, include
from .views import *
from dashboard.views import (signin, register_student, register_success, register_staff)

app_name = 'home'

urlpatterns = [
    path('', index, name='index'),
    path('register/student', register_student, name='register_student'),
    path('register/staff', register_staff, name='register_staff'),
    path('register/success/<int:userid>', register_success, name='register_success'),
    path('login', signin, name='login'),
    path('dashboard/', include('dashboard.urls'))
]
