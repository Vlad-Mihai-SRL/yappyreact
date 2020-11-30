import MainNavbar from "./MainNavbar";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Cookies from "js-cookie";

const axios = require("axios").default;
export default function Profile() {
	const [animal, setAnimal] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [incorrect, setIncorrect] = useState(false);
	function getByMail(email) {
		axios
			.get("http://35.195.94.48:8080/api/fetch-user/" + email)
			.then((response) => {
				if (response.data.reason === undefined) {
					setAnimal(response.data.pets[0]);
					setLoaded(true);
				} else {
					setIncorrect(true);
					setLoaded(true);
				}
			});
	}
	var userEmail = Cookies.get("userEmail");
	getByMail(userEmail);
	if (loaded === false) {
		return (
			<>
				<MainNavbar />
				<Container className="mt-5 text-center"></Container>
			</>
		);
	} else {
		if (incorrect === false) {
			return (
				<>
					<MainNavbar className="mb-5" />
					<Container
						className="mt-5 text-center"
						style={{ marginTop: "20%!important" }}
					>
						<img
							src={
								"http://35.195.94.48:8080/public/users/" +
								userEmail +
								"/0/pp.png"
							}
							alt="Profile picture"
							height="20%"
							width="20%"
						/>
						<h1>{animal.name}</h1>
					</Container>
				</>
			);
		} else {
			return <h1 style={{ textAlign: "center" }}> Page not found. Go back.</h1>;
		}
	}
}
