import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    if (!title || !content || !userEmail) {
      alert('Title, content, and user email are required');
      return;
    }

    const blogData = {
      title,
      content,
      user_email: userEmail,
      category,
      image_url: imageUrl,
      published: published ? 1 : 0,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_PORT_URL}api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      setPublished(false);
      navigate('/home');
    } catch (err) {
      console.error('Error creating blog:', err);
      alert(err.message || 'Failed to create blog');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      {/* Back Link */}
      <Link to="/home" className="text-blue-600 hover:underline mb-4 block">
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700 font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            rows="6"
            className="w-full border border-gray-300 p-8 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="ml-2 text-sm text-gray-600">
            Publish this blog
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
