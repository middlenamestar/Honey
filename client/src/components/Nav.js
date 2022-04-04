import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';

const Navigation = ({ props, setShowBuild, showBuild, setIsSignUp }) => {
    const [cookies, setCookie, removeCookie] =useCookies(['user']);
    const handleClick = () => {
        setShowBuild(true)
        setIsSignUp(false)
    };

    let navigate = useNavigate();
    const LogOuthandleClick  =() =>{
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        navigate('/');
    };

    const authToken = cookies.AuthToken;
    const tabs = ['Dash', 'Room', 'Donations Page'];
    
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
                        BRAND
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
                                <Nav.Link href="/signup">Profile</Nav.Link>
                                <Nav.Link href="/dash">Match</Nav.Link>
                                <Nav.Link href="/room">Chatrooms</Nav.Link>
                                <Nav.Link href="/donations">Donate 🍩</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>

                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    ) 
};

export default Navigation;