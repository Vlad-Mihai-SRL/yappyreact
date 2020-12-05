import { useParams } from "react-router";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";
import Pusher from "pusher-js";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import MainNavbar from "./MainNavbar";
import "./ChatWindow.css";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
var lastarray;
export default function ChatWindow() {
	let { email } = useParams();
	const [receiverFullName, setReceiverFullName] = useState("");
	const [receiverID, setReceiverID] = useState("");
	const [receiverAnimal, setReceiverAnimal] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [messageArray, setMessageArray] = useState([]);
	function getUser() {
		Axios.get("http://35.195.94.48:8080/api/fetch-user/" + email).then(
			(response) => {
				console.log(response);
				setReceiverFullName(response.data.fullname);
				setLoaded(true);
				setReceiverID(response.data._id);
				setReceiverAnimal(response.data.pets[0]);
				var channelListen = response.data._id + userEmail;

				Pusher.logToConsole = true;
				var pusher = new Pusher("11189dc52230b411d1ea", {
					cluster: "eu",
				});

				var channel = pusher.subscribe(channelListen);
				channel.bind("newmessage", function (data) {
					setMessageArray([...lastarray, { content: data.message }]);
					console.log(lastarray);
					console.log(messageArray);
				});
			}
		);
		// ID lui Mailul Tau
	}
	function getMessages() {
		Axios.get(
			"http://35.195.94.48:8080/api/get-messages/" +
				userID +
				"/" +
				userEmail +
				"/" +
				email
		).then((response) => {
			console.log(response.data.list);
			console.log(response);
			setMessageArray(response.data.list);
			lastarray = response.data.list;
		});
	}
	if (loaded === false) {
		getUser();
		getMessages();
		console.log(messageArray);
	}
	return (
		<Container fluid className="vh-100 m-0 p-0">
			<MainNavbar />
			<img
				className="ml-auto mr-auto mt-3"
				src={"http://35.195.94.48:8080/public/users/" + email + "/0/pp.png"}
				height="150px"
				style={{
					height: "10vh",
					width: "10vh",
					borderRadius: "50%",
					display: "block",
				}}
			/>
			<h3 className="ml-auto mr-auto text-center">{receiverAnimal.name}</h3>
			<Container
				className="scroll-bar mb-5"
				id="style-2"
				style={{
					backgroundColor: "whitesmoke",
					height: "70%",
					overflowY: "scroll",
					scrollbarWidth: "none",
				}}
			>
				{messageArray.map((val) => (
					<p>{val.content}</p>
				))}
			</Container>
		</Container>
	);
}
