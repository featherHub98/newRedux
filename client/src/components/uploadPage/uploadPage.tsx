import { useState, useEffect } from "react"
import { Container, Card, Form, ListGroup, Button, Alert } from 'react-bootstrap';
import axiosInstance from "../../axiosInstance.ts";
import { upload, download, deleteFile } from "../../redux/reducers/uploadSlice.tsx";
import { useDispatch, useSelector } from "react-redux";

interface StoredFile {
    id: number,
    name: string ,
    type: string ,
    data: string,
    date: string ,
    counter: number
};

type RootState = {
    upload: StoredFile[]; 
    user: any;
};

export default function UploadPage() {
    const dispatch = useDispatch();
    const reduxFiles = useSelector((state: RootState) => state.upload); 
    const [error, setError] = useState('');

    const filesToDisplay = reduxFiles.filter(file => file.id !== 0);

    useEffect(() => {
        if (reduxFiles.length <= 1 && reduxFiles[0]?.id === 0) {
            const storedValue = localStorage.getItem('my_stored_files');
            if (storedValue) {
                const savedFiles: StoredFile[] = JSON.parse(storedValue);
                
                savedFiles.forEach(file => {
                    dispatch(upload(file)); 
                });
            }
        }
    }, [dispatch, reduxFiles.length]); 

    useEffect(() => {
        localStorage.setItem("my_stored_files", JSON.stringify(filesToDisplay));
        updateDB(filesToDisplay);
    }, [filesToDisplay]); 

    const updateDB = async (newFiles: StoredFile[]) => {
        await axiosInstance.post('/updateFiles', { files: newFiles })
            .then(response => {
                console.log('Files updated successfully');
            })
            .catch(error => {
                console.error('Error updating files:', error);
            });
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setError('');
        if (!selectedFile) return;

        if (selectedFile.size > 10240) {
            setError("Error : File larger than 10KB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            if (typeof event.target?.result === "string") {
                const newFile: StoredFile = {
                    id: Date.now(),
                    name: selectedFile.name,
                    type: selectedFile.type,
                    data: event.target.result,
                    date: new Date().toISOString(),
                    counter: 0
                };
                
                dispatch(upload(newFile));
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteFile({ id }));
    };

    const handleDownload = (id: number) => {
        dispatch(download({ id }));
        
        const fileToDownload = reduxFiles.find(file => file.id === id);
        if (fileToDownload) {
             const a = document.createElement('a');
             a.href = fileToDownload.data; 
             a.download = fileToDownload.name || 'download';
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
        }
    }

    return (
        <Container className="d-flex justify-content-center py-5">
            <Card style={{ width: '100%', maxWidth: '650px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Card.Header as="h2" className="text-center bg-primary text-white">
                    <i className="bi bi-folder-fill me-2"></i>Redux File Manager
                </Card.Header>
                
                <Card.Body>
                    <Card className="mb-4 p-3 bg-light border-dashed">
                        <h5 className="mb-3">Upload New File</h5>
                        <Form.Group controlId="formFile" className="mb-2">
                            <Form.Control type="file" onChange={handleUpload} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Maximum file size: 10 KB.
                        </Form.Text>
                        
                        {error && <Alert variant="danger" className="mt-3 py-2">{error}</Alert>}
                    </Card>

                    <h3 className="mb-3">Stored Files ({filesToDisplay.length})</h3>

                    {filesToDisplay.length === 0 && (
                        <Alert variant="info" className="text-center">No files stored yet. Upload one to get started!</Alert>
                    )}

                    {filesToDisplay.length > 0 && (
                        <ListGroup variant="flush">
                            {filesToDisplay.map((file) => (
                                <ListGroup.Item 
                                    key={file.id} 
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span className="fw-bold text-truncate me-2" style={{ maxWidth: '100%' }}>
                                        {file.name}{ file.date ? ` (Uploaded on: ${new Date(file.date).toLocaleDateString()})` : ''}
                                    </span>
                                    <div className="d-flex align-items-center">
                                        <span className="me-3 text-nowrap">
                                            Downloads: {file.counter || 0}
                                        </span>
                                    </div>
                                    <div>
                                        <Button 
                                            variant="outline-success" 
                                            size="sm" 
                                            className="me-2"
                                            onClick={()=>handleDownload(file.id)}
                                        >
                                            Download
                                        </Button>

                                        <Button 
                                            onClick={() => handleDelete(file.id)}
                                            variant="outline-danger" 
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}