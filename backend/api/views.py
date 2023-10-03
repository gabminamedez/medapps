from rest_framework import viewsets
from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        startDate = self.request.query_params.get('startDate')
        endDate = self.request.query_params.get('endDate')
        if user is not None and startDate is not None and endDate is not None:
            queryset = Appointment.objects.filter(schedule__gte=startDate, schedule__lte=endDate)
        else:
            queryset = Appointment.objects.all()

        return queryset