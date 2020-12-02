import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import Cookies from "js-cookie";
import Axios from "axios";
function postCard(props) {
	var imgstring =
		"http://35.195.94.48:8080/public/users/" +
		props.userEmail +
		"/0/" +
		props._id +
		".png";
	return (
		<Card
			style={{ width: "25rem" }}
			className="mt-5 mb-5 text-center ml-auto mr-auto"
		>
			<Card.Img variant="top" src={imgstring} />
			<Card.Body>
				<Card.Title>{props.author}</Card.Title>
				<Card.Text>{props.content}</Card.Text>
				<Button variant="danger" className="mr-1">
					Like
				</Button>
				<Button variant="danger" className="ml-1">
					Comment
				</Button>
			</Card.Body>
		</Card>
	);
}
export default function Feed() {
	const userEmail = Cookies.get("userEmail");
	const userID = Cookies.get("sessionID");
	const [loaded, setLoaded] = useState(false);
	const [PostsArray, setPostsArray] = useState([]);

	function getPosts() {
		Axios.get(
			"http://35.195.94.48:8080/api/get-feed/" + userEmail + "/" + userID
		).then((response) => {
			if (response.data.reason === undefined) {
				setPostsArray(response.data);
				setLoaded(true);
				console.log(response);
			} else console.log(response);
		});
	}
	if (loaded === false) getPosts();
	if (loaded === true)
		return (
			<>
				<Container className="ml-auto mr-auto mt-5 text-center">
					{PostsArray.map((val) =>
						postCard({
							author: val.author,
							content: val.content,
							userEmail: val.author,
							_id: val._id,
						})
					)}
				</Container>
			</>
		);
	else {
		return (
			<>
				<h1>Loading</h1>
			</>
		);
	}
}
