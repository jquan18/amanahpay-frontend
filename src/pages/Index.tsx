
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to donor dashboard
    navigate('/donor/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-3 text-gray-800">TrustChain</h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
