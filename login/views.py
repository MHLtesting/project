from django.contrib.auth.models import User

from django.contrib.auth import authenticate

from django.http.response import HttpResponse, Http404, JsonResponse

from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'login/index.html', context={})


def ajlogin(request):
    if not request.is_ajax() or request.method != 'POST':
        raise Http404

    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)

    return JsonResponse({'result': True, })


def username_check(request):
    if not request.is_ajax():
        raise Http404

    ret = {'available': False}
    username = request.GET['username']
    if not User.objects.filter(username=username).exists():
        ret['available'] = True
    return JsonResponse(ret)


def register(request):
    if not request.is_ajax() or request.method != "POST":
        raise Http404
    print request.POST
    username = request.POST['username']
    password = request.POST['password']
    confirm = request.POST['confirm']
    if User.objects.filter(username=username).exists():
        return JsonResponse({'error':  True, 'error_message': "user already exists"})
    if len(password) <= 6:
        return JsonResponse({'error': True, 'error_message' : "password should be at least 7 chars"})
    if password != confirm:
        return JsonResponse({'error': True, 'error_message': "passwords don't match"})
    return JsonResponse({
        'error': False,
        'redirect_url': reversed('server:index'),
    })

