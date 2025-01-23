import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Slidebar from './Slidebar';
import MainDashboard from './MainDashboard';
import User from './User'; 
import Campaigns from './Campaigns';
import Revenue from './Revenue';

const AdminPanel = () => {
  return (
    <div className="flex bg-neutral-500">
      <Slidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="user" element={<User />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="revenue" element={<Revenue />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
