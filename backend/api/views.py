from rest_framework import viewsets
from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        date = self.request.query_params.get('date')
        if date is not None:
            queryset = Appointment.objects.filter(date=date)
        else:
            queryset = Appointment.objects.all()

        return queryset