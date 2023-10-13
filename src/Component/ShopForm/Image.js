
import React, { useState } from 'react';
import { storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";

const Image = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const upload = async () => {
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `images/${v4()}`);
    const metadata = {
      contentType: 'image/jpeg'
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      // (snapshot) => {
      //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log('Upload is ' + progress + '% done');
      //   switch (snapshot.state) {
      //     case 'paused':
      //       console.log('Upload is paused');
      //       break;
      //     case 'running':
      //       console.log('Upload is running');
      //       break;
      //     default:
      //       break;
      //   }
      // },
      // (error) => {
      //   switch (error.code) {
      //     case 'storage/unauthorized':
      //       // User doesn't have permission to access the object
      //       break;
      //     case 'storage/canceled':
      //       // User canceled the upload
      //       break;
      //     case 'storage/unknown':
      //       // Unknown error occurred, inspect error.serverResponse
      //       break;
      //     default:
      //       break;
      //   }
      // },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={upload}>Submit</button>
    </div>
  );
}

export default Image;
