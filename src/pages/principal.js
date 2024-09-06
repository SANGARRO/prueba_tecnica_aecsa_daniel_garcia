/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";

const Principal = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-center mb-4">Welcome to the Principal Page</h1>
        {user ? (
          <div className="card p-4 shadow-sm">
            <div className="card-body">
              <h3>User Information</h3>
              <p>
                <strong>Username:</strong> {user.usuario}
              </p>
              <p>
                <strong>Email:</strong> {user.correo}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.celular}
              </p>
              <p>
                <strong>City:</strong> {user.ciudad}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Principal;
