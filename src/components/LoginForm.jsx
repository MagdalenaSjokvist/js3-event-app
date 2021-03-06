import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const ROOT_URL = "http://yoshi.willandskill.eu:8999/api/v1/"
const LOGIN_URL = `${ROOT_URL}auth/api-token-auth/`

export default function LoginForm() {
	const history = useHistory()

	const [email, setEmail] = useState("test.user@willandskill.se")
	const [password, setPassword] = useState("js-lesson-10")
	const { setToken } = useContext(UserContext)

	function login() {
		const payload = {
			email: email,
			password: password,
		}
		return fetch(LOGIN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((data) => {
				setToken(data.token)
				// console.log(data.token)
				history.push("/event-list")
			})
	}

	return (
		<div>
			<div>
				<label htmlFor="email">Email:</label>
				<input
					name="email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.currentTarget.value)}
				></input>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					name="password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.currentTarget.value)}
				></input>
			</div>
			<button onClick={login}>Login</button>
		</div>
	)
}
