import Download from "../components/Download";
import WebsiteUpdates from '../components/WebsiteUpdates';
function Downloads() {
  return (
    <div className="bg-[url('../public/images/greenmountain.webp')] bg-cover min-h-[calc(100vh-4rem)] max-w-full">
      <div className="h-4"></div>
      <h1 className="text-3xl font-bold text-center py-2 mt-4 mb-8 bg-gray-900/70 backdrop-blur-sm text-white rounded-md w-max px-8 mx-auto">
        Downloads
      </h1>
      <ul className="max-w-[100vw] md:w-2/3 flex flex-col flex-wrap items-center md:mx-auto md:items-start">
        <Download
          name="CMSF_Printable.xlsx"
          type="excel"
          alias="Downloadable Excel Version of the CMSF"
        />
        <Download
          name="CMSF_Checkable.xlsm"
          type="excel"
          alias="Downloadable Excel Version of the CMSF (checkable)"
        />
        <Download
          name="CMSF_Printable.pdf"
          type="pdf"
          alias="PDF Version of the CMSF"
        />
        <Download name="CMSF_References.pdf" type="pdf" />
        <Download name="CMSF_Documentation_Examples.pdf" type="pdf" />
        <Download
          name="CMSF_Common_Diagnoses_by_Dysarthria_Subtype.pdf"
          type="pdf"
          alias="Common_Diagnoses_by_Dysarthria_Subtype.pdf"
        />
        <Download name="Kite_Picture.jpg" type="image" />
      </ul>
            
      <WebsiteUpdates />
    </div>
  );
}

export default Downloads;
