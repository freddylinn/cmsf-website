import React from "react";

function Download({ name, type, alias, description }) {
  const isPdf = type === "pdf";
  const isExcel = type === "excel";
  const isImage = type === "image";
  
  return (
    <a 
      href={`/downloads/${name}`} 
      download 
      className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all flex flex-col items-start text-left w-full h-full"
    >
      <div className={`mb-6 p-3 rounded-2xl ${
        isPdf ? 'bg-red-50 text-red-600' : 
        isExcel ? 'bg-green-50 text-green-600' : 
        isImage ? 'bg-amber-50 text-amber-600' : 
        'bg-sky-50 text-sky-600'
      }`}>
        {isPdf ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ) : isExcel ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ) : isImage ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        )}
      </div>
      
      <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:text-sky-600 transition-colors">
        {alias || name}
      </h3>
      
      <p className="text-sm text-slate-500 leading-relaxed flex-grow mb-6">
        {description}
      </p>
      
      <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span>Download</span>
        <span className="w-4 h-px bg-slate-200"></span>
        <span>{type}</span>
      </div>
    </a>
  );
}

export default Download;
