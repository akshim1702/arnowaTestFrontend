import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment';

const Home = ({ hours = 0, minutes = 9, seconds = 59 }) => {
  const history = useHistory()
  const [userData, setUserData] = useState()
  const [adminData, setAdminData] = useState([])
  const [messageData, setMessageData] = useState({
    name: "",
    message: ""
  })
  const [userTime, setUserTime] = useState()
  const [time, setTime] = useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  });

  const callAboutPage = async () => {
    try {
      const res = await fetch('/home', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      console.log(data)
      setUserData(data)
      adminDataFunc()
      const duration = data.timeOfLogin;
      setUserTime(duration)
      if (!res.status === 200 || !data) {
        const error = new Error(res.error);
        throw error;
      }

    }
    catch (err) {
      history.push('/signup')
      console.log(err)
    }
  }


  const adminDataFunc = async () => {
    if (sessionStorage.getItem('userType') == 'admin') {
      try {
        const res = await fetch('/getAllData', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          credentials: "include"
        })
        const data = await res.json();
        console.log(data)
        setAdminData(data)

        if (!res.status === 200 || !data) {
          const error = new Error(res.error);
          throw error;
        }

      }
      catch (err) {
        // history.push('/signup')
        console.log(err)
      }
    }
    else {
      console.log("not admin");
    }
  }



  const tick = () => {
    if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
      // cookie.remove('jwtoken');
      history.push('/logout')
    }
    else if (time.minutes == 0 && time.seconds == 0) {
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    }

    else if (time.seconds == 0) {
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    }

    else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
    }

  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [time.seconds])
  useEffect(() => {
    callAboutPage();
  }, [])



  let name, value;
  const handleInputsMessage = (e) => {
    name = e.target.name
    value = e.target.value;

    setMessageData({ ...messageData, [name]: value });
  }
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const { name, message } = messageData;
    const result = await fetch('/message', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userData.name,
        message: message
      })
    })


    const res = await result.json()
    if (res.status === 400 || !res) {
      window.alert("please fill all fields")
    }
    else {
      alert("message sent successful")
      console.log("registaration successful")
      history.push('/')
    }
  }

  if (!userData) {
    return (
      <>
        <div>
          hello no user data
        </div>
      </>
    )
  }
  else if (userData.name == 'admin') {
    return (
      <>
        <div className="container">
          <h1 className="text-center">{`${time.hours
            .toString()
            .padStart(2, "0")}:${time.minutes
              .toString()
              .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</h1>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  adminData.map((item,key) => (
                    <tr key={key}>
                      <td scope='row'>{item.name}</td>
                      <td scope='row'>{item.phone}</td>
                      <td scope='row'>{item.email}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      </>
    )
  }
  else {
    return (
      <>
        <div>
          <h1 className="text-center">{`${time.hours
            .toString()
            .padStart(2, "0")}:${time.minutes
              .toString()
              .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</h1>

          <section className="vh-100 signUp_container mt-2">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black card_signUp">
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{userData.name}</p>

                          <form method='POST' className="mx-1 mx-md-4">
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example4c" className="form-control"
                                  value={messageData.message}
                                  name="message"
                                  onChange={handleInputsMessage}
                                />
                                <label className="form-label" htmlFor="form3Example4c">Phone number</label>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button onClick={handleSubmitMessage} type="button" className="btn btn-primary btn-lg">Register</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    )

  }

}

export default Home