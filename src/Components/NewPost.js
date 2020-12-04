import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import Cookies from "js-cookie";
import "./NewPost.css";
import ReactPlayer from "react-player/lazy";
const axios = require("axios").default;
export default function NewPost() {
	const userEmail = Cookies.get("userEmail");
	const userID = Cookies.get("sessionID");
	const petname = Cookies.get("petname");
	const [post, setPost] = useState({
		typesx: "Photo",
		content: "",
		description: "",
	});
	const [image, setImage] = useState();
	const [previewURL, setPreviewURL] = useState();
	const [x, setX] = useState();
	function handleSubmit(event) {
		console.log(event);
		const formData = new FormData();
		formData.append("file", x);
		formData.append("email", userEmail);
		formData.append("id", userID);
		formData.append("typesx", post.typesx);
		formData.append("content", post.description);
		formData.append("ind", 0);
		formData.append("petname", petname);
		console.log(post.typesx);
		axios
			.post("http://35.195.94.48:8080/api/add-post", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				if (response.data.reason === undefined) {
					console.log(response);
					window.location.reload(false);
				} else {
					console.log(response);
					console.log("error");
				}
			});
		event.preventDefault();
	}
	function handleChange(event) {
		setX(event.target.files[0]);
		setPreviewURL(URL.createObjectURL(event.target.files[0]));
	}
	return (
		<>
			<Container>
				<Card className="text-center">
					<Card.Header>Write a new post!</Card.Header>
					<Card.Body>
						<Card.Title>
							What do you want to share with your friends?
						</Card.Title>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="text-center ml-auto">
								<Form.Label>Post type</Form.Label>
								<Form.Control
									as="select"
									className="text-center ml-auto mr-auto mb-0 mt-0"
									value={post.typesx}
									style={{ textAlign: "center", width: "30%" }}
									onChange={(e) => {
										setPost({ ...post, typesx: e.target.value });
										console.log(post);
									}}
								>
									<option className="text-center"> Photo </option>
									<option className="text-center"> Video </option>
								</Form.Control>
							</Form.Group>
							<Form.Group size="lg" controlId="name" className="m-0">
								<Form.Label>Post description</Form.Label>
								<Form.Control
									type="text"
									as="textarea"
									rows={5}
									placeholder="Write your description here!"
									value={post.description}
									onChange={(e) => {
										setPost({ ...post, description: e.target.value });
										console.log(post);
									}}
								/>
							</Form.Group>
							{post.typesx === "Photo" ? (
								<img src={previewURL} width="50%" className="m-2" />
							) : (
								<ReactPlayer
									className="ml-auto mr-auto mt-2 mb-2"
									width="100%"
									url={previewURL}
									controls="true"
									loop="true"
								/>
							)}
							<Form.Group>
								<Form.File
									type="file"
									name="file"
									id="file"
									onChange={handleChange}
									className="inputfile"
								/>
								<label for="file" className="mt-0">
									{" "}
									<Upload size={25} />
									<br></br>
									Upload your photo/video
								</label>
							</Form.Group>
							<Button variant="danger" type="submit">
								Post!
							</Button>
						</Form>

						<Card.Text>Click post when you finished!</Card.Text>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}
