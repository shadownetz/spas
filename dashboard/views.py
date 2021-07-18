from django.shortcuts import render, redirect
from home.models import User, StudentProfile, StaffProfile
from .models import (Group, Message, MessageState, Attachment, MessageThread)
from django.db import IntegrityError
from django.contrib.auth import (authenticate, login, logout)
from django.contrib.auth.decorators import login_required
from .forms import (PasswordChangeForm, CreateGroupForm, AvatarUpdateForm, UserUpdateForm, StaffProfileUpdateForm, StudentProfileUpdateForm)
from django.contrib.admin.views.decorators import staff_member_required
import datetime
import pytz


@login_required
def index(request):
    response = {
        'inbox': {
            'count': 0,
            'read': 0,
            'unread': 0,
            'sent': 0
        },
        'sms': {
            'count': 0,
            'threads': 0,
            'groups': 0
        },
        'users': {
            'count': 0,
            'staffs': 0,
            'students': 0,
            'admins': 0
        }
    }
    all_sms = Message.objects.all()
    all_sms_threads = MessageThread.objects.all()
    all_sms_groups = Group.objects.all()
    users = User.objects.all()

    user_inbox = all_sms.filter(receivers=request.user)
    user_msg_states = [x.get_message_state(request.user) for x in user_inbox]
    user_read_msg_states = list(filter(lambda x: x is True, user_msg_states))
    user_unread_msg_states = len(user_msg_states) - len(user_read_msg_states)
    user_sent_inbox = all_sms.filter(sender=request.user)

    response['inbox']['count'] = user_inbox.count()
    response['inbox']['sent'] = user_sent_inbox.count()
    if len(user_msg_states) > 0:
        response['inbox']['read'] = len(user_read_msg_states)
        response['inbox']['unread'] = user_unread_msg_states

    response['sms']['count'] = all_sms.count()
    response['sms']['threads'] = all_sms_threads.count()
    response['sms']['groups'] = all_sms_groups.count()

    response['users']['count'] = users.count()
    response['users']['staffs'] = users.filter(is_staff=True).count()
    response['users']['students'] = users.filter(is_staff=False).count()
    response['users']['admins'] = StaffProfile.objects.filter(role='ADMIN').count()
    # update level
    if not request.user.is_staff:
        registered_on = request.user.created_at
        now = datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)
        difference = now - registered_on
        year = int(difference.total_seconds()/31540000.0010112)*100
        level = 100 if (year*100) == 0 else (year*100)
        student_profile = StudentProfile.objects.get(student=request.user.id)
        student_profile.level = level
        student_profile.save()
    return render(request, 'dashboard/index.html', response)


def register_student(request):
    response = {
        "error": False
    }
    if request.method == 'POST':
        try:
            superadmin = User.objects.get(pk=1)
            if not (superadmin.is_superuser and superadmin.is_staff):
                raise User.DoesNotExist
        except User.DoesNotExist:
            response['error'] = True
            response['message'] = "Please create a superuser for this platform"
        else:
            try:
                user = User.objects.create(
                    email=request.POST['email'],
                    name=request.POST['name'],
                    phone=request.POST['phone'],
                    address=request.POST['address'],
                    avatar=request.FILES['avatar'],
                )
                user.set_password(request.POST['password'])
                user.save()
                student_profile = StudentProfile.objects.create(
                    student=user,
                    department=request.POST['department'],
                    faculty=request.POST['faculty'],
                    level=request.POST['level'],
                    reg_no=request.POST['regNo']
                )

                # Automatically add categorization
                # department
                try:
                    tmp_department = Group.objects.get(title=request.POST['department'].upper())
                    tmp_department.members.add(user)
                    tmp_department.save()
                except Group.DoesNotExist:
                    new_group = Group()
                    new_group.context = 'DEPARTMENT'
                    new_group.default = True
                    new_group.title = request.POST['department'].upper()
                    new_group.created_by = superadmin
                    new_group.save()
                    new_group.members.add(user)
                    new_group.save()
                # faculty
                try:
                    tmp_faculty = Group.objects.get(title=request.POST['faculty'].upper())
                    tmp_faculty.members.add(user)
                    tmp_faculty.save()
                except Group.DoesNotExist:
                    new_group = Group()
                    new_group.title = request.POST['faculty'].upper()
                    new_group.context = 'FACULTY'
                    new_group.default = True
                    new_group.created_by = superadmin
                    new_group.save()
                    new_group.members.add(user)
                    new_group.save()
                # level
                try:
                    tmp_level = Group.objects.get(title=request.POST['level'])
                    tmp_level.members.add(user)
                    tmp_level.save()
                except Group.DoesNotExist:
                    new_group = Group()
                    new_group.context = 'LEVEL'
                    new_group.default = True
                    new_group.title = request.POST['level']
                    new_group.created_by = superadmin
                    new_group.save()
                    new_group.members.add(user)
                    new_group.save()

            except IntegrityError:
                response['error'] = True
                response['message'] = "Duplicate Registration Number Found"
            else:
                return redirect('home:register_success', user.id)
    return render(request, 'dashboard/auth/registerStudent.html', response)


def register_staff(request):
    response = {
        "error": False
    }
    if request.method == 'POST':
        try:
            admins = User.objects.filter(is_staff=True)
            user = User.objects.create(
                email=request.POST['email'],
                name=request.POST['name'],
                phone=request.POST['phone'],
                address=request.POST['address'],
                avatar=request.FILES['avatar'],
                is_staff=True
            )
            if admins.count() == 0:
                user.is_active = True
            user.set_password(request.POST['password'])
            user.save()
            staff_profile = StaffProfile.objects.create(
                staff=user,
                role=request.POST['role'],
                staffId=request.POST['staffId'],
            )
        except IntegrityError:
            response['error'] = True
            response['message'] = "Duplicate Staff ID Found"
        else:
            return redirect('home:register_success', user.id)
    return render(request, 'dashboard/auth/registerStaff.html', response)


def register_success(request, userid):
    try:
        user = User.objects.get(pk=userid)
    except User.DoesNotExist:
        return redirect('home:index')
    else:
        return render(request, 'dashboard/registerSuccess.html')


def signin(request):
    response = {
        "error": False
    }
    if request.method == 'POST':
        try:
            next_url = request.POST['next']
            user = User.objects.get(email=request.POST['email'])
            if not user.is_active:
                raise ValueError
            user = authenticate(request, email=request.POST['email'], password=request.POST['password'])
            if user is not None:
                login(request, user)
                if next_url:
                    return redirect(next_url)
                return redirect('home:dashboard:index')
            else:
                raise User.DoesNotExist
        except User.DoesNotExist:
            response['error'] = True
            response['message'] = "Invalid Email or Password"
        except ValueError:
            response['error'] = True
            response['message'] = "You have not been activated. Kindly contact the admin."
    return render(request, 'dashboard/auth/login.html', response)


def signout(request):
    logout(request)
    return redirect('home:login')


@login_required
def inbox(request):
    group_id = request.GET.get('groupId')
    user_message_groups = Group.objects.filter(members=request.user)
    if not group_id:
        group_id = ''
    return render(request, 'dashboard/inbox/inbox.html', {
        'grouped': (lambda x: True if len(x) > 0 else False)(group_id),
        'message_groups': user_message_groups
    })


@login_required
def sent_inbox(request):
    user_message_groups = Group.objects.filter(members=request.user)
    return render(request, 'dashboard/inbox/inboxSent.html', {
        'message_groups': user_message_groups
    })


@login_required
def inbox_create(request):
    messages = Message.objects.filter(receivers=request.user)
    user_message_groups = Group.objects.filter(members=request.user)
    if request.method == 'POST':
        send_to = request.POST['to'].split(',')    # [email,email,email]
        group_id = request.POST['group']   # group id
        subject = request.POST['subject']
        content = request.POST['content']
        send_to_context = request.POST['sendToContext']     # email or group
        attachment_ids = request.POST['attachments'].split(',')

        new_message = Message(content=content, subject=subject, sender=request.user)
        new_message.save()
        if send_to_context == 'email':
            for user_email in send_to:
                if user_email:
                    try:
                        user = User.objects.get(email=user_email)
                        new_message.receivers.add(user)
                        new_message.states.add(MessageState.objects.create(user=user))
                    except User.DoesNotExist:
                        pass
                else:
                    continue
        elif send_to_context == 'group':
            try:
                group = Group.objects.get(pk=int(group_id))
                new_message.group = group
                for user in group.members.all():
                    new_message.states.add(MessageState.objects.create(user=user))
            except Group.DoesNotExist:
                pass
        for attachment_id in attachment_ids:
            if attachment_id:
                try:
                    attachment = Attachment.objects.get(pk=int(attachment_id))
                    new_message.attachments.add(attachment)
                except Attachment.DoesNotExist:
                    pass
            else:
                continue
        new_message.save()
        return redirect('home:dashboard:inbox')
    users = User.objects.filter(is_superuser=False)
    groups = Group.objects.all()
    user_custom_groups = groups.filter(created_by=request.user)
    return render(request, 'dashboard/inbox/composeSMS.html', {
        'users': users,
        'groups': groups,
        'custom_groups': user_custom_groups,
        'messages': messages,
        'message_groups': user_message_groups
    })


@login_required
def inbox_content(request, inbox_id):
    messages = Message.objects.filter(receivers=request.user)
    if request.method == 'POST':
        parent_message_id = request.POST['parentMessageID']
        attachment_ids = request.POST['attachments'].split(',')
        message_content = request.POST['content']
        try:
            parent_message = Message.objects.get(pk=parent_message_id)
            new_message_thread = MessageThread(content=message_content, sender=request.user)
            message_receivers = parent_message.receivers.all()
            new_message_thread.save()
            if len(message_receivers) > 0:
                for receiver in message_receivers:
                    new_message_thread.states.add(MessageState.objects.create(user=receiver))
            elif parent_message.group:
                for member in parent_message.group.members.all():
                    new_message_thread.states.add(MessageState.objects.create(user=member))
            for file_id in attachment_ids:
                if file_id:
                    try:
                        new_message_thread.attachments.add(Attachment.objects.get(pk=file_id))
                    except Attachment.DoesNotExist:
                        pass
                else:
                    continue
            new_message_thread.save()
            parent_message.threads.add(new_message_thread)
            parent_message.save()
        except Message.DoesNotExist:
            pass
        return redirect('home:dashboard:inbox_content', parent_message_id)
    try:
        user_message_groups = Group.objects.filter(members=request.user)
        parent_message = Message.objects.get(pk=inbox_id)
        # Mark message as read for the current user
        for message_state in parent_message.states.filter(user=request.user):
            message_state.read = True
            message_state.save()
        # Also mark message threads as read
        for thread in parent_message.threads.all():
            try:
                user_thread_message_states = thread.states.filter(user=request.user)
                for message_state in user_thread_message_states:
                    message_state.read = True
                    message_state.save()
            except MessageState.DoesNotExist:
                pass
    except Message.DoesNotExist:
        pass
    else:
        return render(request, 'dashboard/inbox/inboxContent.html', {
            'parent_message': parent_message,
            'messages': messages,
            'message_groups': user_message_groups
        })
    return redirect('home:dashboard:inbox')


@login_required
@staff_member_required
def groups(request):
    default_groups = Group.objects.filter(default=True)
    custom_groups = Group.objects.filter(default=False, created_by=request.user)
    all_groups = [group for group in default_groups]
    all_groups = all_groups + [c_group for c_group in custom_groups]
    return render(request, 'dashboard/group/group.html', {
        'groups': all_groups
    })


@login_required
@staff_member_required
def group_add(request):
    new_group_form = CreateGroupForm()
    if request.method == 'POST':
        new_group_form = CreateGroupForm(request.POST, request=request)
        if new_group_form.is_valid():
            new_group_form.save()
            return redirect('home:dashboard:groups')
    return render(request, 'dashboard/group/groupAdd.html', {
        'group_form': new_group_form
    })


@login_required
@staff_member_required
def group_edit(request, groupId):
    try:
        group = Group.objects.get(pk=groupId)
        if group.default:
            raise Group.DoesNotExist
        new_group_form = CreateGroupForm(instance=group)
    except Group.DoesNotExist:
        return redirect('home:dashboard:groups')

    if request.method == 'POST':
        try:
            group = Group.objects.get(pk=groupId)
            if not group.default:
                new_group_form = CreateGroupForm(request.POST, instance=group, request=request)
                if new_group_form.is_valid():
                    new_group_form.save()
                    return redirect('home:dashboard:groups')
        except Group.DoesNotExist:
            return redirect('home:dashboard:groups')
    return render(request, 'dashboard/group/groupEdit.html', {
        'group_form': new_group_form
    })


@login_required
@staff_member_required
def group_delete(request, groupId):
    try:
        group = Group.objects.get(pk=groupId)
        group.delete()
    except Group.DoesNotExist:
        pass
    return redirect('home:dashboard:groups')


@login_required
@staff_member_required
def students(request, student_id=''):
    if student_id:
        try:
            student = User.objects.get(pk=student_id)
            student.is_active = not student.is_active
            student.save()
            return redirect('home:dashboard:students')
        except User.DoesNotExist:
            pass
    students_list = User.objects.filter(is_staff=False)
    return render(request, 'dashboard/user/student.html', {
        'students': students_list
    })


@login_required
@staff_member_required
def students_delete(request, student_id):
    try:
        student = User.objects.get(pk=student_id)
        student.delete()
    except User.DoesNotExist:
        pass
    return redirect('home:dashboard:students')


@login_required
@staff_member_required
def staffs(request, staff_id=''):
    if staff_id and request.user.is_staff and request.user.is_superuser:
        try:
            staff = User.objects.get(pk=staff_id)
            staff.is_active = not staff.is_active
            staff.save()
            return redirect('home:dashboard:staffs')
        except User.DoesNotExist:
            pass
    staffs_list = User.objects.filter(is_staff=True)
    return render(request, 'dashboard/user/staff.html', {
        'staffs': staffs_list
    })


@login_required
@staff_member_required
def staffs_delete(request, staff_id):
    if request.user.is_staff and request.user.is_superuser:
        try:
            staff = User.objects.get(pk=staff_id)
            staff.delete()
        except User.DoesNotExist:
            pass
    return redirect('home:dashboard:staffs')


@login_required
def profile(request):
    user = User.objects.get(pk=request.user.id)
    avatar_form = AvatarUpdateForm()
    user_form = UserUpdateForm(instance=request.user)
    student_profile_form = StudentProfileUpdateForm()
    staff_profile_form = StaffProfileUpdateForm()
    password_form = PasswordChangeForm()
    try:
        if request.user.is_staff:
            staff_profile = StaffProfile.objects.get(staff=request.user)
            staff_profile_form = StaffProfileUpdateForm(instance=staff_profile)
        else:
            student_profile = StudentProfile.objects.get(student=request.user)
            student_profile_form = StudentProfileUpdateForm(instance=student_profile)
    except (StudentProfile.DoesNotExist, StaffProfile.DoesNotExist):
        pass

    if request.method == 'POST':
        avatar_form = AvatarUpdateForm(request.POST, request.FILES, instance=request.user)
        user_form = UserUpdateForm(request.POST, instance=request.user)
        password_form = PasswordChangeForm(request.POST, instance=request.user)
        if avatar_form.is_valid():
            avatar_form.save()
        if user_form.is_valid():
            user_form.save()
        if password_form.is_valid():
            user.set_password(password_form.cleaned_data['password'])
            user.save()
        try:
            if request.user.is_staff:
                staff_profile = StaffProfile.objects.get(staff=request.user)
                staff_profile_form = StaffProfileUpdateForm(request.POST, instance=staff_profile)
                if staff_profile_form.is_valid():
                    staff_profile_form.save()
            else:
                student_profile = StudentProfile.objects.get(student=request.user)
                student_profile_form = StudentProfileUpdateForm(request.POST, instance=student_profile)
                if student_profile_form.is_valid():
                    student_profile_form.save()
        except (StudentProfile.DoesNotExist, StaffProfile.DoesNotExist):
            pass

        return redirect('home:dashboard:profile')

    return render(request, 'dashboard/user/updateProfile.html', {
        'avatarForm': avatar_form,
        'userForm': user_form,
        'studentProfileForm': student_profile_form,
        'staffProfileForm': staff_profile_form,
        'passwordForm': password_form
    })
