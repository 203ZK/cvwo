import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

import Header from "../Header"
import CommentForm from "../CommentForm"
import Comment from "../Comment"

import styles from "../../styles/threadPost.module.css"

interface Thread {
    "ID": BigInt,
    "CreatedAt": Date,
    "UpdatedAt": Date,
    "DeletedAt": Date | null,
    "Username": string,
    "Title": string,
    "Content": string,
    "Flair": string
}

interface Post {
    "ID": BigInt,
    "CreatedAt": Date,
    "UpdatedAt": Date,
    "DeletedAt": Date | null,
    "Username": string,
    "ThreadID": BigInt,
    "Content": string
}

function ThreadPost() {
    // Get thread_id from URL
    const { thread_id } = useParams();
    const navigate = useNavigate();

    // Prevent loading undefined thread
    const [loading, setLoading] = useState<boolean>(true);

    // States for the thread itself
    const [thread, setThread] = useState<Thread | null>(null);
    const [comments, setComments] = useState<Post[]>([]);

    // Get comments for this particular thread based on thread_id
    useEffect(() => {
        const reqPath = process.env.REACT_APP_SERVER_URL + "/get-comments/" + thread_id;

        const getComments = async () => {
            const response = await fetch(reqPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();

            // Re-format date
            data.thread.CreatedAt = new Date(data.thread.CreatedAt);
            setThread(data.thread);
            setComments(data.comments);
            setLoading(false);
        };

        getComments();
    }, []);

    const handleReturn = () => navigate("/forum");

    return (loading) ? (
        <p>Loading...</p>
    ) : (thread !== null) ? (
        <div className={styles.threadPage}>
            <Header />

            <div className={styles.threadPost}>
                <div className={styles.card}>
                    <div className={styles.threadHeader}>
                        <div>
                            <span className={styles.title}>{thread.Title}</span>
                            <span id={thread.Flair} className={styles.flairLabel}>{thread.Flair}</span>
                        </div>
                        <div className={styles.btnDiv}>
                            <button onClick={handleReturn} className={styles.returnBtn}>
                                Return to threads
                            </button>
                        </div>
                    </div>
                    <p className={styles.content}>{thread.Content}</p>
                    <p className={styles.author}>Asked by {thread.Username} on {thread.CreatedAt.toLocaleString()}</p>
                </div>
                
                <div className="comments">
                    <CommentForm thread_id={thread_id} />

                    {comments.map((comment) => {
                        return <Comment key={String(comment.ID)} comment={comment} />
                    })}
                </div>
            </div>
        </div>
    ) : (
        <p>Can't find thread!</p>
    )
}

export default ThreadPost