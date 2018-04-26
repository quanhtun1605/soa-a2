import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//import css
import "./css/bootstrap.css";
import "./css/dashboard.css";
import "./css/lecturerPage.css";

//import Components
import Login from "../Login";
import LecPage from "./lecPage";
import Showlist from "./showlist";
import Shownoti from "./shownoti";
import Createnoti from "./createNoti";

class Showsendnoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
            data: []
        };
        this.getSendNoti = this.getSendNoti.bind(this);
        Showsendnoti.signOut = Showsendnoti.signOut.bind(this);
    }

    componentDidMount() {
        console.log("getSendNoti");
        this.getSendNoti();
    }

    //TODO lấy ds form ĐRL qua API
    getSendNoti() {
        axios.get('http://localhost:8080/checkSendNoti')
            .then(response => {
                this.setState({data: response.data});
                console.log(this.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    back() {
        ReactDOM.render(
            <LecPage
                userID={this.state.userID}
            />,
            document.getElementById("root")
        );
    }

    showList(event) {
        console.log(this.state.userID);
        ReactDOM.render(
            <Showlist
                userID={this.state.userID}
            />,
            document.getElementById("root")
        );
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
                            <a className="nav-link" href="" onClick={Showsendnoti.signOut}>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="" onClick={(e)=>this.showList(e)}>
                                            Xem điểm rèn luyện của lớp
                                        </a>
                                        <a className="nav-link active" href="" onClick={(e)=>this.shownoti(e)}>
                                            Xem thông báo đã nhận
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

                <div className="container-fluid">
                    <div className="row">
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
                                <h1 className="h2">Danh sách thông báo đã gửi</h1>
                            </div>
                            <div id="main-teacher">
                                <div className="table-responsive">
                                    <table id="example" className="table table-hover table-striped table-bordered">
                                        <thead>
                                        <tr>
                                            <th>Mã người nhận</th>
                                            <th>Họ và tên</th>
                                            <th>Nội dung</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.data.map(function(item, key) {
                                            return (
                                                <tr key = {key}>
                                                    <td>{item.receiverID}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.message}</td>
                                                    <td>{item.createdDate}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>Mã người nhận</th>
                                            <th>Họ và tên</th>
                                            <th>Nội dung</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="col-sm-2"/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default Showsendnoti;