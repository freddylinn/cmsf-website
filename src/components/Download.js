function Download({ name, type }) {
  const hrefString = `/downloads/${name}`;
  let icon;
  switch (type) {
    case "pdf":
      icon = "/images/pdficon.png";
      break;
    case "image":
      icon = "/images/imageicon.png";
      break;
  }

  return (
    <div class="flex items-center gap-2">
      <a
        href={hrefString}
        download
        className="text-blue-500 underline hover:text-blue-700"
      >
        {name}
      </a>
      <img className="w-8 h-8" src={icon} alt="" />
    </div>
  );
}

export default Download;
