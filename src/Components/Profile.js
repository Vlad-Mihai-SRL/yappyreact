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
            .post("http://34.125.94.177:8080/api/modify-animal", {
                ind: 0,
                email: userEmail,
                id: userID,
                ownerdate: ownerDate,
                fullname: fullName,
                animal: animal,
            })
            .then(function (response) {
                if (response.data.reason === undefined) {
                    console.log(response);
                    Cookies.set("petname", animal.name);
                    window.location.reload(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    const [loaded, setLoaded] = useState(false);
    const [ownerDate, setOwnerDate] = useState("");
    const [animal, setAnimal] = useState({ name: "" });
    const [fullName, setFullName] = useState("");
    function getByEmail(email) {
        axios
            .get("http://34.125.94.177:8080/api/fetch-user/" + email)
            .then((response) => {
                console.log(response);
                setLoaded(true);
                setFullName(response.data.fullname);
                setOwnerDate(response.data.ownerdate);
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
            .post(
                "http://34.125.94.177:8080/api/modify-profilepic/" +
                    userID +
                    "/" +
                    userEmail +
                    "/0",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                if (response.reason === undefined) {
                    console.log(response);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000);
                } else {
                    console.log("ERROR");
                }
            });

        event.preventDefault();
    }
    function handleChangeCover(event) {
        const formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        formData.append("email", userEmail);
        formData.append("id", userID);
        formData.append("ind", "0");
        // Post the form, just make sure to set the 'Content-Type' header
        axios
            .post(
                "http://34.125.94.177:8080/api/change-profile-cover/" +
                    userID +
                    "/" +
                    userEmail +
                    "/0",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                if (response.reason === undefined) {
                    console.log(response);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000);
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
            <div>
                <MainNavbar />
                <img
                    width="100%"
                    src={
                        "http://34.125.94.177:8080/public/users/" +
                        userEmail +
                        "/0/cp_min.webp"
                    }
                    className="ml-auto mr-auto"
                    style={{
                        position: "absolute",
                        zIndex: "0",
                        display: "block",
                    }}
                />

                <Container
                    className="pl-5 pr-5 ml-auto mr-auto"
                    style={{
                        zIndex: "1000",
                        position: "relative",
                        display: "block",
                        marginTop: "30vh",
                    }}
                >
                    <div
                        className="Login mt-0 mb-3 text-center"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "30px",
                            display: "block",
                            boxShadow: "0px 10px 26px 0px rgba(0,0,0,0.75)",
                        }}
                    >
                        <img
                            src={
                                "http://34.125.94.177:8080/public/users/" +
                                userEmail +
                                "/0/pp_min.webp"
                            }
                            style={{
                                height: "15vh",
                                width: "15vh",
                                borderRadius: "50%",
                            }}
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
                        <label for="file" className="mt-0 mr-1">
                            {" "}
                            <Upload size={25} />
                            <br></br>
                            Change your profile picture
                        </label>
                        <input
                            type="file"
                            name="file2"
                            id="file2"
                            onChange={handleChangeCover}
                            className="inputfile"
                        />
                        <label for="file2" className="mt-0 ml-1">
                            {" "}
                            <Upload size={25} />
                            <br></br>
                            &nbsp;&nbsp;Change your cover picture
                        </label>
                        <h5
                            style={{
                                textAlign: "center",
                                display: "block",
                            }}
                            className="mt-3"
                        >
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
                                        setAnimal({
                                            ...animal,
                                            name: e.target.value,
                                        });
                                        console.log(animal);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="date">
                                <Form.Label>Owner's Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={ownerDate}
                                    onChange={(e) => {
                                        setOwnerDate(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="date">
                                <Form.Label>My date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={animal.date}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            date: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="petSpecies">
                                <Form.Label>My species </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={animal.species}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            species: e.target.value,
                                        });
                                    }}
                                >
                                    <option>Alpaca</option>{" "}
                                    <option>Bird</option> <option>Cat</option>{" "}
                                    <option>Dog</option> <option>Ferret</option>{" "}
                                    <option>Fish</option> <option>Frog</option>{" "}
                                    <option>Gecko</option>
                                    <option>Hedgehog</option>{" "}
                                    <option>Hermit</option>{" "}
                                    <option>Crab</option> <option>Horse</option>{" "}
                                    <option>Iguana</option>{" "}
                                    <option>Mantis</option>{" "}
                                    <option>Mouse</option> <option>Newt</option>{" "}
                                    <option>Pig</option> <option>Rabbit</option>
                                    <option>Salamander</option>{" "}
                                    <option>Sheep</option>{" "}
                                    <option>Snake</option>{" "}
                                    <option>Spider</option>{" "}
                                    <option>Turtle</option>{" "}
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="lg" controlId="Breed">
                                <Form.Label>My breed</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.breed}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            breed: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Sex">
                                <Form.Label>My sex</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.sex}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            sex: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="bodyType">
                                <Form.Label>My body type shape </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={animal.body}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            body: e.target.value,
                                        });
                                    }}
                                >
                                    <option>Very Thin</option>
                                    <option> Underweight </option>
                                    <option> Ideal </option>
                                    <option> Overweight </option>
                                    <option> Obese </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="lg" controlId="Color">
                                <Form.Label>My color</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.color}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            color: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Weight">
                                <Form.Label>My weight</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.weight}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            weight: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Diet">
                                <Form.Label>My diet</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.diet}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            diet: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Toys">
                                <Form.Label>My toys</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.toys}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            toys: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Personality">
                                <Form.Label>My personality</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.personality}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            personality: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Medical">
                                <Form.Label>My medical Issues</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.medical}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            medical: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Likes">
                                <Form.Label>I like</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.likes}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            likes: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="Dislikes">
                                <Form.Label>I dislike</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={animal.dislikes}
                                    onChange={(e) => {
                                        setAnimal({
                                            ...animal,
                                            dislikes: e.target.value,
                                        });
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
                        <p
                            style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: "10px",
                            }}
                        >
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
            </div>
        );
    }
}
