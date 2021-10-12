import logo from './logo.svg';
import './App.css';
import Compress from "browser-image-compression";
import { useState } from 'react';
import { saveAs } from 'file-saver'

function App() {

  const [compressedFile, setCompressedFile] = useState(null)

  const downloadImage = () => {
    saveAs(compressedFile, 'image.jpg') // Put your image url here.
  }

  const onChange = async (e) => {
    // Some onchange event calls
    setCompressedFile(null)
    const file = e.target.files[0];
    const options = {
      maxWidthOrHeight: 200,
      useWebWorker: true,
    }

    Compress(file, options)
      .then(compressedBlob => {
        console.log(compressedBlob)
        compressedBlob.lastModifiedDate = new Date()
        const convertedBlobFile = new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now() })
        console.log(convertedBlobFile.size)
        setCompressedFile(convertedBlobFile)
        // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
      })
      .catch(e => {
        alert(e)
        // Show the user a toast message or notification that something went wrong while compressing file
      })
    console.log()
  };

  return (
    <div className="App">
      <h1 className='title'>Image compressor</h1>
      <input className='input-box' name="file" type="file" id="file" onChange={(e) => onChange(e)} />
      {
        compressedFile ?
          <div>
            <div className='comrpessed-size'> New compressed size is {Math.floor(compressedFile.size / 1024)} KB</div>
            <button className='download-btn' onClick={() => { downloadImage() }}>Download</button>
          </div>
          : null
      }

    </div>
  );
}

export default App;
