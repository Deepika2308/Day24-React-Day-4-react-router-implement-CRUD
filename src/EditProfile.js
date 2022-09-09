import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API } from './global.js';
import {useNavigate} from "react-router-dom";

//edit user profile starts
export function EditProfile() {
  let { profile, id } = useParams();
  const navigate=useNavigate();

  let [createUser, setCreateUser] = useState(false);
  let [deleteUser, setDeleteUser] = useState(false);
  let [editFirstName, setEditFirstName] = useState(false);
  let [editLastName, setEditLastName] = useState(false);
  let [editEmailId, setEditEmailId] = useState(false);
  let [editMobileNum, setEditMobileNum] = useState(false);

  function handleEdit(event) {
    event.preventDefault();

    let editedObj = {
      create_user: createUser,
      delete_user: deleteUser,
      edit_firstName: editFirstName,
      edit_lastName: editLastName,
      edit_emailId: editEmailId,
      edit_mobileNumber: editMobileNum
    };

    fetch(`${API}/profiles/`+id, {
      method: "PUT",
      body: JSON.stringify(editedObj),
      headers: { "content-type": "application/json" },
    })
      .then(() => navigate(`/profile/`+id))
  }


  return (
    <form className="container d-flex flex-column justify-content-center m-auto p-auto" onSubmit={handleEdit}>
      <div className="mt-4">
        <h2>{`Edit ${profile} profile privileges`}</h2>
      </div>

      <div className="d-flex m-auto p-auto">
        <div className="privilege-section d-flex flex-column justify-content-center">
          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={createUser}
              id="create-user-check"
              onChange={(event) => setCreateUser(event.nativeEvent.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="create-user-check">
              Create User
            </label>
          </div>

          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={deleteUser}
              id="delete-user-check"
              onChange={(event) => setDeleteUser(event.nativeEvent.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="delete-user-check">
              Delete User
            </label>
          </div>

          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={editFirstName}
              id="edit-fname-check"
              onChange={(event) => setEditFirstName(event.nativeEvent.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="edit-fname-check">
              Edit first name
            </label>
          </div>

          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={editLastName}
              id="edit-lname-check"
              onChange={(event) => setEditLastName(event.nativeEvent.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="edit-lname-check">
              Edit last name
            </label>
          </div>

          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={editEmailId}
              id="edit-email-check"
              onChange={(event) => setEditEmailId(event.nativeEvent.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="edit-email-check">
              Edit Email
            </label>
          </div>

          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={editMobileNum}
              id="edit-mobile-check"
              onChange={(event) => setEditMobileNum(event.nativeEvent.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="edit-mobile-check">
              Edit mobile number
            </label>
          </div>
        </div>
      </div>

      <Button type="submit" className="update-user-profile mt-4 m-auto p-auto">
        Update
      </Button>

    </form>
  );
}
