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
const userEmail = Cookies.get("userEmail");
const userID = Cookies.get("sessionID");

export default function FriendCard(props) {
	var string = "/chatwindow/" + props.email;
	const [src, setSrc] = useState("");
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		Axios.get(
			"http://34.125.94.177:8080/api/has-new-messages/" +
				userID +
				"/" +
				userEmail +
				"/" +
				props.email
		).then((response) => {
			console.log(response);
			setLoaded(true);
			if (response.data.reason === undefined)
				if (response.data.result !== "no new messages")
					setSrc("../newnotif.png");
		});
	}, []);

	return (
		<Container
			className="ml-auto mr-auto text-center mt-3 pt-2 pb-2"
			style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
		>
			<Row>
				<Col className="mt-auto mb-auto" xl={4}>
					<img
						className="ml-auto mr-auto"
						src={
							"http://34.125.94.177:8080/public/users/" +
							props.email +
							"/0/pp_min.webp"
						}
						height="100px"
						style={{ height: "10vh", width: "10vh", borderRadius: "50%" }}
					/>
				</Col>
				<Col className="mt-auto mb-auto" xl={4}>
					<h5>{props.petname}</h5>
				</Col>
				<Col className="mt-auto mb-auto" xl={3}>
					<a
						href={string}
						className="mt-auto mb-auto ml-auto mr-auto"
						style={{
							backgroundColor: "#d90429",
							color: "white",
							padding: "5px",
							marginTop: "10px",
							display: "block",
							borderRadius: "10px",
						}}
					>
						{" "}
						Chat{" "}
					</a>
				</Col>
				<Col xl={1}>
					<img src={src} style={{ height: "30px" }} className="mt-2" />
				</Col>
			</Row>
		</Container>
	);
}
