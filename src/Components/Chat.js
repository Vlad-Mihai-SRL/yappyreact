import Axios from "axios";
import Pusher from "pusher-js";
import { useState } from "react";
import Sidebar from "react-sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CaretRight } from "react-bootstrap-icons";
import MainNavbar from "./MainNavbar";
import Cookies from "js-cookie";

const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
function FriendCard(props) {
	var string = "/chatwindow/" + props.email;
	return (
		<Container
			className="ml-auto mr-auto text-center mt-3 pt-2 pb-2"
			style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
		>
			<Row>
				<Col className="mt-auto mb-auto">
					<img
						className="ml-auto mr-auto"
						src={
							"http://34.125.94.177:8080/public/users/" +
							props.email +
							"/0/pp_min.webp"
						}
						height="100px"
						style={{ height: "10vh", width: "10vh", borderRadius: "50%" }}
					/>
				</Col>
				<Col className="mt-auto mb-auto">
					<h5>{props.petname}</h5>
				</Col>
				<Col className="mt-auto mb-auto">
					<a
						href={string}
						className="mt-auto mb-auto ml-auto mr-auto"
						style={{
							backgroundColor: "#d90429",
							color: "white",
							padding: "5px",
							marginTop: "10px",
							display: "block",
							borderRadius: "10px",
						}}
					>
						{" "}
						Chat{" "}
					</a>
				</Col>
			</Row>
		</Container>
	);
}

export default function Chat() {
	const [loaded, setLoaded] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [friendsArray, setFriendsArray] = useState([]);
	const [navDisplay, setNavDisplay] = useState("inline-block");
	function changeDisplay() {
		if (navDisplay === "inline-block") setNavDisplay("none");
		else setNavDisplay("inline-block");
	}
	function getAllFriends() {
		Axios.get(
			"http://34.125.94.177:8080/api/get-friend-list/" +
				userID +
				"/" +
				userEmail
		).then((response) => {
			setFriendsArray(response.data);
		});
	}
	if (loaded === false) {
		getAllFriends();
	}

	return (
		<>
			<MainNavbar />
			<Container className="ml-auto mr-auto">
				{friendsArray.map((val) => (
					<FriendCard petname={val.petname} email={val.email} id={val._id} />
				))}
			</Container>
		</>
	);
}
