import React from "react"
import { useState } from 'react'
import { useNavigate, Link } from "react-router"

import styles from "../../styles/login.module.css"

function Login() {
	interface User {
		"token": string,
		"username": string
	}

	const navigate = useNavigate();

	const [username, setUsername] = useState<string>("");

	const loginAndRedirect = (userData: User) => {
		// Store user particulars in session
		sessionStorage.setItem("token", userData.token);
		sessionStorage.setItem("user", userData.username);
		navigate("/forum");
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Fetch token and username from backend
		const reqPath = process.env.REACT_APP_SERVER_URL + "/login"
		const response = await fetch(reqPath, {
			method: "POST",
			headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: username })
		});
		const data = await response.json();
		setUsername("");

		if ("error" in data) {
			alert("Hmm, seems like this username doesn't exist!");
		} else {
			loginAndRedirect(data);
		}
	};

	return (
		<div className={styles.login}>
			<h1 className={styles.title}>Welcome to Forum!</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Enter your username:</label>
				<input
					id="username"
					type="text" 
					name="username"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					className={styles.userInput}
					required
				/>
				<button type="submit" className={styles.submitBtn}>Login</button>
			</form>

			<p className={styles.register}>New to Forum? Click <Link to="/register">here</Link> to register.</p>
		</div>
	);
}

export default Login