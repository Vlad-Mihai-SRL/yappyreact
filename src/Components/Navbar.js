import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
export default function Navbar_First() {
	return (
		<Navbar expand="lg" style={{ backgroundColor: "#d90429", border: "none" }}>
			<Navbar.Brand href="#home" style={{ color: "white" }}>
				Yappy Pets
			</Navbar.Brand>
		</Navbar>
	);
}
