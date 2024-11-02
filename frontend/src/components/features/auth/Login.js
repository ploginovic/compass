import React, { useEffect } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { route } = useAuthenticator();

  const from = location.state?.from || '/';

  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);

  if (route === 'authenticated') {
    return null;
  }

  return (
    <Authenticator>
      {/* Customize the sign-in UI if needed */}
    </Authenticator>
  );
};

export default Login;



