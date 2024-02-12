import "./RegistrationForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../app/userSlice";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const register = dispatch(
      registerUserAsync({ firstName, lastName, email, password })
    );
    console.log(register);
    setShowSuccessMessage(true)
    setTimeout(() => {
      const resetShowMessage = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setShowSuccessMessage(false);
      };
      resetShowMessage();
    }, 8000);
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="success-message">
          <p>
            {`${firstName} ${lastName}! You are successfully Registered in the Application`}
          </p>
        </div>
      )}
      <div className="registration-container">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
