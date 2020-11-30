import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
const axios = require("axios").default;

export default function Register(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [petBreed, setPetBreed] = useState("");
	const [petName, setPetName] = useState("");
	const [petDate, setPetDate] = useState("");
	const [petSex, setPetSex] = useState("Male");
	const [petColor, setPetColor] = useState("");
	const [petWeight, setPetWeight] = useState("");
	const [petDiet, setPetDiet] = useState("");
	const [petToys, setPetToys] = useState("");
	const [petPersonality, setPetPersonality] = useState("");
	const [petMedical, setPetMedical] = useState("");
	const [petLikes, setPetLikes] = useState("");
	const [petDislikes, setPetDislikes] = useState("");
	const [error, setError] = useState("");
	const [fullName, setFullName] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	function validateForm() {
		return (
			email.length > 0 &&
			password.length > 0 &&
			petBreed.length > 0 &&
			petName.length > 0 &&
			petColor.length > 0 &&
			petDate.length > 0 &&
			petWeight.length > 0 &&
			petDiet.length > 0 &&
			petToys.length > 0 &&
			petPersonality.length > 0 &&
			petMedical.length > 0 &&
			petLikes.length > 0 &&
			petDislikes.length > 0
		);
	}

	function handleSubmit(event) {
		if (password !== confirmedPassword)
			setError("The password confirmation does not match");
		else
			axios
				.post("http://35.195.94.48:8080/api/add-user", {
					email: email,
					password: password,
					fullname: fullName,
					pets: [
						{
							name: petName,
							date: petDate,
							breed: petBreed,
							color: petColor,
							sex: petSex,
							weight: petWeight,
							diet: petDiet,
							toys: petToys,
							personality: petPersonality,
							medical: petMedical,
							likes: petLikes,
							dislikes: petDislikes,
						},
					],
				})
				.then(function (response) {
					console.log(response);
					if (response.data.reason !== undefined) {
						console.log("Error");
						setError("There is already an account associated with your email.");
						console.log({ error });
					} else {
						window.location.reload(false);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		event.preventDefault();
	}

	return (
		<Container className="pl-5 pr-5">
			<div className="Login mt-5">
				<h1 style={{ textAlign: "center" }} className="mb-5">
					{" "}
					Yappy!{" "}
				</h1>
				<h5 style={{ textAlign: "center" }} className="mb-5">
					{" "}
					Your pet's social platform.{" "}
				</h5>
				<Form onSubmit={handleSubmit}>
					<Form.Group size="lg" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="FullName">
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type="text"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							value={confirmedPassword}
							onChange={(e) => setConfirmedPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petName">
						<Form.Label>Pet Name</Form.Label>
						<Form.Control
							type="text"
							value={petName}
							onChange={(e) => setPetName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petDate">
						<Form.Label>Pet Date of Birth</Form.Label>
						<Form.Control
							type="date"
							value={petDate}
							onChange={(e) => setPetDate(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petBreed">
						<Form.Label>Pet Breed</Form.Label>
						<Form.Control
							type="text"
							value={petBreed}
							onChange={(e) => setPetBreed(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petSex">
						<Form.Label>Pet Sex</Form.Label>
						<Form.Control
							as="select"
							value={petSex}
							onChange={(e) => {
								setPetSex(e.target.value);
								console.log(e.target.value);
							}}
						>
							<option> Male </option>
							<option> Female </option>
						</Form.Control>
					</Form.Group>
					<Form.Group size="lg" controlId="petColor">
						<Form.Label>Pet Color</Form.Label>
						<Form.Control
							type="text"
							value={petColor}
							onChange={(e) => setPetColor(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petWeight">
						<Form.Label>Pet Weight</Form.Label>
						<Form.Control
							type="text"
							value={petWeight}
							onChange={(e) => setPetWeight(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petDiet">
						<Form.Label>Pet Diet</Form.Label>
						<Form.Control
							type="text"
							value={petDiet}
							onChange={(e) => setPetDiet(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petToys">
						<Form.Label>Pet Toys</Form.Label>
						<Form.Control
							type="text"
							value={petToys}
							onChange={(e) => setPetToys(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petPersonality">
						<Form.Label>Pet Personality</Form.Label>
						<Form.Control
							type="text"
							value={petPersonality}
							onChange={(e) => setPetPersonality(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petMedical">
						<Form.Label>Pet Medical</Form.Label>
						<Form.Control
							type="text"
							value={petMedical}
							onChange={(e) => setPetMedical(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petLikes">
						<Form.Label>Pet Likes</Form.Label>
						<Form.Control
							type="text"
							value={petLikes}
							onChange={(e) => setPetLikes(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="petDislikes">
						<Form.Label>Pet Dislikes</Form.Label>
						<Form.Control
							type="text"
							value={petDislikes}
							onChange={(e) => setPetDislikes(e.target.value)}
						/>
					</Form.Group>
					<Button
						block
						size="lg"
						type="submit"
						disabled={!validateForm()}
						className="btnSubmit mt-3"
						style={{
							backgroundColor: "#d90429",
							border: "none",
							outlineColor: "#d90429",
							outline: "none",
						}}
					>
						Register
					</Button>
				</Form>
				<p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
					{" "}
					{error}{" "}
				</p>
				<div style={{ marginBottom: "20%" }}></div>
				<Container className="text-center">
					<p>Yappy Pets 2020</p>
				</Container>
			</div>
		</Container>
	);
}
