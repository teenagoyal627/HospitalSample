import React from 'react';
import "./UserDetails.css";

const UserDetailsForm = ({ UserDetailsSubmitHandler, userDetails, changeUserDetails, handleImagechange, emailId }) => {
  return (
    <div className="forms">
      <div>
        <h1 className="heading">User Details</h1>
      </div>
      <form onSubmit={UserDetailsSubmitHandler}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            required
            value={userDetails.name}
            onChange={changeUserDetails}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            id="mob"
            placeholder="(0000) 0000-00"
            required
            value={userDetails.mob}
            onChange={changeUserDetails}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={emailId}
            disabled
          />
        </div>
        <div>
          <label>Upload Profile Image</label>
          <div className="image-upload-section">
            <div className="image-upload-box">
              <input type="file" accept="image/*" required style={{ width: "15rem", marginRight: "1.5rem", marginLeft: ".1rem" }}
                onChange={handleImagechange}
              />
              {userDetails.photo && (
                <img src={userDetails.photo} alt="UserImage" className="image-preview" style={{ width: "200px", height: "200px" }}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default UserDetailsForm;
