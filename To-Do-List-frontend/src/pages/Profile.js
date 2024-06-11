import React, { useState } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/breadCrumb";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().email().required("Email Name is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
});

const Profile = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    },
    Accept: "application/json",
  };
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const userState = useSelector((state) => state?.auth?.user);
  const formik = useFormik({
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser({ userData: values, config2: config2 }));
      setEdit(true);
    },
  });
  return (
    <>
      <Meta title="Profile" />
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div
              className="d-flex gap-30 align-items-center"
              style={{ cursor: "pointer" }}
            >
              <h3 className="my-3 profile-heading">Update Profile</h3>
              <FiEdit
                className="fs-3 text-warning "
                onClick={() => {
                  if (edit === true) {
                    setEdit(false);
                  } else {
                    setEdit(true);
                  }
                }}
              />
              <img src="" alt="" />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group py-2">
                <label className="ps-1" htmlFor="exampleInputEmail1">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="example1"
                  name="firstname"
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  value={formik.values.firstname}
                  disabled={edit}
                />
                <div className="errors ps-2 my-1">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="form-group py-2">
                <label className="ps-1" htmlFor="exampleInputEmail1">
                  Last Name
                </label>
                <input
                  name="lastname"
                  type="text"
                  className="form-control"
                  id="example1"
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  value={formik.values.lastname}
                  disabled={edit}
                />
                <div className="errors ps-2 my-1">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="form-group py-2">
                <label className="ps-1" htmlFor="exampleInputEmail1">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="example1"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  disabled={edit}
                />
                <div className="errors ps-2 my-1">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="form-group py-2">
                <label className="ps-1" htmlFor="exampleInputEmail1">
                  Mobile No.
                </label>
                <input
                  name="mobile"
                  type="tel"
                  className="form-control"
                  id="example1"
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}
                  disabled={edit}
                />
                <div className="errors ps-2 my-1">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              {edit === false && (
                <button className="button" type="submit">
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
