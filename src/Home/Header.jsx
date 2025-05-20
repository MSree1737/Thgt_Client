import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const url = import.meta.env.VITE_PORT_URL;

    if (!token || !userEmail) return;
////////////////////////////-------------
    fetch(`${url}api/user/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const fetchedUsername = data.user.username;
        setUsername(fetchedUsername);
        setInitials(fetchedUsername ? fetchedUsername.charAt(0).toUpperCase() : 'U');
        localStorage.setItem('username', fetchedUsername);
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/signin';
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
      <Link to="/home" className="text-2xl font-bold text-yellow-600">Thght Nest</Link>

        <div className="flex items-center space-x-6">
          <Link to= "/newblog"><button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            + New Blog
          </button></Link>

          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 bg-yellow-500 text-white flex items-center justify-center rounded-full">
                <span className="font-semibold">{initials}</span>
              </div>
              <span className="text-gray-800 font-medium">{username}</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <li>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                </Link>

                </li>
                <li><hr className="my-1 border-gray-200" /></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
