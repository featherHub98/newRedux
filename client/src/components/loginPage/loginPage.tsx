// src/components/loginPage/loginPage.tsx
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import { login } from '../../redux/reducers/loginSlice.tsx';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
// REMOVE: import { authService } from '../../services/authService.ts'; // Auth logic is now on server

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // The client calls the new server login API endpoint
      const response = await axios.post('/api/login', { 
        email: email,
        password: pwd, // Send plaintext password to the server
      });

      // The server returns the token on success
      const { token } = response.data; 

      if (token) {
        dispatch(login({ 
          email: email, 
          token: token 
        }));
        navigate('/upload');
      } else {
        setError('Login successful, but no token received.');
      }
    } catch (error: any) {
      // Get error from server response
      const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '25rem' }} className="shadow-lg">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Welcome Back!</h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;