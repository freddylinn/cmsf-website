import NavBar from "./NavBar";
import SpanishCredit from "./SpanishCredit";

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <SpanishCredit />
      {children}
    </>
  );
}

export default Layout;
