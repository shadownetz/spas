from django.urls import path
from .views import *
from .api import *

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('inbox', inbox, name='inbox'),
    path('inbox/compose', inbox_create, name='inbox_new'),
    path('inbox/content', inbox_content, name='inbox_content'),
    path('logout', signout, name='signout'),

    path('api/attachment/upload', upload_attachment, name='upload_attach'),
    path('api/attachment/delete', delete_attachment, name='delete_attach'),
    path('api/inbox/fetch', get_user_inbox, name='fetch_inbox')
]
