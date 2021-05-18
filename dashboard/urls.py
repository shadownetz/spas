from django.urls import path
from .views import *
from .api import *

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('inbox', inbox, name='inbox'),
    path('inbox/compose', inbox_create, name='inbox_new'),
    path('inbox/sent', sent_inbox, name='sent_inbox'),
    path('inbox/<int:inbox_id>', inbox_content, name='inbox_content'),
    path('logout', signout, name='signout'),

    path('api/attachment/upload', upload_attachment, name='upload_attach'),
    path('api/attachment/delete', delete_attachment, name='delete_attach'),
    path('api/inbox/fetch', get_user_inbox, name='fetch_inbox'),
    path('api/inbox/delete', delete_user_inbox, name='delete_inbox'),
    path('api/inbox/sent', get_user_sent_inbox, name='fetch_sent_inbox'),
    path('api/notifications/fetch', get_notifications, name='fetch_notifications'),

    path('groups', groups, name='groups'),
    path('groups/create', group_add, name='group_add'),
    path('groups/edit/<int:groupId>', group_edit, name='group_edit'),
    path('groups/delete/<int:groupId>', group_delete, name='group_delete'),

]
