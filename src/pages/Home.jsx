import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Click the link below to go to the Admin Dashboard:</p>
      <Link to="/admin-dashboard">Go to Admin Dashboard</Link>
    </div>
  );
};

export default Home;
