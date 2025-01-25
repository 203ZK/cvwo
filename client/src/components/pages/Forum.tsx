import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

import ThreadCard from "../ThreadCard"
import Header from "../Header"

import styles from "../../styles/forum.module.css"

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

function Forum() {
    const navigate = useNavigate();

    const [threads, setThreads] = useState<Thread[]>([]);
    const [selectedThreads, setSelectedThreads] = useState<Thread[]>([]);
    const [searchedFlair, setSearchedFlair] = useState<string>("All");

    const flairsList = [
        "Admin", 
        "Lectures",
        "Tutorials/Assignments",
        "Exams",
        "All"
    ];

    useEffect(() => {
        // Get list of threads
        const getThreads = async () => {
            const reqPath = process.env.REACT_APP_SERVER_URL + "/get-threads";
            const response = await fetch(reqPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            const threadList = data.message;
            setThreads(threadList);
            setSelectedThreads(threadList);
        };

        getThreads();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFlair: string = e.target.value;

        if (selectedFlair == "All") {
            setSelectedThreads(threads);
            setSearchedFlair("All");
        } else {
            setSelectedThreads(threads.filter((thread) => thread.Flair == selectedFlair));
            setSearchedFlair(selectedFlair);
        }
    };

    return (
        <div className={styles.forum}>
            <Header />
            
            <div className={styles.actionBar}>
                <button onClick={() => navigate("/create-thread")} className={styles.btn}>
                    Create New Thread
                </button>

                <div className={styles.searchBar}>
                    <span>Search by flair: </span>
                    <select className={styles.flairSearch} onChange={handleSearch} defaultValue={searchedFlair}>
                        {flairsList.map((flair) => {
                            return <option key={flair} value={flair}>{flair}</option>
                        })}
                    </select>
                </div>
            </div>

            <p className={styles.results}>
                {selectedThreads.length} result{selectedThreads.length != 1 ? "s" : ""} found
            </p>

            {selectedThreads.map((thread) => {
                return <ThreadCard key={String(thread.ID)} thread={thread} />
            })}

        </div>
    );
}

export default Forum