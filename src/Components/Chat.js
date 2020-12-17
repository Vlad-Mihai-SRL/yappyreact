import Axios from "axios";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CaretRight } from "react-bootstrap-icons";
import MainNavbar from "./MainNavbar";
import Cookies from "js-cookie";
import FriendCard from "./FriendCard";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");

export default function Chat() {
    const [loaded, setLoaded] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [friendsArray, setFriendsArray] = useState([]);
    const [navDisplay, setNavDisplay] = useState("inline-block");
    function changeDisplay() {
        if (navDisplay === "inline-block") setNavDisplay("none");
        else setNavDisplay("inline-block");
    }
    useEffect(() => {
        Axios.get(
            "http://34.125.62.201:8080/api/get-friend-list/" +
                userID +
                "/" +
                userEmail
        ).then((response) => {
            setFriendsArray(response.data);
        });
    }, []);

    return (
        <>
            <MainNavbar />
            <Container className="ml-auto mr-auto">
                {friendsArray.map((val) => (
                    <FriendCard
                        petname={val.petname}
                        email={val.email}
                        id={val._id}
                    />
                ))}
            </Container>
        </>
    );
}
