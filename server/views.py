import json
from django.contrib.auth import logout

from django.contrib.auth.decorators import login_required

from django.core.urlresolvers import reverse

from django.http.response import HttpResponse, HttpResponseRedirect

from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

from server import models
from server.forms import DocumentModel
from server.models import CodeAdress


@login_required
def index(request):
    return render(request, 'server/index.html', context={
        'codeadress_list': CodeAdress.objects.all(),
        'user': request.user,
    })


@login_required
def code(request, code_id):
    code_address = get_object_or_404(models.CodeAdress, pk=code_id)
    myfile = open(code_address.address)
    context = {
        'code': myfile.read(),
        'header': code_address.name,
        'form': DocumentModel(),
    }
    return render(request, template_name='server/view.html', context=context)


@login_required
def upload(request, code_id):
    print request.FILES
    if request.method == 'GET':
        return HttpResponseRedirect(reverse('code', args=(code_id,)))
    form = DocumentModel(request.POST, request.FILES)
    #if not form.is_valid():
        #return HttpResponseRedirect(reverse('code', args=(code_id,)))
    return HttpResponse("we are updating")