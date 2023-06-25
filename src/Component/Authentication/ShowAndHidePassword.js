import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
function ShowAndHidePassword() {
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="row">
      <input
        type={passwordType}
        style={{
          width: "24rem",
          borderRadius: "0.5rem",
          borderBlockColor: "black",
          fontSize: "larger",
          padding: "5px",
          margin: "10px ",
        }}
        autoComplete="current-password"
        onChange={handlePasswordChange}
        value={passwordInput}
        name="password"
        placeholder="password"
      />

      <i
        className="btn btn-outline"
        style={{
          borderRadius: "10px",
          backgroundColor: "white",margin: "10px "
        }}
        onClick={togglePassword}
      >
        {passwordType === "password" ? (
          <AiOutlineEyeInvisible />
        ) : (
          <AiOutlineEye />
        )}
      </i>
    </div>
  );
}
export default ShowAndHidePassword;
