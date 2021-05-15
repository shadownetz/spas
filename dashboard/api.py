import base64
from django.core.files.base import ContentFile
from django.core.files import File
from .models import (Attachment, Message)
from django.http import JsonResponse
from home.models import User


def upload_attachment(request):
    response = {'id': '', 'status': True}
    if request.method == 'POST':
        file = request.POST['file']
        filename = request.POST['name']
        file_format, file_str = file.split(';base64,')
        content_file = ContentFile(base64.b64decode(file_str), name=filename)
        new_attachment = Attachment.objects.create(file=File(content_file))
        response['id'] = new_attachment.id
    return JsonResponse(data=response)


def delete_attachment(request):
    response = {'status': True}
    if request.method == 'POST':
        file_id = request.POST['id']
        try:
            Attachment.objects.get(pk=int(file_id)).delete()
        except Attachment.DoesNotExist:
            pass
    return JsonResponse(data=response)


def get_user_inbox(request):
    response = {
        'inbox': [],
        'status': True
    }
    if request.method == 'POST':
        user_id = request.POST['userId']
        try:
            user = User.objects.get(pk=int(user_id))
            user_inboxes = Message.objects.filter(receivers=user)
            for inbox in user_inboxes:
                response['inbox'].append({
                    'is_staff': inbox.sender.is_staff,
                    'avatar': inbox.sender.avatar.url,
                    'name': inbox.sender.name,
                    'is_read': inbox.get_message_state(user),
                    'subject': inbox.subject,
                    'content': inbox.content,
                    'has_attachments': inbox.has_attachments(),
                    'timestamp': inbox.created_at,
                    'messageId': inbox.id
                })
        except User.DoesNotExist:
            pass
    return JsonResponse(data=response)