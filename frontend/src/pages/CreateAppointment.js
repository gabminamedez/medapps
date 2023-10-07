import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { timeblocks } from '../assets/constants';
import { createAppointment, readAppointments } from '../axios/appointments';
import Header from '../components/Header';

import styles from '../assets/styles/CreateAppointment.module.css';

const CreateAppointment = () => {
    const [patient, setPatient] = useState("");
    const [errPatient, setErrPatient] = useState("");
    const [comment, setComment] = useState("");
    const [errComment, setErrComment] = useState("");
    const [date, setDate] = useState("");
    const [errDate, setErrDate] = useState("");
    const [times, setTimes] = useState([]);
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

    const handleCreate = async (e) => {
        e.preventDefault();

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

            await createAppointment(patient, comment, date, times);

            setPatient("");
            setComment("");
            setDate("");
            setTimes([]);
            window.location = "/";
        }
    };

    useEffect(() => {
        alert(unavailableTimes);
    }, [unavailableTimes]);

    return (
        <div>
            <Header isLanding={false} />

            <div className={styles.createAppointmentContent + " content"}>
                <div className={styles.heading}>
                    <p span className="fontHeading"><b>Create an Appointment</b></p>
                    <hr />
                </div>

                <Form>
                    <Form.Group className="mb-3">
                        <h6 className="fontHead">Patient Name</h6>
                        <Form.Control className="fontBody" type="text" placeholder="Enter patient name" onChange={({target}) => {setPatient(target.value)}} />
                        <p className="fontBody text-danger">{ errPatient }</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <h6 className="fontHead">Comment</h6>
                        <Form.Control className="fontBody" as="textarea" rows={5} placeholder="Enter comment" onChange={({target}) => {setComment(target.value)}} />
                        <p className="fontBody text-danger">{ errComment }</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <h6 className="fontHead">Date</h6>
                        <Form.Control className="fontBody w-50" type="date" placeholder="Enter schedule" onChange={({target}) => {handleDateChange(target.value)}} />
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
            
                <Button className="btnPrimary" onClick={handleCreate}>Create Appointment</Button>
            </div>
        </div>
    );
}

export default CreateAppointment;