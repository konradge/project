import React from "react";
import Dropzone from "react-dropzone";

export default function FileUpload(props) {
  return (
    <Dropzone
      onDrop={evt => {
        const reader = new FileReader();
        reader.onload = () => {
          // reader.result ist Dateiinhalt
          props.recievedFile(reader.result);
        };
        reader.readAsText(evt[0]);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="file-drop" {...getRootProps()}>
          <input {...getInputProps()} />
          {props.description}
        </div>
      )}
    </Dropzone>
  );
}
