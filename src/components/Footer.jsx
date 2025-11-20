import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600">
            © 2025{' '}
            <a 
              href="https://www.barretlee.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors underline"
            >
              Barret 李靖
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
