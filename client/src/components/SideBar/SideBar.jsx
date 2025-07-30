import AddMeal from "../AddMeal/AddMeal";
import DeleteMeal from "../DeleteMeal/DeleteMeal";
import UpdateMeal from "../UpdateMeal/UpdateMeal";
import {Link} from "react-router-dom";

import Offcanvas from "react-bootstrap/Offcanvas";

export default function SideBar({ openSideBarToggle, OpenSideBar }) {
    return (
        <aside>
            <div className="sidebar-content">
                <div className="sidebar-item">
                   <Link to="/add-meal">Add Meal</Link>
                </div>
                <div className="sidebar-item">
                   <Link to="/update-meal">Update Meal</Link>
                </div>
                <div className="sidebar-item">
                </div>
                   <Link to="/delete-meal">Delete Meal</Link>
            </div>
        </aside>
    )
}