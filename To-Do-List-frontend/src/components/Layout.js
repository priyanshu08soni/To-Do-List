import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header'
import Footer from './Footer'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'
const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          pauseOnFocusLoss
          draggable
          theme='light'
        />
    </>
  )
}

export default Layout
