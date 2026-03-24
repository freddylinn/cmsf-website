import React from 'react';
import patientData from '../data/patientStimuli.json';

function PatientTasks() {
  // Helper function to scroll to sections smoothly
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categories = Object.keys(patientData);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans text-gray-800">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-4 mb-8 border-b shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Jump to Section:</p>
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
        // Create a unique ID for the section link
        const sectionId = category.replace(/\s+/g, '-');
        
        return (
          <section key={category} id={sectionId} className="mb-20 scroll-mt-24">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b-2 border-blue-100 pb-2">
              {category}
            </h2>
            
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl p-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    {section.header}
                  </h3>
                  
                  {section.instruction && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                      <p className="text-gray-700 italic">{section.instruction}</p>
                    </div>
                  )}

                  <ul className="space-y-6">
                    {(section.sentences || section.stimuli).map((item, sIdx) => (
                      <li 
                        key={sIdx} 
                        className="text-3xl leading-relaxed text-gray-900 bg-gray-50 p-6 rounded-lg border shadow-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
      
      {/* Simple footer to allow scrolling past the last item */}
      <div className="h-64 flex items-center justify-center text-gray-300 italic">
        End of Assessment
      </div>
    </div>
  );
}

export default PatientTasks;
