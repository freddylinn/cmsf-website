function Intro() {
  return (
    <div className="bg-[url('../public/images/greenmountain.webp')] flex flex-col justify-between bg-cover min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold text-center py-2 mt-8 mb-4 bg-gray-900/70 backdrop-blur-sm text-white rounded-md w-1/2 mx-auto">
        Welcome to the Colorado Motor Speech Framework!
      </h1>
      <p className="text-lg leading-relaxed text-left mb-auto w-11/12 lg:w-256 mx-auto bg-gray-900/70 backdrop-blur-sm text-white p-6 rounded-md">
        This is a tool to help guide the assessment of motor speech disorders.
        There are suggested tasks to administer in the popup window if you hover
        over the blue “i” in the far left-hand column. Using those tasks, you
        will identify which characteristics you are observing with your patient
        by checking the yes/no box for that characteristic. The resulting boxes
        for that row will be highlighted to indicate if that characteristic is a
        highly distinguishing feature for a particular motor speech disorder
        subtype (green and XX), a common feature for that subtype (yellow and
        X), not common (blank), or would be very unexpected (red and -). As you
        scroll down, you can then click the box “Hide Unchecked Rows” to isolate
        only the observed characteristics. You will also notice a count total at
        the very bottom to assist your diagnostic decision making. However,
        remember that your clinical knowledge should be used foremost over the
        count of X's to make a decision. We also recommend logging participant
        self-rating of their speech and then your clinician estimates of
        intelligibility, naturalness, and efficiency in the provided box at the
        end. When you are completed with the assessment, you can save it as a
        PDF by going right clicking the window, selecting “Print,” and changing
        the destination to “Save as PDF.”
      </p>
      <footer className="w-full bg-zinc-800 py-4">
        <p className="text-sm leading-relaxed text-center w-3/4 mx-auto text-slate-300">
          The CMSF tool was developed by Kylie Dunne-Platero, MA, CCC-SLP,
          Caitlin Cloud, MA, CCC-SLP, and Allison Hilger, PhD, CCC-SLP. Website
          developed by Frederick Linn (
          <a
            href="mailto:frederick.linn@colorado.edu"
            className="underline text-blue-500"
          >
            Frederick.Linn@colorado.edu.
          </a>
          ) If you have any comments or suggestions, please email Dr. Allison
          Hilger at{" "}
          <a
            className="underline text-blue-500"
            href="mailto:Allison.Hilger@colorado.edu"
          >
            Allison.Hilger@colorado.edu
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Intro;
