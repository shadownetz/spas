from django.shortcuts import render, redirect
from home.models import User, StudentProfile, StaffProfile
from .models import (Group)
from django.db import IntegrityError


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


def register_success(request, userid):
    try:
        user = User.objects.get(pk=userid)
    except User.DoesNotExist:
        return redirect('home:index')
    else:
        return render(request, 'dashboard/registerSuccess.html')


def inbox(request):
    return render(request, 'dashboard/inbox.html')


def inbox_content(request):
    return render(request, 'dashboard/inboxContent.html')
