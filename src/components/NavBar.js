function NavBar() {
  return (
    <header className="flex justify-around flex-wrap items-center h-32 md:h-16 bg-amber-100 print:hidden">
      <h1 className="text-xl md:text-2xl font-bold text-center hover:underline">
        <a href="#/">Colorado Motor Speech Framework</a>
      </h1>
      <div className="flex flex-wrap justify-center">
        <a
          href="#/tool"
          className="mx-6 text-md md:text-xl font-semibold hover:underline"
        >
          CMSF Tool
        </a>
        <a
          href="#/downloads"
          className="mx-6 text-md md:text-xl font-semibold hover:underline"
        >
          Downloads
        </a>
        <a
          href="#/audio"
          className="mx-6 text-md md:text-xl font-semibold hover:underline"
        >
          Audio
        </a>
      </div>
    </header>
  );
}

export default NavBar;
