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
    const [ownersDate, setOwnersDate] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petName, setPetName] = useState("");
    const [petSpecies, setPetSpecies] = useState("Dog");
    const [petDate, setPetDate] = useState("");
    const [petBody, setPetBody] = useState("Ideal");
    const [petTemperament, setPetTemperament] = useState("");
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
            petDate.length > 0
        );
    }

    function handleSubmit(event) {
        if (password !== confirmedPassword)
            setError("The password confirmation does not match");
        else
            axios
                .post("http://34.125.62.201:8080/api/add-user", {
                    email: email,
                    password: password,
                    fullname: fullName,
                    ownerdate: ownersDate, //new
                    pets: [
                        {
                            name: petName,
                            date: petDate,
                            species: petSpecies, //new
                            breed: petBreed,
                            color: petColor,
                            sex: petSex,
                            body: petBody, //new
                            weight: petWeight,
                            diet: petDiet,
                            toys: petToys,
                            personality: petPersonality,
                            temperament: petTemperament, // new
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
                        setError(
                            "There is already an account associated with your email."
                        );
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
                    Yappy Pets!{" "}
                </h1>
                <h5 style={{ textAlign: "center" }} className="mb-5">
                    {" "}
                    A pet's social platform. <br></br>No humans allowed.
                </h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>
                            My owner's email{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="FullName">
                        <Form.Label>
                            My owner's full name{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="ownersDate">
                        <Form.Label>
                            My owner's date of birth{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={ownersDate}
                            onChange={(e) => setOwnersDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>
                            Password{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmpassword">
                        <Form.Label>
                            Confirm Password{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmedPassword}
                            onChange={(e) =>
                                setConfirmedPassword(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petName">
                        <Form.Label>
                            My name{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petSpecies">
                        <Form.Label>
                            My species{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={petSpecies}
                            onChange={(e) => {
                                setPetSpecies(e.target.value);
                                console.log(e.target.value);
                            }}
                        >
                            <option>Alpaca</option> <option>Bird</option>{" "}
                            <option>Cat</option> <option>Dog</option>{" "}
                            <option>Ferret</option> <option>Fish</option>{" "}
                            <option>Frog</option> <option>Gecko</option>
                            <option>
                                Hedgehog
                            </option> <option>Hermit</option>{" "}
                            <option>Crab</option> <option>Horse</option>{" "}
                            <option>Iguana</option> <option>Mantis</option>{" "}
                            <option>Mouse</option> <option>Newt</option>{" "}
                            <option>Pig</option> <option>Rabbit</option>
                            <option>
                                Salamander
                            </option> <option>Sheep</option>{" "}
                            <option>Snake</option> <option>Spider</option>{" "}
                            <option>Turtle</option> <option>Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="petDate">
                        <Form.Label>
                            My date of birth (or aproximate){" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={petDate}
                            onChange={(e) => setPetDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petBreed">
                        <Form.Label>
                            My breed{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petBreed}
                            onChange={(e) => setPetBreed(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petSex">
                        <Form.Label>
                            My gender{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
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
                    <Form.Group size="lg" controlId="bodyType">
                        <Form.Label>
                            My body type shape{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawred.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={petBody}
                            onChange={(e) => {
                                setPetBody(e.target.value);
                                console.log(e.target.value);
                            }}
                        >
                            <option>Very Thin</option>

                            <option> Underweight </option>
                            <option> Ideal </option>
                            <option> Overweight </option>
                            <option> Obese </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="petColor">
                        <Form.Label>
                            My color{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petColor}
                            onChange={(e) => setPetColor(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group size="lg" controlId="petWeight">
                        <Form.Label>
                            My weight{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petWeight}
                            onChange={(e) => setPetWeight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petDiet">
                        <Form.Label>
                            My favorite food{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petDiet}
                            onChange={(e) => setPetDiet(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petToys">
                        <Form.Label>
                            My favorite toy to play with{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petToys}
                            onChange={(e) => setPetToys(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petPersonality">
                        <Form.Label>
                            My personality{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petPersonality}
                            onChange={(e) => setPetPersonality(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petPersonality">
                        <Form.Label>
                            My temperament{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petTemperament}
                            onChange={(e) => setPetTemperament(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group size="lg" controlId="petLikes">
                        <Form.Label>
                            What I like to do{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petLikes}
                            onChange={(e) => setPetLikes(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petDislikes">
                        <Form.Label>
                            What I don't like to do{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petDislikes}
                            onChange={(e) => setPetDislikes(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="petMedical">
                        <Form.Label>
                            My medical issues{" "}
                            <span style={{ color: "red" }}>
                                <img
                                    src="pawgrey.png"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={petMedical}
                            onChange={(e) => setPetMedical(e.target.value)}
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
                <p className="text-center mt-5">
                    <span style={{ color: "red" }}>
                        <img src="pawred.png" height="20px" width="20px" />
                    </span>{" "}
                    These fields are required
                </p>
                <p className="text-center">
                    <span style={{ color: "red" }}>
                        <img src="pawgrey.png" height="20px" width="20px" />
                    </span>{" "}
                    These fields are not required
                </p>

                <p
                    style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: "10px",
                    }}
                >
                    {" "}
                    {error}{" "}
                </p>
                <div style={{ marginBottom: "20%" }}></div>

                <Container className="text-center">
                    <a
                        href="/privacy"
                        className="text-center"
                        style={{ textAlign: "center" }}
                    >
                        Privacy
                    </a>
                    <p>Yappy Pets 2020</p>
                </Container>
            </div>
        </Container>
    );
}
