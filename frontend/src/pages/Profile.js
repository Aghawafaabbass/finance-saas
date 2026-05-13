import React, { useState, useEffect } from 'react';
import { getProfile, uploadAvatar } from '../services/api';
import axios from 'axios';

const Profile = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    setUploading(true);
    try {
      const res = await uploadAvatar(formData);
      setProfile({ ...profile, avatar: res.data.avatar });
      setSuccess('Profile picture updated!');
    } catch (err) {
      console.log(err);
    }
    setUploading(false);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://127.0.0.1:8000/api/users/update-profile/',
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setEditSuccess('Profile updated successfully!');
      setEditError('');
      setEditing(false);
      fetchProfile();
    } catch (err) {
      setEditError('Failed to update profile!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">👤 My Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {profile ? (
          <div className="space-y-4">

            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-400 mb-3"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center border-4 border-green-400 mb-3">
                  <span className="text-4xl">👤</span>
                </div>
              )}
              <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition">
                {uploading ? 'Uploading...' : '📷 Change Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
              {success && (
                <p className="text-green-400 text-sm mt-2">{success}</p>
              )}
            </div>

            {/* Edit Success/Error */}
            {editSuccess && (
              <div className="bg-green-500 text-white p-3 rounded-lg text-center">
                {editSuccess}
              </div>
            )}
            {editError && (
              <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                {editError}
              </div>
            )}

            {/* Profile Info */}
            {!editing ? (
              <>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Username</p>
                  <p className="text-white font-bold text-lg">{profile.username}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-bold text-lg">{profile.email}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">User ID</p>
                  <p className="text-white font-bold text-lg">#{profile.id}</p>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg transition"
                >
                  ✏️ Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleEditProfile} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Username</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold p-3 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-green-500 p-4 rounded-xl text-center">
              <p className="text-white font-bold">
                AI-Powered Finance Manager 🚀
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;