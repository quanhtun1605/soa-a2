import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';

//import css
import "./css/bootstrap.css";
import "./css/dashboard.css";

//import Components
import Login from "../Login";
import Stupage from "./stuPage";
import Shownoti from "../lecturer/shownoti";
import Showsendnoti from "../lecturer/showsendnoti";
import Createnoti from "../lecturer/createNoti";

class Formpoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
            formStatus: "",
            point1: '0',
            point2: '0',
            point3:'0',
            point4:'0'
        };
        Stupage.signOut = Stupage.signOut.bind(this);
        this.getFormStatus = this.getFormStatus.bind(this);
        this.handleChangePoint1 = this.handleChangePoint1.bind(this);
        this.handleSubmitPoint1 = this.handleSubmitPoint1.bind(this);
        this.handleChangePoint2 = this.handleChangePoint2.bind(this);
        this.handleSubmitPoint2 = this.handleSubmitPoint2.bind(this);
        this.handleChangePoint3 = this.handleChangePoint3.bind(this);
        this.handleSubmitPoint3 = this.handleSubmitPoint3.bind(this);
        this.handleChangePoint4 = this.handleChangePoint4.bind(this);
        this.handleSubmitPoint4 = this.handleSubmitPoint4.bind(this);
    }

//handle component point
    handleChangePoint1(event){
        if(parseInt(event.target.value) > 20) this.setState({ point1:20});
        else if (parseInt(event.target.value) < 0)this.setState({ point1:0});
        else this.setState({ point1:event.target.value});

    }
    handleSubmitPoint1(event){
        event.preventDefault();
    }
    handleChangePoint2(event){
        if(parseInt(event.target.value) > 25) this.setState({ point2:25});
        else if (parseInt(event.target.value) < 0)this.setState({ point2:0});
        else this.setState({ point2:event.target.value});

    }
    handleSubmitPoint2(event){
        event.preventDefault();
    }
    handleChangePoint3(event){
        if(parseInt(event.target.value) > 45) this.setState({ point3:45});
        else if (parseInt(event.target.value) < 0)this.setState({ point3:0});
        else this.setState({ point3:event.target.value});

    }
    handleSubmitPoint3(event){
        event.preventDefault();
    }
    handleChangePoint4(event){
        if(parseInt(event.target.value) > 10) this.setState({ point4:10});
        else if (parseInt(event.target.value) < 0)this.setState({ point4:0});
        else this.setState({ point4:event.target.value});
    }
    handleSubmitPoint4(event){
        event.preventDefault();
    }

    componentDidMount() {
        this.getFormStatus();
    }

    getFormStatus() {
        axios.get('http://localhost:8080/checkForm')
            .then(response => {
                if (response.data.formStatus === 0) {
                    this.setState({
                        formStatus: "Chưa nhập"
                    });
                }
                else if (response.data.formStatus === 1) {
                    this.setState({
                        formStatus: "Đã gửi đến lớp trưởng"
                    });
                }
                else if (response.data.formStatus === 2) {
                    this.setState({
                        formStatus: "Lớp trưởng đã xác nhận"
                    });
                }
                else {
                    this.setState({
                        formStatus: "Cố vấn học tập đã xác nhận"
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    submitForm(event) {
        console.log(this.state.point1);
        axios.post("http://localhost:8080/formInput", {
            studyingPoint: this.state.point1,
            regulationsPoint: this.state.point2,
            socialPoint: this.state.point3,
            otherPoint: this.state.point4
        })
            .then(response => {
                console.log(response);
                if (response.data.status === 'done') {
                    alert("Gửi form điểm thành công!")
                }
                else {
                    alert("Đã xảy ra lỗi!")
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        event.preventDefault();
    }

    back() {
        ReactDOM.render(
            <Stupage
                userID={this.state.userID}
            />,
            document.getElementById("root")
        );
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
                            <a className="nav-link" href="" onClick={Stupage.signOut}>
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
                            <button
                                className="btn btn-sm btn-primary"
                                type="Back"
                                onClick={(e)=>this.back(e)}
                            >
                                Back
                            </button>
                            <header className="App-header">
                                <h1 className="App-title">Điền điểm rèn luyện</h1>
                                <h4>Trạng thái điểm của bạn: {this.state.formStatus}</h4>
                            </header>

                            {/* mục 1 */}
                            <Row>
                                <Col xs="0" sm="1">
                                </Col>
                                <Col xs="12" sm="10">
                                    <Card>
                                        <CardHeader>
                                            <strong>Ý thức và kết quả học tập, NCKH</strong>
                                            <small> [0,20]</small>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Học lực yếu: trừ 3 điểm</Label>
                                                </Col>
                                                <Col xs="2">
                                                    {/* <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked /> */}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Bị cảnh cáo học vụ: trừ 5 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Không đăng ký đủ số tín chỉ quy định: trừ 5 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Không tham gia NCKH theo Quy định (đối với sinh viên NVCL): trừ 5 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Bị cấm thi hoặc bỏ thi cuối kỳ không có lý do: trừ 2 điểm/lần </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <strong> Tổng cộng: </strong>
                                                </Col>
                                                <Col xs="2">
                                                    <Input
                                                        type="number"
                                                        id="kdktc"
                                                        placeholder="[0, 20]"
                                                        value = {this.state.point1}
                                                        onChange = {this.handleChangePoint1}
                                                        required />

                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="0" sm="1">
                                </Col>
                            </Row>
                            {/* // mục 2 */}
                            <Row>
                                <Col xs="0" sm="1">
                                </Col>
                                <Col xs="12" sm="10">

                                    <Card>
                                        <CardHeader>
                                            <strong>Ý thức và kết quả chấp hành nội quy, quy chế trong nhà trường</strong>
                                            <small> [0,25]</small>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Nộp hoặc nhận không đúng một khoản kinh phí: trừ 5 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Đăng ký học quá hạn (nếu được chấp nhận): trừ 2 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Không đăng ký đủ số tín chỉ quy định: trừ 5 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Không thực hiện theo Giấy triệu tập/Yêu cầu của Nhà trường: trừ 5 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label> Trả quá hạn giấy tờ/hồ sơ đã được phép mượn: trừ 5 điểm/lần </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label> Không tham gia Bảo hiểm tế: trừ 5 điểm  </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Vi phạm quy định nơi cư trú: trừ 10 điểm/lần </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <strong> Tổng cộng: </strong>
                                                </Col>
                                                <Col xs="2">
                                                    <Input
                                                        type="number"
                                                        id="point2"
                                                        placeholder="[0, 25]"
                                                        value = {this.state.point2}
                                                        onChange = {this.handleChangePoint2}
                                                        required />

                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="0" sm="1">
                                </Col>
                            </Row>
                            {/* // mục 3 */}
                            <Row>
                                <Col xs="0" sm="1">
                                </Col>
                                <Col xs="12" sm="10">

                                    <Card>
                                        <CardHeader>
                                            <strong>Hoạt động xã hội và quan hệ cộng đồng</strong>
                                            <small> [0,45]</small>
                                        </CardHeader>
                                        <CardBody>

                                            <Row>
                                                <Col>
                                                    <strong>1. Cộng điểm</strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Tham gia đầy đủ các hoạt động của chi đoàn và tham gia đầy đủ các buổi sinh hoạt
                                                        chính trị theo triệu tập (nếu có) của Nhà trường: cộng 10 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs="10">
                                                    <Label>Tham gia (có giấy xác nhận) các hoạt động văn nghệ, thể thao, câu lạc bộ, hoạt
                                                        động tình nguyện…: cộng 2 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <strong>2. Trừ điểm</strong>
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col xs="10">
                                                    <Label> Không tham gia Sinh hoạt chính trị theo Quy định: trừ 2 điểm/buổi</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Có Thông báo bằng văn bản về việc không chấp hành các chủ trương của Đảng,
                                                        chính sách pháp luật của Nhà nước, vi phạm an ninh chính trị, trật tự an toàn xã hội,
                                                        an toàn giao thông,...: trừ 5 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Không có tinh thần giúp đỡ bạn bè, không thể hiện tinh thần đoàn kết tập thể: trừ 5
                                                        điểm/lần </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <strong> Tổng cộng: </strong>
                                                </Col>
                                                <Col xs="2">
                                                    <Input
                                                        type="number"
                                                        id="point3"
                                                        placeholder="[0, 45]"
                                                        value = {this.state.point3}
                                                        onChange = {this.handleChangePoint3}
                                                        required />

                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="0" sm="1">
                                </Col>
                            </Row>
                            {/* // mục 4 */}
                            <Row>
                                <Col xs="0" sm="1">
                                </Col>
                                <Col xs="12" sm="10">
                                    <Card>
                                        <CardHeader>
                                            <strong>Ý thức và kết quả tham gia công tác phụ trách lớp, các đoàn thể, tổ chức
                                                trong nhà trường hoặc đạt được thành tích đặc biệt trong học tập, rèn luyện
                                                của học sinh, sinh viên</strong>
                                            <small> [0,10]</small>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <strong>Cộng điểm</strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>Giữ các chức vụ trong các tổ chức chính quyền, đoàn thể và được đánh giá hoàn
                                                        thành tốt nhiệm vụ: cộng 10 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Label>Đạt thành tích cao trong học tập và NCKH:</Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>- Học lực (Xuất sắc, Giỏi): cộng 10 điểm</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>- Tham gia các cuộc thi chuyên môn như Procon, Olympic,…: cộng 5 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>- Đạt giải tại các cuộc thi chuyên môn: cộng 5 điểm/lần</Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>- Tham gia NCKH (không phải là SV NVCL): cộng 5 điểm </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="10">
                                                    <Label>- Đạt giải NCKH các cấp hoặc có báo cáo tại Hội nghị NCKH, bài báo đăng trên
                                                        các tạp chí trong và ngoài nước: cộng 5 điểm  </Label>
                                                </Col>
                                                <Col xs="2">

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs="10">
                                                    <strong> Tổng cộng: </strong>
                                                </Col>
                                                <Col xs="2">
                                                    <Input
                                                        type="number"
                                                        id="point4"
                                                        placeholder="[0, 10]"
                                                        value = {this.state.point4}
                                                        onChange = {this.handleChangePoint4}
                                                        required />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <Row>
                                                <Col xs="10">
                                                    <strong>Tổng điểm rèn luyện</strong>
                                                    <small> [0,100]</small>
                                                </Col>
                                                <Col xs="2">
                                                    <Input
                                                        type="number"
                                                        id="Spoint"
                                                        placeholder="[0, 100]"
                                                        value = {parseInt(this.state.point4) + parseInt(this.state.point3)
                                                        + parseInt(this.state.point2) + parseInt(this.state.point1)}
                                                        required />
                                                    <h4>Gửi điểm</h4>
                                                    <button
                                                        className="btn btn-success btn-primary"
                                                        type="Submit"
                                                        onClick={(e)=>this.submitForm(e)}
                                                    >
                                                        Submit
                                                    </button>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                    </Card>
                                </Col>
                                <Col xs="0" sm="1">
                                </Col>
                            </Row>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default Formpoint;