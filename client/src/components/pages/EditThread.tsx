import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

import Header from "../Header"
import FlairButton from "../FlairButton"

import styles from "../../styles/createThread.module.css"

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

function EditThread() {
    const navigate = useNavigate();
    const { thread_id } = useParams();

    const flairsList: string[] = [
        "Admin", 
        "Lectures",
        "Tutorials/Assignments",
        "Exams"
    ];

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [flair, setFlair] = useState<number>(0);

    useEffect(() => {
        const getThread = async () => {
            const reqPath = process.env.REACT_APP_SERVER_URL + "/get-thread/" + String(thread_id);

            const response = await fetch(reqPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            const thread: Thread = data.thread;
            
            setTitle(thread.Title);
            setContent(thread.Content);
            setFlair(flairsList.indexOf(thread.Flair));
        };

        getThread();
    }, []);

    const handleSelect = (index: number) => {
        setFlair(index);
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reqPath = process.env.REACT_APP_SERVER_URL + "/update-thread/" + String(thread_id);

        await fetch(reqPath, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Title: title,
                Content: content,
                Flair: flairsList[flair]
            })
        });

        setTitle("");
        setContent("");
        navigate("/forum");
    };

    return (
        <div className={styles.newThread}>
            <Header />

            <h3>Update Thread</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    value={title}
                    className={styles.inputField}
                    required
                />

                <div className={styles.flairDiv}>
                    <span>Thread flair: </span>

                    {flairsList.map((flairName, idx) => {
                        return (
                            <FlairButton key={idx}
                                isActive={flair === idx}
                                toggle={handleSelect}
                                index={idx}
                                text={flairName}
                            />
                        );
                    })}
                </div>
                
                <textarea
                    name="content"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    value={content}
                    className={styles.inputField}
                    required
                />
                <button type="submit" className={styles.btn}>Update Thread</button>
            </form>
        </div>
    );
}

export default EditThread;