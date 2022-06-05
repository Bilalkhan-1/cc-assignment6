import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Formik, Form, validateYupSchema } from "formik";
import { TextField } from "./TextField";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [records, setRecords] = useState([]);
  function setValue() {
    axios({
      url: "http://localhost:5000/getData",
      method: "GET",
    })
      .then((response) => {
        console.log("Data has been retreived the server");
        const arr = Array.from(response.data);
        setRecords(arr);
        console.log("records are: ", records);
      })
      .catch(() => {
        console.log("Internal server error");
      });
  }
  return (
    <div className="container">
      <div className="my-5" style={{ width: 400, margin: "auto" }}>
        <Formik
          initialValues={{
            valueA: "",
            valueB: "",
            valueC: "",
          }}
          onSubmit={(values) => {
            if (
              values.valueA === "" ||
              values.valueB === "" ||
              values.valueC === ""
            ) {
              alert("enter all values");
            } else {
              const obj = {
                a: values.valueA,
                b: values.valueB,
                c: values.valueC,
              };
              axios({
                url: "http://localhost:5000/equationSolver",
                method: "POST",
                data: obj,
              })
                .then((response) => {
                  console.log("Data has been sent to the server");
                  alert(`Data saved`);
                  console.log(response.data);
                })
                .catch(() => {
                  console.log("Internal server error");
                });
            }
          }}
        >
          {(formik) => (
            <div className="container">
              <Form>
                <div className="mb-3">
                  <TextField label="Value A" name="valueA" type="text" />
                </div>
                <div className="mb-3">
                  <TextField label="Value B" name="valueB" type="text" />
                </div>
                <div className="mb-3">
                  <TextField label="Value C" name="valueC" type="text" />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
              <button className="btn btn-primary my-3" onClick={setValue}>
                Show
              </button>
            </div>
          )}
        </Formik>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">C</th>
            <th scope="col">Root 1</th>
            <th scope="col">Root 2</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => {
            return (
              <tr>
                <th scope="row">{item.A}</th>
                <td>{item.B}</td>
                <td>{item.C}</td>
                <td>{item.Root_1}</td>
                <td>{item.Root_2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
