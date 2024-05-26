import React from "react";
import BreadCrumb from "../components/breadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
let signUpSchema=yup.object({
  firstname:yup.string().required("First name is required"),
  lastname:yup.string().required("Last name is required"),
  email:yup.string().email().required("Valid Email is Required"),
  mobile:yup.string().required("Mobile is required"),
  password:yup.string().required("Password is required")

})

const SignUp = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const formik=useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      email:"",
      mobile:"",
      password:"",
    },
    validationSchema:signUpSchema,
    onSubmit:(values)=>{
      dispatch(registerUser(values));
      navigate("/login");
    }
  })

  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  className="form-control"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  OnBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {
                    formik.touched.firstname && formik.errors.firstname
                  }
                </div>
                <CustomInput
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  className="form-control"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  OnBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {
                    formik.touched.lastname && formik.errors.lastname
                  }
                </div>
                <CustomInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  OnBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {
                    formik.touched.email && formik.errors.email
                  }
                </div>
                <CustomInput
                  name="mobile"
                  type="tel"
                  placeholder="Mobile Number"
                  className="form-control"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  OnBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {
                    formik.touched.mobile && formik.errors.mobile
                  }
                </div>
                <CustomInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  OnBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>
                <div>
                  <div className="mt-1 d-flex justify-content-center align-items-center gap-15">
                    <button type="submit" className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
