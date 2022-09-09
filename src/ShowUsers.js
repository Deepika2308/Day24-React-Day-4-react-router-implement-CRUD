import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API } from './global.js';
import { HomeLink } from "./HomeLink";

//Component to show users list starts
export function ShowUsers() {
  let navigate = useNavigate();
  let [userList, setUserList] = useState([]);

  function fetchUsers() {
    fetch(`${API}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      });
  }

  useEffect(fetchUsers, []);

  return (
    <div className="container py-4">
      <div>
        <h4>Users List</h4>
      </div>

      <div className="d-flex flex-wrap mt-5 justify-content-evenly gap-4">
        {userList.map((obj, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-body">
                <p className="card-text">{`First Name: ${obj.fname}`}</p>
                <p className="card-text">{`Last Name: ${obj.lname}`}</p>
                <p className="card-text">{`Email ID : ${obj.emailId}`}</p>
                <p className="card-text">{`Mobile: ${obj.mobileNum}`}</p>
                <p className="card-text">{`Profile: ${obj.profile}`}</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Button
                  className="mb-4 col-4"
                  type="button"
                  onClick={() => navigate(`/edit-user/`+obj.id)}
                >
                  Edit
                </Button>

                {/* delete button */}
                <Button
                  className="mb-4 col-4"
                  type="button"
                  onClick={() => {
                    fetch(`${API}/users/`+obj.id, {
                      method: "DELETE",
                    })
                      .then((data) => data.json())
                      .then((user) => {
                        fetchUsers();
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <HomeLink />
    </div>
  );
}
