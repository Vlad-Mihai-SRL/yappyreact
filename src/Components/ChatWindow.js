import { useParams } from "react-router";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";
import Pusher from "pusher-js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import MainNavbar from "./MainNavbar";
import "./ChatWindow.css";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
const petname = Cookies.get("petname");
var myID;
var lastarray;
var loaded = false;
export default function ChatWindow() {
	let { email } = useParams();
	const myRef = useRef(null);
	const [receiverFullName, setReceiverFullName] = useState("");
	const [receiverID, setReceiverID] = useState("");
	const [receiverAnimal, setReceiverAnimal] = useState("");
	const [messageArray, setMessageArray] = useState([]);
	const [message, setMessage] = useState("");
	function handleSubmit(event) {
		event.preventDefault();
		Axios.post("http://35.195.94.48:8080/api/add-message", {
			senderemail: userEmail,
			sessionid: userID,
			receiveremail: email,
			senderid: myID,
			receiverid: receiverID,
			content: message,
		}).then((response) => {
			if (response.data.reason === undefined) {
				setMessageArray([...lastarray, { content: message, receiver: email }]);
				lastarray.push({ content: message, receiver: email });
				myRef.current.scrollIntoView({ behavior: "smooth" });
			}
		});
		setMessage("");
	}
	function getUser() {
		Axios.get("http://35.195.94.48:8080/api/fetch-user/" + email).then(
			(response) => {
				setReceiverFullName(response.data.fullname);
				if (loaded === false) {
					var channelListen = response.data._id + userEmail;

					Pusher.logToConsole = true;
					var pusher = new Pusher("11189dc52230b411d1ea", {
						cluster: "eu",
					});

					var channel = pusher.subscribe(channelListen);
					channel.bind("newmessage", function (data) {
						setMessageArray([
							...lastarray,
							{ content: data.message, receiver: userEmail },
						]);
						lastarray.push({ content: data.message, receiver: userEmail });
						myRef.current.scrollIntoView({ behavior: "smooth" });
					});
				}
				loaded = true;
				setReceiverID(response.data._id);
				setReceiverAnimal(response.data.pets[0]);
			}
		);
		// ID lui Mailul Tau
	}
	function getOwnUser() {
		Axios.get("http://35.195.94.48:8080/api/fetch-user/" + userEmail).then(
			(response) => {
				myID = response.data._id;
			}
		);
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
			setMessageArray(response.data.list);
			lastarray = response.data.list;
			myRef.current.scrollIntoView({ behavior: "auto" });
		});
	}
	if (loaded === false) {
		getUser();
		getMessages();
		getOwnUser();
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
				className="scroll-bar mb-2"
				id="style-2"
				style={{
					backgroundColor: "whitesmoke",
					height: "60%",
					overflowY: "scroll",
					scrollbarWidth: "none",
				}}
			>
				{messageArray.map((val) => {
					if (val.receiver === userEmail)
						return (
							<>
								<h5 style={{ textAlign: "left" }}> {receiverAnimal.name}</h5>
								<p style={{ textAlign: "left", width: "75%" }}>{val.content}</p>
							</>
						);
					else
						return (
							<>
								<h5 style={{ textAlign: "right" }}>{petname}</h5>
								<p
									style={{
										marginLeft: "auto",
										textAlign: "right",
										width: "75%",
									}}
								>
									{val.content}
								</p>
							</>
						);
				})}
				<div ref={myRef}> </div>
			</Container>
			<Container>
				<Form onSubmit={handleSubmit}>
					<Row className="ml-auto mr-auto">
						<Col sm={11}>
							<Form.Group size="lg">
								<Form.Control
									autoFocus
									type="text"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col sm={1} className="ml-auto mr-auto">
							<Button type="submit" className="ml-auto mr-auto text-center">
								{" "}
								Send
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</Container>
	);
}
