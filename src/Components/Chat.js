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
			className="ml-auto mr-auto text-center mt-3"
			style={{ backgroundColor: "whitesmoke" }}
		>
			<h5>{props.petname}</h5>
			<Row>
				<img
					className="ml-auto mr-auto"
					src={
						"http://35.195.94.48:8080/public/users/" + props.email + "/0/pp.png"
					}
					height="150px"
					style={{ height: "15vh", width: "15vh", borderRadius: "50%" }}
				/>
			</Row>
			<Row>
				<a
					href={string}
					className="mt-2 mb-2 ml-auto mr-auto"
					style={{
						backgroundColor: "#d90429",
						color: "white",
						padding: "5px",
						marginTop: "10px",
						borderRadius: "10px",
					}}
				>
					{" "}
					Chat{" "}
				</a>
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
			"http://35.195.94.48:8080/api/get-friend-list/" + userID + "/" + userEmail
		).then((response) => {
			setFriendsArray(response.data);
		});
	}
	if (loaded === false) {
		getAllFriends();
		Pusher.logToConsole = true;

		var pusher = new Pusher("11189dc52230b411d1ea", {
			cluster: "eu",
		});

		var channel = pusher.subscribe("coaieverzi");
		setLoaded(true);
		channel.bind("newmessage", function (data) {
			console.log(JSON.stringify(data));
		});
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
