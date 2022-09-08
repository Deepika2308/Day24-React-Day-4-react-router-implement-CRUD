import {Link} from "react-router-dom";

export function WelcomePage(){
    return(
        <div>
            <h1>Welcome!!</h1>
            <div>
                <Link to="/create-user">Create User</Link>
            </div>
        </div>
    )
}