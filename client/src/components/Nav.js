import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import brand from '../images/brand.png';
import { useCookies } from "react-cookie";
import {useNavigate} from 'react-router-dom';

const styles = {
    color: {
        color: "rgb(115, 203, 0)"
    },
    black: {
        color: "black"
    }
};

const Navigation = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const authToken = cookies.AuthToken;

    // logout handleclick.
    let navigate = useNavigate();
    const LogOuthandleClick  =() =>{
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        window.location.href = "/";
        navigate('/');
    };

    const loginFlip = () =>{
        if(!authToken) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand={false}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src={brand} width="45" alt="honey logo"/>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title
                            id="offcanvasNavbarLabel">Honey</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link style={styles.color} href="/profile">Profile</Nav.Link>
                                <Nav.Link style={styles.color} href="/dash">Meet</Nav.Link>
                                <Nav.Link style={styles.color} href="/room">Chatroom</Nav.Link>
                                <Nav.Link style={styles.color} href="/DonationsPage">Donate 🍩</Nav.Link>
                                { loginFlip() ? "" :
                                    <Nav.Link onClick={LogOuthandleClick} style={styles.black}>Logout</Nav.Link>
                                }
                            </Nav>
                        </Offcanvas.Body>

                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    ) 
};

export default Navigation;