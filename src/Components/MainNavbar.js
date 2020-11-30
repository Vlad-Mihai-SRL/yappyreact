import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
export default function MainNavbar() {
	return (
		<Navbar
			fixed="top"
			expand="lg"
			style={{ backgroundColor: "#d90429", border: "none" }}
		>
			<Navbar.Brand href="#home" style={{ color: "white" }}>
				Yappy Pets
			</Navbar.Brand>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link href="/" style={{ color: "white" }}>
						Home
					</Nav.Link>
					<Nav.Link href="/myprofile" style={{ color: "white" }}>
						Profile
					</Nav.Link>
				</Nav>
				<Button
					className="text-center "
					variant="outline-light"
					size="sm"
					onClick={() => {
						Cookies.remove("sessionID");
						Cookies.remove("userEmail");
						window.location.reload(false);
					}}
				>
					{" "}
					Log Out{" "}
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}