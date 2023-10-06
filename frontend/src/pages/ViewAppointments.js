import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';

import { timeblocks } from '../assets/constants';
import { readAppointments, deleteAppointment } from '../axios/appointments';
import AppointmentCard from '../components/AppointmentCard';
import Header from '../components/Header';

import styles from '../assets/styles/ViewAppointments.module.css';

const ViewAppointments = () => {
    const [sched, setSched] = useState(new Date());
    const [appointments, setAppointments] = useState(null);

    const handleLeftCalendar = () => {
        setSched(new Date(Date.parse(sched) - 86400 * 1000));
        setAppointments(null);
    };

    const handleRightCalendar = () => {
        setSched(new Date(Date.parse(sched) + 86400 * 1000));
        setAppointments(null);
    };

    const handleDateChange = (date) => {
        setSched(date);
        setAppointments(null);
    };

    useEffect(() => {
        const fetch = async () => {
            if(appointments === null) {
                const retrievedAppointments = await readAppointments(sched, false);
                setAppointments(retrievedAppointments);
            }
        };

        fetch();
    }, [sched, appointments]);

    return (
        <div>
            <Header isLanding={false} />

            <div className="content">
                <div className={styles.calendarDiv}>
                    <div className={styles.calendarDir}>
                        <AiFillLeftSquare className={styles.calendarLeft + " reactIcon colorGray"} onClick={handleLeftCalendar} />
                        <div className={styles.calendarLabel}>
                            <p className={styles.dayLabel + " fontBody colorPrimary"}>{ sched.toDateString().substring(0, 3).toUpperCase() }</p>
                            <h2 className={styles.dateLabel + " fontHead"}>{ sched.toDateString().substring(4) }</h2>
                        </div>
                        <AiFillRightSquare className={styles.calendarRight + " reactIcon colorGray"} onClick={handleRightCalendar} />
                    </div>

                    <div className={styles.calendarButton}>
                        <Form.Control className="fontBody" type="date" placeholder="Enter schedule" onChange={({target}) => {handleDateChange(new Date(target.value))}} />
                    </div>
                </div>

                <hr />

                <div className={styles.appointmentsList}>
                    {
                        appointments && appointments.map((appointment) => {
                            return <AppointmentCard appointment={appointment} />
                        })
                    }
                </div>

                <div className={styles.vl} />
            </div>
        </div>
    );
}

export default ViewAppointments;