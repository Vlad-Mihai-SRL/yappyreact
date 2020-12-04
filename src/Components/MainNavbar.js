import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FriendRequest from "./friendRequest";
import "./MainNavbar.css";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
export default function MainNavbar() {
	const [friendRequests, setFriendRequests] = useState([]);
	const [loaded, setLoaded] = useState(false);
	function getFriendRequests() {
		if (loaded === false)
			Axios.post("http://35.195.94.48:8080/api/get-friend-requests", {
				sessionid: userID,
				email: userEmail,
			}).then((response) => {
				console.log(response);
				if (response.data.reason === undefined) {
					setFriendRequests(response.data.frlist);
					setLoaded(true);
				} else console.log("no reqs");
			});
	}
	getFriendRequests();
	return (
		<Navbar
			sticky="top"
			expand="lg"
			style={{ backgroundColor: "#d90429", border: "none" }}
		>
			<Navbar.Brand href="/">
				<img src="logopng.png" height="40px" width="40px" />
			</Navbar.Brand>
			<Navbar.Brand href="/" style={{ color: "white" }}>
				Yappy Pets
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />

			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<DropdownButton
						id="dropdown-basic-button"
						className="dropItem w-100"
						size="lg"
						variant="light"
						style={{ fontSize: "0.7rem" }}
						title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Friend Requests&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
					>
						{friendRequests.map((val) => (
							<FriendRequest sender={val.frompetname} userEmail={val.email} />
						))}
					</DropdownButton>
					<Nav.Link
						href="/"
						style={{ color: "white" }}
						className="mt-auto mb-auto"
					>
						Home
					</Nav.Link>
					<Nav.Link
						href="/myprofile"
						style={{ color: "white" }}
						className="mt-auto mb-auto"
					>
						Profile
					</Nav.Link>
				</Nav>
				<Button
					className="text-center ml-2"
					variant="outline-light"
					size="sm"
					onClick={() => {
						Cookies.remove("sessionID");
						Cookies.remove("userEmail");
						Cookies.remove("petname");
						window.location.reload(false);
					}}
				>
					{" "}
					Log Out{" "}
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}
