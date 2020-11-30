import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";
const axios = require("axios").default;

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		axios
			.post("http://35.195.94.48:8080/api/login", {
				email: email,
				password: password,
			})
			.then(function (response) {
				console.log(response);
				if (response.data.id === undefined) {
					console.log("Error");
					setError("Wrong email or password, please try again!");
					console.log({ error });
				} else {
					Cookies.set("sessionID", response.data.id);
					Cookies.set("userEmail", email);
					window.location.reload(false);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		event.preventDefault();
	}

	return (
		<Container className="pl-5 pr-5">
			<div className="Login mt-5">
				<h1 style={{ textAlign: "center" }} className="mb-5">
					{" "}
					Yappy!{" "}
				</h1>
				<h5 style={{ textAlign: "center" }} className="mb-5">
					{" "}
					Your pet's social platform.{" "}
				</h5>
				<Form onSubmit={handleSubmit}>
					<Form.Group size="lg" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button
						block
						size="lg"
						type="submit"
						disabled={!validateForm()}
						className="btnSubmit mt-3"
						style={{
							backgroundColor: "#d90429",
							border: "none",
							outlineColor: "#d90429",
							outline: "none",
						}}
					>
						Login
					</Button>
				</Form>
				<p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
					{" "}
					{error}{" "}
				</p>
			</div>
		</Container>
	);
}
