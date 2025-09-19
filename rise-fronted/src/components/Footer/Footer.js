import React from 'react';


// Footer component is now sticky at the bottom using Tailwind's fixed and bottom-0 classes
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full fixed bottom-0 left-0 z-40">
      {/* The z-40 ensures the footer stays above most content but below the header */}
      <div className="container mx-auto px-4">
        {/* ...existing code... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Mastery</h3>
            <p className="text-gray-400">A platform for learning and growth.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="/about" className="hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="/contact" className="hover:text-white">Contact</a></li>
              <li className="mb-2"><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li className="mb-2"><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 pt-8 mt-8 border-t border-gray-700">
          <p>&copy; 2025 Mastery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
