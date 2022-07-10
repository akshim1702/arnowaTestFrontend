import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SignUp.css'
const SignUp = () => {

  const history = useHistory()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: ""
  })
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  let currTime;
  const getTime = () => {
    var today = new Date()

    return currTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone } = user;

    if (name != 'admin' || email != 'admin@admin.com' || phone != '0000000000') {
      const result = await fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          timeOfLogin: new Date().toLocaleString(),
          userType: "normal"
        })
      })
      const res = await result.json()
      if (res.status === 422 || !res) {
        window.alert("invalid")
      }
      else {
        console.log("registaration successful")
        sessionStorage.setItem('userType', 'normal');
        history.push('/')
      }
    }
    else if (name == 'admin' && email == "admin@admin.com" && phone == '0000000000') {
      const result = await fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          timeOfLogin: Date(),
          userType: "admin"
        })
      })
      const res = await result.json()

      if (res.status === 422 || !res) {
        window.alert("invalid")
        alert("input value again");
      }
      else if (res, message == 'data  fields already exist') {
        sessionStorage.setItem('userType', 'admin');
        history.push('/')
      }
      else {
        console.log("registaration successful")
        sessionStorage.setItem('userType', 'admin');
        history.push('/')
      }
    }
    else if (name == 'admin' && email != "admin@admin.com" || phone != '0000000000') {
      alert("invalid Input")
    }
  }

  return (
    <>
      <section className="vh-100 signUp_container mt-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black card_signUp">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form method='POST' className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" value={user.name} name="name"
                              onChange={handleInputs}
                            />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control"
                              value={user.email}
                              name="email"
                              onChange={handleInputs}
                            />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="number" id="form3Example4c" className="form-control"
                              value={user.phone}
                              name="phone"
                              onChange={handleInputs}
                            />
                            <label className="form-label" htmlFor="form3Example4c">Phone number</label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg">Register</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section></>
  )
}

export default SignUp