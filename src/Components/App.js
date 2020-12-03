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
import MainPage from "./MainPage";
import Profile from "./Profile";
import Privacy from "./Privacy";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const sessionID = Cookies.get("sessionID");
const userMail = Cookies.get("userEmail");
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

	if (sessionID !== undefined) isValidated(sessionID, userMail);
	console.log(sessionID, userMail);
	console.log(isValid);

	if (sessionID === undefined || isValid === false) {
		if (pageLogin === true)
			return (
				<Router>
					<Switch>
						<Route path="/privacy">
							<Privacy />
						</Route>
						<Route path="/">
							<div className="App">
								<Navbar_First />
								<>
									<Login />
									<Container className="text-center">
										<p>
											If you don't have an account &nbsp;
											<Button
												style={{ backgroundColor: "#d90429", border: "none" }}
												onClick={() => {
													setPageLogin(false);
												}}
											>
												Sign Up
											</Button>
										</p>
										<a
											href="/privacy"
											className="text-center"
											style={{ textAlign: "center" }}
										>
											Privacy
										</a>
									</Container>
								</>
							</div>
						</Route>
					</Switch>
				</Router>
			);
		else
			return (
				<Router>
					<Switch>
						<Route path="/privacy">
							<Privacy />
						</Route>
						<Route path="/">
							<div className="App">
								<Navbar_First />
								<>
									<Register />
								</>
							</div>
						</Route>
					</Switch>
				</Router>
			);
	} else if (isValid === undefined) return <div className="App"></div>;
	else {
		return (
			<Router>
				<Switch>
					<Route path="/myprofile">
						<Profile />
					</Route>
					<Route path="/privacy">
						<Privacy />
					</Route>
					<Route path="/">
						<MainPage />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
