import { useState } from "react"

import styles from "../styles/commentForm.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

function CommentForm({ thread_id }: { thread_id: any }) {
    const [content, setContent] = useState<string>("");

    // Submit new comment
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reqPath = process.env.REACT_APP_SERVER_URL + "/create-comment";
        await fetch(reqPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: sessionStorage.getItem("user"),
                ThreadID: parseInt(thread_id),
                Content: content
            })
        });

        setContent("");
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formDiv}>
                <input
                    type="text"
                    name="comment"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                    className={styles.commentInput}
                    placeholder="Enter a comment..."
                    required
                />
                <button type="submit" className={styles.commentBtn}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </form>
    );
}  

export default CommentForm