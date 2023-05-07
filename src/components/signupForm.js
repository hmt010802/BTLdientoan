import styles from "./signup.module.css";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import logo from '../assets/logo.png';
import Popup from "./Popup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Tên của bạn phải có ít nhất 5 ký tự")
    .max(50, "Tên của bạn không được dài hơn 50 ký tự")
    .required("Vui lòng nhập tên của bạn"),
  username: Yup.string()
    .min(2, "Tên của bạn phải có ít nhất 2 ký tự")
    .max(50, "Tên của bạn không được dài hơn 50 ký tự")
    .required("Vui lòng nhập tên người dùng"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  phone: Yup.string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .matches(/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6}/, "Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu không được dài hơn 50 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không trùng khớp")
    .required("Bạn cần nhập lại mật khẩu"),
});



const SignupForm = () => {
  const [popup, setPopup] = useState();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const [userExists, setUserExists] = useState(false)
  const onSubmit = (values, { setSubmitting }) => {
    console.log("click submit");
    if (users.filter(user => user.username === values.username).length > 0) {

      setUserExists(true)
      console.log(userExists);
      setSubmitting(false);
      return;
    }
    let newUsers = {
      username: values.username,
      password: values.password,
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      address: values.address,
    };
    users.push(newUsers);
    localStorage.setItem("users", JSON.stringify(users));
    setPopup(true)
    setSubmitting(false);
  }
  if (popup === false) {
    window.location.href = "/login";
  }
  return (
    <div className={styles.container}>

      <div className={styles.logo}>
        <a href="/">
          {" "}
          <img src={logo} className="logo-img" />
        </a>
      </div>


      <Formik
        initialValues={
          {
            fullName: "",
            email: "",
            phone: "",
            adress: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
        onSubmit={onSubmit}

        validationSchema={SignupSchema}
      >

        <Form
          className={styles.form}>
          <h1 className={styles.h1}>Create an account</h1>
          <div >
            <label htmlFor="fullName"></label>
            <Field type="text" placeholder='FullName' name="fullName" className={styles.input} />
          </div>
          <p className={styles.khung}> <ErrorMessage name="fullName" component="div" className={styles.error} /> </p>
          <div>
            <label htmlFor="email"></label>
            <Field type="text" placeholder='Email' name="email" className={styles.input} />
          </div>
          <p className={styles.khung}>  <ErrorMessage name="email" component="div" className={styles.error} /></p>
          <div>
            <label htmlFor="phone"></label>
            <Field type="text" placeholder='Phone' name="phone" className={styles.input} />
            <p className={styles.khung}>  <ErrorMessage name="phone" component="div" className={styles.error} /></p>
          </div>
          <div>
            <label htmlFor="address"></label>
            <Field type="text" placeholder='Address' name="address" className={styles.input} />
          </div>
          <p className={styles.khung}></p>
          <div>
            <label htmlFor="username"></label>
            <Field type="text" placeholder='UserName' name="username" className={styles.input} />
          </div>
          <p className={styles.khung}></p>
          <div>
            <label htmlFor="password"></label>
            <Field type="password" placeholder='Password' name="password" className={styles.input} />
            {/* <p className={styles.khung}></p> */}
          </div>
          <p className={styles.khung}><ErrorMessage name="password" component="div" className={styles.error} /> </p>
          <div>
            <label htmlFor="confirmPassword"></label>
            <Field type="password" placeholder='Confirm Password' name="confirmPassword" className={styles.input} />
          </div>
          <p className={styles.khung}><ErrorMessage
            name="confirmPassword"
            component="div"
            className={styles.error}
          /> </p>
          <Link className={styles.link} to="/login" > Already have an account?</Link>
          <button type="submit" className={styles.btnSubmit} >
            Create Account
          </button>

        </Form>
      </Formik>
      <Popup trigger={userExists} setTrigger={setUserExists
      }>
        <p><i class="fa   fa-close"></i> UserName Already exist</p>
      </Popup>
      <Popup trigger={popup} setTrigger={setPopup}>
        <p><i class="fa check fa-check"></i> Create account success</p>
      </Popup>

    </div>
  );
}
export default SignupForm