import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeBody = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    if (!userEmail || !token) {
      window.location.href = '/signin';
      return;
    }

    async function loadBlogs() {
      try {
        const response = await fetch(`${import.meta.env.VITE_PORT_URL}api/blogs/published`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const blogs = await response.json();
        setBlogs(blogs);
      } catch (err) {
        console.error('Error loading blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const toggleLike = async (blogId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }

      const result = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, liked: result.liked, like_count: result.like_count }
            : blog
        )
      );
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return (
    <main className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <i className="fas fa-book-open"></i> Published Blogs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loading ? (
          <div className="col-span-full text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <i className="fas fa-book-open text-4xl text-gray-400 mb-3"></i>
            <h4 className="text-xl text-gray-600 font-semibold">No published blogs yet</h4>
            <p className="text-gray-500">Be the first to publish a blog!</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between text-left h-[280px] hover:shadow-xl transition-shadow">
              <div className="overflow-hidden text-left">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-yellow-400 text-yellow-500 flex items-center justify-center font-bold">
                      {blog.user_email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="text-sm font-semibold text-gray-800">{blog.username}</h6>
                      <p className="text-xs text-gray-500">{blog.user_email}</p>
                      <p className="text-xs text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {blog.category && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                      {blog.category}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{blog.title}</h3>
                <p className="text-gray-700 mb-3 text-left line-clamp-2">
                  {blog.content}
                </p>
              </div>
              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
                <button
                  className={`text-sm flex items-center gap-1 ${blog.liked ? 'text-red-600' : 'text-gray-500'}`}
                  onClick={() => toggleLike(blog.id)}
                >
                  <i className={blog.liked ? 'fas fa-heart' : 'far fa-heart'}></i>
                  {blog.like_count || 0}
                </button>
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

export default HomeBody;
