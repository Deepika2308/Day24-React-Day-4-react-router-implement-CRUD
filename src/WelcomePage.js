import {Link} from "react-router-dom";
import "./styles.css";

export function WelcomePage(){
    return(
        <div>
            <h1>Welcome!!</h1>
            <div className="d-flex flex-column gap-2 my-5">
                <div>Get started with below links</div>
                <Link to="/create-user" className="start-link fw-bold">Create User</Link>
                <div>Click <Link to="/users" className="start-link fw-bold">here</Link> to list,edit or delete users(s)</div>
                <div>Click <Link to="/profile/1" className="start-link fw-bold">User</Link> to edit user profile</div>
                <div>Click <Link to="/profile/2" className="start-link fw-bold">Admin</Link> to edit admin profile</div>
            </div>
        </div>
    )
}