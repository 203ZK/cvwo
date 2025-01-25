import { useNavigate } from "react-router"

import styles from "../styles/header.module.css"

function Header() {
    const loggedInUser = sessionStorage.getItem("user");

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className={styles.header}>
            <div>
                <h2>Welcome to Forum, {loggedInUser}!</h2>
            </div>
            <div className={styles.btnDiv}>
                <button onClick={handleLogout} className={styles.btn}>
                    Logout
                </button>
            </div>
        </div>
    );
    
}

export default Header