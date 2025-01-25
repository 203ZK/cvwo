import styles from "../styles/comment.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

function Comment({ comment }: { comment: any }) {
    // Re-format date
    comment.CreatedAt = new Date(comment.CreatedAt);

    const loggedInUser = sessionStorage.getItem("user");

    const handleDelete = (comment_id: BigInt) => {
        const reqPath = process.env.REACT_APP_SERVER_URL + "/delete-comment/" + String(comment_id);

        const deleteComment = async () => {
            await fetch(reqPath, { method: "DELETE" });
        };

        deleteComment();
        window.location.reload();
    };

    return (comment.Username == loggedInUser) ? (
        <div className={styles.comment}>
            <div className={styles.contentDiv}>
                <span className={styles.author}>{comment.Username}</span>
                <span className={styles.created}>{comment.CreatedAt.toLocaleString()}</span>
                <p className={styles.content}>{comment.Content}</p>
            </div>

            <button onClick={() => handleDelete(comment.ID)} className={styles.deleteBtn}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    ) : (
        <div className={styles.comment}>
            <div className={styles.contentDiv}>
                <span className={styles.author}>{comment.Username}</span>
                <span className={styles.created}>{comment.CreatedAt.toLocaleString()}</span>
                <p className={styles.content}>{comment.Content}</p>
            </div>
        </div>
    );
}

export default Comment