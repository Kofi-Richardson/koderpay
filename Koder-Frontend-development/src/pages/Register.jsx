import React, { useState, Form } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import BackEndService from "../services/BackEndService";
import ToastMessage from "../compoents/ToastMessageMessage";
import { encrypt, decrypt } from "../utils/crypto";
import { useHistory } from "react-router-dom";
export default function Register() {
  const registerUserSchema = Yup.object().shape({
    surname: Yup.string().min(2).required(),
    middle_name: Yup.string().min(2).required(),
    first_name: Yup.string().min(2).required(),
    username: Yup.string().min(2).required(),
    password: Yup.string().min(2).required(),
    phone: Yup.string().min(2).required(),
    email: Yup.string().min(2).required(),
    addressLine1: Yup.string().min(2).required(),
    addressLine2: Yup.string().min(2).required(),
    city: Yup.string().min(2).required(),
    postcode: Yup.string().min(2).required(),
    state: Yup.string().min(2).required(),
    city: Yup.string().min(2).required(),
  });
  const initiaRegisterState = {
    success: false,
    status_code: "",
    message: "",
  };
  const initialUserPayload = {};
  const [register, setRegister] = useState(initiaRegisterState);
  const [user, setUser] = useState({});
  const [userRegPayload, setUserRegPayload] = useState(initialUserPayload);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(
    "Sorry there was an error in your login request"
  );
  const history = useHistory();
  const handleUserRegistration = (values, errors) => {
    setUserRegPayload((prev) => ({
      ...prev,
      surname: values.surname,
      middle_name: values.middle_name,
      first_name: values.first_name,
      username: values.username,
      password: values.password,
      phone: values.phone,
      email: values.email,
      user_type_id: 2,
      address: {
        line_1: values.addressLine1,
        line_2: values.addressLine2,
        city: values.city,
        postcode: values.postcode,
        state: values.state,
        country: values.country,
      },
    }));
    BackEndService.registerUser(userRegPayload)
      .then(async(response) => {
        console.log(decrypt(response.data));
        const data =await JSON.parse(decrypt(response.data));
        console.log(data)
        if (data.success===true) {
          setUser(data);
          localStorage.setItem("user", user);
        }
        history.push("/");
      })
      .catch(async(error) => {
        const data =await JSON.parse(decrypt(error.response.data));
        setIsRegisterError(true);
        setRegisterErrorMsg(data.message);
        console.log(error);
      });
  };
  return (
    <div> 
      {isRegisterError && <ToastMessage message={registerErrorMsg} />}
      <img
        src={`/images/koder-logo.png`}
        alt="Logo"
        class="brand-image "
        width="250"
        height="70"
      />
      <div class="card card-info">
        <div class="card-header">
          <h3 class="card-title">Register an Account</h3>
        </div>

        <div class="card-body">
          <Formik
            initialValues={{
              surname: "",
              middle_name: "",
              first_name: "",
              username: "",
              password: "",
              phone: "",
              email: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              postcode: "",
              state: "",
              country: "",
            }}
            onSubmit={(values, errors) => {
              handleUserRegistration(values, errors);
            }}
            validationSchema={registerUserSchema}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => {
              return (
                <form role="form" onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Surname</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.surname ? "is-invalid" : ""
                          }`}
                          value={values.surname}
                          placeholder="Enter Surname"
                          onChange={handleChange("surname")}
                        />

                        {touched.surname && errors.surname ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.surname}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Middle Name</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.middle_name ? "is-invalid" : ""
                          }`}
                          value={values.middle_name}
                          placeholder="Enter Middle Name"
                          onChange={handleChange("middle_name")}
                        />

                        {touched.middle_name && errors.middle_name ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.middle_name}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.first_name ? "is-invalid" : ""
                          }`}
                          value={values.first_name}
                          placeholder="Enter First Name"
                          onChange={handleChange("first_name")}
                        />

                        {touched.first_name && errors.first_name ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.first_name}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          value={values.phone}
                          placeholder="Enter Phone"
                          onChange={handleChange("phone")}
                        />

                        {touched.phone && errors.phone ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.phone}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          value={values.email}
                          placeholder="Enter Email"
                          onChange={handleChange("email")}
                        />

                        {touched.email && errors.email ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.email}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-form-label" for="inputSuccess">
                      Username
                    </label>
                    <input
                      type="text"
                      name="id"
                      class={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      value={values.username}
                      placeholder="Enter Username"
                      onChange={handleChange("username")}
                    />
                    {touched.username && errors.username ? (
                      <label class="col-form-label" for="inputError">
                        <i class="far fa-times-circle"></i> {errors.username}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="form-group">
                    <label class="col-form-label" for="inputError">
                      Password
                    </label>
                    <input
                      type="password"
                      name="id"
                      class={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      value={values.password}
                      placeholder="Enter Password"
                      onChange={handleChange("password")}
                    />
                    {touched.password && errors.password ? (
                      <label class="col-form-label" for="inputError">
                        <i class="far fa-times-circle"></i> {errors.password}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Address Line 1</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.addressLine1 ? "is-invalid" : ""
                          }`}
                          value={values.addressLine1}
                          placeholder="Enter Line 1"
                          onChange={handleChange("addressLine1")}
                        />
                        {touched.addressLine1 && errors.addressLine1 ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.addressLine1}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Address Line 2</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.addressLine2 ? "is-invalid" : ""
                          }`}
                          value={values.addressLine2}
                          placeholder="Enter Line 2"
                          onChange={handleChange("addressLine2")}
                        />
                        {touched.addressLine2 && errors.addressLine2 ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.addressLine2}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>City </label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          value={values.city}
                          placeholder="Enter City"
                          onChange={handleChange("city")}
                        />
                        {touched.city && errors.city ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.city}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Post Code</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.postcode ? "is-invalid" : ""
                          }`}
                          value={values.postcode}
                          placeholder="Enter Post Code"
                          onChange={handleChange("postcode")}
                        />
                        {touched.postcode && errors.postcode ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.postcode}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.state ? "is-invalid" : ""
                          }`}
                          value={values.state}
                          placeholder="Enter State"
                          onChange={handleChange("state")}
                        />
                        {touched.state && errors.state ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.state}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.country ? "is-invalid" : ""
                          }`}
                          value={values.country}
                          placeholder="Enter Country"
                          onChange={handleChange("country")}
                        />
                        {touched.country && errors.country ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.country}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-info">
                    Register
                  </button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
