import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Card, CardBody, CardGroup, CardHeader, Col, Container, Row} from 'reactstrap';
import axios from "axios";

//import css
import "./css/bootstrap.css";
import "./css/dashboard.css";
import "./css/lecturerPage.css";

//import Components
import Login from "../Login";
import ShowList from "./showlist";
import Shownoti from "./shownoti";
import Showsendnoti from "./showsendnoti";
import Createnoti from "./createNoti";

class LecPage extends Component {
    constructor(props) {
        super(props);
        // noinspection JSAnnotator
        this.state = {
            role: this.props.role,
            userID: this.props.userID,
            monitorVerity : 'Lớp trưởng đã xác nhận điểm rèn luyện.',
            className: "",
            monitorName: "",
            lecturerName: ""
        };
        this.getClassInfo = this.getClassInfo.bind(this);
        LecPage.signOut = LecPage.signOut.bind(this);
    }

    componentDidMount() {
        this.getClassInfo();
    }

    getClassInfo() {
        axios.get('http://localhost:8080/classInfo')
            .then(response => {
                this.setState({
                    className: response.data.className,
                    monitorName: response.data.monitorName,
                    lecturerName: response.data.lecturerName
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showList(event) {
        console.log(this.state.userID);
        ReactDOM.render(
            <ShowList
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
                            <a className="nav-link" href="" onClick={LecPage.signOut}>
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

                <div className="container-fluid">
                    <div className="row">
                        {/* Main */}
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            <Card>
                                <CardHeader>
                                    <strong class= "h2">Thông tin lớp khóa học</strong>
                                </CardHeader>
                                <CardBody>
                                    <h4>Tên lớp khóa học: {this.state.className}</h4>
                                    <h4>Cố vấn học tập: {this.state.lecturerName}</h4>
                                    <h4>Lớp trưởng: {this.state.monitorName}</h4>
                                </CardBody>
                            </Card>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
export default LecPage;
