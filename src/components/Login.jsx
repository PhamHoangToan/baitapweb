import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log('Google Token:', credentialResponse.credential);
    // Chuyển hướng đến callback để xử lý token
    navigate('/callback', { state: { token: credentialResponse.credential } });
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login with Google</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default Login;