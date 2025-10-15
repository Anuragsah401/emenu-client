import React from "react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const UploadImage = ({image, setImage, required}) => {
  return (
    <>
      <FilePond
        files={image}
        onupdatefiles={setImage}
        allowFileSizeValidation={true}
        maxFileSize={200000}
        allowFileTypeValidation={true}
        acceptedFileTypes={["image/*"]}
        labelMaxFileSizeExceeded={"File is too large"}
        className="cursor-pointer"
        name="foodImg"
        required={required}
      />
    </>
  );
};

export default UploadImage;
