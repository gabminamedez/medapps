import { timeblocks } from '../assets/constants';

import styles from '../assets/styles/AppointmentCard.module.css';

const AppointmentCard = ({ appointment }) => {    
    return (
        <div className={styles.appointment + " colorBgWhite2"}>
            <p className={styles.patient + " fontBody"}><b>{ appointment.patient }</b></p>
            {
                appointment.times.split(",").map((timeIdx) => {
                    return <p className={styles.times + " fontBody colorPrimary"}>{ timeblocks[timeIdx] }</p>
                })
            }
            <hr />
            <p className={styles.comment + " fontBody"}>{ appointment.comment }</p>
        </div>
    );
}

export default AppointmentCard;