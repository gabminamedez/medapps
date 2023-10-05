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

// const readCheckins = async (email, sched) => {
//     try {
//         const final = new Date(sched.getTime() - (sched.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
//         const checkins = await axios.get(`/api/checkins?user=${email}&schedule=${final}`);
        
//         return await checkins.data;
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const readCheckinsRange = async (email, startDate, endDate) => {
//     try {
//         const finalStart = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
//         const finalEnd = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
//         const checkins = await axios.get(`/api/checkins?user=${email}&startDate=${finalStart}&endDate=${finalEnd}`);
        
//         return await checkins.data;
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const deleteCheckin = async (uuid) => {
//     try {
//         await axios.delete(`/api/checkins/${uuid}`);
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

export { createAppointment };