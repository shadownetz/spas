from django.contrib import admin
from .models import (Group, MessageState, Attachment, MessageThread, Message)


class GroupAdmin(admin.ModelAdmin):
    model = Group
    list_display = (
        'id', 'title', 'created_by', 'created_at', 'updated_at',
        'get_members'
    )
    fieldsets = (
        (None, {
            'fields': ('title', 'members', 'created_by')
        }),
    )
    ordering = ('created_at',)


class MessageStateAdmin(admin.ModelAdmin):
    model = MessageState
    list_display = (
        'id', 'user', 'read',
    )
    fieldsets = (
        (None, {
            'fields': ('user', 'read',)
        }),
    )
    ordering = ('user',)


class AttachmentAdmin(admin.ModelAdmin):
    model = Attachment
    list_display = (
        'id', 'file', 'created_at',
    )
    fieldsets = (
        (None, {
            'fields': ('file',)
        }),
    )
    ordering = ('created_at',)


class MessageThreadAdmin(admin.ModelAdmin):
    model = MessageThread
    list_display = (
        'id', 'content', 'sender', 'get_message_states', 'get_attachments', 'created_at',
    )
    fieldsets = (
        (None, {
            'fields': ('content', 'sender', 'states', 'attachments',)
        }),
    )
    ordering = ('created_at',)


class MessageAdmin(admin.ModelAdmin):
    model = Message
    list_display = (
        'id', 'content', 'sender',
        'get_receivers', 'get_message_states',
        'get_message_threads', 'group', 'get_attachments',
        'created_at',
    )
    fieldsets = (
        (None, {
            'fields': ('content', 'sender', 'receivers', 'states', 'threads', 'group', 'attachments')
        }),
    )
    ordering = ('created_at',)


admin.site.register(Group, GroupAdmin)
admin.site.register(MessageState, MessageStateAdmin)
admin.site.register(Attachment, AttachmentAdmin)
admin.site.register(MessageThread, MessageThreadAdmin)
admin.site.register(Message, MessageAdmin)
