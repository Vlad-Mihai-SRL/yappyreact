import "./App.css";
import Login from "./Login.js";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar_First from "./Navbar.js";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Register from "./Register";
const axios = require("axios").default;

function App() {
	const [isValid, changeValid] = useState(undefined);
	const [pageLogin, setPageLogin] = useState(true);
	async function isValidated(sesID, mail) {
		axios
			.get("http://35.195.94.48:8080/api/check-session/" + sesID + "/" + mail)
			.then((response) => {
				if (response.data.reason === undefined) changeValid(true);
				else changeValid(false);
			});
	}
	const sessionID = Cookies.get("sessionID");
	const userMail = Cookies.get("userEmail");
	if (sessionID !== undefined) isValidated(sessionID, userMail);
	console.log(sessionID, userMail);
	console.log(isValid);

	if (sessionID === undefined || isValid === false) {
		if (pageLogin === true)
			return (
				<div className="App">
					<Navbar_First />
					<>
						<Login />
						<Container className="text-center">
							<p>
								If you don't have an account
								<Button
									style={{ backgroundColor: "#d90429", border: "none" }}
									onClick={() => {
										setPageLogin(false);
									}}
								>
									Sign Up
								</Button>
							</p>
						</Container>
					</>
				</div>
			);
		else
			return (
				<div className="App">
					<Navbar_First />
					<>
						<Register />
					</>
				</div>
			);
	} else if (isValid === undefined) return <div className="App"></div>;
	else {
		return <h1> Halo </h1>;
	}
}

export default App;
