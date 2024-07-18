import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../Firebase";

export const Validation = (loginFields) => {
  const regExEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const regExPass =
    "^(?=.*[0-9])" +
    "(?=.*[a-z])(?=.*[A-Z])" +
    "(?=.*[@#$%^&+=])" +
    "(?=\\S+$).{8,20}$";
  if (
    regExEmail.test(loginFields.email) &&
    loginFields.email !== "" &&
    regExPass.match(loginFields.password) &&
    loginFields.password !== ""
  ) {
    return false;
  } else {
    return true;
  }
};

export const submitHandler = (
  e,
  setModalContent,
  setShowModal,
  loginFields
) => {
  try {
    e.preventDefault();
    if (!Validation(loginFields)) {
      setModalContent({
        title: "Login error",
        body: "Check email or enter strong password",
      });
      setShowModal(true);
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginFields.email, loginFields.password)
      .then(() => {
        setModalContent({
          title: "Success",
          body: "Successfully Logged In!",
        });
        setShowModal(true);
      })
      .catch(() => {
        setModalContent({
          title: "Login error",
          body: "Enter correct email or password for login",
        });
        setShowModal(true);
      });
  } catch {
    setModalContent({
      title: "Login Error",
      body: "Please signup before login",
    });
    setShowModal(true);
  }
};

export const googleHandler = (setShowModal, setModalContent) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      setModalContent({
        title: "Success",
        body: "Successfully Logged In!",
      });
      setShowModal(true);
    })
    .catch(() => {
      setModalContent({
        title: "Login Error",
        body: "Google sign-in failed. Please try again.",
      });
      setShowModal(true);
    });
};

export const changeInputHandler = (e, setLoginFields) => {
  const { id, value } = e.target;
  setLoginFields((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const handleConfirm = (
  setShowModal,
  modalContent,
  history,
  setLoginFields
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/inventory");
    setLoginFields({
      email: "",
      password: "",
    });
  } else {
    history.replace("/login");
  }
};
