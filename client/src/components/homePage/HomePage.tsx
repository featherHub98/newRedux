// src/components/homePage/HomePage.tsx

import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg text-center p-4 border-0">
            <Card.Body>
              <h1 className="display-4 mb-3 text-primary">
                Welcome to DataSync Hub 🚀
              </h1>
              <p className="lead text-muted mb-5">
                Your secure platform for file management and data synchronization. Get started now to access your cloud storage.
              </p>

              <hr className="my-4" />

              <h3 className="h5 mb-4">Do you have an account?</h3>

              <div className="d-grid gap-3">
                <Link to="/login" className="text-decoration-none">
                  <Button variant="primary" size="lg" className="w-75">
                    Log In
                  </Button>
                </Link>

                <Card.Text className="text-muted">— or —</Card.Text>
                <Link to="/register" className="text-decoration-none">
                  <Button variant="outline-primary" size="lg" className="w-75">
                    Create New Account
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}