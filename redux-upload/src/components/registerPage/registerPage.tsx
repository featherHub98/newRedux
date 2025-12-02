import React,{useState} from 'react'
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import {hashPasswords} from '../../services/hashPassword';
import axios from 'axios';
export default function RegisterPage() {
    interface FormData {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
      }
       const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        // Hash the password before storing
        hashPasswords(password).then((hashedPwd:string) => {
          const newUser = {
            password: hashedPwd,
            email: email,
            name: name
          };
          axios.post('/data.json', newUser)
            .then(() => {
              alert("Registration successful!");
            })
            .catch((error) => {
              console.error("There was an error registering the user!", error);
            });
      })}
  return (
    <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
 
}
