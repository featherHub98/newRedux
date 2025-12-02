import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../redux/reducers/loginSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom'; 


interface UserState {
  email: string;
  isLoggedIn: boolean;
  token: string | null;
}


interface RootState {
  user: UserState;
}

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.user.email); 
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand 
            as={NavLink} 
            to="/dashboard" 
            className="fw-bold fs-4"
        >
          newApp
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
           
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            
            <Nav.Link as={NavLink} to="/upload">Upload</Nav.Link>
          </Nav>

          <Nav>
            <Navbar.Text className="me-3">
              Signed in as: <span className="fw-bold">{email || 'Guest'}</span>
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