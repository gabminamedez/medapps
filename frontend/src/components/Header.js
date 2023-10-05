import { Link } from 'react-router-dom';
import { AiFillLeftSquare } from 'react-icons/ai';

import logo from '../assets/images/logo.png';

import styles from '../assets/styles/Header.module.css';

const Header = ({ isLanding }) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>

                {
                    !isLanding && <Link to="/"><AiFillLeftSquare className={styles.arrowLeft + " reactIcon colorGray"} /></Link>
                }
                <img className={styles.logo} src={logo} alt="logo" />
                <Link to="/"><h1 className="colorPrimary fontHead">MedApps</h1></Link>
            </div>
            
            <div className={styles.headerRight}>
                <p className="fontBody"><i>© 2023 Gabriel Minamedez for Old.St Labs.</i></p>
            </div>
        </div>
    );
}

export default Header;