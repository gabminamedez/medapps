from django.db import models
import uuid

class Appointment(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    patient = models.CharField(max_length=120)
    comment = models.CharField(max_length=240)
    fromDate = models.DateField()
    toDate = models.DateField()

    def _str_(self):
        return self.patient