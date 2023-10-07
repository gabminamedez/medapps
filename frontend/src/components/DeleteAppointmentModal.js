import { Modal, Button } from 'react-bootstrap';

import { deleteAppointment } from '../axios/appointments';

import styles from '../assets/styles/Modal.module.css';

const DeleteAppointmentModal = ({ show, onHide, appointment }) => {
    const handleDelete = async () => {
        await deleteAppointment(appointment.uuid);
        onHide();
        window.location = "/view-appointments";
    };

    return (
        <Modal className={styles.modal} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <h1 className="fontHead colorPrimary">Delete Appointment</h1>
            </Modal.Header>

            <Modal.Body>
                <p className="fontBody">Are you sure you want to delete the appointment for { appointment.patient } scheduled on { appointment.date }?</p>
            </Modal.Body>
            
            <Modal.Footer>
                <Button className="btnPrimary bg-danger" onClick={() =>handleDelete()}>Delete</Button>
                <Button className="btnSecondary bg-secondary" onClick={() =>onHide()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteAppointmentModal;