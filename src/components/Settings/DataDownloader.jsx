import React from "react";

function DataDownloader(props) {
  const url =
    "text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(props.userData));
  return (
    <div className="subsection">
      <h2>Download all your fitness-data as JSON:</h2>
      <a
        className="ui button"
        href={"data:'" + url}
        download="fitness-data.json"
        title="Download all of your user-data"
      >
        Download
      </a>
    </div>
  );
}

export default DataDownloader;
