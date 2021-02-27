// var mockUrl = 'https://600ce873f979dd001745c4ad.mockapi.io/api/v1/';
var mockUrl = 'http://localhost:3000/';

function handleAccessPage() {
    let token = localStorage.getItem('loginToken');
    if (token == null || token == undefined) {
        window.location.replace('../../sites/admin/login.html');
    } else {
        getAllMemberData();
    }
}

async function getAllMemberData() {
    $('#loading-image').show();
    await $.ajax({
        url: mockUrl + 'siteMember',
        type: 'GET',
        success: function(result) {
            $('#member-data').html(fetchMemberData(result));
        },
        error: function() {
            alert("Something went wrong!");
        },
        complete: function() {
            $('#table-header').show();
            $('#loading-image').hide();
        }
    });
}

function fetchMemberData(roomData) {
    var loadData = '';
    roomData.forEach((element, index) => {
        var data = JSON.parse(JSON.stringify(element));
        loadData += '<tr>';
        loadData += '<td>' + (parseInt(index) + 1) + '</td>';
        loadData += '<td>' + data.fullName + '</td>';
        loadData += '<td><img src="../../assets/images/' + data.avatar + '" alt="" style ="width: 20%;"></td>';
        loadData += '<td>' + getRoleName(data.role) + '</td>';
        loadData += '<td>' + data.email + '</td>';
        loadData += '<td>' + data.phoneNumber + '</td>';
        loadData += '<td>' + data.loginDate + '</td>';
        data.status === 'true' ?
            loadData += '<td><label class="switch"><input type="checkbox" onchange="updateStatus(' + data.id + ', false)" checked><span class="slider round"></span></label></td>' :
            loadData += '<td><label class="switch"><input type="checkbox" onchange="updateStatus(' + data.id + ', true)"><span class="slider round"></span></label></td>';
        loadData += '<td><button class="btn btn-outline-info" onclick="getMemberInfo(' + data.id + ')" data-toggle="modal" data-target="#memberModal"><i class="fas fa-pen"></i></button>';
        loadData += '&nbsp;&nbsp;';
        loadData += '<button onclick="deleteMember(' + data.id + ') " class="btn ml-1 btn-outline-danger"><i class="fas fa-trash"></i></button></td>';
        loadData += '</td>';
    });
    return loadData;
}

function getRoleName(data) {
    switch (parseInt(data)) {
        case 1:
            return 'Admin';
        case 2:
            return 'Employee';
        case 3:
            return 'User';
        default:
            return 'Undefined role';
    }
}

function onClickAddButton() {
    document.getElementById('modalLabel').innerHTML = 'Create new member';
    document.getElementById('action-button').setAttribute('onclick', 'addNewMember()');
    document.getElementById('name').value = '';
    document.getElementById('avatar').value = '';
    document.getElementById('role').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('password').value = '';
}

async function reloadMemberData() {
    await $.ajax({
        url: mockUrl + 'siteMember',
        type: 'GET',
        success: function(result) {
            $('#member-data').html(fetchMemberData(result));
        }
    });
}

async function addNewMember() {
    var newMember = {
        fullName: document.getElementById('name').value,
        avatar: document.getElementById('avatar').value,
        role: document.getElementById('role').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
        status: false
    };
    await $.ajax({
        url: mockUrl + 'siteMember',
        type: 'POST',
        data: newMember,
        success: function() {
            reloadMemberData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function getMemberInfo(memberId) {
    await $.ajax({
        url: mockUrl + 'siteMember/' + memberId,
        type: 'GET',
        success: function(result) {
            loadMemberData(result);
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function updateStatus(memberId, isBlock) {
    await $.ajax({
        url: mockUrl + 'siteMember/' + memberId,
        type: 'GET',
        success: function(memberData) {
            $.ajax({
                url: mockUrl + 'siteMember/' + memberId,
                type: 'PUT',
                data: {
                    fullName: memberData.fullName,
                    avatar: memberData.avatar,
                    role: memberData.role,
                    email: memberData.email,
                    phoneNumber: memberData.phoneNumber,
                    password: memberData.phoneNumber,
                    status: isBlock
                },
                success: function() {
                    reloadMemberData();
                }
            });
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

function loadMemberData(member) {
    document.getElementById('modalLabel').innerHTML = 'Update member info';
    document.getElementById("action-button").setAttribute('onclick', 'submitUpdate(' + member.id + ')');
    document.getElementById('name').value = member.fullName;
    document.getElementById('avatar').value = member.avatar;
    document.getElementById('role').value = member.role;
    document.getElementById('email').value = member.email;
    document.getElementById('phoneNumber').value = member.phoneNumber;
    document.getElementById('password').value = member.password;
    document.getElementById('status').value = member.status;
}

function submitUpdate(memberId) {
    let memberData = {
        fullName: document.getElementById('name').value,
        avatar: document.getElementById('avatar').value,
        role: document.getElementById('role').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
        status: document.getElementById('status').value
    }
    updateMember(memberId, memberData);
}

async function updateMember(memberId, data) {
    await $.ajax({
        url: mockUrl + 'siteMember/' + memberId,
        type: 'PUT',
        data: data,
        success: function() {
            reloadMemberData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function deleteMember(memberId) {
    let isConfirm = confirm('Do you want to delete this member?');
    if (isConfirm) {
        await $.ajax({
            url: mockUrl + 'siteMember/' + memberId,
            type: 'DELETE',
            success: function() {
                reloadMemberData();
            },
            error: function() {
                alert('Something went wrong!');
            }
        });
    }
}