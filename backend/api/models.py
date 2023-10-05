from django.db import models
import uuid

class Appointment(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    patient = models.CharField(max_length=120, default="")
    comment = models.CharField(max_length=240, default="")
    date = models.DateField()
    times = models.CharField(max_length=120, default="")

    def _str_(self):
        return self.patient