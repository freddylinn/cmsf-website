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
    <li>
      <a
        href={hrefString}
        download
        className="flex items-center justify-center my-4 gap-2 bg-gray-900/70 hover:bg-gray-950/80 shadow-md w-max px-5 py-2 rounded-lg"
      >
        <span className="text-blue-300 underline">{displayString}</span>
        <img className="w-8 h-8" src={icon} alt="" />
      </a>
    </li>
  );
}

export default Download;
