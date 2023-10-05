import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

import styles from '../assets/styles/Home.module.css';

const Home = () => {
    return (
        <div>
            <Header isLanding={true} />

            <div className={styles.homeContent + " content"}>
                <h1 className="colorPrimary">Help is <span className="colorSecondary">in</span>.</h1>
                <br />
                <h2>What would you like to do<br />today?</h2>
                <br/>

                <Link to="/create-appointment">
                    <Button className={styles.homeButton + " btnPrimary"}>
                        <h3>Create Appointment</h3>
                    </Button>
                </Link>
                <br />
                <Link to="/view-appointments">
                    <Button className={styles.homeButton + " btnOutline"} variant="outline-primary">
                        <h3>View Appointments</h3>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;