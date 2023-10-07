/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { editAppointment } from '../axios/appointments';

import styles from '../assets/styles/Modal.module.css';

const EditAppointmentModal = ({ show, onHide, appointment }) => {
    const [patient, setPatient] = useState(appointment.patient);
    const [errPatient, setErrPatient] = useState("");
    const [comment, setComment] = useState(appointment.comment);
    const [errComment, setErrComment] = useState("");

    const handleEdit = async () => {
        setErrPatient("");
        setErrComment("");
        var isErr = false;

        if (patient === "" || comment === "") {
            if (patient === "") setErrPatient("Patient name is required.");
            if (comment === "") setErrComment("Comment is required.");

            isErr = true;
        }

        if (isErr) {
            return;
        }
        else {
            setErrPatient("");
            setErrComment("");

            await editAppointment(appointment.uuid, patient, comment, appointment.date, appointment.times.split(","));

            setPatient("");
            setComment("");

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
                    </Form>
                </div>
            </Modal.Body>
            
            <Modal.Footer>
                <Button className="btnPrimary" onClick={() =>handleEdit()}>Save Changes</Button>
                <Button className="btnSecondary bg-secondary" onClick={() =>onHide()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditAppointmentModal;