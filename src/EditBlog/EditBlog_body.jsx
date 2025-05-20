import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PORT_URL}api/blog/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch blog data');

        const blog = await response.json(); // Assume blog data is directly returned
        setTitle(blog.title || '');
        setContent(blog.content || '');
        setCategory(blog.category || '');
        setImageUrl(blog.image_url || '');
        setPublished(blog.published || false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        alert('Error loading blog data');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      content,
      category,
      image_url: imageUrl,
      published,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_PORT_URL}api/blog/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update blog');
      }

      navigate('/home');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert(err.message || 'Failed to update blog');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <Link to="/home" className="text-blue-600 hover:underline mb-4 block">
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
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
          <label htmlFor="content" className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            id="content"
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
            <input
              id="category"
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-1">Image URL</label>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
