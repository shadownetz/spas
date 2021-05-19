import base64
from django.core.files.base import ContentFile
from django.core.files import File
from .models import (Attachment, Message, Group, MessageThread)
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
        grouped = request.POST['grouped']
        group_id = request.POST['groupId']
        try:
            user = User.objects.get(pk=int(user_id))
            if grouped and group_id:
                try:
                    message_group = Group.objects.get(pk=group_id)
                    user_inboxes = Message.objects.filter(group=message_group)
                except Group.DoesNotExist:
                    user_inboxes = []
            else:
                user_inboxes = Message.objects.filter(receivers=user)
            if len(user_inboxes) > 0:
                for inbox in user_inboxes:
                    if inbox.sender:
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


def get_user_sent_inbox(request):
    response = {
        'inbox': [],
        'status': True
    }
    if request.method == 'POST':
        user_id = request.POST['userId']
        try:
            user = User.objects.get(pk=int(user_id))
            user_inboxes = Message.objects.filter(sender=user)
            for inbox in user_inboxes:
                response['inbox'].append({
                    'is_staff': inbox.sender.is_staff,
                    'avatar': inbox.sender.avatar.url,
                    'name': inbox.sender.name,
                    # 'is_read': inbox.get_message_state(user),
                    'subject': inbox.subject,
                    'content': inbox.content,
                    'has_attachments': inbox.has_attachments(),
                    'timestamp': inbox.created_at,
                    'messageId': inbox.id
                })
        except User.DoesNotExist:
            pass
    return JsonResponse(data=response)


def delete_user_inbox(request):
    response = {
        'status': True
    }
    if request.method == 'POST':
        message_ids = request.POST['ids'].split(',')
        user_id = request.POST['userId']
        try:
            user = User.objects.get(pk=user_id)
            for msg_id in message_ids:
                if msg_id:
                    try:
                        message = Message.objects.get(pk=msg_id)
                        message_states = message.states.filter(user=user)
                        for message_state in message_states:
                            message_state.delete()
                            # message.states.remove(message_state)
                        user_instances = message.receivers.filter(id=user.id)
                        for _user in user_instances:
                            message.receivers.remove(_user)
                    except Message.DoesNotExist:
                        pass
                else:
                    continue
        except User.DoesNotExist:
            pass
    return JsonResponse(data=response)


def get_notifications(request):
    response = {
        'status': True,
        'threads': []
    }
    if request.method == 'POST':
        user_id = request.POST['userId']
        try:
            user = User.objects.get(pk=user_id)
            filtered_msg = Message.objects.filter(threads__states__user=user, threads__states__read=False)
            valid_ids = []
            for msg in filtered_msg:
                for msg_thread in msg.threads.all():
                    for state in msg_thread.states.all():
                        if not state.read:
                            valid_ids.append(msg_thread.id)
                    try:
                        if valid_ids.index(msg_thread.id) >= 0:
                            response['threads'].append({
                                'sender': msg_thread.sender.name,
                                'parentMsgTitle': msg.subject,
                                'parentMsgId': msg.id,
                                'timestamp': msg_thread.created_at
                            })
                    except ValueError:
                        continue
        except User.DoesNotExist:
            pass
    return JsonResponse(data=response)
