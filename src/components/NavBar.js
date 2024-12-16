function NavBar() {
  return (
    <header className="flex justify-around items-center h-16 bg-amber-100 print:hidden">
      <h1 className="text-2xl font-bold text-center bg-amber-100">
        <a href="/">Colorado Motor Speech Framework</a>
      </h1>
      <div>
        <a href="/tool" className="mx-6 text-xl font-semibold hover:underline">
          CMSF Tool
        </a>
        <a
          href="/downloads"
          className="mx-6 text-xl font-semibold hover:underline"
        >
          Downloads
        </a>
        <a href="/tool" className="mx-6 text-xl font-semibold hover:underline">
          Audio
        </a>
      </div>
    </header>
  );
}

export default NavBar;
