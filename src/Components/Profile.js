import { useState } from "react";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import "./Profile.css";
import { Upload } from "react-bootstrap-icons";
const axios = require("axios").default;

export default function Profile() {
	function handleSubmit(event) {
		axios
			.post("http://35.195.94.48:8080/api/modify-animal", {
				ind: 0,
				email: userEmail,
				id: userID,
				fullname: fullName,
				animal: animal,
			})
			.then(function (response) {
				if (response.data.reason === undefined) {
					console.log(response);
					window.location.reload(false);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		event.preventDefault();
	}

	const [loaded, setLoaded] = useState(false);
	const [animal, setAnimal] = useState({ name: "" });
	const [fullName, setFullName] = useState("");
	function getByEmail(email) {
		axios
			.get("http://35.195.94.48:8080/api/fetch-user/" + email)
			.then((response) => {
				console.log(response);
				setLoaded(true);
				setFullName(response.data.fullname);
				setAnimal(response.data.pets[0]);
			});
	}
	const userEmail = Cookies.get("userEmail");
	const userID = Cookies.get("sessionID");
	function handleChange(event) {
		const formData = new FormData();
		formData.append("avatar", event.target.files[0]);
		formData.append("email", userEmail);
		formData.append("id", userID);
		formData.append("ind", "0");
		// Post the form, just make sure to set the 'Content-Type' header
		axios
			.post("http://35.195.94.48:8080/api/modify-profilepic", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				if (response.reason === undefined) {
					console.log(response);
					window.location.reload(false);
				} else {
					console.log("ERROR");
				}
			});

		event.preventDefault();
	}
	if (loaded === false) {
		getByEmail(userEmail);
		return <Container></Container>;
	} else {
		return (
			<>
				<MainNavbar />
				<Container className="pl-5 pr-5">
					<div className="Login mt-0 mb-3 text-center ">
						<img
							src={
								"http://35.195.94.48:8080/public/users/" +
								userEmail +
								"/0/pp.png"
							}
							style={{ height: "15vh", width: "15vh", borderRadius: "50%" }}
						/>
						<br></br>

						<br></br>
						<input
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
							Change your profile picture
						</label>
						<h5 style={{ textAlign: "center" }} className="mt-3">
							{animal.name}
						</h5>
						<Form onSubmit={handleSubmit}>
							<Form.Group size="lg" controlId="fullName">
								<Form.Label>Owner's Full Name</Form.Label>
								<Form.Control
									type="text"
									value={fullName}
									onChange={(e) => {
										setFullName(e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="name">
								<Form.Label>My name</Form.Label>
								<Form.Control
									type="text"
									value={animal.name}
									onChange={(e) => {
										setAnimal({ ...animal, name: e.target.value });
										console.log(animal);
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="date">
								<Form.Label>My date of Birth</Form.Label>
								<Form.Control
									type="date"
									value={animal.date}
									onChange={(e) => {
										setAnimal({ ...animal, date: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Breed">
								<Form.Label>My breed</Form.Label>
								<Form.Control
									type="text"
									value={animal.breed}
									onChange={(e) => {
										setAnimal({ ...animal, breed: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Sex">
								<Form.Label>My sex</Form.Label>
								<Form.Control
									type="text"
									value={animal.sex}
									onChange={(e) => {
										setAnimal({ ...animal, sex: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Color">
								<Form.Label>My color</Form.Label>
								<Form.Control
									type="text"
									value={animal.color}
									onChange={(e) => {
										setAnimal({ ...animal, color: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Weight">
								<Form.Label>My weight</Form.Label>
								<Form.Control
									type="text"
									value={animal.weight}
									onChange={(e) => {
										setAnimal({ ...animal, weight: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Diet">
								<Form.Label>My diet</Form.Label>
								<Form.Control
									type="text"
									value={animal.diet}
									onChange={(e) => {
										setAnimal({ ...animal, diet: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Toys">
								<Form.Label>My toys</Form.Label>
								<Form.Control
									type="text"
									value={animal.toys}
									onChange={(e) => {
										setAnimal({ ...animal, toys: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Personality">
								<Form.Label>My personality</Form.Label>
								<Form.Control
									type="text"
									value={animal.personality}
									onChange={(e) => {
										setAnimal({ ...animal, personality: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Medical">
								<Form.Label>My medical Issues</Form.Label>
								<Form.Control
									type="text"
									value={animal.medical}
									onChange={(e) => {
										setAnimal({ ...animal, medical: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Likes">
								<Form.Label>I like</Form.Label>
								<Form.Control
									type="text"
									value={animal.likes}
									onChange={(e) => {
										setAnimal({ ...animal, likes: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Dislikes">
								<Form.Label>I dislike</Form.Label>
								<Form.Control
									type="text"
									value={animal.dislikes}
									onChange={(e) => {
										setAnimal({ ...animal, dislikes: e.target.value });
									}}
								/>
							</Form.Group>
							<Button
								block
								size="lg"
								type="submit"
								className="btnSubmit mt-3"
								style={{
									backgroundColor: "#d90429",
									border: "none",
									outlineColor: "#d90429",
									outline: "none",
								}}
							>
								Confirm Changes
							</Button>
						</Form>
						<p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
							{" "}
						</p>
						<div style={{ marginBottom: "20%" }}></div>
						<Container className="text-center">
							<p>Yappy Pets 2020</p>
						</Container>
						<a href="/privacy" className="text-center">
							Privacy
						</a>
					</div>
				</Container>
			</>
		);
	}
}
