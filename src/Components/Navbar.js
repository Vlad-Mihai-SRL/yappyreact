import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
export default function Navbar_First() {
    return (
        <Navbar
            expand="lg"
            style={{ backgroundColor: "#d90429", border: "none" }}
        >
            <Navbar.Brand href="/">
                <img
                    src="logopng.png"
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    alt="YappyPets"
                />
            </Navbar.Brand>
            <Navbar.Brand href="/" style={{ color: "white" }}>
                Yappy Pets
            </Navbar.Brand>
        </Navbar>
    );
}
