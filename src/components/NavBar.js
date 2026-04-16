import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Matches App.js: path="/tool"
  const mainTool = { name: 'Scoring Tool', path: '/tool' }; 
  const researchLink = { name: 'Research', path: '/research' };

  // Removed Research from here so it's not redundant in the dropdown
  const otherLinks = [
    { name: 'Body Movement Form', path: '/movement' },
    { name: 'Patient View', path: '/patient-view' },
    { name: 'Modular FITI Assessment', path: '/fiti' },
    { name: 'Downloads & Updates', path: '/downloads' },
    { name: 'Audio Samples', path: '/audio' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* 1. Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight transition-colors group-hover:text-sky-600">
                Colorado <span className="font-medium text-slate-500">Motor Speech Framework</span>
              </span>
            </Link>
          </div>

          {/* 2. Navigation Area */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* NEW: Research Invitation Button */}
            <Link
              to={researchLink.path}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 text-[11px] md:text-xs font-black uppercase tracking-widest rounded-xl border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all shadow-sm"
            >
           CMSF Clinician Network
            </Link>

            {/* The Scoring Tool Link */}
            <Link
              to={mainTool.path}
              className={`px-4 py-2 rounded-xl text-[11px] md:text-xs font-black uppercase tracking-widest transition-all shadow-sm ${
                isActive(mainTool.path) 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-sky-500 text-white hover:bg-sky-600 hover:-translate-y-0.5'
              }`}
            >
              {mainTool.name}
            </Link>

            {/* The Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center px-4 py-2 rounded-xl text-[11px] md:text-xs font-black uppercase tracking-widest transition-all border ${
                  otherLinks.some(link => isActive(link.path))
                    ? 'border-sky-200 bg-sky-50 text-sky-700'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                Menu
                <svg className={`ml-1.5 h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setIsMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-10 py-2 origin-top-right overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-top-2">
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border-b border-slate-100">Clinical Tools</p>
                    {otherLinks.slice(0, 1).map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          isActive(link.path) ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    <div className="border-t border-slate-100 my-1"></div>
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border-b border-slate-100">Resources</p>
                    
                    {otherLinks.slice(1).map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          isActive(link.path) ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
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
