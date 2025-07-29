import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ghost } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Profile() {
  // Always fetch the current user from the backend using the cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // The backend should return the current user based on the session cookie
        const res = await fetch(`https://dreamservice.onrender.com/api/buyer/view-buyer/${user.username}`);
        if (res.status === 401) {
          setProfileUser(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
        setProfileUser(data);
        setForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          username: data.username || '',
          phone_number: data.phone_number || '',
          password: data.password || '',
          aadhaar_number: data.aadhaar_number || '',
          pan_number: data.pan_number || '',
          aadhaar_card: data.aadhaar_card || '',
          pan_card: data.pan_card || '',
          profile_picture: data.profile_picture || '',
        });
      } catch (err) {
        toast.error(err.message || 'Failed to fetch user');
        setProfileUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
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
      const res = await fetch(`https://dreamservice.onrender.com/api/buyer/update-buyer/${form.username}`, {
        method: 'PATCH',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      toast.success('Profile updated!');
      setEditMode(false);
      // No localStorage: backend session/cookie will keep user logged in
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  // Add delete handler
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dreamservice.onrender.com/api/buyer/delete-buyer/${form.username}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      toast.success('Account deleted successfully!');
      // No localStorage: backend session/cookie will be cleared on backend
      setTimeout(() => navigate('/signup'), 1200);
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-black">
      <motion.h1
        className='text-4xl font-semibold w-full text-start mb-8 px-8'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Profile
      </motion.h1>
      <motion.div
        className="bg-opacity-60 p-8 rounded-xl w-full max-w-md text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Ghost size={64} color="#E3E3E3" className="mx-auto mb-2" />
        <h2 className="text-3xl font-semibold mb-6">Who are you?</h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading profile...</div>
        ) : profileUser ? (
          <div className="flex flex-col items-center justify-center">
            {editMode ? (
              <div className="flex flex-col gap-3 items-start mb-4 w-full">
                <label className="text-left w-full">First Name
                  <input name="first_name" value={form.first_name} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                </label>
                <label className="text-left w-full">Last Name
                  <input name="last_name" value={form.last_name} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                </label>
                <label className="text-left w-full">Email
                  <input name="email" value={form.email} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                </label>
                <label className="text-left w-full">Username
                  <input name="username" value={form.username} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                </label>
                <div className="flex gap-2 mt-2">
                  <button onClick={handleUpdate} disabled={loading} className="px-4 py-2 bg-black text-white rounded-full font-semibold hover:bg-primary-dark">{loading ? 'Updating...' : 'Update'}</button>
                  <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-lg bg-white/80 shadow-xl rounded-2xl p-8 flex flex-col items-center border border-gray-200">
                <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4 shadow">
                  {/* Profile picture or fallback icon */}
                  {profileUser.profile_picture ? (
                    <img src={profileUser.profile_picture} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
                  ) : (
                    <Ghost size={64} color="#B0B0B0" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-1 text-gray-900">{profileUser.first_name} {profileUser.last_name}</h3>
                <p className="text-gray-500 mb-4">@{profileUser.username}</p>
                <div className="w-full flex flex-col gap-2 text-left">
                  <div className="flex items-center gap-2"><span className="font-semibold w-28">Email:</span> <span className="text-gray-700">{profileUser.email}</span></div>
                  <div className="flex items-center gap-2"><span className="font-semibold w-28">Phone:</span> <span className="text-gray-700">{profileUser.phone_number}</span></div>
                  <div className="flex items-center gap-2"><span className="font-semibold w-28">Aadhaar:</span> <span className="text-gray-700">{profileUser.aadhaar_number}</span></div>
                  <div className="flex items-center gap-2"><span className="font-semibold w-28">PAN:</span> <span className="text-gray-700">{profileUser.pan_number}</span></div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setEditMode(true)} className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-primary-dark">Update</button>
                  <AlertDialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialog.Trigger asChild>
                      <button onClick={() => setShowDeleteDialog(true)} disabled={loading} className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700">{loading ? 'Deleting...' : 'Delete Account'}</button>
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
            )}
          </div>
        ) : (
          <div>
            <p className="mb-6 text-md text-gray-400">You're not logged in</p>
            <div className="flex justify-center gap-4">
              <Link to="/signup" className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-primary-dark">Sign Up</Link>
              <Link to="/login" className="px-6 py-2 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300">Log in</Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 