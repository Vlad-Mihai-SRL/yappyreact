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
import MainNavbar from "./MainNavbar";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
const userPetName = Cookies.get("petname");
function SearchCard(props) {
    const [text, setText] = useState("Sent request");
    function sendFriendRequest(event) {
        Axios.post("http://34.125.94.177:8080/api/add-friend-request", {
            fromemail: userEmail,
            sessionid: userID,
            fromind: "0",
            toind: "0",
            frompetname: userPetName,
            topetname: props.name,
            toemail: props.email,
        }).then((response) => {
            if (response.data.reason === undefined) {
                setText("Request sent!");
            }
        });
        event.preventDefault();
    }
    return (
        <Card
            className="p-5 m-2 ml-auto mr-auto text-center"
            style={{
                width: "70%",
                boxShadow: "0px 10px 26px 0px rgba(0,0,0,0.25)",
            }}
        >
            <div className="mt-auto mb-auto ml-auto mr-auto">
                <img
                    src={
                        "http://34.125.94.177:8080/public/users/" +
                        props.email +
                        "/0/pp_min.webp"
                    }
                    style={{
                        height: "15vh",
                        width: "15vh",
                        borderRadius: "50%",
                    }}
                    className="ml-auto mr-auto"
                />
                <h5 className="text-center ml-auto mr-auto">
                    {" "}
                    <a
                        href={"/profile/" + props.email}
                        style={{ color: "#d90429" }}
                    >
                        {props.name}
                    </a>
                </h5>
            </div>
            <Button
                onClick={sendFriendRequest}
                className="ml-auto mr-auto text-center"
                style={{ width: "8rem" }}
                variant="danger"
            >
                {text}
            </Button>
        </Card>
    );
}
export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [foundArray, setFoundArray] = useState([]);
    function searchForUser(event) {
        Axios.get(
            "http://34.125.94.177:8080/api/get-users?fullname=" +
                searchValue +
                "&petname=" +
                userPetName
        ).then((response) => {
            console.log(response);
            setFoundArray(response.data);
        });
        event.preventDefault();
    }
    return (
        <>
            <MainNavbar />
            <Container>
                <Form onSubmit={searchForUser}>
                    <Form.Group
                        size="lg"
                        className="mt-3 text-center ml-auto mr-auto"
                    >
                        <Form.Label className="text-center ml-auto mr-auto">
                            <h3 className="text-center ml-auto mr-auto">
                                Search by your friend's owner full name
                            </h3>
                        </Form.Label>
                        <Form.Control
                            className="ml-auto mr-auto text-center"
                            type="text"
                            style={{ borderRadius: "20px", width: "50%" }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button
                            variant="danger"
                            className="ml-auto mr-auto text-center mt-3"
                            type="submit"
                            style={{ borderRadius: "30px", width: "10rem" }}
                        >
                            Search
                        </Button>
                    </Form.Group>
                </Form>
                {foundArray.map((val) => (
                    <SearchCard name={val.pets[0].name} email={val.email} />
                ))}
            </Container>
        </>
    );
}
