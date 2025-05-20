import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileBody = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserBlogs = async () => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    try {
      const response = await fetch(`${import.meta.env.VITE_PORT_URL}api/user/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user blogs');

      const data = await response.json();
      console.log('Fetched user blogs:', data);

      // Handle both array and object responses
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        console.warn('Unexpected response format:', data);
        setBlogs([]);
      }
    } catch (err) {
      console.error('Error fetching user blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_PORT_URL}api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete blog');

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
    }
  };

  return (
    <main className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <i className="fas fa-user"></i> My Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loading ? (
          <div className="col-span-full text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <h4 className="text-xl text-gray-600 font-semibold">You haven't posted any blogs yet</h4>
            <p className="text-gray-500">Create your first one now!</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{blog.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</p>
                  </div>
                  {blog.category && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                      {blog.category}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-3 text-left line-clamp-2">{blog.content}</p>
              </div>

              <div className="flex justify-between items-center mt-3 border-t pt-3 border-gray-200">
                <div className="flex gap-4">
                <Link to={`/edit/${blog.id}`}
                className="text-sm text-indigo-600 hover:underline"
                > Edit </Link>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <Link
                  to={`/home/${blog.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default ProfileBody;
