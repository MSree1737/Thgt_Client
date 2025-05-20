import React from 'react'

const Footer = () => {
  return (
    <div>
        <hr />
        <footer className="bg-white-800 text-black py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Help Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul>
              <li><a href="#" className="hover:text-yellow-500">Contact Support</a></li>
              <li><a href="#" className="hover:text-yellow-500">FAQ</a></li>
            </ul>
          </div>

          {/* Status Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Status</h3>
            <ul>
              <li><a href="#" className="hover:text-yellow-500">System Status</a></li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul>
              <li><a href="#" className="hover:text-yellow-500">Our Story</a></li>
              <li><a href="#" className="hover:text-yellow-500">Team</a></li>
            </ul>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Careers</h3>
            <ul>
              <li><a href="#" className="hover:text-yellow-500">Join Us</a></li>
              <li><a href="#" className="hover:text-yellow-500">Job Openings</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul>
              <li><a href="#" className="hover:text-yellow-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Text-to-Speech and Teams Section */}
        <div className="mt-8 text-center text-sm">
          <a href="#" className="hover:text-yellow-500 mr-4">Text to Speech</a>
          <a href="#" className="hover:text-yellow-500">Teams</a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
