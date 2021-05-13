from django.urls import path
from .views import *

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('inbox', inbox, name='inbox'),
    path('inbox/content', inbox_content, name='inbox_content')
]
