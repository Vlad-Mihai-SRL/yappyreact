import { useParams } from "react-router";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";
import Pusher from "pusher-js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import MainNavbar from "./MainNavbar";
import "./ChatWindow.css";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
const petname = Cookies.get("petname");
var myID;
var lastarray;
var loaded = false;
export default function ChatWindow() {
    let { email } = useParams();
    const myRef = useRef(null);
    const [receiverFullName, setReceiverFullName] = useState("");
    const [receiverID, setReceiverID] = useState("");
    const [receiverAnimal, setReceiverAnimal] = useState("");
    const [messageArray, setMessageArray] = useState([]);
    const [message, setMessage] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        Axios.post("http://34.125.94.177:8080/api/add-message", {
            senderemail: userEmail,
            sessionid: userID,
            receiveremail: email,
            senderid: myID,
            receiverid: receiverID,
            content: message,
        }).then((response) => {
            if (response.data.reason === undefined) {
                setMessageArray([
                    ...lastarray,
                    { content: message, receiver: email, date: new Date() },
                ]);
                lastarray.push({
                    content: message,
                    receiver: email,
                    date: new Date(),
                });
                myRef.current.scrollIntoView({ behavior: "smooth" });
            }
        });
        setMessage("");
    }
    function validateForm() {
        return message.length > 0;
    }
    function getUser() {
        Axios.get("http://34.125.94.177:8080/api/fetch-user/" + email).then(
            (response) => {
                setReceiverFullName(response.data.fullname);
                if (loaded === false) {
                    var channelListen = userEmail;

                    Pusher.logToConsole = true;
                    var pusher = new Pusher("11189dc52230b411d1ea", {
                        cluster: "eu",
                    });

                    var channel = pusher.subscribe(channelListen);
                    channel.bind("newmessage", function (data) {
                        if (data.sender === email) {
                            setMessageArray([
                                ...lastarray,
                                {
                                    content: data.message,
                                    receiver: userEmail,
                                    date: new Date(),
                                },
                            ]);
                            lastarray.push({
                                content: data.message,
                                receiver: userEmail,
                                date: new Date(),
                            });
                            Axios.post(
                                "http://34.125.94.177:8080/api/seen-message",
                                {
                                    messageid: data.mid,
                                    sessionid: userID,
                                    email: userEmail,
                                }
                            ).then((response) => {
                                console.log(response);
                                console.log(data);
                            });
                            myRef.current.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    });
                }
                loaded = true;
                setReceiverID(response.data._id);
                setReceiverAnimal(response.data.pets[0]);
            }
        );
        // ID lui Mailul Tau
    }
    function getOwnUser() {
        Axios.get("http://34.125.94.177:8080/api/fetch-user/" + userEmail).then(
            (response) => {
                myID = response.data._id;
            }
        );
    }
    function getMessages() {
        Axios.get(
            "http://34.125.94.177:8080/api/get-messages/" +
                userID +
                "/" +
                userEmail +
                "/" +
                email
        ).then((response) => {
            console.log(response.data.list);
            setMessageArray(response.data.list);
            lastarray = response.data.list;
            myRef.current.scrollIntoView({ behavior: "auto" });
        });
    }
    if (loaded === false) {
        getUser();
        getMessages();
        getOwnUser();
    }
    function handleClick() {
        myRef.current.scrollIntoView({ behavior: "auto" });
    }
    return (
        <Container fluid className="vh-100 m-0 p-0">
            <MainNavbar />
            <img
                className="ml-auto mr-auto mt-3"
                src={
                    "http://34.125.94.177:8080/public/users/" +
                    email +
                    "/0/pp_min.webp"
                }
                height="150px"
                style={{
                    height: "10vh",
                    width: "10vh",
                    borderRadius: "50%",
                    display: "block",
                }}
            />
            <h3 className="ml-auto mr-auto text-center">
                <a href={"/profile/" + email} style={{ color: "#d90429" }}>
                    {receiverAnimal.name}
                </a>
            </h3>
            <Container
                className="scroll-bar mb-2"
                id="style-2"
                style={{
                    backgroundColor: "whitesmoke",
                    height: "60%",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                }}
            >
                {messageArray.map((val) => {
                    let data = new Date(val.date);
                    if (val.receiver === userEmail)
                        return (
                            <>
                                <p className="mt-auto mb-auto">
                                    <strong style={{ fontSize: "1.2em" }}>
                                        {receiverAnimal.name}
                                    </strong>{" "}
                                    <span
                                        style={{
                                            color: "grey",
                                            fontSize: "0.9em",
                                        }}
                                        className="mt-auto mb-auto"
                                    >
                                        {data.toLocaleTimeString()}
                                    </span>
                                </p>
                                <p style={{ textAlign: "left", width: "75%" }}>
                                    {val.content}
                                </p>
                            </>
                        );
                    else
                        return (
                            <>
                                <p
                                    className="mt-auto mb-auto"
                                    style={{ textAlign: "right" }}
                                >
                                    <span
                                        style={{
                                            color: "grey",
                                            fontSize: "0.9em",
                                        }}
                                        className="mt-auto mb-auto"
                                    >
                                        {data.toLocaleTimeString()}
                                    </span>{" "}
                                    <strong style={{ fontSize: "1.2em" }}>
                                        {petname}
                                    </strong>
                                </p>{" "}
                                <p
                                    style={{
                                        marginLeft: "auto",
                                        textAlign: "right",
                                        width: "75%",
                                    }}
                                >
                                    {val.content}
                                </p>
                            </>
                        );
                })}
                <div ref={myRef}> </div>
            </Container>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row className="ml-auto mr-auto">
                        <Col sm={11}>
                            <div onClick={handleClick}>
                                <Form.Group size="lg">
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col sm={1} className="ml-auto mr-auto">
                            <Button
                                type="submit"
                                className="ml-auto mr-auto text-center"
                                disabled={!validateForm()}
                                style={{
                                    backgroundColor: "#d90429",
                                    border: "none",
                                }}
                            >
                                {" "}
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    );
}
