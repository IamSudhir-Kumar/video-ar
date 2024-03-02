import React, { ChangeEvent, useState } from "react";
import styles from "./Upload.module.scss";
import Button from "../common/Button/Button";
import { fileUpload } from "@/API/FileUpload";
export default function Upload() {
  const [isFileVisible, setIsFileVisible] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Access files directly from event.target
    if (files && files.length > 0) {
      // Check if files exist and are not empty
      let selectedFile = event.target.files?.[0]; // Get the first file
      fileUpload(selectedFile); // Call the fileUpload function
    }
  };

  return (
    <div className={styles.uploadMain}>
      <Button
        tittle="Upload a file"
        btnClass="btn-primary"
        onClick={() => setIsFileVisible(!isFileVisible)}
      />

      {isFileVisible && (
        <input
          type="file"
          onChange={uploadFile} // Use onChange event
          className="file-input w-full max-w-xs"
        />
      )}
      <Button tittle="Add a folder" btnClass="btn-success" />
    </div>
  );
}
