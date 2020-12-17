import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "./Navbar";
export default function Privacy() {
    return (
        <>
            <Navbar />
            <Container className="mt-3 pl-5 pr-5">
                <h1 style={{ color: "red" }}> About </h1>
                <p>
                    Yappy Pets is a profile platform designed for pets only,
                    with the goal to help change the world one pet at a time
                    This guide provides useful tips and guidelines on getting
                    the best from the Yappy Pets platform. Rregistered pets can
                    share pages, groups, profile stories, photos and videos
                    online with other pets, family and friends. Pets can also
                    follow other pets’ stories, search for health, medical and
                    education on how to get better care. At the Yappy Pets
                    platform, we are constantly evolving, solving problems and
                    working together to connect pets all over the world through
                    our apps and technologies. Yappy Pets is located in
                    Henderson, Nevada USA. <br></br>Have fun and enjoy with
                    Yappy Pets.
                </p>
                <h1 style={{ color: "red" }}> How to Register </h1>
                <p>
                    All fields with{" "}
                    <img src="pawred.png" height="20px" width="20px" /> must be
                    filled. The picture on the profile should be square to
                    maintain the proportions.
                </p>
                <h1 style={{ color: "red" }}>Create Page</h1>
                <p>
                    Page name, information category and description are
                    required. Choose a category that describes what type of
                    topic the page represents. Images, contact info and other
                    details can be added after the page is create
                </p>
                <h1 style={{ color: "red" }}>Privacy</h1>
                <h3>Community Standards</h3>
                <p>
                    We recognize how important it is for Yappy Pets to be a
                    place where pets feel empowered to share, communicate with
                    others and create a place for expression. Every day
                    thousands of new pets are looking for help and better care.
                    Yappy Pets is here to find everyone and provide a community
                    to connect with the ones that need immediate attention. We
                    want the pets themselves to be able to express openly about
                    the issues that matter to them the most.
                </p>
                <h3> Fraud and Deception </h3>
                <p>
                    Humans are removed immediately from the platform. Pictures
                    videos or content about humans is not allowed. In an effort
                    to prevent and disrupt harmful or fraudulent activity, we
                    remove content aimed at deliberately deceiving our members
                    to gain an unfair advantage or deprive another of money,
                    property, or legal rights. We allow pets to raise awareness
                    and educate others, as well as condemn fraudulent activities
                    using our platform. Please notify us if you see anything
                    that does not belong to protect the platform and our
                    members.
                </p>
                <h1 style={{ color: "red" }}>Q&A</h1>
                <p>
                    1. Q. Can I use pictures or video of humans on the Yappy
                    Pets website?
                    <br></br>
                    A. No, Yappy Pets is for your pets use only. No humans are
                    allowed on this site.<br></br>
                    2. Q. How many profiles can I have?<br></br>
                    A. You can make as many pet profiles according to the number
                    of pets in a family.<br></br>
                    3. Q. Can I make a profile for wild animals?<br></br>
                    A. Yes, if it is under watch or care.<br></br>
                </p>
                <h1 style={{ color: "red" }}>Contact:</h1>
                <p>
                    11 West Horizon Ridge Pkwy Henderson, NV 89012 <br></br>
                    YappyPetsHelp@gmail.com<br></br>
                    yappypets.com
                </p>
            </Container>
        </>
    );
}
