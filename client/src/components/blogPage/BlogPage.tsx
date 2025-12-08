import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../redux/reducers/uploadSlice.tsx';

interface StoredFile {
    id: number,
    name: string,
    type: string,
    data: string,
    date: string,
    counter: number 
};

type RootState = {
    upload: StoredFile[]; 
};

export default function BlogPage() {
    const dispatch = useDispatch();
    const files = useSelector((state: RootState) => state.upload);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const textToDataURL = (text: string, filename: string): string => {
        const base64Content = btoa(text);
        return `data:text/plain;name=${filename};base64,${base64Content}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title.trim() || !content.trim()) {
            setError("Please provide both a title and content for your blog post.");
            return;
        }

        const newId = Date.now();
        const fileName = `${title.trim().replace(/\s/g, '_')}.txt`;
        const dataURL = textToDataURL(content.trim(), fileName);

        const newBlogEntry: StoredFile = {
            id: newId,
            name: fileName,
            type: 'text/plain',
            data: dataURL,
            date: new Date().toISOString(),
            counter: 0
        };

        try {
            dispatch(upload(newBlogEntry));
            
            setSuccess(`Successfully created blog post: "${title}". It is now stored in your files.`);
            setTitle('');
            setContent('');

        } catch (err) {
            setError("Failed to save the blog post to the store.");
            console.error(err);
        }
    }

    return (
        <Container className="mt-4" style={{ maxWidth: '800px' }}>
            <h2>Create New Blog Post</h2>
            <p>Your blog posts will be saved as downloadable files in your local storage/database.</p>
            
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}

            <Form onSubmit={handleSubmit} className="mt-4">
                
                <Form.Group controlId="blogTitle" className="mb-3">
                    <Form.Label>Blog Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter blog post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="blogContent" className="mb-3">
                    <Form.Label>Blog Content</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        style={{ height: '60vh' }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="mt-3">
                    Save Blog Post as File
                </Button>
            </Form>
        </Container>
    );
}