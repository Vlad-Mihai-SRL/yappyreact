import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import ReactPlayer from "react-player/lazy";

import "./Feed.css";
import Cookies from "js-cookie";
import Axios from "axios";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
export default function PostCard(props) {
	const [nrLikesStateful, setNrLikesStateful] = useState(props.nrlikes);
	function likePost() {
		Axios.post("http://35.195.94.48:8080/api/like-post", {
			postid: props._id,
			sessionid: userID,
			email: userEmail,
		}).then((response) => {
			if (response.data.reason === undefined) {
				console.log("ok");
				setNrLikesStateful(nrLikesStateful + 1);
			} else console.log("notok");
		});
	}
	var imgstring =
		"http://35.195.94.48:8080/public/users/" +
		props.userEmail +
		"/0/" +
		props._id +
		".png";
	var videostring =
		"http://35.195.94.48:8080/public/users/" +
		props.userEmail +
		"/0/" +
		props._id +
		".mp4";
	if (props.type === "Photo")
		return (
			<Card
				style={{ width: "95%" }}
				className="mt-5 mb-5 text-center ml-auto mr-auto variableWidth"
			>
				<Card.Img variant="top" src={imgstring} />
				<Card.Body>
					<Card.Title>{props.author}</Card.Title>
					<Card.Text>{props.content}</Card.Text>

					<Button variant="danger" className="mr-1" onClick={likePost}>
						{nrLikesStateful} Like
					</Button>
					<Button variant="danger" className="ml-1">
						Comment
					</Button>
				</Card.Body>
			</Card>
		);
	else
		return (
			<Card
				style={{ width: "95%" }}
				className="mt-5 mb-5 text-center ml-auto mr-auto variableWidth"
			>
				<Card.Body>
					<ReactPlayer
						className="ml-auto mr-auto "
						width="100%"
						url={videostring}
						controls="true"
						loop="true"
					/>
					<Card.Title>{props.author}</Card.Title>
					<Card.Text>{props.content}</Card.Text>
					<Button variant="danger" className="mr-1" onClick={likePost}>
						{nrLikesStateful} Like
					</Button>
					<Button variant="danger" className="ml-1">
						Comment
					</Button>
				</Card.Body>
			</Card>
		);
}
