import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import {API} from './global.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/create-user" element={<Header />} />
          <Route exact path="/" element={<h1>welcome!</h1>} />
          <Route path="/users" element={<ShowUsers />} />
          <Route path="/edit-user/:id" element={<GetUserFromDB />} />
          <Route path="/profile/:id" element={<ShowProfile />}></Route>
          <Route path="/edit-profile/:profile/:id" element={<EditProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// function WelcomePage(){

// }

function Header() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [emailId, setEmailId] = useState("");
  let [mobileNum, setMobileNum] = useState("");
  let [profile, setProfile] = useState(undefined);
  let [showModal, setShowModal] = useState(false);
  let [modalMsg, setModalMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newUser = {
      fname: fname,
      lname: lname,
      emailId: emailId,
      mobileNum: mobileNum,
      profile: profile,
    };

    fetch(`${API}/createUser`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          setShowModal(true);
          setModalMsg("User has been added successfully!!");
        } else {
          setShowModal(true);
          setModalMsg("User already exists!!");
        }
      });
  };

  return (
    <div className="container">
      <form
        className="create-user-form container mt-5 d-flex flex-column gap-4"
        onSubmit={handleSubmit}
      >
        <h3>Create User Form</h3>
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
            let value = event.nativeEvent.target[index].text;
            setProfile(value);
          }}
        >
          <option>Select Profile</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary col-4">
            Create User
          </button>
        </div>
      </form>

      {/* modal starts */}
      <Modal show={showModal}>
        <Modal.Body>
          <p>{modalMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button aria-label="Close" onClick={() => setShowModal(!showModal)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal ends */}
    </div>
  );
}

//Component to show users list starts
function ShowUsers() {
  let navigate = useNavigate();
  let [userList, setUserList] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [modalMsg, setModalMsg] = useState("");

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
                  onClick={() => navigate(`/edit-user/${obj._id}`)}
                >
                  Edit
                </Button>

                {/* delete button */}
                <Button
                  className="mb-4 col-4"
                  type="button"
                  onClick={() => {
                    fetch(`${API}/deleteUser/${obj._id}`, {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.acknowledged) {
                          setShowModal(true);
                          setModalMsg("User deleted successfully!!");
                          fetchUsers();
                        } else {
                          setShowModal(true);
                          setModalMsg("Error in deleting user, try again!!");
                        }
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
    </div>
  );
}
//Component to show users list ends

//get user values from DB starts
function GetUserFromDB() {
  let { id } = useParams();
  let [formValue, setFormValue] = useState(null);

  //get user values from db
  useEffect(() => {
    fetch(`${API}/findUser/` + id)
      .then((response) => response.json())
      .then((data) => {
        setFormValue(data);
      });
  }, []);

  return formValue ? <EditUser formValue={formValue} /> : "";
}
//get user values from DB Ends

//Edit user form starts
function EditUser({ formValue }) {
  let [fname, setFname] = useState(formValue.fname);
  let [lname, setLname] = useState(formValue.lname);
  let [emailId, setEmailId] = useState(formValue.emailId);
  let [mobileNum, setMobileNum] = useState(formValue.mobileNum);
  let [profile, setProfile] = useState(formValue.profile);
  let [showModal, setShowModal] = useState(false);
  let [modalMsg, setModalMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let updatedFormValue = {
      fname: fname,
      lname: lname,
      emailId: emailId,
      mobileNum: mobileNum,
      profile: profile,
    };

    fetch(`${API}/updateUser/${formValue._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedFormValue),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setShowModal(true);
        setModalMsg("User has been updated successfully!!");
      })
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
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary col-4">
            Update
          </button>
        </div>
      </form>

      {/* modal starts */}
      <Modal show={showModal}>
        <Modal.Body>
          <p>{modalMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button aria-label="Close" onClick={() => setShowModal(!showModal)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal ends */}
    </div>
  );
}
//Edit user form ends

//edit user profile starts
function EditProfile() {
let {profile,id} = useParams();

let[createUser,setCreateUser] =useState(false);
let[deleteUser,setDeleteUser] =useState(false);
let[editFirstName,setEditFirstName] =useState(false);
let[editLastName,setEditLastName] =useState(false);
let[editEmailId,setEditEmailId] =useState(false);
let[editMobileNum,setEditMobileNum] =useState(false);
let[showModal,setShowModal]=useState(false);
let[modalMsg,setModalMsg] = useState("");

function handleEdit(event){
  event.preventDefault();

  let editedObj={
    create_user:createUser,
    delete_user:deleteUser,
    edit_firstName:editFirstName,
    edit_lastName:editLastName,
    edit_emailId:editEmailId,
    edit_mobileNumber:editMobileNum
  }

  fetch(`${API}/editProfile/${id}`,{
    method:"PUT",
    body:JSON.stringify(editedObj),
    headers:{"content-type":"application/json"},
  })
  .then(response => response.json())
  .then(data => {
    if(data.modifiedCount > 0){
      setShowModal("true");
      setModalMsg("Profile has been updated successfully!!");
    }
    else{
      setShowModal("true");
      setModalMsg("Error in updating profile/no change in the existing profile!!");
    }
  })
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


      {/* modal starts */}
      <Modal show={showModal}>
        <Modal.Body>
          <p>{modalMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button aria-label="Close" onClick={() => setShowModal(!showModal)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal ends */}
    </form>
  );
}
//edit user profile ends

//showProfile starts
function ShowProfile() {
  let { id } = useParams();
  return <Profile id={id} />;
}
//showprofile ends

//show user profile starts
function Profile({id}) {

  let [profile,setProfile] = useState({});
   let navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/getProfile/${id}`)
    .then(response => response.json())
    .then(data => {
      setProfile(data);
    })
  })

  return (
    <div className="container d-flex flex-column justify-content-center m-auto p-auto mt-4">
      <h3>{`${profile.name} privileges`}</h3>

      <div className="d-flex m-auto p-auto">
        <div className="container d-flex flex-column gap-3  justify-content-center mt-5">
          <div className="d-flex gap-2">
            <div>
              {profile.create_user?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
            </div>
            <div>Create User</div>
          </div>
          <div className="d-flex gap-2">
            <div>
            {profile.delete_user?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
            </div>
            <div>Delete User</div>
          </div>
          <div className="d-flex gap-2">
            <div>
            {profile.edit_firstName?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
            </div>
            <div>Edit First Name</div>
          </div>
          <div className="d-flex gap-2">
            <div>
            {profile.edit_lastName?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
            </div>
            <div>Edit Last Name</div>
          </div>
          <div className="d-flex gap-2">
            <div>
            {profile.edit_emailId?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
            </div>
            <div>Edit Mail Id</div>
          </div>
          <div className="d-flex gap-2">
            <div>
            {profile.edit_mobileNumber?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
            </div>
            <div>Edit Mobile Number</div>
          </div>
        </div>
      </div>
      <Button type="button" className="edit-button-profile mt-4 m-auto p-auto" onClick={() => navigate(`/edit-profile/${profile.name}/${profile._id}`)}>
        Edit
      </Button>
    </div>
  );
}
//show user profile ends


export default App;
