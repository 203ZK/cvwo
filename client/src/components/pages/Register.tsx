import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

import styles from "../../styles/login.module.css"

function Register() {
    interface User {
        "ID": BigInt,
        "CreatedAt": Date,
        "UpdatedAt": Date,
        "DeletedAt": Date | null,
        "Username": string
    }

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        // Get list of existing users to check that username has not already been created
        const getUsers = async () => {
            const reqPath = process.env.REACT_APP_SERVER_URL + "/get-users";
            const response = await fetch(reqPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            const userList = data.message.map((user: User) => user.Username);
            setUsers(userList);
        };
        getUsers();
    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check that user has not been created yet
        if (username in users) {
            alert("User already exists!");
        }

        // Post user
        const reqPath = process.env.REACT_APP_SERVER_URL + "/signup";
        await fetch(reqPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                Username: username 
            })
        });

        setUsername("");
        navigate("/");
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.title}>Register a Username</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Enter a new username:</label>
                <input 
                    id="username"
                    type="text"
                    name="username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    className={styles.userInput}
                    required
                />
                <button type="submit" className={styles.submitBtn}>Register</button>
                <button className={styles.returnBtn} onClick={() => navigate("/")}>Return to login page</button>
            </form>
        </div>
    );
}

export default Register