import { useNavigate } from "react-router"

import styles from "../styles/threadCard.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faComments } from "@fortawesome/free-solid-svg-icons"

function ThreadCard({ thread }: { thread: any }) {
    // Re-format date
    thread.CreatedAt = new Date(thread.CreatedAt);

    const navigate = useNavigate();
    const loggedInUser = sessionStorage.getItem("user");

    const redirectToThreadEdit = () => {
        navigate("/edit-thread/" + String(thread.ID));
    }

    const redirectToThreadPost = () => {
        navigate("/thread/" + String(thread.ID));
    };

    return (thread.Username == loggedInUser) ? (
        <div className={styles.threadCard}>
            <div className={styles.titleDiv}>
                <span className={styles.title}>{thread.Title}</span>
                <span id={thread.Flair} className={styles.flairLabel}>{thread.Flair}</span>
            </div>
            
            <p className={styles.content}>{thread.Content}</p>
            <p className={styles.author}>Asked by {thread.Username} on {thread.CreatedAt.toLocaleString()}</p>

            <button className={styles.editBtn} onClick={redirectToThreadEdit}>
                <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className={styles.viewBtn} onClick={redirectToThreadPost}>
                <FontAwesomeIcon icon={faComments} />
            </button>
        </div>
    ) : (
        <div className={styles.threadCard}>
            <div className={styles.titleDiv}>
                <span className={styles.title}>{thread.Title}</span>
                <span id={thread.Flair} className={styles.flairLabel}>{thread.Flair}</span>
            </div>
            
            <p className={styles.content}>{thread.Content}</p>
            <p className={styles.author}>Asked by {thread.Username} on {thread.CreatedAt.toLocaleString()}</p>

            <button className={styles.viewBtn} onClick={redirectToThreadPost}>
                <FontAwesomeIcon icon={faComments} />
            </button>
        </div>
    );
}

export default ThreadCard;