import {useState,useEffect} from "react"
import { Container, Card, Form, ListGroup, Button, Alert } from 'react-bootstrap';

//import { useDispatch } from "react-redux"
interface StoredFile  {
          id: number,
          name : string | undefined,
          type : string | undefined,
          data : string 
        };

export default function UploadPage() {
   // const dispatch = useDispatch();
    const [files,setFiles] = useState<StoredFile[]>([])
    const [error,setError] = useState('')
    useEffect (()=>{
      const storedValue = localStorage.getItem('my_stored_files');
      let savedFiles= []
      if (storedValue != null){
        savedFiles = JSON.parse(storedValue)
      }
      setFiles(savedFiles)
    },[]);
    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const selectedFile = e.target.files?.[0];
      setError('');
      if (!selectedFile) return ;
      if(selectedFile.size > 10240){
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
        };

        const updatedFiles = [...files, newFile];
        setFiles(updatedFiles);

        try {
          localStorage.setItem("my_stored_files", JSON.stringify(updatedFiles));
        } catch (error) {
          setError("Storage quota exceeded! Clear some files.");
        }
      }
      };
      reader.readAsDataURL(selectedFile);
    };
    const deleteFile = (id:number) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    localStorage.setItem('my_stored_files', JSON.stringify(updatedFiles));
  };


  return (
    <Container className="d-flex justify-content-center py-5">
      
      <Card style={{ width: '100%', maxWidth: '550px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <Card.Header as="h2" className="text-center bg-primary text-white">
          <i className="bi bi-folder-fill me-2"></i>Local Storage File Manager
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

          <h3 className="mb-3">Stored Files ({files.length})</h3>

          {files.length === 0 && (
            <Alert variant="info" className="text-center">No files stored yet. Upload one to get started!</Alert>
          )}

          {files.length > 0 && (
            <ListGroup variant="flush">
              {files.map((file) => (
                <ListGroup.Item 
                  key={file.id} 
                  className="d-flex justify-content-between align-items-center"
                >
                  <span className="fw-bold text-truncate me-2" style={{ maxWidth: '60%' }}>
                    {file.name}
                  </span>
                  
                  <div>
                    <Button 
                      as="a"
                      href={file.data} 
                      download={file.name}
                      variant="outline-success" 
                      size="sm" 
                      className="me-2"
                    >
                      Download
                    </Button>

                    <Button 
                      onClick={() => deleteFile(file.id)}
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
    </Container>  )
}
