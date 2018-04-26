var mysql = require("mysql");

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "1234",
   database: "trainingpoint"
});

con.connect(function (err) {
    if (err) {
        console.log(err);
        console.log("Failed to connect to database!");
        return;
    }
    console.log("Successfully connected to database!");
});

exports.login = function login(username, password, callback) {
  con.query("select * from trainingpoint.users where username = '" + username + "'", function (err, rows) {
      if (rows.length === 0) {
          callback(false, JSON.stringify(serverAnswerLogin(false, null, null, null, null, null)), null);
      }
      else {
          if (rows[0].password === password) {
              callback(true, JSON.stringify(serverAnswerLogin(true, rows[0].isStudent,
                  rows[0].isMonitor, rows[0].isLecturer, rows[0].fullName, rows[0].userID)), rows[0].userID);
          }
          else {
              callback(false, JSON.stringify(serverAnswerLogin(false, null, null, null, null, null)), null);
          }
      }
  })
};

function serverAnswerLogin(Check, IsStudent, IsMonitor, IsLecture, FullName, UserID) {
    return {
        checkLogin: Check,
        isStudent: IsStudent,
        isMonitor: IsMonitor,
        isLecturer: IsLecture,
        fullName: FullName,
        userID: UserID
    };
}

exports.classInfo = function classInfo(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.classes.className, trainingpoint.classes.monitorName, " +
        "trainingpoint.classes.lecturerName from trainingpoint.users inner join trainingpoint.classes " +
        "on trainingpoint.users.classID = trainingpoint.classes.classID " +
        "where trainingpoint.users.userID = '" + uID + "'", function (err, rows) {
        callback(null, JSON.stringify(serverAnswerClassInfo(rows[0].className, rows[0].monitorName,
            rows[0].lecturerName)));
    })
};

function serverAnswerClassInfo(ClassName, MonitorName, LecturerName) {
    return {
        className: ClassName,
        monitorName: MonitorName,
        lecturerName: LecturerName
    };
}

exports.checkNoti = function checkNoti(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.users.fullName, trainingpoint.users.isStudent, trainingpoint.users.isMonitor, " +
        "trainingpoint.users.isLecturer, trainingpoint.notifications.message, trainingpoint.notifications.createdDate, " +
        "trainingpoint.notifications.senderID from trainingpoint.users inner join trainingpoint.notifications " +
        "on trainingpoint.users.userID = trainingpoint.notifications.senderID " +
        "where trainingpoint.notifications.receiverID = '" + uID + "' " +
        "order by trainingpoint.notifications.createdDate desc", function (err, rows) {
        callback(null, JSON.stringify(serverAnswerCheckNoti(rows)));
    })
};

function serverAnswerCheckNoti(Rows) {
    var result = [];
    for (var i=0; i<Rows.length; i++) {
        result.push({
            senderID: Rows[i].senderID,
            fullName: Rows[i].fullName,
            isStudent: Rows[i].isStudent,
            isMonitor: Rows[i].isMonitor,
            isLecturer: Rows[i].isLecturer,
            message: Rows[i].message,
            createdDate: new Date(Rows[i].createdDate).toString().replace(/\..+/, '')
        })
    }
    return result;
}

exports.checkSendNoti = function checkSendNoti(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.users.fullName, trainingpoint.users.isStudent, trainingpoint.users.isMonitor, " +
        "trainingpoint.users.isLecturer, trainingpoint.notifications.message, trainingpoint.notifications.createdDate, " +
        "trainingpoint.notifications.receiverID from trainingpoint.users inner join trainingpoint.notifications " +
        "on trainingpoint.users.userID = trainingpoint.notifications.receiverID " +
        "where trainingpoint.notifications.senderID = '" + uID + "' " +
        "order by trainingpoint.notifications.createdDate desc", function (err, rows) {
        callback(null, JSON.stringify(serverAnswerCheckSendNoti(rows)));
    })
};

function serverAnswerCheckSendNoti(Rows) {
    var result = [];
    for (var i=0; i<Rows.length; i++) {
        result.push({
            receiverID: Rows[i].receiverID,
            fullName: Rows[i].fullName,
            isStudent: Rows[i].isStudent,
            isMonitor: Rows[i].isMonitor,
            isLecturer: Rows[i].isLecturer,
            message: Rows[i].message,
            createdDate: new Date(Rows[i].createdDate).toString().replace(/\..+/, '')
        })
    }
    return result;
}

exports.formInput = function formInput(userID, studyingPoint, regulationsPoint, socialPoint, otherPoint, callback) {
    var uID = parseInt(userID);
    var stt = parseInt(1);
    var studyP = parseInt(studyingPoint);
    var reguP = parseInt(regulationsPoint);
    var socP = parseInt(socialPoint);
    var oP = parseInt(otherPoint);
    var totalPoint = parseInt(studyP + reguP + socP + oP);
    if (totalPoint > 100) totalPoint = 100;
    con.query("update trainingpoint.forms set trainingpoint.forms.formStatus = '" + stt + "', " +
        "trainingpoint.forms.totalPoint = '" + totalPoint + "', trainingpoint.forms.studyingPoint = '" + studyP + "', " +
        "trainingpoint.forms.regulationsPoint = '" + reguP + "', trainingpoint.forms.socialPoint = '" + socP + "', " +
        "trainingpoint.forms.otherPoint = '" + oP + "' where trainingpoint.forms.userID = '" + uID + "'",
        function (err, rows) {
        var result = {};
        if (rows.affectedRows = 1) result = {'status' : 'done'};
        else result = {'status' : 'fail'};
        callback(null, result);
    });
};

exports.sendNoti = function sendNoti(userID, receiverID, message, callback) {
    var uID = parseInt(userID);
    var reID = parseInt(receiverID);
    var notificationID;
    notificationID = randomInt(100000, 999999);
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var createdDate = dt.format('Y-m-d H:M:S');
    con.query("insert into trainingpoint.notifications (trainingpoint.notifications.notificationID, " +
        "trainingpoint.notifications.message, trainingpoint.notifications.senderID, " +
        "trainingpoint.notifications.receiverID, trainingpoint.notifications.createdDate) " +
        "values ('" + notificationID + "', '" + message + "', '" + uID + "', '" + reID + "',  '" + createdDate + "')",
        function (err, rows) {
        var result = {};
        if (rows.affectedRows = 1) result = {'status' : 'done'};
        else result = {'status' : 'fail'};
        callback(null, result);
    });
};

exports.classList = function classList(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.users.classID from trainingpoint.users " +
        "where trainingpoint.users.userID = '" + uID + "'", function(err, rows) {
        var clsID = rows[0].classID;
        serverAnswerClassList(clsID, function(err, result) {
            callback(null, result);
        });
    });
};

function serverAnswerClassList(clsID, callback) {
    con.query("select trainingpoint.users.userID, trainingpoint.users.fullName, trainingpoint.forms.studyingPoint, " +
        "trainingpoint.forms.regulationsPoint, trainingpoint.forms.socialPoint, trainingpoint.forms.otherPoint, " +
        "trainingpoint.forms.totalPoint from trainingpoint.users inner join trainingpoint.forms " +
        "on trainingpoint.users.userID = trainingpoint.forms.userID where trainingpoint.users.classID = '" + clsID + "' " +
        "order by trainingpoint.users.fullName asc", function(err, rows) {
        var result = [];
        for (var i=0; i<rows.length; i++) {
            result.push({
                userID: rows[i].userID,
                fullName: rows[i].fullName,
                studyingPoint: rows[i].studyingPoint,
                regulationsPoint: rows[i].regulationsPoint,
                socialPoint: rows[i].socialPoint,
                otherPoint: rows[i].otherPoint,
                totalPoint: rows[i].totalPoint
            })
        }
        callback(null, result);
    });
}

exports.sendClassList = function sendClassList(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.users.classID from trainingpoint.users " +
        "where trainingpoint.users.userID = '" + uID + "'", function(err, rows) {
        var clsID = rows[0].classID;
        serverAnswerSendClassList(clsID, function(err, result) {
            callback(null, result);
        });
    });
};

function serverAnswerSendClassList(clsID, callback) {
    var stt = parseInt(2);
    con.query("update trainingpoint.forms inner join trainingpoint.users " +
        "on trainingpoint.forms.userID = trainingpoint.users.userID SET trainingpoint.forms.formStatus = '" + stt + "' " +
        "where trainingpoint.users.classID = '" + clsID + "'", function (err, rows) {
        var result = {};
        if (rows.affectedRows = 1) result = {'status' : 'done'};
        else result = {'status' : 'fail'};
        callback(null, result);
    });
}

exports.complete = function complete(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.users.classID from trainingpoint.users " +
        "where trainingpoint.users.userID = '" + uID + "'", function(err, rows) {
        var clsID = rows[0].classID;
        serverAnswerComplete(clsID, function(err, result) {
            callback(null, result);
        });
    });
};

function serverAnswerComplete(clsID, callback) {
    var stt = parseInt(3);
    con.query("update trainingpoint.forms inner join trainingpoint.users " +
        "on trainingpoint.forms.userID = trainingpoint.users.userID SET trainingpoint.forms.formStatus = '" + stt + "' " +
        "where trainingpoint.users.classID = '" + clsID + "'", function (err, rows) {
        var result = {};
        if (rows.affectedRows = 1) result = {'status' : 'done'};
        else result = {'status' : 'fail'};
        callback(null, result);
    });
}

exports.checkForm = function checkForm(userID, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.forms.formStatus from trainingpoint.forms " +
        "where trainingpoint.forms.userID = '" + uID + "'", function (err, rows) {
        var result = {formStatus: rows[0].formStatus};
        callback(null, result);
    })
};

exports.sendMultipleNotis = function sendMultipleNotis(userID, message, callback) {
    var uID = parseInt(userID);
    con.query("select trainingpoint.users.classID from trainingpoint.users " +
        "where trainingpoint.users.userID = '" + uID + "'", function(err, rows) {
        var clsID = rows[0].classID;
        serverAnswerSendMultipleNotis(uID, clsID, message, function(err, result) {
            callback(null, result);
        });
    });
};

function serverAnswerSendMultipleNotis(uID, clsID, message, callback) {
    var notificationID;
    notificationID = randomInt(100000, 999999);
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var createdDate = dt.format('Y-m-d H:M:S');
    var reID = getuID(clsID);
    for (var i=0; i<getcount(clsID); i++) {
        con.query("insert into trainingpoint.notifications (trainingpoint.notifications.notificationID, " +
            "trainingpoint.notifications.message, trainingpoint.notifications.senderID, " +
            "trainingpoint.notifications.receiverID, trainingpoint.notifications.createdDate) " +
            "values ('" + notificationID + "', '" + message + "', '" + uID + "', '" + reID + "',  '" + createdDate + "')",
            function (err, rows) {
            var result = {};
            if (rows.affectedRows = 1) result = {'status' : 'done'};
            else result = {'status' : 'fail'};
            callback(null, result);
        });
    }
}

function getcount(clsID) {
    var count;
    con.query("select count(*) as countS from trainingpoint.users " +
        "where trainingpoint.users.classID =  '" + clsID + "'", function (err, rows) {
        count = parseInt(rows[0].countS) - 1;
    });
    return
}

function getuID(clsID) {
    var uID = [];
    con.query("select trainingpoint.users.userID from trainingpoint.users " +
        "where trainingpoint.users.classID = '" + clsID + "'" +
        "and trainingpoint.users.isStudent = 1", function (err, rows) {
        for (var i=0; i<rows.length; i++) {
            uID = rows[i].userID;
        }
        return uID;
    })
}

