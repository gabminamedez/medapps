import { useState } from 'react';
import { Button } from 'react-bootstrap';

import DeleteAppointmentModal from './DeleteAppointmentModal';
import { timeblocks } from '../assets/constants';

import styles from '../assets/styles/AppointmentCard.module.css';

const AppointmentCard = ({ appointment, isExpanded, onClick }) => {  
    const [deleteShow, setDeleteShow] = useState(false);

    const handleDeleteShow = () => {
        setDeleteShow(true);
    };

    const handleDeleteClose = () => {
        setDeleteShow(false);
    };

    return (
        <div className={isExpanded ? styles.appointmentExpanded : styles.appointmentDisplayed} onClick={onClick}>
            <p className={styles.patient + " fontBody"}><b>{ appointment.patient }</b></p>
            {
                appointment.times.split(",").map((timeIdx) => {
                    return <p className={styles.times + " fontBody colorPrimary"}>{ timeblocks[timeIdx] }</p>
                })
            }
            {
                isExpanded && 
                <div>
                    <hr />
                    <p className={styles.comment + " fontBody"}><b>{ appointment.comment }</b></p>

                    <Button className={styles.cardButton + " btnSecondary"}>Edit</Button>
                    <Button className={styles.cardButton + " btnSecondary bg-danger"} onClick={handleDeleteShow}>Delete</Button>
                </div>
            }

            <DeleteAppointmentModal show={deleteShow} onHide={handleDeleteClose} appointment={appointment} />
        </div>
    );
}

export default AppointmentCard;