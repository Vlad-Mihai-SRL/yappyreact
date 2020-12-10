import { useParams } from "react-router";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { useState, useRef, useEffect } from "react";
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
import PostCard from "./Post";
export default function UserProfilePage() {
    let { email } = useParams();
    const [PostsArray, setPostsArray] = useState([]);
    const [petName, setPetName] = useState("");
    useEffect(() => {
        Axios.get(
            "http://34.125.94.177:8080/api/get-user-profile/" + email
        ).then((response) => {
            setPostsArray(response.data.posts);
            setPetName(response.data.petname);
        });
    }, []);
    return (
        <>
            <MainNavbar />
            <img
                width="100%"
                src={
                    "http://34.125.94.177:8080/public/users/" +
                    email +
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
                className="ml-auto mr-auto  text-center"
                style={{
                    zIndex: "1000",
                    position: "relative",
                    display: "block",
                    marginTop: "30vh",
                }}
            >
                <div
                    className="pt-2 pb-2"
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
                            email +
                            "/0/pp_min.webp"
                        }
                        style={{
                            height: "15vh",
                            width: "15vh",
                            borderRadius: "50%",
                        }}
                        className="ml-auto mr-auto mb-2"
                    />
                    <h2 className="ml-auto mr-auto text-center">
                        {petName}'s profile
                    </h2>
                    {PostsArray.map((val) => (
                        <PostCard
                            author={val.author}
                            content={val.content}
                            userEmail={val.author}
                            type={val.typesx}
                            nrlikes={val.nrlikes}
                            likeArray={val.likes}
                            petname={val.petname}
                            commentArray={val.comments}
                            _id={val._id}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}
