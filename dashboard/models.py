from django.db import models
# from django.utils.translation import ugettext_lazy as _
from django.conf import settings
import datetime


def attachment_directory_path(instance, filename):
    # file will be uploaded to media/messages/attachments/year/<filename>
    return 'messages/attachments/{0}/{1}'.format(datetime.date.today().year, filename)


GROUP_CONTEXTS = [
    ('DEPARTMENT', 'Department'),
    ('FACULTY', 'Faculty'),
    ('LEVEL', 'Level'),
]


class Group(models.Model):
    title = models.CharField(max_length=50, blank=True)
    context = models.CharField(max_length=50, blank=True, choices=GROUP_CONTEXTS)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='member_group')
    created_by = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def get_members(self):
        return ",".join([m.name for m in self.members.all()])


class MessageState(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)


class Attachment(models.Model):
    file = models.FileField(upload_to=attachment_directory_path, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class MessageThread(models.Model):
    content = models.TextField(max_length=2000, blank=True)
    subject = models.CharField(max_length=100, blank=True)
    sender = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,  null=True)
    states = models.ManyToManyField(MessageState)
    attachments = models.ManyToManyField(Attachment)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_message_states(self):
        return ",".join([s for s in self.states.all()])

    def get_attachments(self):
        return ",".join([a for a in self.attachments.all()])


class Message(models.Model):
    content = models.TextField(max_length=2000, blank=True)
    subject = models.CharField(max_length=100, blank=True)
    sender = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='message_sender',
        null=True
    )
    receivers = models.ManyToManyField(settings.AUTH_USER_MODEL)
    states = models.ManyToManyField(MessageState)
    threads = models.ManyToManyField(MessageThread)
    group = models.ForeignKey(to=Group, on_delete=models.SET_NULL, null=True)
    attachments = models.ManyToManyField(Attachment)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_receivers(self):
        return "\n".join([r for r in self.receivers.all()])

    def get_message_states(self):
        return "\n".join([s for s in self.states.all()])

    def get_message_threads(self):
        return "\n".join([t for t in self.threads.all()])

    def get_attachments(self):
        return "\n".join([a for a in self.attachments.all()])
