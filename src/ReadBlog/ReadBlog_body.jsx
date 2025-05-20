import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ReadBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PORT_URL}api/blog/${blogId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Blog not found</div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/home" className="text-blue-600 hover:underline mb-4 block">
        ← Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white border border-yellow-400 text-yellow-500 flex items-center justify-center font-bold text-xl">
            {blog.user_email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{blog.username}</h4>
            <p className="text-sm text-gray-500">{blog.user_email}</p>
            <p className="text-sm text-gray-400">{new Date(blog.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {blog.image_url && (
          <img
            src={blog.image_url}
            alt="Blog"
            className="w-full h-auto rounded-lg mb-4"
          />
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-4">{blog.title}</h2>
        {/* Ensure text is aligned to the left */}
        {blog.image_url && (
                  <img src={blog.image_url} alt="Blog" className="w-full h-auto rounded-lg mb-3" />
                )}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-left">{blog.content}</p>
      </div>
    </main>
  );
};

export default ReadBlog;
