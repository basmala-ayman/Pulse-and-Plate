import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Admin.css";
import "../../App.css";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function Admin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SidebarContent = () => (
    <div className="d-flex flex-column gap-3">
      <h2 className="d-none d-sm-block">Actions</h2>
      <Link to="/admin/dashboard" className="admin-link" onClick={handleClose}>
        Dashboard
      </Link>
      <Link to="/admin/add-meal" className="admin-link" onClick={handleClose}>
        Add Meal
      </Link>
      <Link
        to="/admin/update-meal"
        className="admin-link"
        onClick={handleClose}
      >
        Update Meal
      </Link>
      <Link
        to="/admin/delete-meal"
        className="admin-link"
        onClick={handleClose}
      >
        Delete Meal
      </Link>
    </div>
  );

  return (
    <div className="container-admin">
      <div className="admin-container">
        {/* Toggle Button only on small screens */}
        <div className="d-block d-sm-none mb-3">
          <Button onClick={handleShow} className="icon-button swap-button">
            <FaBars size={30} />
          </Button>
        </div>

        {/* Offcanvas for mobile only */}
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="d-sm-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Actions</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <SidebarContent />
          </Offcanvas.Body>
        </Offcanvas>

        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 col-md-3 col-sm-4 d-none d-sm-block admin-sidebar">
            <SidebarContent />
          </div>

          {/* Dynamic content rendered here */}
          <div className="col-lg-10 col-md-9 col-sm-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
