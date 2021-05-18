from django.db import models
# from django.utils.translation import ugettext_lazy as _
from django.conf import settings
import datetime
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver


def attachment_directory_path(instance, filename):
    # file will be uploaded to media/messages/attachments/year/<filename>
    return 'messages/attachments/{0}/{1}'.format(datetime.date.today().year, filename)


GROUP_CONTEXTS = [
    ('DEPARTMENT', 'Department'),
    ('FACULTY', 'Faculty'),
    ('LEVEL', 'Level'),
]


class Group(models.Model):
    title = models.CharField(max_length=50)
    context = models.CharField(max_length=50, blank=True, choices=GROUP_CONTEXTS)
    default = models.BooleanField(default=False)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='member_group')
    created_by = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def get_members(self):
        return ",".join([m.name for m in self.members.all()])


class MessageState(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)

    def __str__(self):
        return self.user.name+'_msg_state_{0}'.format(self.id)


class Attachment(models.Model):
    file = models.FileField(upload_to=attachment_directory_path, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_file_name(self):
        return self.file.name.split('/').pop()


class MessageThread(models.Model):
    content = models.TextField(max_length=2000, blank=True)
    sender = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,  null=True)
    states = models.ManyToManyField(MessageState)
    attachments = models.ManyToManyField(Attachment)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_message_states(self):
        return ",".join([s.user.name + '_msg_state_{0}'.format(s.id) for s in self.states.all()])

    def get_attachments(self):
        return ",".join(['attach_{0}'.format(a.id) for a in self.attachments.all()])


class Message(models.Model):
    content = models.TextField(max_length=2000, blank=True)
    subject = models.CharField(max_length=100, blank=True)
    sender = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='message_sender',
        null=True
    )
    receivers = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    states = models.ManyToManyField(MessageState)
    threads = models.ManyToManyField(MessageThread, blank=True)
    group = models.ForeignKey(to=Group, on_delete=models.SET_NULL, null=True, blank=True)
    attachments = models.ManyToManyField(Attachment, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_message_state(self, user):
        return self.states.get(user=user).read

    def has_attachments(self):
        return len(self.attachments.all()) > 0

    def get_receivers(self):
        return ",".join([r.email for r in self.receivers.all()])

    def get_message_states(self):
        return ",".join([s.user.name+'_msg_state_{0}'.format(s.id) for s in self.states.all()])

    def get_message_threads(self):
        return ",".join(['thread_{0}'.format(t.id) for t in self.threads.all()])

    def get_attachments(self):
        return ",".join(['attach_{0}'.format(a.id) for a in self.attachments.all()])


@receiver(pre_delete, sender=Message)
def delete_message_state(sender, instance, **kwargs):
    message_states = instance.states.all()
    message_attachments = instance.attachments.all()
    for msg_state in message_states:
        msg_state.delete()
    for msg_attachment in message_attachments:
        msg_attachment.delete()


@receiver(pre_delete, sender=Message)
def delete_message_thread_state(sender, instance, **kwargs):
    message_states = instance.states.all()
    message_attachments = instance.attachments.all()
    for msg_state in message_states:
        msg_state.delete()
    for msg_attachment in message_attachments:
        msg_attachment.delete()
