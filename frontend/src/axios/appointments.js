import axios from 'axios';

const createAppointment = async (patient, comment, date, times) => {
    try {
        const appointment = {
            patient: patient,
            comment: comment,
            date: date,
            times: times.toString()
        };
        const addedAppointment = await axios.post("/api/appointments/", appointment);

        console.log("Created appointment for " + addedAppointment.patient);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const readAppointments = async (date, inForm) => {
    try {
        var final;
        if (inForm) {
            final = new Date(date).toISOString().split('T')[0];
        }
        else {
            final = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
        }

        const appointments = await axios.get(`/api/appointments?date=${final}`);
        
        return await appointments.data;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const deleteAppointment = async (uuid) => {
    try {
        await axios.delete(`/api/appointments/${uuid}`);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export { createAppointment, readAppointments, deleteAppointment };