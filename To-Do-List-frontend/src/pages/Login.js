import React, { useEffect } from "react";
import BreadCrumb from "../components/breadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import { loginUser } from "../features/user/userSlice";
let loginSchema=yup.object({
  email:yup.string().email().required("Valid Email is Required"),
  password:yup.string().required("Password is required")

})

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const formik=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:loginSchema,
    onSubmit:(values)=>{
      dispatch(loginUser(values));
    }
  })
  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <Container class1="py-5 login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  OnBlur={formik.handleBlur("email")}
                />
                <div className="errors">
                  {
                    formik.touched.email && formik.errors.email
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
                <div className="errors">
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>
                <div>
                  <div className="mt-1 d-flex justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      Sign Up
                    </Link>
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

export default Login;
