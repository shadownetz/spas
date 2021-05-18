from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.conf import settings
from .managers import UserManager


def user_directory_path(instance, filename):
    # file will be uploaded to media/users/avatars/user_<email>/<filename>
    return 'users/avatars/{0}/{1}'.format(instance.email, filename)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(_('name'), max_length=30, blank=True)
    phone = models.CharField(_('phone'), max_length=20, blank=True)
    address = models.CharField(_('address'), max_length=50, blank=True)
    is_active = models.BooleanField(_('is active'), default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(_('is super'), default=False)
    last_login = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(_('date created'), auto_now_add=True)
    updated_at = models.DateTimeField(_('date updated'), auto_now_add=True)
    avatar = models.ImageField(upload_to=user_directory_path, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')


class StudentProfile(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.CharField(_('department'), max_length=20, blank=True)
    faculty = models.CharField(_('faculty'), max_length=20, blank=True)
    level = models.IntegerField(_('level'), default=100)
    reg_no = models.CharField(_('registration number'), max_length=20, unique=True)


ROLE_CHOICES = (
    ('ADMIN', 'Admin'),
    ('DEFAULT', 'Default')
)


class StaffProfile(models.Model):
    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, blank=True)
    staffId = models.CharField(_('Staff ID'), max_length=20, unique=True)

#
# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_user_log(sender, instance, created, **kwargs):
#     if created:
#         if instance.is_staff:
#             StaffProfile.objects.create(
#                 staff=instance,
#                 role='TYPE_A',
#                 message='User Created Successfully',
#             ).save()
