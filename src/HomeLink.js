import {Link} from "react-router-dom";

export function HomeLink(){
    return(
        <div className="d-flex my-4 justify-content-end">
        <Link to="/" className="start-link">← Home</Link>
      </div>
    )
}