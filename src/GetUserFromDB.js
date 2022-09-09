import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from './global.js';
import { EditUser } from "./EditUser";

//get user values from DB starts
export function GetUserFromDB() {
  let { id } = useParams();
  let [formValue, setFormValue] = useState(null);

  //get user values from db
  useEffect(() => {
    fetch(`${API}/users/${id}`)
      .then((data) => data.json())
      .then((user) => {
        setFormValue(user);
      });
  }, []);

  return formValue ? <EditUser formValue={formValue} /> : "";
}
