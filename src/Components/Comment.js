import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import ReactPlayer from "react-player/lazy";

import "./Feed.css";
import Cookies from "js-cookie";
import Axios from "axios";
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");
export default function Comment(props) {
	return (
		<>
			<Card style={{ backgroundColor: "whitesmoke" }} className="m-1">
				<Card.Body>
					<b>{props.petname}</b>: {props.content}
				</Card.Body>
			</Card>
		</>
	);
}
