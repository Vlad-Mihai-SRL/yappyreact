import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import ReactPlayer from "react-player/lazy";
import PostCard from "./Post";

import "./Feed.css";
import Cookies from "js-cookie";
import Axios from "axios";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
export default function Feed() {
    const [loaded, setLoaded] = useState(false);
    const [PostsArray, setPostsArray] = useState([]);

    function getPosts() {
        Axios.get(
            "http://34.125.62.201:8080/api/get-feed/" + userEmail + "/" + userID
        ).then((response) => {
            if (response.data.reason === undefined) {
                setPostsArray(response.data);
                setLoaded(true);
                console.log(response);
            } else console.log(response);
        });
    }

    if (loaded === false) getPosts();
    if (loaded === true)
        return (
            <>
                <Container className="ml-auto mr-auto mt-5 text-center">
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
                </Container>
            </>
        );
    else {
        return (
            <>
                <h1>Loading</h1>
            </>
        );
    }
}
