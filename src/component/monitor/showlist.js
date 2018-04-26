import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//import css
import "../student/css/bootstrap.css";
import "./css/dashboard.css";

//import Components
import Login from "../Login";
import Monpage from "./monPage";
import Shownoti from "../lecturer/shownoti";
import Showsendnoti from "../lecturer/showsendnoti";
import Createnoti from "../lecturer/createNoti";

class Showlist extends Component {
  constructor(props) {
    super(props);
    // noinspection JSAnnotator
      this.state = {
      role: this.props.role,
        userID: this.props.userID,
          lecName: null,
          monitorVerity : '',
        data: []
    };
    this.getFormList = this.getFormList.bind(this);
    Showlist.signOut = Showlist.signOut.bind(this);
  }

  componentDidMount() {
    //TODO hiển thị DS form đã gửi lên
    console.log("get form list");
    console.log(this.state.userID);
    this.getFormList();
  }

  //TODO lấy ds form ĐRL qua API
  getFormList() {
    axios.get('http://localhost:8080/classList')
      .then(response => {
          for (let i=0; i<response.data.length; i++) {
            if (response.data[i].totalPoint === 0 || response.data[i].totalPoint === null) {
                this.setState({monitorVerify: 'Lớp trưởng chưa gửi điểm của lớp!'})
            }
            else {
                this.setState({data: response.data});
            }
          }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static showList() {
    ReactDOM.render(
        <showlist/>,
        document.getElementById("root")
    );
  }

  back() {
      ReactDOM.render(
          <Monpage
              userID={this.state.userID}
          />,
          document.getElementById("root")
      );
  }

  verify(event) {
    axios.get('http://localhost:8080/sendClassList')
        .then(response => {
          if (response.data === 'fail') {
            alert("Lỗi!")
          }
          else {
            alert("Duyệt thành công!")
          }
        })
        .catch(function (err) {
            console.log(err);
        });
      event.preventDefault();
  }

    shownoti(event) {
        console.log(this.state.userID);
        ReactDOM.render(
            <Shownoti
                userID={this.state.userID}
            />,
            document.getElementById("root")
        );
        event.preventDefault();
    }

    showsendnoti(event) {
        console.log(this.state.userID);
        ReactDOM.render(
            <Showsendnoti
                userID={this.state.userID}
            />,
            document.getElementById("root")
        );
        event.preventDefault();
    }

    createnoti(event) {
        console.log(this.state.userID);
        ReactDOM.render(
            <Createnoti
                userID={this.state.userID}
            />,
            document.getElementById("root")
        );
        event.preventDefault();
    }

  //TODO Dang xuat
  static signOut() {
    localStorage.removeItem("dataForUser");
    ReactDOM.render(
      <Login />,
      document.getElementById("root")
    );
  }

  render() {

    return (
      <div>
        {/* navigation bar */}
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
              ID người dùng: {this.state.userID}
          </a>
          {/* <input className="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" type="text"/> */}
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="" onClick={Showlist.signOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            {/*<nav className="col-md-2 d-none d-md-block bg-light sidebar">*/}
              <div className="container-fluid">
                  <div className="row">
                      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                          <div className="sidebar-sticky">
                              <ul className="nav flex-column">
                                  <li className="nav-item">
                                      <a className="nav-link active" href="" onClick={(e)=>this.shownoti(e)}>
                                          Xem thông báo đã nhận
                                      </a>
                                      <a className="nav-link active" href="" onClick={(e)=>this.showsendnoti(e)}>
                                          Xem thông báo đã gửi
                                      </a>
                                      <a className="nav-link active" href="" onClick={(e)=>this.createnoti(e)}>
                                          Gửi thông báo
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </nav>
                  </div>
              </div>

            {/* Main */}
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <button
                className="btn btn-sm btn-primary"
                type="Back"
                onClick={(e)=>this.back(e)}
              >
                Back
              </button>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách ĐRL sinh viên trong lớp</h1>
              </div>
              <div>
                <h4>{this.state.monitorVerity.toLocaleString()}</h4>
              </div>
              <div id="main-teacher">
                <div className="table-responsive">
                  <table id="example" className="table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Mã sinh viên</th>
                        <th>Họ và tên</th>
                        <th>Học tập và nghiên cứu</th>
                        <th>Chấp hành nội quy</th>
                        <th>Tham gia hoạt động và quan hệ cộng đồng</th>
                        <th>Điểm cộng thêm</th>
                        <th>Tổng điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(function(item, key) {
                          return (
                              <tr key = {key}>
                                  <td>{item.userID}</td>
                                  <td>{item.fullName}</td>
                                  <td>{item.studyingPoint}</td>
                                  <td>{item.regulationsPoint}</td>
                                <td>{item.socialPoint}</td>
                                <td>{item.otherPoint}</td>
                                  <td>{item.totalPoint}</td>
                              </tr>
                          )
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                          <th>Mã sinh viên</th>
                          <th>Họ và tên</th>
                          <th>Học tập và nghiên cứu</th>
                          <th>Chấp hành nội quy</th>
                          <th>Tham gia hoạt động và quan hệ cộng đồng</th>
                          <th>Điểm cộng thêm</th>
                          <th>Tổng điểm</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="col-sm-2"/>
              </div>
                <button
                    className="btn btn-block btn-primary"
                    type="Duyệt điểm của lớp"
                    onClick={(e)=>this.verify(e)}
                >
                    Duyệt điểm của lớp
                </button>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default Showlist;
