import React, { useState, Form } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import BackEndService from "../services/BackEndService";
import ToastMessage from "../compoents/ToastMessageMessage";
import { decrypt } from "../utils/crypto";
export default function Login() {
  //Hooks
  const history = useHistory();

  //Login Schema
  const loginUserSchema = Yup.object().shape({
    username: Yup.string().min(2).required(),
    password: Yup.string()
      .min(8)
      .required()
     /* .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),*/
  });

  //Constants
  const initialUserState = { 
  };
  const initiaLoginPayload = { username: "", password: "" };

  //States
  //const [loginRequest, setLoginRequest] = useState();
  const [user, setUser] = useState({});
  const [isLoginError, setIsLoginError] = useState(false);

  //Functions
  const handleUserLogin = (values, errors) => {
   
   // console.log(loginRequest);
    BackEndService.loginUser(values)
      .then(async(response) => {
        const data =await JSON.parse(decrypt(response.data));
        console.log(data);
        if (data.success === true) {
          localStorage.setItem("user", user);
          history.push("/");
        }
      
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoginError(true);
        console.log(decrypt(error.response.data));
      });
  };

  return (
    <body class="hold-transition login-page">
      {isLoginError && (
        <ToastMessage message="Sorry there was an error in your login request" />
      )}
      <div class="login-box">
        <div class="login-logo">
          <img
            src={`/images/koder-logo.png`}
            alt="Logo"
            class="brand-image "
            width="350"
            height="100"
          />
          <a href="../../index2.html"></a>
        </div>

        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">Login Form</h3>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, errors) => {
              handleUserLogin(values, errors);
            }}
            validationSchema={loginUserSchema}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div class="card-body">
                    <div class="form-group row">
                      <label for="inputEmail3" class="col-sm-4 col-form-label">
                        Username
                      </label>
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class={`form-control ${
                            errors.username ? "is-invalid" : ""
                          }`}
                          value={values.username}
                          placeholder="Enter Username"
                          onChange={handleChange("username")}
                        />
                        {touched.username && errors.username ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.username}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="inputPassword3"
                        class="col-sm-4 col-form-label"
                      >
                        Password
                      </label>
                      <div class="col-sm-8">
                        <input
                          type="password"
                          class={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          value={values.password}
                          placeholder="Enter Password"
                          onChange={handleChange("password")}
                        />
                        {touched.password && errors.password ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.password}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="offset-sm-2 col-sm-10">
                        <div class="form-check"></div>
                      </div>
                    </div>
                  </div>

                  <div class="card-footer">
                    <button type="submit" class="btn btn-info">
                      Log in
                    </button>
                   
                    <Link to="/register" class="btn btn-light float-right">
                      Register
                    </Link>
                  </div>
                </form>
              );
            }}
          </Formik>
    
        </div>
      </div>
      <script src="../assets/plugins/toastr/toastr.min.js"></script>
    </body>
  );
}
