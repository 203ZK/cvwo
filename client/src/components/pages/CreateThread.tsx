import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"

import Header from "../Header"
import FlairButton from "../FlairButton"

import styles from "../../styles/createThread.module.css"

function CreateThread() {
    const navigate = useNavigate();

    const flairsList: string[] = [
        "Admin", 
        "Lectures",
        "Tutorials/Assignments",
        "Exams"
    ];

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [flair, setFlair] = useState<number>(0);

    const handleSelect = (index: number) => {setFlair(index)};

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedFlair: string = flairsList[flair];
        const reqPath = process.env.REACT_APP_SERVER_URL + "/create-thread";

        await fetch(reqPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: sessionStorage.getItem("user"),
                Title: title,
                Content: content,
                Flair: selectedFlair
            })
        });

        setTitle("");
        setContent("");
        navigate("/forum");
    };

    return (
        <div className={styles.newThread}>
            <Header />

            <h3>Create a New Thread</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Enter a title"
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
                    placeholder="What would you like to ask?"
                    className={styles.inputField}
                    required
                />
                <button type="submit" className={styles.btn}>Create Thread</button>
            </form>
        </div>
    );
}

export default CreateThread;