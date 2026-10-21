import React from "react";
import { Link } from "react-router-dom";
import InstallInstructions from "../components/InstallInstructions";

function IntroES() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-left">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 mb-5">
          Adaptación al español de Chile · SPCh
        </p>

        <h1 className="text-4xl md:text-6xl tracking-tight mb-6 leading-tight">
          <span className="font-bold text-slate-900">Colorado</span>{" "}
          <span className="font-normal text-slate-600">
            Motor Speech Framework
          </span>{" "}
          <span className="font-normal text-slate-500">— SPCh</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed mb-10">
          Un marco clínico para apoyar a fonoaudiólogas y fonoaudiólogos en el
          diagnóstico diferencial y la clasificación de los trastornos motores
          del habla.
        </p>

        <div className="space-y-4 mb-12 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/es/tool"
              className="px-5 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:bg-sky-600 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Iniciar evaluación
            </Link>
            <Link
              to="/es/movement"
              className="px-5 py-4 bg-white border-2 border-slate-500 text-slate-700 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 hover:border-slate-700 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Movimiento corporal
            </Link>
            <Link
              to="/es/patient-view"
              className="px-5 py-4 bg-white border-2 border-slate-500 text-slate-700 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 hover:border-slate-700 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Estímulos para la persona
            </Link>
          </div>
        </div>

        <hr className="border-slate-100 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 mb-6">
              Cómo usar el CMSF
            </h2>
            <ul className="space-y-4 text-slate-600 leading-relaxed font-medium">
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Administre las
                tareas habituales de evaluación motora del habla.
              </li>
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Obtenga
                muestras en distintos contextos (habla espontánea, lectura,
                repetición).
              </li>
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Observe las
                características desviadas en cada subsistema.
              </li>
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Marque las
                características claramente presentes.
              </li>
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Revise el
                resumen diagnóstico para examinar los patrones.
              </li>
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Use los
                patrones para apoyar el razonamiento neuroanatómico.
              </li>
              <li className="flex gap-4">
                <span className="text-sky-500 font-black">—</span> Documente sus
                impresiones con el generador de resumen clínico.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">
              Privacidad clínica
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed italic font-medium">
              Para resguardar la privacidad de la persona evaluada, ningún dato
              ingresado se almacena ni se transmite. Todos los cálculos ocurren
              localmente en su navegador.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <InstallInstructions lang="es" />
        </div>

        <div className="border-t border-slate-100 pt-12 mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-8">
            Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">
                Adaptación al español de Chile
              </p>
              <p className="font-bold text-slate-900">
                Sebastián Contreras Cubillos, Flgo. Mg.
              </p>
              <p className="font-bold text-slate-900">
                Andrea Salazar Aguayo, Flga. Mg.
              </p>
              <p className="font-bold text-slate-900">
                Patricia Oyarzún Díaz, Flga. Dra.
              </p>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Universidad Santo Tomás, Chile
              </p>
              <p className="text-slate-600 mt-2 leading-relaxed">
                <a
                  href="mailto:scontreras8@santotomas.cl"
                  className="text-sky-600 underline break-all"
                >
                  scontreras8@santotomas.cl
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">
                Autoras del instrumento original
              </p>
              <p className="font-bold text-slate-900">
                Allison Hilger, PhD, CCC-SLP
              </p>
              <p className="font-bold text-slate-900">
                Caitlin Cloud, MA, CCC-SLP
              </p>
              <p className="font-bold text-slate-900">
                Kylie Dunne-Platero, MS, CCC-SLP
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-12 mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">
            Financiamiento
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Proyecto patrocinado por el Fondo de Apoyo a la Investigación
            (FAI 05-25) de la Sociedad Chilena de Fonoaudiología.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">
            Fuentes de los estímulos
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
            <li>
              Toledo Rodríguez, L., &amp; Tobar Fredes, R. (2021).{" "}
              <em>
                Protocolo de evaluación del habla PEVH Disartria — Formato
                abreviado revisado (v. 2021)
              </em>
              .{" "}
              <a
                className="text-sky-600 underline"
                href="https://repositorio.uchile.cl/handle/2250/210007"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositorio Universidad de Chile
              </a>
            </li>
            <li>
              Soto-Barba, J., Díaz, E., &amp; Pereira, D. (2015). Variación
              alofónica y diatópica del fonema /b/ en el español de profesionales
              chilenos en situación de lectura en voz alta.{" "}
              <em>Literatura y Lingüística, 32</em>, 201–216.{" "}
              <a
                className="text-sky-600 underline break-all"
                href="https://doi.org/10.4067/S0716-58112015000200011"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://doi.org/10.4067/S0716-58112015000200011
              </a>
            </li>
            <li>
              Fernández, F. (2021). Textos fonéticos de El Salvador, Nicaragua,
              Costa Rica y Panamá (1960–2006).{" "}
              <em>Estudios filológicos</em>, (68), 47–68.{" "}
              <a
                className="text-sky-600 underline break-all"
                href="https://doi.org/10.4067/S0071-17132021000200047"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://doi.org/10.4067/S0071-17132021000200047
              </a>
            </li>
            <li>
              Camargo, M., &amp; Marín, J. (2013). ¿Es la lectura «El arco iris»
              apropiada para evaluar desórdenes del habla?{" "}
              <em>Revista Colombiana de Rehabilitación, 12</em>(1), 40–45.{" "}
              <a
                className="text-sky-600 underline break-all"
                href="https://doi.org/10.30788/RevColReh.v12.n1.2013.42"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://doi.org/10.30788/RevColReh.v12.n1.2013.42
              </a>
            </li>
            <li>
              Martínez Cifuentes &amp; Torres Bustos (en prensa). Refranes
              fonológicamente equilibrados para la evaluación clínica del habla
              en adultos chilenos.
            </li>
          </ul>
        </div>

        <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-medium text-lg">
            ¿Tiene comentarios sobre esta adaptación?
          </p>
          <a
            href="mailto:allison.hilger@colorado.edu"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
          >
            Escríbanos
          </a>
        </div>
      </div>

      <footer className="py-16 bg-slate-50 border-t border-slate-100 text-center px-6">
        <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest leading-loose">
          © 2023-2026, Regents of the University of Colorado. Colorado Motor
          Speech Lab. <br />
          Instrumento bajo licencia CC BY-SA 4.0.
        </p>
      </footer>
    </div>
  );
}

export default IntroES;
