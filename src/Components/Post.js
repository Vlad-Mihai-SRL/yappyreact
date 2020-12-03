import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import ReactPlayer from "react-player/lazy";
import Comment from "./Comment";
import "./Feed.css";
import Cookies from "js-cookie";
import Axios from "axios";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
const userPetName = Cookies.get("petname");

export default function PostCard(props) {
	const [nrLikesStateful, setNrLikesStateful] = useState(props.nrlikes);
	const [likeArray, setLikeArray] = useState(props.likeArray);
	const [comment, setComment] = useState("");
	const [stateComments, setStateComments] = useState([]);
	const [errorText, setErrorText] = useState("");
	const [commentsCards, setCommentsCards] = useState([]);
	const [lastInd, setLastInd] = useState(1);
	function likePost() {
		Axios.post("http://35.195.94.48:8080/api/like-post", {
			postid: props._id,
			sessionid: userID,
			email: userEmail,
		}).then((response) => {
			if (response.data.reason === undefined) {
				console.log("ok");
				setNrLikesStateful(nrLikesStateful + 1);
				setLikeArray(...likeArray, userEmail);
			} else console.log("notok");
		});
	}
	function sendComment(event) {
		props.commentArray.push({ petname: userPetName, content: comment });
		Axios.post("http://35.195.94.48:8080/api/add-comment", {
			postid: props._id,
			sessionid: userID,
			email: userEmail,
			petname: userPetName,
			ind: "0",
			content: comment,
		}).then((response) => {
			if (response.data.reason === undefined) {
				console.log("ok");
			}
			console.log(response);
		});
		event.preventDefault();
	}
	function showMore() {
		var auxArray = stateComments;
		var i;
		console.log(lastInd);
		if (props.commentArray[lastInd] !== undefined) {
			for (i = 0; i <= 4; i++) {
				if (props.commentArray[lastInd + i] !== undefined)
					auxArray.push(props.commentArray[lastInd + i]);
			}
			setLastInd(lastInd + 5);
			console.log(auxArray);
			setStateComments(auxArray);
			setCommentsCards(
				stateComments.map((val) => (
					<Comment content={val.content} petname={val.petname} />
				))
			);
		} else setErrorText("No more comments");
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
			<>
				<Card
					style={{ width: "95%" }}
					className="mt-5 mb-5 text-center ml-auto mr-auto variableWidth"
				>
					<Card.Img variant="top" src={imgstring} />
					<Card.Body>
						<Card.Title>{props.petname}</Card.Title>
						<Card.Text>{props.content}</Card.Text>
						{likeArray.includes(userEmail) ? (
							<Button variant="danger" className="mr-1" onClick={likePost}>
								{nrLikesStateful} Like
							</Button>
						) : (
							<Button
								variant="danger"
								className="mr-1"
								onClick={likePost}
								style={{ opacity: 0.8 }}
							>
								{nrLikesStateful} Like
							</Button>
						)}
						<Form onSubmit={sendComment}>
							<Form.Group size="lg" className="mt-3">
								<Form.Label>
									<span style={{ color: "red" }}>
										<img src="pawred.png" height="20px" width="20px" />
									</span>{" "}
									Write your comment here{" "}
									<span style={{ color: "red" }}>
										<img src="pawred.png" height="20px" width="20px" />
									</span>
								</Form.Label>
								<Form.Control
									type="text"
									style={{ borderRadius: "20px" }}
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</Form.Group>
							<Button variant="danger" className="ml-1" type="submit">
								Comment
							</Button>
						</Form>
					</Card.Body>
					<p class="text-center mt-1">Top comment:</p>
					{props.commentArray[0] === undefined ? (
						<p> No comments yet :) </p>
					) : (
						<Comment
							content={props.commentArray[0].content}
							petname={props.commentArray[0].petname}
						/>
					)}
					{commentsCards}
					<Button onClick={showMore} variant="danger" className="m-1">
						{" "}
						Show More{" "}
					</Button>
				</Card>
			</>
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
					<Form onSubmit={sendComment}>
						<Form.Group size="lg" className="mt-3">
							<Form.Label>
								<span style={{ color: "red" }}>
									<img src="pawred.png" height="20px" width="20px" />
								</span>{" "}
								Write your comment here{" "}
								<span style={{ color: "red" }}>
									<img src="pawred.png" height="20px" width="20px" />
								</span>
							</Form.Label>
							<Form.Control
								type="text"
								style={{ borderRadius: "20px" }}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</Form.Group>
						<Button variant="danger" className="ml-1" type="submit">
							Comment
						</Button>
					</Form>
				</Card.Body>
				<p class="text-center mt-1">Top comment:</p>
				{props.commentArray[0] === undefined ? (
					<p> No comments yet :) </p>
				) : (
					<Comment
						content={props.commentArray[0].content}
						petname={props.commentArray[0].petname}
					/>
				)}
				{commentsCards}
				<Button onClick={showMore} variant="danger" className="m-1">
					{" "}
					Show More{" "}
				</Button>
			</Card>
		);
}
