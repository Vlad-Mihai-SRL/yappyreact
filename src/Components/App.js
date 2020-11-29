import "./App.css";
import Login from "./Login.js";
import "bootstrap/dist/css/bootstrap.css";
import Navbar_First from "./Navbar.js";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
const axios = require("axios").default;

function App() {
	const [isValid, changeValid] = useState(undefined);
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

	if (sessionID === undefined || isValid === false)
		return (
			<div className="App">
				<Navbar_First />
				<Login />
			</div>
		);
	else if (isValid === undefined) return <div className="App"></div>;
	else {
		return <h1> Halo </h1>;
	}
}

export default App;
