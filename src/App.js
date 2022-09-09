import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import {API} from './global.js';
import {WelcomePage} from "./WelcomePage";
import {obj,keys} from "./Obj";
import {HomeLink} from "./HomeLink";
import { ShowUsers } from "./ShowUsers";
import { GetUserFromDB } from "./GetUserFromDB";
import { EditProfile } from "./EditProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/create-user" element={<Header />} />
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/users" element={<ShowUsers />} />
          <Route path="/edit-user/:id" element={<GetUserFromDB />} />
          <Route path="/profile/:id" element={<ShowProfile />}></Route>
          <Route path="/edit-profile/:profile/:id" element={<EditProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Header() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [emailId, setEmailId] = useState("");
  let [mobileNum, setMobileNum] = useState("");
  let [profile, setProfile] = useState(undefined);
  let [showModal, setShowModal] = useState(false);
  let [modalMsg, setModalMsg] = useState("");

  let navigate= useNavigate();

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
        <div className="d-flex gap-3 justify-content-center">
          <button type="submit" className="btn btn-primary col-4">
            Create User
          </button>
          <button type="button" className="btn btn-primary col-4" onClick={() => navigate("/")}>
            Home
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
  },[id]);

  return (
    <div className="container d-flex flex-column justify-content-center m-auto p-auto mt-4">
      <h3>{`${profile.name} privileges`}</h3>

      <div className="d-flex m-auto p-auto">
        <div className="container d-flex flex-column gap-3  justify-content-center mt-5">
        {keys.map((item,index) => {
          return (
          <div className="d-flex gap-2" key={index}>
          <div>
            {profile[item] ?<IoCheckmarkCircle size={21} className="text-success" />:<TiDelete size={25} className="text-danger" />}
          </div>
          <div>{`${obj[item]}`}</div>
        </div>
        )
        })}
        </div>
      </div>
      <Button type="button" className="edit-button-profile mt-4 m-auto p-auto" onClick={() => navigate(`/edit-profile/${profile.name}/${profile._id}`)}>
        Edit
      </Button>

      <HomeLink />
    </div>
  );
}
//show user profile ends


export default App;
