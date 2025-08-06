import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ghost, User, Mail, Phone, CreditCard, FileText, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../components/UserContext';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export default function Profile() {
  const { user, setUser } = useUser();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone_number: '',
    password: '',
    aadhaar_number: '',
    pan_number: '',
    aadhaar_card: '',
    pan_card: '',
    profile_picture: '',
  });
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('first_name', form.first_name);
      fd.append('last_name', form.last_name);
      fd.append('email', form.email);
      fd.append('username', form.username);
      fd.append('phone_number', form.phone_number);
      fd.append('aadhaar_number', form.aadhaar_number);
      fd.append('pan_number', form.pan_number);
      
      const res = await fetch(`https://dreamservice.onrender.com/api/buyer/update-buyer/${form.username}`, {
        method: 'PATCH',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      
      // Update the user context with new data
      setUser({
        ...user,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        username: form.username,
        phone_number: form.phone_number,
        aadhaar_number: form.aadhaar_number,
        pan_number: form.pan_number,
      });
      
      toast.success('Profile updated!');
      setEditMode(false);
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dreamservice.onrender.com/api/buyer/delete-buyer/${form.username}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      
      // Clear user from context and localStorage
      setUser(null);
      toast.success('Account deleted successfully!');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileUser(user);
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        username: user.username || '',
        phone_number: user.phone_number || '',
        password: '',
        aadhaar_number: user.aadhaar_number || '',
        pan_number: user.pan_number || '',
        aadhaar_card: user.aadhaar_card || '',
        pan_card: user.pan_card || '',
        profile_picture: user.profile_picture || '',
      });
    } else {
      setProfileUser(null);
    }
    setLoading(false);
  }, [user]);

  // Track favorites
  useEffect(() => {
    const updateFavs = () => {
      const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
      setFavourites(favs);
    };
    updateFavs();
    window.addEventListener('favouritesUpdated', updateFavs);
    return () => window.removeEventListener('favouritesUpdated', updateFavs);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="text-center text-gray-400">Loading profile...</div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Ghost size={64} color="#E3E3E3" className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">You're not logged in</h2>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800">Sign Up</Link>
            <Link to="/login" className="px-6 py-2 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300">Log in</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-start">
      <div className="max-w-8xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 w-full">
      <motion.h1
          className="text-4xl font-semibold mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Profile
      </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Profile Header Section */}
      <motion.div
            className="flex flex-col md:flex-row gap-4 border-1 border-gray-100 rounded-2xl p-4 items-center md:items-start"
        initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full max-h-72 flex items-center justify-center">
              {profileUser.profile_picture ? (
                <img
                  src={profileUser.profile_picture}
                  alt="Profile"
                  className="w-full max-h-72 object-cover rounded-2xl shadow"
                />
              ) : (
                <div className="w-full max-h-72 bg-gray-200 rounded-2xl flex items-center justify-center shadow">
                  <User size={120} color="#B0B0B0" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between gap-2 items-center md:items-start w-full">
              <h1 className="text-2xl sm:text-3xl mb-1 text-center md:text-left">
                {profileUser.first_name} {profileUser.last_name}
                <span className="text-sm text-gray-400 p-2">User</span>
              </h1>
              <div className="text-primary font-semibold mb-2 text-center md:text-left">
                <span className="text-sm text-gray-400 p-2">Username</span>
                @{profileUser.username}
              </div>
              <div className="flex flex-row gap-2 w-full justify-center md:justify-start">
                <button 
                  onClick={() => setEditMode(true)} 
                  className="w-full md:w-auto bg-black text-white text-md rounded-full px-4 py-1 cursor-pointer hover:bg-gray-800"
                >
                  Edit Profile
                </button>
                  <AlertDialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialog.Trigger asChild>
                    <button 
                      onClick={() => setShowDeleteDialog(true)} 
                      disabled={loading} 
                      className="w-full md:w-auto bg-red-600 text-white text-md rounded-full px-4 py-1 cursor-pointer hover:bg-red-700 disabled:opacity-60"
                    >
                      {loading ? 'Deleting...' : 'Delete Account'}
                    </button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                      <AlertDialog.Content className="max-w-md w-full bg-white rounded-xl shadow-xl p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                        <AlertDialog.Title className="text-lg font-bold mb-2">Confirm Account Deletion</AlertDialog.Title>
                        <AlertDialog.Description className="mb-4 text-gray-700">
                          This action cannot be undone. To confirm, type <span className="font-mono bg-gray-100 px-1 rounded">delete {profileUser.username}</span> below:
                        </AlertDialog.Description>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2 mb-2"
                          placeholder={`delete ${profileUser.username}`}
                          value={deleteInput}
                          onChange={e => setDeleteInput(e.target.value)}
                          autoFocus
                        />
                        <div className="flex gap-2 justify-end mt-4">
                          <AlertDialog.Cancel asChild>
                            <button className="px-4 py-2 rounded bg-gray-200 text-black font-semibold hover:bg-gray-300" onClick={() => setDeleteInput("")}>Cancel</button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <button
                              className={`px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60`}
                              disabled={deleteInput !== `delete ${profileUser.username}` || loading}
                              onClick={async () => {
                                toast.warn('Account will be permanently deleted.');
                                setShowDeleteDialog(false);
                                setDeleteInput("");
                                await handleDelete();
                              }}
                            >
                              Confirm Delete
                            </button>
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </div>
              </div>
          </motion.div>

          {/* Personal Information Section */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4 justify-center">
            <motion.div 
              className="flex flex-col items-start gap-2 mb-2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-sm text-gray-400">Personal Information</span>
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                <span>{profileUser.first_name} {profileUser.last_name}</span>
              </div>
            </motion.div>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <motion.div 
              className="flex flex-col mb-2 text-left"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="text-lg font-semibold">Contact Information</span>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Email:</span>
                  <span>{profileUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Phone:</span>
                  <span>{profileUser.phone_number}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Identity Documents Section */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <motion.div 
              className="flex flex-col mb-2 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="text-lg font-semibold">Identity Documents</span>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Aadhaar:</span>
                  <span>{profileUser.aadhaar_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">PAN:</span>
                  <span>{profileUser.pan_number}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Favorites Section */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <motion.div 
              className="flex flex-col mb-2 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="text-lg font-semibold">Favorites</span>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm text-gray-400">Saved Properties:</span>
                  <span className="font-semibold">{favourites.length}</span>
                </div>
                <Link 
                  to="/favourite" 
                  className="mt-3 w-full bg-black text-white text-center rounded-full px-4 py-2 font-semibold hover:bg-gray-800 transition-colors"
                >
                  View Favorites
                </Link>
            </div>
            </motion.div>
          </div>

          {/* Edit Form Section */}
          {editMode && (
            <motion.div 
              className="md:col-span-2 border-1 border-gray-100 rounded-2xl p-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-lg font-semibold mb-4">Edit Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">First Name
                    <input 
                      name="first_name" 
                      value={form.first_name} 
                      onChange={handleChange} 
                      className="border rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </label>
                  <label className="text-sm font-medium">Last Name
                    <input 
                      name="last_name" 
                      value={form.last_name} 
                      onChange={handleChange} 
                      className="border rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </label>
                  <label className="text-sm font-medium">Email
                    <input 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      className="border rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Username
                    <input 
                      name="username" 
                      value={form.username} 
                      onChange={handleChange} 
                      className="border rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </label>
                  <label className="text-sm font-medium">Phone Number
                    <input 
                      name="phone_number" 
                      value={form.phone_number} 
                      onChange={handleChange} 
                      className="border rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </label>
                  <label className="text-sm font-medium">Aadhaar Number
                    <input 
                      name="aadhaar_number" 
                      value={form.aadhaar_number} 
                      onChange={handleChange} 
                      className="border rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={handleUpdate} 
                  disabled={loading} 
                  className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 disabled:opacity-60"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
                <button 
                  onClick={() => setEditMode(false)} 
                  className="px-6 py-2 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}