import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The ONE visible link
  const mainTool = { name: 'Scoring Tool', path: '/' };

  // Everything else goes in the dropdown
  const otherLinks = [
    { name: 'Body Movement Form', path: '/movement' },
    { name: 'Patient View', path: '/patient' },
    { name: 'Downloads & Updates', path: '/downloads' },
    { name: 'Audio Samples', path: '/audio' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 no-print shadow-sm">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-black text-blue-900 tracking-tighter transition-colors group-hover:text-blue-600">
                CMSF
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            
            {/* 1. The Only Standalone Tool */}
            <Link
              to={mainTool.path}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                isActive(mainTool.path) 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {mainTool.name}
            </Link>

            {/* 2. The Everything Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                  otherLinks.some(link => isActive(link.path))
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Menu
                <svg className={`ml-2 h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <>
                  {/* Overlay to close menu on click-away */}
                  <div className="fixed inset-0 z-0" onClick={() => setIsMenuOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-3 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-10 py-2 origin-top-right overflow-hidden border border-gray-100">
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50">Additional Assessment Tools</p>
                    {otherLinks.slice(0, 1).map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          isActive(link.path) ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50">Patient Resources</p>
                    
                    {otherLinks.slice(1).map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          isActive(link.path) ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
