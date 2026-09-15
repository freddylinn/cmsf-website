import React from "react";

// Install instructions, shown on both language homepages.
//
// iOS deliberately offers no install prompt — Apple requires the user to go
// through the Share menu, and only from Safari — so written directions are the
// only option there. Android and desktop Chrome do prompt, but people often
// dismiss the banner without reading it, so the manual route is given too.
const COPY = {
  en: {
    eyebrow: "Use it offline",
    heading: "Install the CMSF on your device",
    intro:
      "The CMSF can be added to your home screen and opened like an app. Once installed it works with no internet connection, so it stays usable in clinic rooms with unreliable wifi. Nothing you enter is stored or transmitted, on any device.",
    platforms: [
      {
        device: "iPhone & iPad",
        note: "Safari only — Chrome on iOS cannot install web apps.",
        steps: [
          "Open cmsf.info in Safari.",
          "Tap the Share button (the square with an arrow).",
          "Scroll down and tap “Add to Home Screen”.",
          "Tap “Add”. The CMSF icon appears with your other apps.",
        ],
      },
      {
        device: "Android",
        note: "Chrome, Edge, or Samsung Internet.",
        steps: [
          "Open cmsf.info in your browser.",
          "Tap “Install” if it appears, or open the ⋮ menu.",
          "Choose “Install app” or “Add to Home screen”.",
          "Confirm to finish.",
        ],
      },
      {
        device: "Desktop",
        note: "Chrome or Edge.",
        steps: [
          "Open cmsf.info.",
          "Click the install icon at the right of the address bar.",
          "Choose “Install”.",
          "The CMSF opens in its own window.",
        ],
      },
    ],
    tip: "Open the CMSF once while connected before you rely on it offline — that first visit is what saves it to your device.",
  },
  es: {
    eyebrow: "Uso sin conexión",
    heading: "Instale el CMSF en su dispositivo",
    intro:
      "El CMSF puede agregarse a la pantalla de inicio y abrirse como una aplicación. Una vez instalado funciona sin conexión a internet, de modo que sigue disponible en salas clínicas con wifi inestable. Nada de lo que ingrese se almacena ni se transmite, en ningún dispositivo.",
    platforms: [
      {
        device: "iPhone y iPad",
        note: "Solo Safari — Chrome en iOS no permite instalar aplicaciones web.",
        steps: [
          "Abra cmsf.info en Safari.",
          "Toque el botón Compartir (el cuadrado con una flecha).",
          "Desplácese y toque «Agregar a inicio».",
          "Toque «Agregar». El ícono aparecerá junto a sus otras apps.",
        ],
      },
      {
        device: "Android",
        note: "Chrome, Edge o Samsung Internet.",
        steps: [
          "Abra cmsf.info en su navegador.",
          "Toque «Instalar» si aparece, o abra el menú ⋮.",
          "Elija «Instalar aplicación» o «Agregar a pantalla de inicio».",
          "Confirme para finalizar.",
        ],
      },
      {
        device: "Computador",
        note: "Chrome o Edge.",
        steps: [
          "Abra cmsf.info.",
          "Haga clic en el ícono de instalación a la derecha de la barra de direcciones.",
          "Elija «Instalar».",
          "El CMSF se abrirá en su propia ventana.",
        ],
      },
    ],
    tip: "Abra el CMSF una vez con conexión antes de usarlo sin internet — esa primera visita es la que lo guarda en su dispositivo.",
  },
};

function InstallInstructions({ lang = "en" }) {
  const t = COPY[lang] || COPY.en;

  return (
    <section id="install" className="scroll-mt-24 border-t border-slate-200 pt-12">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-700 mb-3">
        {t.eyebrow}
      </p>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.heading}</h2>
      <p className="text-slate-700 leading-relaxed max-w-3xl mb-8">{t.intro}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {t.platforms.map((p) => (
          <div
            key={p.device}
            className="bg-slate-50 border border-slate-300 rounded-2xl p-6"
          >
            <h3 className="font-bold text-slate-900 mb-1">{p.device}</h3>
            <p className="text-xs text-slate-600 mb-4">{p.note}</p>
            <ol className="space-y-2.5">
              {p.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                  <span className="shrink-0 w-5 h-5 rounded-md bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-700 bg-sky-50 border border-sky-300 rounded-2xl p-4 leading-relaxed">
        <span className="font-bold">{lang === "es" ? "Consejo: " : "Tip: "}</span>
        {t.tip}
      </p>
    </section>
  );
}

export default InstallInstructions;
