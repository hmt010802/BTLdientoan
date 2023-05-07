import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./login.module.css";
import logo from '../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";


const LoginForm = () => {

  const initialValues = { username: "", password: "" };

  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validationSchema = Yup.object({
    username: Yup.string().required("Username không được bỏ trống"),
    password: Yup.string().required("Mật khẩu không được bỏ trống"),
  });
  const onSubmit = (values, { setSubmitting }) => {
    users.forEach((user) => {

      if (
        user.username === values.username && user.password === values.password) {
      
        
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('userlogin', JSON.stringify(user))
        navigate("/");
      }
      else {
      
        setPopup(true)
      }

    });



    setSubmitting(false);


  };

  return (


    <div className={styles.container}>

      <div className={styles.logo}>
        <a href="/">
          {" "}
          <img src={logo} className="logo" />
        </a>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h1 className={styles.h1}>Login</h1>
            <div className={styles.item}>
              <Field
                type="username"
                name="username"
                className={styles.input}
              />
              <p className={styles.trong}>
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />

              </p>
              <label>Username</label>
            </div>
            <div className={styles.item}>
              <Field
                type="password"
                name="password"
                className={styles.input}
              />
              <p className={styles.trong}>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </p>
              <label>Password</label>
            </div>
            <div className="margin-10">
              <button type="submit" disabled={isSubmitting}>
              <span></span>
        <span></span>
        <span></span>
        <span></span>
                Login
              </button>
              <Link className={styles.btn_reg} to="/register">
                Create an account
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <Popup trigger={popup} setTrigger={setPopup}>
        <p><i class="fa  fa-exclamation"></i> Login failed,check again</p>
      </Popup>
    </div>

  );
};

export default LoginForm;
