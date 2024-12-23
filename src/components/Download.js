function Download({ name, type, alias }) {
  const hrefString = `/downloads/${name}`;
  let displayString;
  if (alias) {
    displayString = alias;
  } else {
    displayString = name.replaceAll("_", " ");
  }
  let icon;
  switch (type) {
    case "pdf":
      icon = "/images/pdficon.png";
      break;
    case "image":
      icon = "/images/imageicon.png";
      break;
    case "excel":
      icon = "/images/spreadsheeticon.png";
      break;
    default:
      icon = "/images/imageicon.png";
      break;
  }

  return (
    <li className="max-w-full">
      <a
        href={hrefString}
        download
        className="max-w-full flex flex-wrap items-center justify-center my-4 gap-2 bg-gray-900/70 hover:bg-gray-950/80 shadow-md px-5 mx-2 py-2 rounded-lg"
      >
        <span className="text-blue-300 max-w-full break-words underline text-wrap">
          {displayString}
        </span>
        <img className="w-8 h-8" src={icon} alt="" />
      </a>
    </li>
  );
}

export default Download;
