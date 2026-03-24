import React from 'react';
import patientData from '../data/patientStimuli.json';

function PatientTasks() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const categories = Object.keys(patientData);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans text-gray-800">
      {/* PRINT STYLES: 
          This block ensures the printed version looks professional.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          nav, .no-print { display: none !important; }
          body { background: white; }
          section { page-break-inside: avoid; margin-bottom: 2rem; }
          .stimulus-item { border: 1px solid #eee; background: none !important; color: black !important; }
          h1, h2 { color: black !important; border-bottom: 1px solid black !important; }
        }
      `}} />

      {/* Navigation & Print Tab */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-4 mb-8 border-b shadow-sm no-print">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jump to Section:</p>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition-all shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Stimuli
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToSection(cat.replace(/\s+/g, '-'))}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors border border-blue-200"
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <h1 className="text-4xl font-bold mb-12 text-blue-900">Patient Assessment Stimuli</h1>
      
      {Object.entries(patientData).map(([category, sections]) => {
        const sectionId = category.replace(/\s+/g, '-');
        
        return (
          <section key={category} id={sectionId} className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b-2 border-blue-100 pb-2">
              {category}
            </h2>
            
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    {section.header}
                  </h3>
                  
                  {section.instruction && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 no-print">
                      <p className="text-gray-700 italic text-sm">
                        <span className="font-bold not-italic">Note for Clinician:</span> {section.instruction}
                      </p>
                    </div>
                  )}

               <ul className="space-y-6">
  {(section.sentences || section.stimuli).map((item, sIdx) => {
    // Check if this is the Spanish passage
    const isSpanish = section.header.includes("Sopa de Pescado");

    return (
      <li 
        key={sIdx} 
        // 1. translate="no" is the HTML5 standard
        // 2. "notranslate" is the specific class Google looks for
        translate={isSpanish ? "no" : "yes"}
        className={`stimulus-item text-3xl leading-relaxed text-gray-900 bg-gray-50 p-6 rounded-lg border shadow-sm ${isSpanish ? 'notranslate' : ''}`}
      >
        {item}
      </li>
    );
  })}
</ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
      
      <div className="h-64 flex items-center justify-center text-gray-300 italic no-print">
        End of Assessment
      </div>
    </div>
  );
}

export default PatientTasks;
