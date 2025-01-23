import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import * as Components from './Component_auth';

const Sign_in = ({ setIsAuthenticated }) => {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the URL based on whether the user is signing in or signing up
    const url = signIn ? 'http://localhost:3000/user/signin' : 'http://localhost:300/user/signup';

    try {
      const response = await axios.post(url, { email, password });

      if (response.data.success && response.data.jwtToken) {
        localStorage.setItem('adminToken', response.data.jwtToken);
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        console.error('Login failed:', response.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error('An error occurred:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Components.Container className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Name" onChange={(e) => setEmail(e.target.value)} />
            <Components.Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Components.Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>Sign In</Components.Title>
            <Components.Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Components.Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Sign_in;
