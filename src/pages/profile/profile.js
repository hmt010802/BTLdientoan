import styles from "./profile.module.css";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Popup from "../../components/Popup";


const ProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Tên của bạn phải có ít nhất 2 ký tự")
    .max(50, "Tên của bạn không được dài hơn 50 ký tự")
    .required("Vui lòng nhập tên của bạn"),
  username: Yup.string()
    .min(2, "Tên của bạn phải có ít nhất 2 ký tự")
    .max(50, "Tên của bạn không được dài hơn 50 ký tự")
    .required("Vui lòng nhập người dùng"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  phone: Yup.string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})/, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu không được dài hơn 50 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  address: Yup.string()
  .required("Địa chỉ không được bỏ trống"),
});


const ProfileForm = () => {
  const [isChanged, setIsChanged] = useState(false)
  const userLoggedIn = JSON.parse(localStorage.getItem("userlogin"));


  const onSubmit = (values, { setSubmitting }) => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const index = storedUsers.findIndex(user => user.username === userLoggedIn.username && user.phone === userLoggedIn.phone);


    if (index !== -1) {
      storedUsers.splice(index, 1);
      storedUsers.push(values);
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }


    // Cập nhật lại thông tin người dùng đang đăng nhập trong Local Storage



    localStorage.setItem("userlogin", JSON.stringify(values));
    setIsChanged(true)
    setSubmitting(false);
    setTimeout(function(){
      if (isChanged === false) {


      window.location.href = "/"

    }}, 3000)

  }
  return (
    <div className={styles.container} >



     
      <Formik
        initialValues={{
          fullName: `${userLoggedIn.fullName}`,
          email: `${userLoggedIn.email}`,
          phone: `${userLoggedIn.phone}`,
          address: `${userLoggedIn.address}`,
          username: `${userLoggedIn.username}`,

          password: "",

        }}
        validationSchema={ProfileSchema}
        onSubmit={onSubmit}
      >


        <Form className={styles.formProfile}>
        <h2 className={styles.h} >General information</h2>
          <table>
            <tr >
              <th> <label className={styles.label} htmlFor="fullName">Name</label> </th>
              <th> <Field type="text" placeholder='Full Name' name="fullName" className={styles.input} /></th>
            </tr>
            <p className={styles.khung}> <ErrorMessage name="fullName" component="div" className={styles.error} /> </p>
            <tr>
              <th> <label className={styles.label} htmlFor="email">Email</label></th>
              <th> <Field type="text" placeholder='Email' name="email" className={styles.input} /></th>
            </tr>
            <p className={styles.khung}>  <ErrorMessage name="email" component="div" className={styles.error} /></p>
            <tr>
              <th> <label className={styles.label} htmlFor="phone">Phone number</label></th>
              <th> <Field type="text" placeholder='Phone' name="phone" className={styles.input} /></th>

            </tr>
            <p className={styles.khung}> <ErrorMessage name="phone" component="div" className={styles.error} /> </p>



            <tr>
              <th> <label className={styles.label} htmlFor="address">Address</label></th>
              <th> <Field type="text" placeholder='Address' name="address" className={styles.input} /></th>

            </tr>
            <p className={styles.khung}><ErrorMessage name="address" component="div" className={styles.error} /> </p>
            <tr>
              <th> <label className={styles.label} htmlFor="username">UserName</label></th>
              <th> <Field type="text" placeholder='UserName' name="username" className={styles.input} /></th>

            </tr>
            <p className={styles.khung}> <ErrorMessage name="username" component="div" className={styles.error} /> </p>

            <tr>
              <th>  <label className={styles.label} htmlFor="password">Password</label></th>
              <th>  <Field type="password" placeholder='Password' name="password" className={styles.input} /></th>

            </tr>
            <p className={styles.khung}><ErrorMessage name="password" component="div" className={styles.error} /> </p>

            <td> <button type="submit" className={styles.btnSubmit}>
              Save
            </button></td>
          </table>
        </Form>

      </Formik>
      <Popup trigger={isChanged} setTrigger={setIsChanged}>
        <p><i class="fa check fa-check"></i>Change infomation success</p>
      </Popup>
    </div>
  );
};

export default ProfileForm