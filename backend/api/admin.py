from django.contrib import admin
from .models import Appointment

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'patient', 'comment', 'date', 'times',)


admin.site.register(Appointment, AppointmentAdmin)