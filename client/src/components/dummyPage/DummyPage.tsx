import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ProtectedResponse {
  message: string;
  user: string;
}

const DummyPage: React.FC = () => {
  const [response, setResponse] = useState<ProtectedResponse | null>(null);
  

  useEffect(() => {
    const fetchProtectedData = async () => {
      const authToken = localStorage.getItem('authToken');
      
      

      try {
        const result = await axios.get<ProtectedResponse>('/api/protected', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setResponse(result.data);
      } catch (err: any) {
      
      }
    };

    fetchProtectedData();
  }, []);

  

  return (
    <div>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default DummyPage;