import React, { useState } from "react";
import "./UserDetails.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth } from "firebase/auth";
import HomePageNavigation from "../../Header/HomePageNavigation";
import {
  handleUserModalConfirm,
  changeUserDetails,
  UserDetailsSubmitHandler,
} from "../AuthenticationUtilities";
import UserDetailsForm from "./UserDetailsForm";
import { MessageBox } from "../../MessageBox";

function UserDetails() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    name: "",
    mob: "",
    photo: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const emailId = getAuth().currentUser.email;

  const handleImagechange = (e) => {
    const ImageObject = e.target.files[0];
    if (ImageObject) {
      setPhotoFile(ImageObject);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(ImageObject);
    }
  };

  return (
    <div>
      <HomePageNavigation />
      <UserDetailsForm
        UserDetailsSubmitHandler={(e) =>
          UserDetailsSubmitHandler(
            e,
            photoFile,
            userDetails,
            setModalContent,
            setShowModal
          )
        }
        userDetails={userDetails}
        changeUserDetails={(e) => changeUserDetails(e, setUserDetails)}
        handleImagechange={handleImagechange}
        emailId={emailId}
      />
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          handleUserModalConfirm(
            setShowModal,
            modalContent,
            history,
            setUserDetails
          )
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
}

export default UserDetails;
