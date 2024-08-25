from django import forms
from .models import Todo

import datetime

class TodoForm(forms.ModelForm):
    class Meta:
        model   = Todo
        fields  = [ "deadline","content" ]

class DateSearchForm(forms.Form):

    # バリデーションエラー回避のため、一時的にDateTime型で受け取る。
    start   = forms.DateTimeField()
    end     = forms.DateTimeField()

    # Date型に変換。
    def clean(self):
        cleaned_data = super().clean()
    
        # 月初に設定
        start       = cleaned_data["start"].replace(day=1).date()

        # 最終日を取り出す
        # TIPS:来月の月始めを取り出す(12月であれば+1で、1月になる) それに、1日マイナスする
        end         = (start.replace(month=start.month % 12 + 1, day=1) - datetime.timedelta(days=1))

        cleaned_data["start"]   = start
        cleaned_data["end"]     = end 

        return cleaned_data

