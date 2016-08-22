from django import forms


class DocumentModel(forms.Form):
    docfile = forms.FileField(label='select your code')
    name = forms.CharField(max_length=40)
