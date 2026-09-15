import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SPANISH_ENABLED, FITI_ENABLED } from '../config/features';

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Everything under /es is the Spanish (Chile) edition.
  const isES = location.pathname === '/es' || location.pathname.startsWith('/es/');

  const mainTool   = isES ? { name: 'Evaluación', path: '/es/tool' }
                          : { name: 'Scoring Tool', path: '/tool' };
  const researchLink = { name: 'Research', path: '/research' };

  const otherLinks = isES
    ? [
        { name: 'Movimiento corporal', path: '/es/movement' },
        { name: 'Estímulos para la persona', path: '/es/patient-view' },
      ]
    : [
        { name: 'Body Movement Form', path: '/movement' },
        { name: 'Resources & Tutorials', path: '/resources' },
        { name: 'Patient View', path: '/patient-view' },
        ...(FITI_ENABLED ? [{ name: 'Modular FITI Assessment', path: '/fiti' }] : []),
        { name: 'Downloads & Updates', path: '/downloads' },
        { name: 'Audio Samples', path: '/audio' },
      ];

  const isActive = (path) => location.pathname === path;

  // Switching languages keeps you on the equivalent page where one exists.
  const counterpart = () => {
    if (isES) {
      const back = location.pathname.replace(/^\/es/, '');
      return back === '' ? '/' : back;
    }
    const map = {
      '/tool': '/es/tool',
      '/movement': '/es/movement',
      '/patient-view': '/es/patient-view',
    };
    return map[location.pathname] || '/es';
  };

  const langLabel = isES ? 'English' : 'Español';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* 1. Brand Name */}
          <div className="flex items-center min-w-0 flex-1 mr-3">
            <Link to={isES ? '/es' : '/'} className="flex items-center group min-w-0">
              <span className="text-sm sm:text-base md:text-xl font-bold text-slate-800 tracking-tight transition-colors group-hover:text-sky-600 truncate">
                Colorado{" "}
                <span className="font-medium text-slate-600 hidden sm:inline">
                  Motor Speech Framework
                </span>
                <span className="font-medium text-slate-600 sm:hidden">MSF</span>
              </span>
              {isES && (
                <span className="ml-2 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-[10px] font-black uppercase tracking-widest text-sky-700">
                  SPCh
                </span>
              )}
            </Link>
          </div>

          {/* 2. Navigation Area */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">

            {/* Language switch */}
            {SPANISH_ENABLED && (
            <Link
              to={counterpart()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-700 border border-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
              title={isES ? 'Switch to English' : 'Cambiar a español (Chile)'}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z" />
              </svg>
              <span className="hidden sm:inline">{langLabel}</span>
            </Link>
            )}

            {/* Research Invitation Button — English edition only */}
            {!isES && (
              <Link
                to={researchLink.path}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 text-[11px] md:text-xs font-black uppercase tracking-widest rounded-xl border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all shadow-sm"
              >
                CMSF Clinician Network
              </Link>
            )}

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
                    : 'border-slate-400 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isES ? 'Menú' : 'Menu'}
                <svg className={`ml-1.5 h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setIsMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-10 py-2 origin-top-right overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-top-2">

                    {isES ? (
                      <>
                        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 border-b border-slate-100">
                          Instrumento
                        </p>
                        {otherLinks.map((link) => (
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
                        <Link
                          to="/"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          English site
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* Clinical Tools Section */}
                        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 border-b border-slate-100">
                          Clinical Tools
                        </p>
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

                        {/* Resources Section */}
                        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 border-b border-slate-100">
                          Resources
                        </p>
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

                        <div className="border-t border-slate-100 my-1"></div>

                        {/* Languages */}
                        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 border-b border-slate-100">
                          Languages
                        </p>
                        <Link
                          to="/es"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Español (Chile) — SPCh
                        </Link>
                      </>
                    )}
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
