import React, { useState } from "react";

export default function StudentForm() {
  const [data, setData] = useState({
    studentNumber: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [isError, setIsError] = useState(false);
  const [isSuccessful, setIssuccessful] = useState(false);

  const onInputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveStudent();
  };

  const saveStudent = async () => {
    const studentData = JSON.stringify(data);
    try {
      const response = await fetch("http://localhost:3000/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: studentData,
      });

      if (!response.ok) {
        throw new Error(
          "Failed to save student. Server responded with status: " +
            response.status
        );
      }
      const data = await response.json();

      if (data) {
        setIssuccessful(true);
        setInterval(() => {
          setIssuccessful(false);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
      setIsError(true);
      setInterval(() => {
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <section>
      {(isError || isSuccessful) && (
        <div
          className={`toast show ${isSuccessful ? "bg-success" : ""} ${
            isError ? "bg-danger" : ""
          }`.trim()}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {isSuccessful ? "Student successfully saved!" : ""}
              {isError ? "Error occurred while saving student!" : ""}
            </div>
          </div>
        </div>
      )}
      <div className="card py-2 pt-4 mx-auto" style={{ maxWidth: 548 }}>
        <h1 className="fs-6 text-center">Add New Student</h1>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentNumber" className="form-label">
              Student No.
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="studentNumber"
              value={data.studentNumber}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="firstName"
              value={data.firstName}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="lastName"
              value={data.lastName}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Student Email
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              value={data.email}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control form-control-sm"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={onInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-sm w-100">
            Add Student
          </button>
        </form>
      </div>
    </section>
  );
}
