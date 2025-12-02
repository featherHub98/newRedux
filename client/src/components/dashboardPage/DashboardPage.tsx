// src/components/dashboardPage/DashboardPage.tsx

import React from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashboardPage() {
    const userEmail = useSelector((state:any) => state.user?.email);

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <h1 className="mb-4">
                        Welcome Back, {userEmail ? userEmail.split('@')[0] : 'User'}! 🎉
                    </h1>
                    
                    <Alert variant="success" className="p-3">
                        <Alert.Heading>Status: Connected</Alert.Heading>
                        You are successfully logged in and connected to the secure data system.
                    </Alert>

                    <Row className="g-4">
                        <Col md={6} lg={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>File Uploader 📤</Card.Title>
                                    <Card.Text>
                                        Access the main file upload area to start managing your documents and media.
                                    </Card.Text>
                                    <Link to="/upload">
                                        <Button variant="primary">Go to Upload</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>Recent Activity 📈</Card.Title>
                                    <Card.Text className="text-muted">
                                        Your activity log is currently empty. Upload your first file to see a summary here.
                                    </Card.Text>
                                    <Button variant="outline-secondary" disabled>View Logs</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>Account Settings ⚙️</Card.Title>
                                    <Card.Text>
                                        Manage your profile, change your password, and update your preferences.
                                    </Card.Text>
                                    <Button variant="outline-info" disabled>Manage Account</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}