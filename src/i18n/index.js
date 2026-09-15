// Central language bundle for the CMSF.
//
// Every page that can be shown in more than one language reads its data and its
// UI strings from here, so adding a new adaptation means adding one entry to
// LANGS plus a folder under src/data/ — no page component has to change.

import charDataEN from "../data/characteristics.json";
import locDataEN from "../data/locations.json";
import taskDataEN from "../data/tasks.json";
import customDataEN from "../data/custom.json";
import charTasksEN from "../data/char-tasks.json";
import movementEN from "../data/movement-characteristics.json";
import stimuliEN from "../data/patientStimuli.json";

import charDataES from "../data/es/characteristics.es.json";
import locDataES from "../data/es/locations.es.json";
import taskDataES from "../data/es/tasks.es.json";
import customDataES from "../data/es/custom.es.json";
import charTasksES from "../data/es/char-tasks.es.json";
import movementES from "../data/es/movement-characteristics.es.json";
import stimuliES from "../data/es/patientStimuli.es.json";

export const LANGS = {
  en: {
    code: "en",
    htmlLang: "en",
    label: "English",
    shortLabel: "EN",
    basePath: "",
    data: {
      characteristics: charDataEN,
      locations: locDataEN,
      tasks: taskDataEN,
      custom: customDataEN,
      definitions: charTasksEN,
      movement: movementEN,
      stimuli: stimuliEN,
    },
    // Items where the source instrument asks the clinician to record a side.
    // Keyed "Group|Feature"; the picker only appears once the item is ticked.
    laterality: {
      "OME (Face)|Drooping on entire side of face*": ["L", "R"],
      "OME (Face)|Drooping on lower side of face*": ["L", "R"],
      "OME (Lips)|Asymmetrical movement*": ["L", "R"],
      "OME (Jaw)|Jaw deviation to one side*": ["L", "R"],
      "OME (Soft Palate)|Palate asymmetry*": ["L", "R"],
      "OME (Tongue)|Deviation to one side on protrusion*": ["L", "R"],
      "OME (Tongue)|Weakness*": ["Bilateral", "L", "R"],
      "OME (Tongue)|Limited range of motion*": ["Bilateral", "L", "R"],
    },

    ui: {
      edition: "Colorado Motor Speech Framework",
      editionSub: "",
      patientName: "Patient Name",
      patientNamePlaceholder: "Enter name...",
      characteristics: "Characteristics",
      yesNo: "Y/N",
      blindMode: "Blind Mode",
      revealResults: "Reveal Results",
      methodologyTitle: "Clinical Methodology",
      methodologyBody:
        "Administer the assessment tasks, tick every deviant feature you observe, then reveal the diagnostic pattern to compare.",
      quickInstructionsTitle: "Quick Instructions",
      quickInstructionsBody: "Hover over blue i's for tasks.",
      privacyNote: "Privacy: All data remains local to your browser.",
      keyTitle: "Diagnostic Indicator Key",
      keyCommon: "Common",
      keyDistinguishing: "Highly Distinguishing",
      keyUnexpected: "Unexpected",
      recommendedTasks: "Recommended Tasks:",
      definition: "Definition:",
      definitionMissing: "Definition currently unavailable.",
      sideLabel: "Side:",
      // Abbreviations for the narrow-screen pattern grid, where full subtype
      // names will not fit across seven columns.
      colAbbrev: {
        "Flaccid": "FLAC",
        "UUMN": "UUMN",
        "Spastic": "SPAS",
        "Hypokinetic": "HYPO",
        "Hyperkinetic": "HYPER",
        "Ataxic": "ATAX",
        "Apraxia of Speech": "AOS",
      },
      mobilePatternTitle: "Your pattern",
      mobilePatternEmpty: "Tick the features you observed and the pattern will appear here.",
      mobileFeaturesTitle: "Features",
      mobileCheckedCount: "selected",
      mobileNetLabel: "Net",
      mobileLegendHint: "Each row shows how that feature maps onto the seven subtypes.",
      mobileIntroTitle: "How this works on a small screen",
      mobileIntroBody: "The full grid doesn't fit on a phone or tablet in portrait, so the tool is split in two: tick the features you observed below, then reveal the diagnostic pattern to see them laid out by subtype. Rotate to landscape, or use a larger screen, for the full side-by-side grid.",
      mobileTasksLabel: "Tasks",
      blindStep: "Step 1 of 2",
      blindTitle: "Rating without cues",
      blindBody: "Diagnostic markers are hidden, so the expected pattern can't influence what you rate.",
      blindAction: "Show diagnostic pattern",
      revealStep: "Step 2 of 2",
      revealTitle: "Comparing against the framework",
      revealBody: "Each feature you ticked now shows whether it is common, highly distinguishing, or unexpected for each diagnosis.",
      revealAction: "Hide pattern and keep rating",
      showAll: "Show All Rows",
      hideUnchecked: "Hide Unchecked Rows",
      generatePdf: "Generate PDF Report",
      observationsPlaceholder: "Clinical Observations...",
      scorecard: "Diagnostic Summary Scorecard",
      differentialScore: "Differential score",
      movementScorecard: "Movement Summary Scorecard",
      movementScore: "Movement Calculated Score",
      movementSubtitle: "Body Movement Observations",
      movementNote:
        "Note: Body movement observations serve as confirmatory signs for a motor speech disorder. Toggle Reveal Results to see diagnostic alignment.",
      summaryTitle: "EPIC Clinical Summary",
      summaryHelp:
        "Please manually revise the ending diagnostic description to include the neural area, motor speech diagnosis, and severity estimate.",
      copySummary: "Copy Smart Phrase",
      copied: "Summary Copied!",
      fitiPrompt:
        "For more in-depth Articulation Testing, Perform Modular FITI Assessment",
      stimuliTitle: "Patient Assessment Stimuli",
      jumpTo: "Jump to Section:",
      printStimuli: "Print Stimuli",
      clinicianNote: "Note for Clinician:",
      endOfAssessment: "End of Assessment",
      // Smart-phrase scaffolding
      sp: {
        evaluation: "Evaluation: Colorado Motor Speech Framework (CMSF)",
        ratings: "Clinical Ratings",
        selfRating: "Self-Rating",
        intelligibility: "Intelligibility Estimate",
        naturalness: "Naturalness",
        efficiency: "Efficiency",
        observations: "Observations",
        none: "No deviant features noted.",
        differential: "Differential Summary",
        net: "Net",
        impressions: "Overall Impressions",
        impressionsBody:
          "Speech features observed during this evaluation suggest possible involvement of [Neural Area].\nPrimary motor speech disorder classification: [MSD Type].\nPerceptual severity: [No Impairment / Mild / Moderate / Severe / Profound].",
      },
    },
  },

  es: {
    code: "es",
    htmlLang: "es",
    label: "Español (Chile)",
    shortLabel: "ES",
    basePath: "/es",
    data: {
      characteristics: charDataES,
      locations: locDataES,
      tasks: taskDataES,
      custom: customDataES,
      definitions: charTasksES,
      movement: movementES,
      stimuli: stimuliES,
    },
    laterality: {
      "Aspecto general del rostro|Caída de un lado completo de la cara": ["I", "D"],
      "Aspecto general del rostro|Caída de un lado inferior de la cara": ["I", "D"],
      "Labios|Movimientos asimétricos": ["I", "D"],
      "Mandíbula|Desviación de la mandíbula hacia un lado": ["I", "D"],
      "Paladar blando / Velofaringe|Asimetría de paladar": ["I", "D"],
      "Lengua|Desviación hacia un lado en la protrusión": ["I", "D"],
      "Lengua|Debilidad": ["Bilateral", "I", "D"],
      "Lengua|Rango de movimiento limitado": ["Bilateral", "I", "D"],
    },

    ui: {
      edition: "Colorado Motor Speech Framework",
      editionSub: "Adaptación al español de Chile (SPCh)",
      patientName: "Nombre de la persona",
      patientNamePlaceholder: "Escriba el nombre...",
      characteristics: "Características",
      yesNo: "SÍ/NO",
      blindMode: "Modo ciego",
      revealResults: "Mostrar resultados",
      methodologyTitle: "Metodología clínica",
      methodologyBody:
        "Administre las tareas de evaluación, marque cada característica desviada que observe y luego muestre el patrón diagnóstico para comparar.",
      quickInstructionsTitle: "Instrucciones rápidas",
      quickInstructionsBody: "Pase el cursor sobre las i azules para ver las tareas.",
      privacyNote: "Privacidad: los datos permanecen solo en su navegador.",
      keyTitle: "Clave de indicadores diagnósticos",
      keyCommon: "Común",
      keyDistinguishing: "Altamente distintiva",
      keyUnexpected: "Inesperada",
      recommendedTasks: "Tareas recomendadas:",
      definition: "Definición:",
      definitionMissing: "Definición no disponible por ahora.",
      sideLabel: "Lado:",
      colAbbrev: {
        "Flácida": "FLÁC",
        "MNSU": "MNSU",
        "Espástica": "ESPÁS",
        "Hipocinética": "HIPO",
        "Hipercinética": "HIPER",
        "Atáxica": "ATÁX",
        "Apraxia del Habla": "APR",
      },
      mobilePatternTitle: "Su patrón",
      mobilePatternEmpty: "Marque las características observadas y el patrón aparecerá aquí.",
      mobileFeaturesTitle: "Características",
      mobileCheckedCount: "marcadas",
      mobileNetLabel: "Neto",
      mobileLegendHint: "Cada fila muestra cómo esa característica se relaciona con los siete subtipos.",
      mobileIntroTitle: "Cómo funciona en pantallas pequeñas",
      mobileIntroBody: "La matriz completa no cabe en un teléfono o tablet en vertical, por lo que la herramienta se divide en dos: marque abajo las características observadas y luego muestre el patrón diagnóstico para verlas ordenadas por subtipo. Gire a horizontal, o use una pantalla más grande, para ver la matriz completa.",
      mobileTasksLabel: "Tareas",
      blindStep: "Paso 1 de 2",
      blindTitle: "Evaluación sin claves",
      blindBody: "Los indicadores diagnósticos están ocultos, para que el patrón esperado no influya en su evaluación.",
      blindAction: "Mostrar el patrón diagnóstico",
      revealStep: "Paso 2 de 2",
      revealTitle: "Comparación con el marco",
      revealBody: "Cada característica marcada muestra si es común, altamente distintiva o inesperada para cada diagnóstico.",
      revealAction: "Ocultar el patrón y seguir evaluando",
      showAll: "Mostrar todas las filas",
      hideUnchecked: "Ocultar filas sin marcar",
      generatePdf: "Generar informe en PDF",
      observationsPlaceholder: "Observaciones clínicas...",
      scorecard: "Resumen diagnóstico",
      differentialScore: "Puntaje diferencial",
      movementScorecard: "Resumen de movimiento corporal",
      movementScore: "Puntaje de movimiento",
      movementSubtitle: "Observaciones de movimiento corporal",
      movementNote:
        "Nota: las observaciones de movimiento corporal son signos confirmatorios de un trastorno motor del habla. Active Mostrar resultados para ver la correspondencia diagnóstica.",
      summaryTitle: "Resumen clínico",
      summaryHelp:
        "Revise manualmente la descripción diagnóstica final para incluir el área neural, el diagnóstico motor del habla y la estimación de severidad.",
      copySummary: "Copiar resumen",
      copied: "Resumen copiado.",
      fitiPrompt:
        "Para una evaluación articulatoria más detallada, realice la Evaluación Modular FITI",
      stimuliTitle: "Estímulos para la evaluación",
      jumpTo: "Ir a la sección:",
      printStimuli: "Imprimir estímulos",
      clinicianNote: "Nota para el clínico:",
      endOfAssessment: "Fin de la evaluación",
      sp: {
        evaluation:
          "Evaluación: Colorado Motor Speech Framework (CMSF) — adaptación al español de Chile",
        ratings: "Valoraciones clínicas",
        selfRating: "Autoreporte",
        intelligibility: "Estimación de inteligibilidad",
        naturalness: "Naturalidad",
        efficiency: "Eficiencia",
        observations: "Observaciones",
        none: "No se observaron características desviadas.",
        differential: "Resumen diferencial",
        net: "Neto",
        impressions: "Impresión general",
        impressionsBody:
          "Las características del habla observadas sugieren un posible compromiso de [área neural].\nClasificación principal del trastorno motor del habla: [tipo].\nSeveridad perceptual: [sin compromiso / leve / moderada / severa / profunda].",
      },
    },
  },
};

export const DEFAULT_LANG = "en";

export function getLang(code) {
  return LANGS[code] || LANGS[DEFAULT_LANG];
}

// Rows are keyed by "Group|Feature" rather than by feature name alone.
// Two sections legitimately share a feature name (e.g. "Limited range of
// motion" appears under both Lips and Jaw), and keying on the name alone made
// ticking one silently tick the other and double-count the score.
export const rowKey = (group, name) => `${group}|${name}`;

// Definitions are looked up by the namespaced key first, then by bare name so
// the existing English definition file keeps working unchanged.
export function lookupDefinition(definitions, group, name) {
  // Historically an asterisk on a feature name flagged "record a side". The
  // definition file stores those entries without it, so strip a trailing
  // asterisk as a fallback rather than showing "unavailable".
  const bare = name.replace(/\*+$/, "").trim();
  return (
    definitions[rowKey(group, name)] ||
    definitions[rowKey(group, bare)] ||
    definitions[name] ||
    definitions[bare] ||
    null
  );
}

// Returns the side options for a feature, or null if it isn't a lateralised item.
export function lookupLaterality(lang, group, name) {
  return (lang.laterality || {})[rowKey(group, name)] || null;
}
