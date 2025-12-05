import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ProtectedResponse {
  message: string;
  user: string;
}

const DummyPage: React.FC = () => {
  const [response, setResponse] = useState<ProtectedResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        const result = await axios.get<ProtectedResponse>('/api/protected', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setResponse(result.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch protected data');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default DummyPage;