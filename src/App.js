import "./App.css";
import Compress from "browser-image-compression";
import { useState } from "react";
import { saveAs } from "file-saver";
import SideAd from "./PushAd";

function App() {
  const [compressedFile, setCompressedFile] = useState(null);

  const downloadImage = async () => {
    saveAs(compressedFile, "image.jpg"); // Put your image url here.
    setCompressedFile(null);
  };

  let file = null;
  const onChange = async (e) => {
    setCompressedFile(null);
    file = e.target.files[0];
    console.log("user uplaod", { file });
    // const options = {
    //   maxWidthOrHeight: 200,
    //   useWebWorker: true,
    // };
  };

  async function compressImage(maxSizeMB, width) {
    Compress(file, { maxWidthOrHeight: width, maxSizeMB, useWebWorker: true })
      .then((compressedBlob) => {
        console.log(compressedBlob);
        compressedBlob.lastModifiedDate = new Date();
        const convertedBlobFile = new File([compressedBlob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        console.log(convertedBlobFile.size);
        setCompressedFile(convertedBlobFile);
        // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
      })
      .catch((e) => {
        alert(e);
        // Show the user a toast message or notification that something went wrong while compressing file
      });
    console.log();
  }

  return (
    <div className="App">
      <h1 className="title">Image Resizer</h1>
      <input
        className="input-box"
        name="file"
        type="file"
        id="file"
        onChange={(e) => onChange(e)}
      />

      <div>
        {/* <div className="comrpessed-size">
          {" "}
          New compressed size is {Math.floor(compressedFile.size / 1024)} KB
        </div> */}

        <button
          className="select-btn"
          onClick={async () => {
            await compressImage(0.02, 200);
            //selectImage();
          }}
        >
          20 KB
        </button>
        <button
          className="select-btn"
          onClick={async () => {
            await compressImage(0.05, 500);
            //selectImage();
          }}
        >
          50 KB
        </button>
        <button
          className="select-btn"
          onClick={async () => {
            await compressImage(0.09, 1000);
            //selectImage();
          }}
        >
          100 KB
        </button>

        <button
          className="select-btn"
          onClick={async () => {
            await compressImage(0.2, 1500);
          }}
        >
          200 KB
        </button>
        <button
          className="select-btn"
          onClick={async () => {
            await compressImage(0.5, 2000);
          }}
        >
          500 KB
        </button>
        <button
          className="select-btn"
          onClick={async () => {
            await compressImage(1, 4000);
          }}
        >
          1 MB
        </button>
        <br></br>
        <button
          className="download-btn"
          onClick={async () => {
            downloadImage();
          }}
        >
          download
        </button>
      </div>

      <SideAd />
    </div>
  );
}
export default App;
