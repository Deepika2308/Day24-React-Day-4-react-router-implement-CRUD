import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from './global.js';

//Edit user form starts

export function EditUser({ formValue }) {
  let [fname, setFname] = useState(formValue.fname);
  let [lname, setLname] = useState(formValue.lname);
  let [emailId, setEmailId] = useState(formValue.emailId);
  let [mobileNum, setMobileNum] = useState(formValue.mobileNum);
  let [profile, setProfile] = useState(formValue.profile);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let updatedFormValue = {
      fname: fname,
      lname: lname,
      emailId: emailId,
      mobileNum: mobileNum,
      profile: profile,
    };

    fetch(`${API}/users/`+formValue.id, {
      method: "PUT",
      body: JSON.stringify(updatedFormValue),
      headers: { "content-type": "application/json" },
    })
      .then(() => navigate("/users"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      <form
        className="create-user-form container mt-5 d-flex flex-column gap-4"
        onSubmit={handleSubmit}
      >
        <h3>Edit User Form</h3>
        <input
          type="text"
          className="form-control"
          name="firstName"
          id="firstName"
          value={fname}
          placeholder="First Name"
          onChange={(event) => setFname(event.target.value)}
        ></input>
        <input
          type="text"
          className="form-control"
          name="lastName"
          id="lastName"
          value={lname}
          placeholder="Last Name"
          onChange={(event) => setLname(event.target.value)}
        ></input>
        <input
          type="email"
          className="form-control"
          name="emailId"
          id="emailId"
          value={emailId}
          placeholder="Email Id"
          onChange={(event) => setEmailId(event.target.value)}
          required
        ></input>
        <input
          type="text"
          className="form-control"
          name="mobileNum"
          id="mobileNum"
          value={mobileNum}
          placeholder="Mobile Number"
          onChange={(event) => setMobileNum(event.target.value)}
        ></input>
        <select
          value={profile}
          className="form-control"
          aria-label="select Profile dropdown"
          onChange={(event) => {
            let index = event.nativeEvent.target.selectedIndex;
            let textValue = event.nativeEvent.target[index].text;
            setProfile(textValue);
          }}
        >
          <option>Select profile</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <div className="d-flex gap-3 justify-content-center">
          <button type="submit" className="btn btn-primary col-4">
            Update
          </button>
          <button type="button" className="btn btn-primary col-4" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </form>
    </div>
  );
}
