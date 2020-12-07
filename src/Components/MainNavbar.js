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
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./MainNavbar.css";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
export default function MainNavbar() {
	const [friendRequests, setFriendRequests] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [display, setDisplay] = useState("");
	function getFriendRequests() {
		if (loaded === false)
			Axios.post("http://34.125.94.177:8080/api/get-friend-requests", {
				sessionid: userID,
				email: userEmail,
			}).then((response) => {
				console.log(response);
				if (response.data.reason === undefined) {
					setFriendRequests(response.data.frlist);

					if (response.data.frlist.length !== 0)
						setDisplay(
							<img
								src="../newnotif.png"
								height="20px"
								className="m-0 p-0  mb-1"
								style={{ display: "inline" }}
							/>
						);
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
				<img src="../logopng.png" height="40px" width="40px" />
			</Navbar.Brand>
			<Navbar.Brand href="/" style={{ color: "white" }}>
				Yappy Pets
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />

			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<DropdownButton
						id="dropdown-basic-button"
						className="dropItem"
						size="md"
						variant="light"
						style={{
							fontSize: "0.7rem",
							backgroundColor: "white",
							borderRadius: "10px",
							display: "inline",
						}}
						title={
							<div
								className="ml-3 mr-3 mt-auto mb-auto"
								style={{ display: "inline" }}
							>
								<div
									className="mt-auto mb-auto"
									style={{ display: "inline-block" }}
								>
									&nbsp;&nbsp;Friend Requests&nbsp;&nbsp;{" "}
								</div>
								<div className="mt-auto mb-auto" style={{ display: "inline" }}>
									{display}
								</div>
							</div>
						}
						className="mt-auto mb-auto"
					>
						{friendRequests.map((val) => (
							<FriendRequest sender={val.frompetname} userEmail={val.email} />
						))}
					</DropdownButton>
					<Nav.Link
						href="/"
						style={{ color: "white" }}
						className="mt-auto mb-auto ml-2"
					>
						Home
					</Nav.Link>
					<Nav.Link
						href="/myprofile"
						style={{ color: "white" }}
						className="mt-auto mb-auto ml-2"
					>
						Profile
					</Nav.Link>
					<Nav.Link
						href="/search"
						style={{ color: "white" }}
						className="mt-auto mb-auto ml-2"
					>
						Search
					</Nav.Link>
					<Nav.Link
						href="/chat"
						style={{ color: "white" }}
						className="mt-auto mb-auto ml-2"
					>
						Friends
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
						window.location.href = "/";
					}}
				>
					{" "}
					Log Out{" "}
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}
