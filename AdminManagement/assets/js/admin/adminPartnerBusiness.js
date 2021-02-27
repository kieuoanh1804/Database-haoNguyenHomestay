var mockUrl = 'https://600ce873f979dd001745c4ad.mockapi.io/api/v1/';

function handleAccessPage() {
    let token = localStorage.getItem('loginToken');
    if (token == null || token == undefined) {
        window.location.replace('../../sites/admin/login.html');
    } else {
        getAllPartnerData();
    }
}

async function getAllPartnerData() {
    $('#loading-image').show();
    await $.ajax({
        url: mockUrl + 'partner',
        type: 'GET',
        success: function(result) {
            $('#partner-data').html(fetchPartnerData(result));
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

function fetchPartnerData(roomData) {
    var loadData = '';
    roomData.forEach((element, index) => {
        var data = JSON.parse(JSON.stringify(element));
        loadData += '<tr>';
        loadData += '<td>' + (parseInt(index) + 1) + '</td>';
        loadData += '<td>' + data.name + '</td>';
        loadData += '<td><img src="../../assets/images/' + data.brandLogo + '" alt="" style ="width: 50%;"></td>';
        loadData += '<td>' + data.field + '</td>';
        loadData += '<td>' + data.contractDate + '</td>';
        loadData += '<td>' + data.email + '</td>';
        loadData += '<td>' + data.phoneNumber + '</td>';
        loadData += '<td><button class="btn btn-outline-info" onclick="getPartnerInfo(' + data.id + ')" data-toggle="modal" data-target="#partnerModal"><i class="fas fa-pen"></i></button>';
        loadData += '&nbsp;&nbsp;';
        loadData += '<button onclick="deletePartner(' + data.id + ') " class="btn ml-1 btn-outline-danger"><i class="fas fa-trash"></i></button></td>';
        loadData += '</td>';
    });
    return loadData;
}

function onClickAddButton() {
    document.getElementById('modalLabel').innerHTML = 'Create new partner';
    document.getElementById('action-button').setAttribute('onclick', 'addNewPartner()');
    document.getElementById('name').value = '';
    document.getElementById('brandLogo').value = '';
    document.getElementById('field').value = '';
    document.getElementById('contractDate').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneNumber').value = '';
}

async function reloadPartnerData() {
    await $.ajax({
        url: mockUrl + 'partner',
        type: 'GET',
        success: function(result) {
            $('#partner-data').html(fetchPartnerData(result));
        }
    });
}

async function addNewPartner() {
    var newPartner = {
        name: document.getElementById('name').value,
        brandLogo: document.getElementById('brandLogo').value,
        field: document.getElementById('field').value,
        contractDate: document.getElementById('contractDate').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };
    await $.ajax({
        url: mockUrl + 'partner',
        type: 'POST',
        data: newPartner,
        success: function() {
            reloadPartnerData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function getPartnerInfo(partnerId) {
    await $.ajax({
        url: mockUrl + 'partner/' + partnerId,
        type: 'GET',
        success: function(result) {
            loadPartnerData(result);
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function updateStatus(partnerId, isBlock) {
    await $.ajax({
        url: mockUrl + 'partner/' + partnerId,
        type: 'PUT',
        data: {
            status: isBlock
        },
        success: function() {
            reloadPartnerData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

function loadPartnerData(partner) {
    document.getElementById('modalLabel').innerHTML = 'Update partner info';
    document.getElementById('action-button').setAttribute('onclick', 'submitUpdate(' + partner.id + ')');
    document.getElementById('name').value = partner.name;
    document.getElementById('brandLogo').value = partner.brandLogo;
    document.getElementById('field').value = partner.field;
    document.getElementById('contractDate').value = partner.contractDate;
    document.getElementById('email').value = partner.email;
    document.getElementById('phoneNumber').value = partner.phoneNumber;
}

function submitUpdate(partnerId) {
    let partnerData = {
        name: document.getElementById('name').value,
        brandLogo: document.getElementById('brandLogo').value,
        field: document.getElementById('field').value,
        contractDate: document.getElementById('contractDate').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
    }
    updateRoom(partnerId, partnerData);
}

async function updateRoom(partnerId, data) {
    await $.ajax({
        url: mockUrl + 'partner/' + partnerId,
        type: 'PUT',
        data: data,
        success: function() {
            reloadPartnerData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function deletePartner(partnerId) {
    let isConfirm = confirm('Do you want to delete this partner?');
    if (isConfirm) {
        await $.ajax({
            url: mockUrl + 'partner/' + partnerId,
            type: 'DELETE',
            success: function() {
                reloadPartnerData();
            },
            error: function() {
                alert('Something went wrong!');
            }
        });
    }
}