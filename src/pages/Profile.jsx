import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex flex-col items-center justify-center text-black">
      <h1 className='text-6xl font-semibold w-full text-start mb-8 px-8'>Profile</h1>
      <div className="bg-opacity-60 p-8 rounded-xl w-full max-w-md text-center">
        <Ghost size={64} color="#E3E3E3" className="mx-auto mb-2" />
        <h2 className="text-3xl font-semibold mb-6">Who are you?</h2>
        {user ? (
          <div>
            <p className="mb-4">Welcome, <span className="font-semibold">{user.name || user.email}</span>!</p>
            <p className="mb-2">Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <p className="mb-6 text-md text-gray-400">You're not logged in</p>
            <div className="flex justify-center gap-4">
              <Link to="/signup" className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-primary-dark">Sign Up</Link>
              <Link to="/login" className="px-6 py-2 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300">Log in</Link>
            </div>
            <p className="mb-6 text-md text-gray-400 p-2">Powered by FramerAuth</p>
          </div>
        )}
      </div>
    </div>
  );
} 