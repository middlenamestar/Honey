import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import './nav.css';

const styles = {
    bg: {
        // backgroundColor: "black"
    }
}

const Navigation = () => {

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
                        style={styles.bg}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title
                            id="offcanvasNavbarLabel">Honey</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/dash">Meet</Nav.Link>
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