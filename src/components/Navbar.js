/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Nav className="bg-dark p-3">
      <img
        src="https://entersite.co/wp-content/uploads/2023/01/Aecsa-Logo.png"
        alt="Aecsa Logo"
        style={{
          width: "150px",
          height: "auto",
          display: "block",
          marginRight: "auto",
        }}
      />
      <Nav.Item>
        <Nav.Link
          onClick={() => handleNavigation("/principal")}
          className="text-white"
        >
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => handleNavigation("/chat")}
          className="text-white"
        >
          Chat
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => handleNavigation("/information")}
          className="text-white"
        >
          Information
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
