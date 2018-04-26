import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';

import "../css/Login.css";
import Stupage from "./student/stuPage";
import Monpage from "./monitor/monPage";
import LecPage from "./lecturer/lecPage";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      dataForUser: null
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }
  componentDidMount() {
    //console.log("didmount Login");
    //console.log(localStorage.getItem("role"));
    let b = localStorage.getItem("dataForUser");

    if (b !== null) {
      let a = JSON.parse(localStorage.getItem("dataForUser"));
      var role;
      if (a[0] === 1 && a[1] === 0 && a[2] === 0) role = "student";
      else if (a[0] === 1 && a[1] === 1 && a[2] === 0) role = "monitor";
      else if (a[0] === 0 && a[1] === 0 && a[2] === 1) role = "lecturer";
      // let role = a[0];
      let fullName = a[3];
      let username = a[4];
      let userID = a[5];
      if (role === "student") {
        ReactDOM.render(
          <Stupage fullName={fullName} role={role} username={username} userID={userID} />,
          document.getElementById("root")
        );
      } else if (role === "monitor") {
        ReactDOM.render(
          <Monpage fullName={fullName} role={role} username={username} userID={userID} />,
          document.getElementById("root")
        );
      } else if (role === "teacher") {
        ReactDOM.render(
          <LecPage fullName={fullName} role={role} username={username} userID={userID} />,
          document.getElementById("root")
        );
      }
    } else {
      console.log("null");
    }
  }

  handleSubmit(event) {
    axios
      .post("http://localhost:8080/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);

        if (response.data.checkLogin === false) {
          alert("Tên đăng nhập hoặc mật khẩu không đúng!.")
        } else {
          // console.log("ok");
          console.log(response);
          // var usernameProp = this.state.username;
          // console.log(usernameProp);
          console.log(this.state.username);

          const dataSave = [
              response.data.isStudent,
              response.data.isMonitor,
              response.data.isLecturer,
              response.data.fullName,
              response.data.userID,
              this.state.username
          ];
            // console.log(dataSave[4]);

          localStorage.setItem("dataForUser", JSON.stringify(dataSave));

          if (response.data.isStudent === 1 && response.data.isMonitor === 0 && response.data.isLecturer === 0) {
            ReactDOM.render(
              <Stupage
                fullName={response.data.fullName}
                role={"student"}
                username={this.state.username}
                userID={response.data.userID}
              />,
              document.getElementById("root")
            );
          } else if (response.data.isStudent === 1 && response.data.isMonitor === 1 && response.data.isLecturer === 0) {
            ReactDOM.render(
              <Monpage
                fullName={response.data.fullName}
                role={"monitor"}
                username={this.state.username}
                userID={response.data.userID}
              />,
              document.getElementById("root")
            );
          } else if (response.data.isStudent === 0 && response.data.isMonitor === 0 && response.data.isLecturer === 1) {
            ReactDOM.render(
              <LecPage
                fullname={response.data.fullName}
                role={"lecturer"}
                username={this.state.username}
                userID={response.data.userID}
              />,
              document.getElementById("root")
            );
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    //console.log("render");
      return (
          <div className="app flex-row align-items-center">
              <Container>
                  <Row className="justify-content-center">
                      <Col md="8">
                          <CardGroup>
                              <Card className="p-4">
                                  <CardBody>
                                      <h1>Đăng nhập</h1>
                                      <p className="text-muted">Đăng nhập để sử dụng hệ thống</p>
                                      <div className="form-label-group">
                                          <input
                                              type="text"
                                              id="inputEmail"
                                              className="form-control"
                                              placeholder="Email address"
                                              required
                                              autoFocus
                                              value={this.state.username}
                                              onChange={this.handleChangeUsername}
                                          />
                                          <label htmlFor="inputEmail">Username</label>
                                      </div>
                                      <div className="form-label-group">
                                          <input
                                              type="password"
                                              id="inputPassword"
                                              className="form-control"
                                              placeholder="Password"
                                              required
                                              value={this.state.password}
                                              onChange={this.handleChangePassword}
                                          />
                                          <label htmlFor="inputPassword">Password</label>
                                      </div>
                                      <Row>
                                          <button
                                              className="btn btn-lg btn-primary btn-block"
                                              type="submit"
                                              onClick={this.handleSubmit}
                                          >
                                              Đăng nhập
                                          </button>
                                      </Row>
                                  </CardBody>
                              </Card>
                              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                  <CardBody className="text-center">
                                      <div>
                                          <img
                                              className="mb-4"
                                              src="https://vnu.edu.vn/upload/2012/04/12715/image/VNU-UET.jpg"
                                              alt=""
                                              width="72"
                                              height="72"
                                          />
                                          <h2>UET Training-Point</h2>
                                          <p>Hệ thống đánh giá điểm rèn luyện của trường Đại học Công nghệ - ĐHQGHN</p>
                                      </div>
                                  </CardBody>
                              </Card>
                          </CardGroup>
                      </Col>
                  </Row>
              </Container>
          </div>
      );
  }
}
export default Login;
