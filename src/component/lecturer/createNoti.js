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
import Showsendnoti from "./showsendnoti";
import Showlist from "./showlist";
import Shownoti from "./shownoti";

class Createnoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
            receiverID: "",
            message: "",
            data: null
        };
        this.handleChangeReceiverID = this.handleChangeReceiverID.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        Createnoti.signOut = Createnoti.signOut.bind(this);
    }

    handleChangeReceiverID(event) {
        this.setState({
           receiverID: event.target.value
        });
    }

    handleChangeMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleSubmit(event) {
        axios.post("http://localhost:8080/sendNoti", {
            receiverID: this.state.receiverID,
            message: this.state.message
            })
            .then(response => {
                console.log(response);
                if (response.data === 'fail') {
                    alert("Lỗi!")
                }
                else {
                    alert("Gửi thông báo thành công!");
                    ReactDOM.render(
                        <Showsendnoti
                            userID={this.state.userID}
                        />,
                        document.getElementById("root")
                    );
                }

            })
            .catch(function (err) {
                console.log(err);
            });
        event.preventDefault();
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
                                        <a className="nav-link active" href="" onClick={(e)=>this.showsendnoti(e)}>
                                            Xem thông báo đã gửi
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
                                <h1 className="h2">Gửi thông báo</h1>
                            </div>
                            <div className="form-label-group">
                                <input
                                    type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    placeholder="Email address"
                                    required
                                    autoFocus
                                    value={this.state.receiverID}
                                    onChange={this.handleChangeReceiverID}
                                />
                                <label htmlFor="inputEmail">Mã người nhận</label>
                            </div>
                            <div className="form-label-group">
                                <input
                                    type="textarena-input"
                                    id="inputMessage"
                                    className="form-control"
                                    placeholder="Messaga"
                                    required
                                    autoFocus
                                    value={this.state.message}
                                    onChange={this.handleChangeMessage}
                                />
                                <label htmlFor="inputMessage">Message</label>
                            </div>
                            <button
                                className="btn btn-lg btn-primary btn-block"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Gửi
                            </button>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default Createnoti;