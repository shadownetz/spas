from django.urls import path
from .views import *
from .api import upload_attachment

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('inbox', inbox, name='inbox'),
    path('inbox/compose', inbox_create, name='inbox_new'),
    path('inbox/content', inbox_content, name='inbox_content'),
    path('logout', signout, name='signout'),

    path('api/attachment/upload', upload_attachment, name='upload_attach')
]
