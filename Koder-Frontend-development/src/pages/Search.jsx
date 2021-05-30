import React, { useState, useEffect, Form } from "react";
import { Formik } from "formik";
import BackEndService from "../services/BackEndService";
import { encrypt, decrypt } from "../utils/crypto";
import * as Yup from "yup";
export default function SearchStudent({ fees, setFees, setAppState }) {
  const [isFeeArrearsNotFound, setIsFeeArrearsNotFound] = useState(false);
  const handdleSearchStudent = (values, errors) => {
    BackEndService.getFees(values.studentRegNo)
      .then(async (response) => {
        console.log(response.data);
        console.log(decrypt(response.data));
        const data = await JSON.parse(decrypt(response.data));
        if (data.status_code!=="FF000") {
          setIsFeeArrearsNotFound(true);
        } else {
          //setIsFeeArrearsNotFound(false);
          setFees(data);
          setAppState("CHOOSE_PAY_OPT");
        }
      })
      .catch(async (error) => {
        console.log(error.response.data);
        console.log(decrypt(error.response.data));
        const data = await JSON.parse(decrypt(error.response.data));
        if (data.status_code=== "-FF000") {
          setIsFeeArrearsNotFound(true);
        } else {
          setIsFeeArrearsNotFound(true);
        }
      });
  };

  const searchStudentSchema = Yup.object().shape({
    studentRegNo: Yup.string()
      .required("Student Reg No is required")
      .min(6, "Student Reg No cannot be less than 6 digits"),
  });
  return (
    <div class="content-wrapper" style={{ "min-height": "1244.06px;" }}>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Search Student</h1>
            </div>
          </div>
        </div>
      </section>

      <Formik
        initialValues={{
          studentRegNo: "",
        }}
        onSubmit={(values, errors) => {
          handdleSearchStudent(values, errors);
        }}
        validationSchema={searchStudentSchema}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => {
          return (
            <form onSubmit={handleSubmit}>
              <section class="content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card card-info">
                        <div class="card-header">
                          <h3 class="card-title">
                            Enter Student ID and Click Search
                          </h3>
                        </div>

                        <div class="card-body">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Student ID #</label>

                            <input
                              type="text"
                              class={`form-control ${
                                errors.studentRegNo ? "is-invalid" : ""
                              }`}
                              value={values.studentRegNo}
                              placeholder="Enter Student ID"
                              onChange={handleChange("studentRegNo")}
                            />

                            {touched.studentRegNo && errors.studentRegNo ? (
                              <label class="col-form-label" for="inputError">
                                <i class="far fa-times-circle"></i>{" "}
                                {errors.studentRegNo}
                              </label>
                            ) : (
                              ""
                            )}

                            {touched.studentRegNo &&isFeeArrearsNotFound ? (
                              <label class="col-form-label" for="inputError">
                                <i class="far fa-times-circle"></i> No Arrears
                                Found for ID
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div class="card-footer">
                          <button type="submit" class="btn btn-info">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6"></div>
                  </div>
                </div>
              </section>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
