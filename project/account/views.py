from django.shortcuts import render, redirect, get_object_or_404
from registration.models import Registration
from .forms import RegistrationForm

def index_edit(request, acc):

    edits = Registration.objects.all()
    form = RegistrationForm()

    return render(request, 'main/edit.html', {'edits': edits, 'form': form})


def index_board(request, acc):
    return render(request, 'main/board.html')


def account_detail(request, acc):
    account = get_object_or_404(Registration, id=acc)


    return render(request, 'main/account.html', {'account': account})