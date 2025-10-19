
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Portrait Pro AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
