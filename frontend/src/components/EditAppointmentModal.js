import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { timeblocks } from '../assets/constants';
import { readAppointments, editAppointment } from '../axios/appointments';

import styles from '../assets/styles/Modal.module.css';

const EditAppointmentModal = ({ show, onHide, appointment }) => {
    const [patient, setPatient] = useState(appointment.patient);
    const [errPatient, setErrPatient] = useState("");
    const [comment, setComment] = useState(appointment.comment);
    const [errComment, setErrComment] = useState("");
    const [date, setDate] = useState(appointment.date);
    const [errDate, setErrDate] = useState("");
    const [times, setTimes] = useState(appointment.times.split(","));
    const [errTimes, setErrTimes] = useState("");
    const [unavailableTimes, setUnavailableTimes] = useState([]);

    const handleDateChange = async (date) => {
        setDate(date);
        const appointmentsOnDate = await readAppointments(date, true);
        var tempUnavailableTimes = [];
        for (const appointment of appointmentsOnDate) {
            tempUnavailableTimes = tempUnavailableTimes.concat(appointment.times.split(","));
        }
        setUnavailableTimes(tempUnavailableTimes);
        setTimes([]);
    }

    const handleTimeClick = (e, idx) => {
        e.preventDefault();

        var newTimes = times;
        if (times.includes(idx)) {
            setTimes(newTimes.filter(item => item !== idx));
        }
        else {
            setTimes([...times, idx]);
        }
    };

    const handleEdit = async () => {
        setErrPatient("");
        setErrComment("");
        setErrDate("");
        setErrTimes("");
        var isErr = false;

        if (patient === "" || comment === "" || date === "" || times.length === 0) {
            if (patient === "") setErrPatient("Patient name is required.");
            if (comment === "") setErrComment("Comment is required.");
            if (date === "") setErrDate("Date is required.");
            if (times.length === 0) setErrTimes("Time is required.");

            isErr = true;
        }

        const dateArr = date.split("-");
        const selectedYear = parseInt(dateArr[0]);
        const selectedMonth = parseInt(dateArr[1]);
        const selectedDay = parseInt(dateArr[2]);

        var selectedDate = new Date();
        selectedDate.setFullYear(selectedYear);
        selectedDate.setMonth(selectedMonth - 1);
        selectedDate.setDate(selectedDay);

        if(selectedDate.getDay() === 0) {
            setErrDate("Cannot set appointments on Sundays.");
            isErr = true;
        }

        if (isErr) {
            return;
        }
        else {
            setErrPatient("");
            setErrComment("");
            setErrDate("");
            setErrTimes("");

            await editAppointment(appointment.uuid, patient, comment, date, times);

            setPatient("");
            setComment("");
            setDate("");
            setTimes([]);

            onHide();
            window.location = "/view-appointments";
        }
    };

    return (
        <Modal className={styles.modal} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <h1 className="fontHead colorPrimary">Edit Appointment</h1>
            </Modal.Header>

            <Modal.Body>
                <div className={styles.createAppointmentContent + " content"}>
                    <Form>
                        <Form.Group className="mb-3">
                            <h6 className="fontHead">Patient Name</h6>
                            <Form.Control className="fontBody" type="text" placeholder="Enter patient name" value={patient} onChange={({target}) => {setPatient(target.value)}} />
                            <p className="fontBody text-danger">{ errPatient }</p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <h6 className="fontHead">Comment</h6>
                            <Form.Control className="fontBody" as="textarea" rows={5} placeholder="Enter comment" value={comment} onChange={({target}) => {setComment(target.value)}} />
                            <p className="fontBody text-danger">{ errComment }</p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <h6 className="fontHead">Date</h6>
                            <Form.Control className="fontBody" type="date" placeholder="Enter schedule" value={date} onChange={({target}) => {handleDateChange(target.value)}} />
                            <p className="fontBody text-danger">{ errDate }</p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <h6 className="fontHead">Time</h6>
                            <p className="fontBody text-danger">{ errTimes }</p>
                            <table className={styles.timeTable}>
                                {
                                    timeblocks.map((time, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td className={styles.timeCell}>{time}</td>
                                                <td>
                                                    {
                                                        times.includes(idx) ?
                                                            <div className={styles.timeBoxSelected} onClick={(e) => handleTimeClick(e, idx)}>Selected</div>
                                                            : unavailableTimes.includes(idx) 
                                                                ? <div className={styles.timeBoxUnavailable}>Unavailable</div>
                                                                : <div className={styles.timeBoxAvailable} onClick={(e) => handleTimeClick(e, idx)}>Available</div>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            
            <Modal.Footer>
                <Button className="btnPrimary bg-danger" onClick={() =>handleEdit()}>Save Changes</Button>
                <Button className="btnSecondary bg-secondary" onClick={() =>onHide()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditAppointmentModal;