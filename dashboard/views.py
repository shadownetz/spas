from django.shortcuts import render, redirect
from home.models import User, StudentProfile, StaffProfile
from .models import (Group)
from django.db import IntegrityError
from django.contrib.auth import (authenticate, login, logout)
from django.contrib.auth.decorators import login_required
from .forms import MessageForm


@login_required
def index(request):
    return render(request, 'dashboard/index.html')


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
            user = User.objects.create(
                email=request.POST['email'],
                name=request.POST['name'],
                phone=request.POST['phone'],
                address=request.POST['address'],
                avatar=request.FILES['avatar'],
                is_staff=True
            )
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
            user = authenticate(request, email=user.email, password=request.POST['password'])
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
    return render(request, 'dashboard/auth/login.html', response)


def signout(request):
    logout(request)
    return redirect('home:login')


@login_required
def inbox(request):
    return render(request, 'dashboard/inbox/inbox.html')


@login_required
def inbox_create(request):
    users = User.objects.filter(is_superuser=False)
    groups = Group.objects.all()
    user_custom_groups = groups.filter(created_by=request.user)
    return render(request, 'dashboard/inbox/composeSMS.html', {
        'users': users,
        'groups': groups,
        'custom_groups': user_custom_groups
    })


@login_required
def inbox_content(request):
    return render(request, 'dashboard/inbox/inboxContent.html')
