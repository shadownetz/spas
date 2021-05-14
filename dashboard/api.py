import base64
from django.core.files.base import ContentFile
from django.core.files import File
from .models import Attachment
from django.http import JsonResponse


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
