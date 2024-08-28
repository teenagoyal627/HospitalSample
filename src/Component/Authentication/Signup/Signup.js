import React, { useState } from "react";
import HomePageNavigation from "../../Header/HomePageNavigation";
import {
  signupGoogleHandler,
  signupChangeInputHandler,
  signupValidation,
  signupSubmitHandler,
  handleSignupConfirm,
} from "../AuthenticationUtilities";
import SignupForm from "./SignupForm";
import { MessageBox } from "../../MessageBox";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = () => {
  const [signupFields, setSignupFields] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  return (
    <div>
      <HomePageNavigation />
      <SignupForm
        signupFields={signupFields}
        signupChangeInputHandler={(e) =>
          signupChangeInputHandler(e, setSignupFields)
        }
        visible={visible}
        setVisible={setVisible}
        signupValidation={() => signupValidation(signupFields)}
        signupSubmitHandler={(e) =>
          signupSubmitHandler(
            e,
            signupFields,
            setSignupFields,
            setModalContent,
            setShowModal,
            history
          )
        }
        signupGoogleHandler={() =>
          signupGoogleHandler(setShowModal, setModalContent)
        }
      />

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          handleSignupConfirm(
            setShowModal,
            modalContent,
            history,
            setSignupFields
          )
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
};

export default Signup;
