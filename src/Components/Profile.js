import { useState } from "react";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
const axios = require("axios").default;

export default function Profile() {
	function handleSubmit(event) {
		axios
			.post("http://35.195.94.48:8080/api/modify-animal", {
				ind: 0,
				email: userEmail,
				id: userID,
				animal: animal,
			})
			.then(function (response) {
				if (response.data.reason === undefined) {
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
	function getByEmail(email) {
		axios
			.get("http://35.195.94.48:8080/api/fetch-user/" + email)
			.then((response) => {
				console.log(response);
				setLoaded(true);
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
					<div className="Login mt-5 text-center">
						<img
							src={
								"http://35.195.94.48:8080/public/users/" +
								userEmail +
								"/0/pp.png"
							}
							style={{ height: "15vh", width: "15vh", borderRadius: "50%" }}
						/>
						<br></br>
						<label> Change profile picture</label>
						<br></br>
						<input type="file" name="file" onChange={handleChange} />
						<h5 style={{ textAlign: "center" }} className="mb-3 mt-3">
							{animal.name}
						</h5>
						<Form onSubmit={handleSubmit}>
							<Form.Group size="lg" controlId="name">
								<Form.Label>Name</Form.Label>
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
								<Form.Label>Date of Birth</Form.Label>
								<Form.Control
									type="date"
									value={animal.date}
									onChange={(e) => {
										setAnimal({ ...animal, date: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Breed">
								<Form.Label>Breed</Form.Label>
								<Form.Control
									type="text"
									value={animal.breed}
									onChange={(e) => {
										setAnimal({ ...animal, breed: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Sex">
								<Form.Label>Sex</Form.Label>
								<Form.Control
									type="text"
									value={animal.sex}
									onChange={(e) => {
										setAnimal({ ...animal, sex: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Color">
								<Form.Label>Color</Form.Label>
								<Form.Control
									type="text"
									value={animal.color}
									onChange={(e) => {
										setAnimal({ ...animal, color: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Weight">
								<Form.Label>Weight</Form.Label>
								<Form.Control
									type="text"
									value={animal.weight}
									onChange={(e) => {
										setAnimal({ ...animal, weight: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Diet">
								<Form.Label>Diet</Form.Label>
								<Form.Control
									type="text"
									value={animal.diet}
									onChange={(e) => {
										setAnimal({ ...animal, diet: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Toys">
								<Form.Label>Toys</Form.Label>
								<Form.Control
									type="text"
									value={animal.toys}
									onChange={(e) => {
										setAnimal({ ...animal, toys: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Personality">
								<Form.Label>Personality</Form.Label>
								<Form.Control
									type="text"
									value={animal.personality}
									onChange={(e) => {
										setAnimal({ ...animal, personality: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Medical">
								<Form.Label>Medical</Form.Label>
								<Form.Control
									type="text"
									value={animal.medical}
									onChange={(e) => {
										setAnimal({ ...animal, medical: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Likes">
								<Form.Label>Likes</Form.Label>
								<Form.Control
									type="text"
									value={animal.likes}
									onChange={(e) => {
										setAnimal({ ...animal, likes: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="Dislikes">
								<Form.Label>Dislikes</Form.Label>
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
					</div>
				</Container>
			</>
		);
	}
}
