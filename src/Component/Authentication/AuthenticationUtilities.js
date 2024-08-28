import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, storage } from "../../Firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

// utilities of signup form

export const signupValidation = (signupFields) => {
  const regExEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const regExPass =
    "^(?=.*[0-9])" +
    "(?=.*[a-z])(?=.*[A-Z])" +
    "(?=.*[@#$%^&+=])" +
    "(?=\\S+$).{8,20}$";
  const regExUser = "^[A-Za-z][A-Za-z0-9_]{4,29}$";
  if (
    regExEmail.test(signupFields.email) &&
    signupFields.email !== "" &&
    regExPass.match(signupFields.password) &&
    signupFields.password !== "" &&
    regExUser.match(signupFields.fullName) &&
    signupFields.fullName !== ""
  ) {
    return false;
  } else {
    return true;
  }
};

export const signupSubmitHandler = async (
  e,
  signupFields,
  setSignupFields,
  setModalContent,
  setShowModal,
  history
) => {
  try {
    e.preventDefault();
    if (!signupValidation(signupFields)) {
      setModalContent({
        title: "Signup error",
        body: "Check email or enter strong password",
      });
      setShowModal(true);
      return;
    }
    const auth = getAuth();
    await createUserWithEmailAndPassword(
      auth,
      signupFields.email,
      signupFields.password
    )
      .then((userCrediential) => {
        const userId = userCrediential.user.uid;
        setModalContent({
          title: "Success",
          body: "Successfully Logged In!",
        });
        setShowModal(true);
        const dateAndTime = new Date();
        setDoc(doc(db, "UserSignupData", userId), {
          FullName: signupFields.fullName,
          Email: signupFields.email,
          CreatedAt: dateAndTime,
          UpdatedAt: dateAndTime,
        });
      })
      .catch(() => {
        setModalContent({
          title: "Signup error",
          body: "Email already in use",
        });
        setShowModal(true);
      });
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        setModalContent({
          title: "Email already in used",
          body: "Please signup with another email id",
        });
        setShowModal(true);
        break;
      default:
        break;
    }
  }
};

export const signupGoogleHandler = (setShowModal, setModalContent) => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        setModalContent({
          title: "Success",
          body: "Successfully Logged In!",
        });
        setShowModal(true);
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setModalContent({
            title: "Signup Error",
            body: "Email already used",
          });
          setShowModal(true);
          
        }
      });
  } catch {
    setModalContent({
      title: "Signup Error",
      body: "Error during signup",
    });
    setShowModal(true);
  }
};

export const signupChangeInputHandler = (e, setSignupFields) => {
  const { id, value } = e.target;
  setSignupFields((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const handleSignupConfirm = (
  setShowModal,
  modalContent,
  history,
  setSignupFields
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    
    history.replace("/userDetails");
    setSignupFields({
      fullName: "",
      email: "",
      password: "",
    });
  } else {
    history.replace("/signup");
  }
};

export const changeUserDetails = (e, setUserDetails) => {
  const { id, value } = e.target;
  setUserDetails((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const UserMobValidation = (userDetails) => {
  const isValidPhoneNumber = /^\d{10}$/.test(userDetails.mob);
  return isValidPhoneNumber;
};

export const UserDetailsSubmitHandler = async (
  e,
  photoFile,
  userDetails,
  setModalContent,
  setShowModal
) => {
  e.preventDefault();
  try {
    if (!UserMobValidation(userDetails)) {
      setModalContent({
        title: "Error",
        body: "Enter 10 digit mobile number",
      });
      setShowModal(true);
      return;
    }

    const userId = getAuth().currentUser.uid;
    let imageUrl = null;
    if (photoFile) {
      const imageName = `${photoFile.name}`;
      const imageRef = ref(storage, `UserDetails/${imageName}`);
      const snapshot = await uploadBytes(imageRef, photoFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, "UserSignupData", userId), {
      Name: userDetails.name || null,
      PhoneNumber: userDetails.mob || null,
      image: imageUrl || null,
    });

    setModalContent({
      title: "Success",
      body: "User Details updated successfully",
    });
    setShowModal(true);
  } catch {
    setModalContent({
      title: "Error",
      body: "Error in updating the user details",
    });
    setShowModal(true);
  }
};

export const handleUserModalConfirm = (
  setShowModal,
  modalContent,
  history,
  setUserDetails
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/shop");
    setUserDetails({
      name: "",
      mob: "",
      photo: "",
    });
  } else {
    history.replace("/userDetails");
  }
};
