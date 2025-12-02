import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../redux/reducers/loginSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,NavLink } from 'react-router';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: any) => state.user.email);
  const handleLogout = () => {
    dispatch(logout({}));
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">newApp</Navbar.Brand>
        {/*to be fixed to use router */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/upload">Upload</Nav.Link>
          </Nav>

          <Nav>
            <Navbar.Text className="me-3">
              Signed in as: <span className="fw-bold">{email}</span>
            </Navbar.Text>  
            <Button 
              onClick={handleLogout} 
              variant="outline-light"
              size="sm"
            >
              Log Out
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;