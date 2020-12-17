import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from "axios";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
const petname = Cookies.get("petname");
export default function FriendRequest(props) {
    const [text, setText] = useState("Accept");

    function acceptReq() {
        console.log({
            fromemail: props.userEmail,
            sessionid: userID,
            fromind: "0",
            toind: "0",
            frompetname: props.sender,
            topetname: petname,
            toemail: userEmail,
            tor: "accepted",
        });
        Axios.post("http://34.125.62.201:8080/api/respond-to-friend-request", {
            fromemail: props.userEmail,
            sessionid: userID,
            fromind: "0",
            toind: "0",
            frompetname: props.sender,
            topetname: petname,
            toemail: userEmail,
            tor: "accepted",
        }).then((response) => {
            console.log(response);
            if (response.data.reason === undefined) {
                console.log("accepted");
                setText("Accepted");
            }
        });
    }
    return (
        <>
            <Container fluid className="p-2">
                <Row fluid className="text-center ml-auto mr-auto">
                    <Col sm="12" className="text-center">
                        <img
                            className="ml-auto mr-auto m-0 p-0"
                            src={
                                "http://34.125.62.201:8080/public/users/" +
                                props.userEmail +
                                "/0/pp_min.webp"
                            }
                            style={{
                                height: "4vh",
                                width: "4vh",
                                borderRadius: "50%",
                            }}
                        />
                    </Col>
                    <br></br>
                    <Col sm="12" className="mt-auto mb-auto">
                        <b>
                            <a
                                href={"/profile/" + props.userEmail}
                                style={{ color: "#d90429" }}
                            >
                                {props.sender}
                            </a>
                        </b>
                    </Col>

                    <br></br>
                    <Col sm="12">
                        <Button size="md" variant="danger" onClick={acceptReq}>
                            {" "}
                            {text}{" "}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
