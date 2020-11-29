import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
export default function Navbar_First() {
	return (
		<Navbar expand="lg" style={{ backgroundColor: "#d90429", border: "none" }}>
			<Navbar.Brand href="#home" style={{ color: "white" }}>
				Yappy Pets
			</Navbar.Brand>
			<Navbar.Toggle
				aria-controls="basic-navbar-nav"
				style={{ color: "white" }}
			/>
			<Navbar.Collapse id="basic-navbar-nav" style={{ color: "white" }}>
				<Nav className="mr-auto">
					<Nav.Link href="#home" style={{ color: "white" }}>
						Login
					</Nav.Link>
					<Nav.Link href="#link" style={{ color: "white" }}>
						Register
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
