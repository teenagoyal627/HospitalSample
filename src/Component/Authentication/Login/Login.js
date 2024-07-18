import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HomePageNavigation from "../../Header/HomePageNavigation";
import { MessageBox } from "../../MessageBox";
import LoginForm from "./LoginForm";
import {
  Validation,
  submitHandler,
  googleHandler,
  changeInputHandler,
  handleConfirm,
} from "./Utilities";

const Login = () => {
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const history = useHistory();

  return (
    <div>
      <HomePageNavigation />
      <LoginForm
        loginFields={loginFields}
        changeInputHandler={(e) => changeInputHandler(e, setLoginFields)}
        visible={visible}
        setVisible={setVisible}
        Validation={() => Validation(loginFields)}
        submitHandler={(e) =>
          submitHandler(e, setModalContent, setShowModal, loginFields)
        }
        googleHandler={() => googleHandler(setShowModal, setModalContent)}
      />
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          handleConfirm(modalContent, history, setLoginFields, setShowModal)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
};

export default Login;
