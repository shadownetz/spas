from django.contrib import admin
from .models import User, StaffProfile, StudentProfile


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = (
        'id', 'name', 'email', 'phone', 'address', 'password',
        'is_active', 'is_staff', 'is_superuser',
        'last_login', 'created_at', 'updated_at',
        'avatar'
    )
    fieldsets = (
        (None, {
            'fields': (
                'name', 'email', 'phone', 'address', 'password',
                'is_active', 'is_staff', 'is_superuser',
                'avatar'
            )
        }),
    )
    ordering = ('created_at',)


class StudentProfileAdmin(admin.ModelAdmin):
    model = StudentProfile
    list_display = (
        'id', 'student', 'department', 'faculty', 'level',
    )
    fieldsets = (
        (None, {
            'fields': ('student', 'department', 'faculty', 'level')
        }),
    )
    ordering = ('student',)


class StaffProfileAdmin(admin.ModelAdmin):
    model = StaffProfile
    list_display = (
        'id', 'staff', 'role', 'staffId',
    )
    fieldsets = (
        (None, {
            'fields': ('staff', 'role', 'staffId',)
        }),
    )
    ordering = ('staff',)


admin.site.register(User, UserAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(StaffProfile, StaffProfileAdmin)
