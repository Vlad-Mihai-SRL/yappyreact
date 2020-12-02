import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import MainNavbar from "./MainNavbar";
import NewPost from "./NewPost";
import Feed from "./Feed";
export default function MainPage() {
	return (
		<>
			<MainNavbar />
			<Container>
				<h1 className="text-center pl-5 pr-5 mt-5"> Welcome to Yappy! </h1>
				<NewPost />
				<Feed />
			</Container>
		</>
	);
}
