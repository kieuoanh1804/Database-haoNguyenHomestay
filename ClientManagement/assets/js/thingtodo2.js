

 const API_URL = 'https://600aaefa778d1a001779439b.mockapi.io/api';
 
 var user=[
    {
      userName: "SYNGUYEN",
      password: "Synguyen282001",
      email: " ",
      status: "unconfimred"
    },
    {
        userName: "SYNGUYEN2",
        password: "Synguyen282002",
        email: " ",
        status: "Confirmed"
      }
];



function callAPI(endpoint, method, body) {
    // alert("truy cap");
    return axios({
        method: method,
        url:`${API_URL}/${endpoint}`,
        data: body,
        }).catch((err) => {
    console.log(err.data);
    });
};

reload();
getData();
if(localStorage.getItem("userAccount")!=null){
    saveAc();
};


function logout(){
    localStorage.removeItem("userAccount");
    // window.reload();
    location.reload();
}

function getData(){
    callAPI("User", "GET", null).then((res) => {
        user = res.data;
        localStorage.setItem("listStyle", JSON.stringify(user));
        console.log(user);
    });  
}

var Email = { 
    send: function (a) { 
        return new Promise(function (n, e) { 
            a.nocache = Math.floor(1e6 * Math.random() + 1), 
            a.Action = "Send"; var t = JSON.stringify(a); 
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) 
    }, 
    ajaxPost: function (e, n, t) { 
        var a = Email.createCORSRequest("POST", e); 
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
        a.onload = function () { var e = a.responseText; null != t && t(e) }, 
        a.send(n) 
    }, 
    ajax: function (e, n) { 
        var t = Email.createCORSRequest("GET", e); 
        t.onload = function () { 
            var e = t.responseText; 
            null != n && n(e) 
        }, 
        t.send() 
    }, 
    createCORSRequest: function (e, n) { 
        var t = new XMLHttpRequest; 
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
    } 
};

// Email.send({
//     SecureToken : "8450d68d-a6c1-4856-931b-9cdc166d97d3",
//     To : '',
//     From : "thaonguyen@gmail.com",
//     Subject : "This is the subject",
//     Body : "And this is the body"
// }).then(
//   message => alert(message)
// );

var err=0;

 function set(){
    document.getElementById("error1").style.display="none";
    document.getElementById("error2").style.display="none";
    document.getElementById("error3").style.display="none";
    document.getElementById("error4").style.display="none";
    document.getElementById("error5").style.display="none";
 }
  

 function error1(){
    var userNam= document.getElementById('name').value;
    var pass= document.getElementById('password3').value;
    var email1= document.getElementById('email').value;
    var cofirm=document.getElementById('password-corfirm').value;

    if(userNam.length==0){
        document.getElementById("error1").style.display="block";
        return 1;
    }
    else{
        document.getElementById("error1").style.display="none";
    }
        
    
    if(email1.length==0){
        document.getElementById("error2").style.display="block";
        return 2;
    }
    else{
        document.getElementById("error2").style.display="none";
    }
    if(pass.length==0){
        document.getElementById("error3").style.display="block";
        return 3;
    }
    else{
        document.getElementById("error3").style.display="none";
    }

    if(pass!=cofirm){
        document.getElementById("error4").style.display="block";
        return 4;
    }
    else{
        document.getElementById("error4").style.display="none";
    }
    for(var i in user){
        if(userNam==user[i].userName){
            document.getElementById('error5').style.display="block";
            return 5;
        }
        else
        document.getElementById('error5').style.display="none";
    }

    return 0;
 }
 function sendMail() {
    
    var userName = document.getElementById('name').value;
    var password = document.getElementById('password3').value;
    var clientMail = document.getElementById('email').value;

    Email.send({
        SecureToken: "ce7d25ac-d344-4e3d-b70c-6829a36e6266",
        To: clientMail,
        From: "thaonguyenhomestay2021@gmail.com",
        Subject: "Email for account registration",
        Body: settingMailStyle() + ' ' + settingEmail(userName, password, clientMail)
    }).then(
        message => message === 'OK' ? alert('Please check your reservation detail on your booking email!') : alert('Something went wrong, please try again!')
    );
}

function sendMailCofirm() {
    
    var check=0;
   var clientMail=document.getElementById('emailfor').value;
   
   for(var i in user){

       if(clientMail==user[i].email){
        
        var code=Math.floor(Math.random() * 1000000)
        ;
        var id=user[i].id;
        var dataConfirm=[{code:code,
        clientMail:clientMail,
        id: id}];
        localStorage.setItem("code", JSON.stringify(dataConfirm));
        check=1;
        Email.send({
            SecureToken: "ce7d25ac-d344-4e3d-b70c-6829a36e6266",
            To: clientMail,
            From: "thaonguyenhomestay2021@gmail.com",
            Subject: "Email confirm password",
            Body: settingMailStyle() + ' ' + settingEmailConfirm(code, clientMail)
        }).then(
            message => message === 'OK' ? alert('Please check your reservation detail on your booking email!') : alert('Something went wrong, please try again!')
        );

        document.getElementById('myModal1').style.display="none";
        document.getElementById('myModal2').style.display="block";
        
        // document.getElementById('myModal2').style.display="none";
       }
   }

   if(check==0){
    alert("Email không tồn tại!");
    document.getElementById('myModal2').style.display="none";
    
   }
   
}

window.onclick=function() {
    document.getElementById('myModal2').style.display="none"
}
    
function complete(){
    var i;
    var data1=[];
    data1=JSON.parse(localStorage.getItem('code'));
var password=document.getElementById('passfor').value;
var passwordcon=document.getElementById('passForCon').value;
if(password!=passwordcon){
    document.getElementById('checkPass').innerHTML="Mat khau khong khop!"
}
else{
    for(i=0;i<parseInt(user.length);i++){
        if(user[i].id==data1[0].id){
            user[i].password=password;
            callAPI(`User/${data1[0].id}`, "PUT", user[i]).then((res) => {
                alert("Cap nhat thanh cong!")
                location.reload();
             }); 
        }
    }
}
}


function confirm(){
var datacon=[];
datacon=JSON.parse(localStorage.getItem('code'));
var  code=datacon[0].code;
var codeInput=document.getElementById('code').value;
if(code==codeInput){
    document.getElementById('myModal3').style.display="block";
    close1(2);
}
else
document.getElementById('errCode').innerHTML="Ma xac nhan khong ton tai!"
}
function register(){
    var userName= document.getElementById('name').value;
    var pass= document.getElementById('password3').value;
    var email1= document.getElementById('email').value;
    var cofirm=document.getElementById('password-corfirm').value;
    error1();
    if(error1()==0){
        var data={
            userName: userName,
            password:pass,
            email:email1,
            status: "unconfimred"
        };

        user.push(data);
        localStorage.setItem('listUser',JSON.stringify(user));
        var modal=document.getElementById('ModalLoginForm');
        modal.style.display="none";
        alert("Đăng kí thành công!");
        sendMail();
        
        callAPI("User", "POST", data).then((response) => {
            alert("Thêm tài khoản thành công!");
            location.reload();
            });
            
    }
    

}


var userAccount={
    user:"",
    pass:""
};

function reload(){
    userAccount = JSON.parse(localStorage.getItem('userAccount'));
    if(userAccount==null){
        document.getElementById('icon9').style.display="none";
        document.getElementById('icon5').style.display="none";
        document.getElementById('log').style.display="none";
        document.getElementById('rr').style.display="none";
    }
}


function login2(){
    
    var check=0;
    var username1=document.getElementById("username").value;
    var pass=document.getElementById("password").value;
    for(var i in user){
        if(username1==user[i].userName&&pass==user[i].password){
            alert("Dang nhap thanh cong");
            userAccount.user=username1;
            userAccount.pass=pass;
            localStorage.setItem('userAccount',JSON.stringify(userAccount));
            location.reload();
            saveAc();
            check=1;
        }
    }
    if(check==0){
        var modal=document.getElementById('login');
        modal.style.display="block";
        alert("User name or password is fouls!");
    }
    
}

function forgotPass(){
    
    var modal=document.getElementById("myModal");
    modal.style.display="none";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("myModal2").style.display="none";
        }
        }
}
function saveAc(){
    userAccount = JSON.parse(localStorage.getItem('userAccount'));
    if(userAccount.user!=""){
        var url1='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg';
        document.getElementById('Signin').style.display="none";
        document.getElementById('rr').style.backgroundImage='url('+ url1 +')';
        document.getElementById('rr').style.backgroundSize="cover";
        document.getElementById('rr').innerHTML="";
        
        document.getElementById('icon9').style.backgroundImage='url('+ url1 +')';
        document.getElementById('icon9').style.backgroundSize="cover";
        document.getElementById('icon9').innerHTML="";
       
        // document.getElementById('icon9').style.display="block";
        // document.getElementById('icon5').style.display="block";
        // document.getElementById('log').style.display="block";
        // document.getElementById('rr').style.display="block";
    }
    
}
function close1(id){
    if(id==1){
    document.getElementById('myModal1').style.display="none";
    
    window.onclick(document.getElementById('myModal1').style.display="none");
    }
    if(id==2){
        document.getElementById('myModal2').style.display="none";
        window.onclick(document.getElementById('myModal2').style.display="none");
        document.getElementById('body').className="";
        document.getElementById('body').style="none";
        }
    if(id==3){
        document.getElementById('myModal3').style.display="none";
        window.onclick(document.getElementById('myModal3').style.display="none");
        document.getElementById('body').className="";
        document.getElementById('body').style="none";
         }
}

function settingEmailConfirm(code, clientMail) {
    var clientMail = document.getElementById('email').value;
    return '<body>' +
        '    <table cellpadding="0" cellspacing="0" width="100%">' +
        '        <tr>' +
        '            <td width="100%" style="background-color: #f7f7f7;" class="content-padding">' +
        '                <center>' +
        '                    <table cellspacing="0" cellpadding="0" width="600" class="w320">' +
        '                        <tr>' +
        '                            <td class="header-lg">' +
        '                                Email for account registration' +
        '                            </td>' +
        '                        </tr>' +
        '                        <tr>' +
        '                            <td class="free-text">' +
        '                                <p>Dear Mr./Ms. <a id="email">'+clientMail+'</a>+ ,</p>' +
        '                                <p>Thank you for choosing to stay with us at the Thao Nguyen HomeStay. We are pleased to confirm your reservation as follows:</p>' +
        '                            </td>' +
        '                        </tr>' +
        '                    </table>' +
        '                </center>' +
        '            </td>' +
        '        </tr>' +
        '        <tr>' +
        '            <td style="background-color: #ffffff;  border-top: 1px solid #e5e5e5;">' +
        '                <center>' +
        '                    <table cellpadding="0" cellspacing="0" width="39%">' +
        '                        <tr>' +
        '                            <td class="mini-container-right">' +
        '                                <table cellpadding="0" cellspacing="0" width="100%">' +
        '                                    <tr>' +
        '                                        <td class="mini-block-padding">' +
        '                                            <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:separate !important;">' +
        '                                                <tr>' +
        '                                                    <td class="mini-block">' +
        '                                                        <span class="header-sm">Password reset confirmation code</span><br /> ' + code+ '<br />' +
        '                                                        <br />' + 
        '                                                    </td>' +
        '                                                </tr>' +
        '                                            </table>' +
        '                                        </td>' +
        '                                    </tr>' +
        '                                </table>' +
        '                            </td>' +
        '        </tr>' +
        '        <tr>' +
        '            <td style="background-color: #f7f7f7; height: 100px;">' +
        '                <center>' +
        '                    <table cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td style="padding: 25px 0 25px">' +
        '                                <strong>Thao Nguyen Homestay</strong><br /> Son Trach, Bo Trach, Quang Binh <br /> (+84) 896 205 232<br /><br />' +
        '                            </td>' +
        '                        </tr>' +
        '                    </table>' +
        '                </center>' +
        '            </td>' +
        '        </tr>' +
        '    </table>' +
        '    </div>' +
        '</body>' +
        '' +
        '</html>';
}


function settingEmail(userName, password, clientMail) {
    var clientMail = document.getElementById('email').value;
    return '<body>' +
        '    <table cellpadding="0" cellspacing="0" width="100%">' +
        '        <tr>' +
        '            <td width="100%" style="background-color: #f7f7f7;" class="content-padding">' +
        '                <center>' +
        '                    <table cellspacing="0" cellpadding="0" width="600" class="w320">' +
        '                        <tr>' +
        '                            <td class="header-lg">' +
        '                                Email for account registration' +
        '                            </td>' +
        '                        </tr>' +
        '                        <tr>' +
        '                            <td class="free-text">' +
        '                                <p>Dear Mr./Ms. <a id="email">'+clientMail+'</a>+ ,</p>' +
        '                                <p>Thank you for choosing to stay with us at the Thao Nguyen HomeStay. We are pleased to confirm your reservation as follows:</p>' +
        '                            </td>' +
        '                        </tr>' +
        '                    </table>' +
        '                </center>' +
        '            </td>' +
        '        </tr>' +
        '        <tr>' +
        '            <td style="background-color: #ffffff;  border-top: 1px solid #e5e5e5;">' +
        '                <center>' +
        '                    <table cellpadding="0" cellspacing="0" width="39%">' +
        '                        <tr>' +
        '                            <td class="mini-container-right">' +
        '                                <table cellpadding="0" cellspacing="0" width="100%">' +
        '                                    <tr>' +
        '                                        <td class="mini-block-padding">' +
        '                                            <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:separate !important;">' +
        '                                                <tr>' +
        '                                                    <td class="mini-block">' +
        '                                                        <span class="header-sm">Registration Date</span><br /> ' + new Date().toISOString().slice(0, 10) + '<br />' +
        '                                                        <br />' + 
        '                                                    </td>' +
        '                                                </tr>' +
        '                                            </table>' +
        '                                        </td>' +
        '                                    </tr>' +
        '                                </table>' +
        '                            </td>' +
        '                            <td class="mini-container-right">' +
        '                                <table cellpadding="0" cellspacing="0" width="100%">' +
        '                                    <tr>' +
        '                                        <td class="mini-block-padding">' +
        '                                            <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:separate !important;">' +
        '                                                <tr>' +
        '                                                    <td class="mini-block">' +
        '                                                        <span class="header-sm">User name</span><br/>' + userName + ' <br/>' +
        '                                                        <br />' +
        '                                                        <span class="header-sm">Password</span><br/> ' + password + ' <br/>' +
        '                                                    </td>' +
        '                                                </tr>' +
        '                                                <tr>' +
        '                                                      <td class="mini-block">' +
        '                                                        <button style="hight:30px; width: 100px; background-color: blue;">Verify Email Address</button>' +
        '                                                    </td>' +
        '                                                </tr>' +
        '                                            </table>' +
        '                                        </td>' +
        '                                    </tr>' +
        '                                </table>' +
        '                            </td>' +
        '                        </tr>' +
        '                    </table>' +
        '                </center>' +
        '            </td>' +
        '        </tr>' +
        '        <tr>' +
        '            <td style="background-color: #f7f7f7; height: 100px;">' +
        '                <center>' +
        '                    <table cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td style="padding: 25px 0 25px">' +
        '                                <strong>Thao Nguyen Homestay</strong><br /> Son Trach, Bo Trach, Quang Binh <br /> (+84) 896 205 232<br /><br />' +
        '                            </td>' +
        '                        </tr>' +
        '                    </table>' +
        '                </center>' +
        '            </td>' +
        '        </tr>' +
        '    </table>' +
        '    </div>' +
        '</body>' +
        '' +
        '</html>';
}

function settingMailStyle() {
    return '<!DOCTYPE html>' +
        '<html>' +
        '' +
        '<head>' +
        '    <style type="text/css">' +
        '        body {' +
        '            -webkit-font-smoothing: antialiased;' +
        '            -webkit-text-size-adjust: none;' +
        '            width: 100% !important;' +
        '            margin: 0 !important;' +
        '            height: 100%;' +
        '            color: #676767;' +
        '        }' +
        '        ' +
        '        td {' +
        '            font-family: Helvetica, Arial, sans-serif;' +
        '            font-size: 14px;' +
        '            color: #777777;' +
        '            text-align: center;' +
        '            line-height: 21px;' +
        '        }' +
        '        ' +
        '        .header-lg,' +
        '        .header-sm {' +
        '            font-size: 32px;' +
        '            font-weight: 700;' +
        '            line-height: normal;' +
        '            padding: 35px 0 0;' +
        '            color: #4d4d4d;' +
        '        }' +
        '        ' +
        '        .header-sm {' +
        '            padding: 5px 0;' +
        '            font-size: 18px;' +
        '            line-height: 1.3;' +
        '        }' +
        '        ' +
        '        .content-padding {' +
        '            padding: 20px 0 5px;' +
        '        }' +
        '        ' +
        '        .free-text {' +
        '            width: 100% !important;' +
        '            padding: 10px 60px 0px;' +
        '        }' +
        '        ' +
        '        .mini-block {' +
        '            border: 1px solid #e5e5e5;' +
        '            border-radius: 5px;' +
        '            background-color: #ffffff;' +
        '            padding: 12px 15px 15px;' +
        '            text-align: left;' +
        '            width: 253px;' +
        '        }' +
        '        ' +
        '        .mini-container-right {' +
        '            width: 278px;' +
        '            padding: 10px 14px 10px 15px;' +
        '        }' +
        '        ' +
        '        .product {' +
        '            text-align: left;' +
        '            vertical-align: top;' +
        '            width: 175px;' +
        '        }' +
        '        ' +
        '        .item-table {' +
        '            padding: 50px 20px;' +
        '            width: 560px;' +
        '        }' +
        '        ' +
        '        .item {' +
        '            width: 300px;' +
        '        }' +
        '        ' +
        '        .mobile-hide-img {' +
        '            text-align: left;' +
        '            width: 125px;' +
        '        }' +
        '        ' +
        '        .mobile-hide-img img {' +
        '            border: 1px solid #e6e6e6;' +
        '            border-radius: 4px;' +
        '        }' +
        '        ' +
        '        .title-dark {' +
        '            text-align: left;' +
        '            border-bottom: 1px solid #cccccc;' +
        '            color: #4d4d4d;' +
        '            font-weight: 700;' +
        '            padding-bottom: 5px;' +
        '        }' +
        '        ' +
        '        .item-col {' +
        '            padding-top: 20px;' +
        '            text-align: left;' +
        '            vertical-align: top;' +
        '        }' +
        '    </style>' +
        '</head>';
}
