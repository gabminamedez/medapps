import { useState } from 'react';
import { Button } from 'react-bootstrap';

import EditAppointmentModal from './EditAppointmentModal';
import DeleteAppointmentModal from './DeleteAppointmentModal';
import { timeblocks } from '../assets/constants';

import styles from '../assets/styles/AppointmentCard.module.css';

const AppointmentCard = ({ appointment, isExpanded, onClick }) => {  
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const handleEditShow = () => {
        setEditShow(true);
    };

    const handleEditClose = () => {
        setEditShow(false);
    };

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
                appointment.times.split(",").length === 1 ? 
                    <p className={styles.times + " fontBody colorPrimary"}>{ timeblocks[appointment.times.split(",")[0].toString()] }</p>
                    :
                    <p className={styles.times + " fontBody colorPrimary"}>{ timeblocks[appointment.times.split(",")[0].toString()].split(" - ")[0] } - { timeblocks[appointment.times.split(",")[appointment.times.split(",").length - 1].toString()].split(" - ")[1] }</p>
            }
            {
                isExpanded && 
                <div>
                    <hr />
                    <p className={styles.comment + " fontBody"}><b>{ appointment.comment }</b></p>

                    <Button className={styles.cardButton + " btnSecondary"} onClick={handleEditShow}>Edit</Button>
                    <Button className={styles.cardButton + " btnSecondary bg-danger"} onClick={handleDeleteShow}>Delete</Button>
                </div>
            }

            <EditAppointmentModal show={editShow} onHide={handleEditClose} appointment={appointment} />
            <DeleteAppointmentModal show={deleteShow} onHide={handleDeleteClose} appointment={appointment} />
        </div>
    );
}

export default AppointmentCard;