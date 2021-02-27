// var mockUrl = 'https://600ce873f979dd001745c4ad.mockapi.io/api/v1/';
var mockUrl = 'http://localhost:3000/';

function handleAccessPage() {
    let token = localStorage.getItem('loginToken');
    if (token == null || token == undefined) {
        window.location.replace('../../sites/admin/login.html');
    } else {
        getAllReservations();
        setMinDate();
    }
}

function setMinDate() {
    let today = new Date().toISOString().slice(0, 10);
    document.getElementById("inputCheckInDate").setAttribute("min", today);
    document.getElementById("inputCheckOutDate").setAttribute("min", today);
}

async function getAllReservations() {
    $('#loading-image').show();
    await $.ajax({
        url: mockUrl + 'reservation',
        type: 'GET',
        success: function(result) {
            $('#reservation-data').html(fetchReservation(result));
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

function fetchReservation(reservationData) {
    var loadData = '';
    reservationData.forEach((element, index) => {
        var data = JSON.parse(JSON.stringify(element));
        loadData += '<tr>';
        loadData += '<td>' + (parseInt(index) + 1) + '</td>';
        loadData += '<td>' + data.firstName + ' ' + data.lastName + '</td>';
        loadData += '<td style="max-width: 50px">' + data.email + '</td>';
        loadData += '<td>' + data.checkInDate + '</td>';
        loadData += '<td>' + data.checkOutDate + '</td>';
        loadData += '<td>' + getRoomTypeName(data.roomType) + '</td>';
        loadData += '<td>' + data.numberOfRoom + '</td>';
        loadData += '<td>' + data.numberOfGuest + '</td>';
        loadData += '<td>' + data.price + '</td>';
        data.status === 'true' ?
            loadData += '<td><p><a class="text-light bg-danger status">Completed</a></p></td>' :
            loadData += '<td><p><a class="text-light bg-primary status">Processing</a></p></td>';
        loadData += '<td>' + data.note + '</td>';
        data.status === 'true' ?
            loadData += '<td><label class="switch"><input type="checkbox" onchange="updateStatus(' + data.id + ', false)" checked><span class="slider round"></span></label></td>' :
            loadData += '<td><label class="switch"><input type="checkbox" onchange="updateStatus(' + data.id + ', true)"><span class="slider round"></span></label></td>';
        loadData += '<td><button class="btn btn-outline-info" onclick="getRerservationInfo(' + data.id + ')" data-toggle="modal" data-target="#reservationModal"><i class="fas fa-pen"></i></button>';
        loadData += '&nbsp;&nbsp;';
        loadData += '<button onclick="deleteRerservation(' + data.id + ') " class="btn ml-1 btn-outline-danger"><i class="fas fa-trash"></i></button></td>';
        loadData += '</td>';
    });
    return loadData;
}

function getRoomTypeName(code) {
    switch (parseInt(code)) {
        case 1:
            return 'Deluxe Queen Corner Suite';
        case 2:
            return 'Deluxe Queen Suite';
        case 3:
            return 'Double Queen Room';
        case 4:
            return 'Triple Room';
        case 5:
            return 'Family Room';
        default:
            return 'Undefined code';
    }
}

function onClickAddButton() {
    document.getElementById('modalLabel').innerHTML = 'Create new reservation';
    document.getElementById('action-button').setAttribute('onclick', 'addNewReservation()');
    document.getElementById('inputFirstName').value = '';
    document.getElementById('inputLastName').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputCheckInDate').value = '';
    document.getElementById('inputCheckOutDate').value = '';
    document.getElementById('inputRoomType').value = '';
    document.getElementById('inputNumberOfRoom').value = '';
    document.getElementById('inputNumberOfGuest').value = '';
    document.getElementById('inputPrice').value = '';
    document.getElementById('inputNote').value = '';
}

function setPriceData() {
    let code = document.getElementById('inputRoomType').value;
    let numberOfRoom = document.getElementById('inputNumberOfRoom').value;
    let reservationPrice = 0;
    switch (parseInt(code)) {
        case 1:
            reservationPrice = 400000;
            break;
        case 2:
            reservationPrice = 450000;
            break;
        case 3:
            reservationPrice = 500000;
            break;
        case 4:
            reservationPrice = 550000;
            break;
        case 5:
            reservationPrice = 600000;
            break;
        default:
            reservationPrice = 0;
    }
    document.getElementById('inputPrice').value = reservationPrice * numberOfRoom;
}

async function reloadReservationData() {
    await $.ajax({
        url: mockUrl + 'reservation',
        type: 'GET',
        success: function(result) {
            $('#reservation-data').html(fetchReservation(result));
        }
    });
}

async function addNewReservation() {
    var newReservation = {
        firstName: document.getElementById('inputFirstName').value,
        lastName: document.getElementById('inputLastName').value,
        email: document.getElementById('inputEmail').value,
        checkInDate: document.getElementById('inputCheckInDate').value,
        checkOutDate: document.getElementById('inputCheckOutDate').value,
        roomType: document.getElementById('inputRoomType').value,
        numberOfRoom: document.getElementById('inputNumberOfRoom').value,
        numberOfGuest: document.getElementById('inputNumberOfGuest').value,
        status: false,
        price: document.getElementById('inputPrice').value,
        note: document.getElementById('inputNote').value
    };
    await $.ajax({
        url: mockUrl + 'reservation',
        type: 'POST',
        data: newReservation,
        success: function(result) {
            reloadReservationData();
            sendMail(result);
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function updateStatus(reservationId, isComplete) {
    await $.ajax({
        url: mockUrl + 'reservation/' + reservationId,
        type: 'GET',
        success: function(reservationData) {
            $.ajax({
                url: mockUrl + 'reservation/' + reservationId,
                type: 'PUT',
                data: {
                    firstName: reservationData.firstName,
                    lastName: reservationData.lastName,
                    email: reservationData.email,
                    checkInDate: reservationData.checkInDate,
                    checkOutDate: reservationData.checkOutDate,
                    roomType: reservationData.roomType,
                    numberOfRoom: reservationData.numberOfRoom,
                    numberOfGuest: reservationData.numberOfGuest,
                    status: isComplete,
                    price: reservationData.price,
                    note: reservationData.note
                },
                success: function() {
                    reloadReservationData();
                }
            });
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function getRerservationInfo(reservationId) {
    await $.ajax({
        url: mockUrl + 'reservation/' + reservationId,
        type: 'GET',
        success: function(result) {
            loadReservationDetail(result);
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

function loadReservationDetail(reservation) {
    document.getElementById('modalLabel').innerHTML = 'Update reservation info';
    document.getElementById('action-button').setAttribute('onclick', 'submitUpdate(' + reservation.id + ')');
    document.getElementById('inputFirstName').value = reservation.firstName;
    document.getElementById('inputLastName').value = reservation.lastName;
    document.getElementById('inputEmail').value = reservation.email;
    document.getElementById('inputCheckInDate').value = reservation.checkInDate;
    document.getElementById('inputCheckOutDate').value = reservation.checkOutDate;
    document.getElementById('inputRoomType').value = reservation.roomType;
    document.getElementById('inputNumberOfRoom').value = reservation.numberOfRoom;
    document.getElementById('inputNumberOfGuest').value = reservation.numberOfGuest;
    document.getElementById('inputPrice').value = reservation.price;
    document.getElementById('inputNote').value = reservation.note;
    document.getElementById('inputStatus').value = reservation.status;
}

function submitUpdate(reservationId) {
    let reservationData = {
        firstName: document.getElementById('inputFirstName').value,
        lastName: document.getElementById('inputLastName').value,
        email: document.getElementById('inputEmail').value,
        checkInDate: document.getElementById('inputCheckInDate').value,
        checkOutDate: document.getElementById('inputCheckOutDate').value,
        roomType: document.getElementById('inputRoomType').value,
        numberOfRoom: document.getElementById('inputNumberOfRoom').value,
        numberOfGuest: document.getElementById('inputNumberOfGuest').value,
        status: document.getElementById('inputStatus').value,
        price: document.getElementById('inputPrice').value,
        note: document.getElementById('inputNote').value
    }
    updateReservation(reservationId, reservationData);
}

async function updateReservation(reservationId, data) {
    await $.ajax({
        url: mockUrl + 'reservation/' + reservationId,
        type: 'PUT',
        data: data,
        success: function() {
            reloadReservationData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function deleteRerservation(reservationId) {
    let isConfirm = confirm('Do you want to delete this reservation?');
    if (isConfirm) {
        await $.ajax({
            url: mockUrl + 'reservation/' + reservationId,
            type: 'DELETE',
            success: function() {
                reloadReservationData();
            },
            error: function() {
                alert('Something went wrong!');
            }
        });
    }
}

function sendMail(reservation) {
    Email.send({
        SecureToken: "ce7d25ac-d344-4e3d-b70c-6829a36e6266",
        To: reservation.email,
        From: "thaonguyenhomestay2021@gmail.com",
        Subject: "Reservation Confirmation",
        Body: settingMailStyle() + ' ' + settingEmail(reservation),
    }).then(
        message => message !== 'OK' ? alert('Something went wrong, please try again!') : ''
    );
}

function settingEmail(reservation) {
    return '<body>' +
        '    <table cellpadding="0" cellspacing="0" width="100%">' +
        '        <tr>' +
        '            <td width="100%" style="background-color: #f7f7f7;" class="content-padding">' +
        '                <center>' +
        '                    <table cellspacing="0" cellpadding="0" width="600" class="w320">' +
        '                        <tr>' +
        '                            <td class="header-lg">' +
        '                                Thao Nguyen Homestay<br/>' +
        '                                Reservation Confirmation' +
        '                            </td>' +
        '                        </tr>' +
        '                        <tr>' +
        '                            <td class="free-text">' +
        '                                <p>Dear Mr./Ms. ' + reservation.firstName + ' ' + reservation.lastName + ',</p>' +
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
        '                                                        <span class="header-sm">Reservation Date</span><br /> ' + new Date().toISOString().slice(0, 10) + '<br />' +
        '                                                        <br />' +
        '                                                        <span class="header-sm">Price</span> <br/> ' + reservation.price + ' VNĐ (Cash only)' +
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
        '                                                        <span class="header-sm">Check-in Date</span><br/>' + reservation.checkInDate + ' <br/>' +
        '                                                        <br />' +
        '                                                        <span class="header-sm">Check-out Date</span><br/> ' + reservation.checkOutDate + ' <br/>' +
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
        '            <td style="background-color: #ffffff;  border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">' +
        '                <center>' +
        '                    <table cellpadding="0" cellspacing="0">' +
        '                        <tr>' +
        '                            <td class="item-table">' +
        '                                <table cellspacing="0" cellpadding="0" width="100%">' +
        '                                    <tr>' +
        '                                        <td class="title-dark" width="300">Room Type</td>' +
        '                                        <td class="title-dark" width="163">Number of rooms</td>' +
        '                                        <td class="title-dark" width="97">Total Guests</td>' +
        '                                    </tr>' +
        '                                    <tr>' +
        '                                        <td class="item-col item">' +
        '                                            <table cellspacing="0" cellpadding="0" width="100%">' +
        '                                                <tr>' +
        '                                                    <td class="mobile-hide-img">' +
        '                                                        <img width="110" height="92" src="https://media-cdn.tripadvisor.com/media/photo-s/09/0c/fd/16/rice-flower-homestay.jpg" alt="item1">' +
        '                                                    </td>' +
        '                                                    <td class="product">' +
        '                                                        <span style="color: #4d4d4d; font-weight:bold;">' + getRoomTypeName(reservation.roomType) + '</span><br/>Very comfortable' +
        '                                                    </td>' +
        '                                                </tr>' +
        '                                            </table>' +
        '                                        </td>' +
        '                                        <td class="item-col quantity"> ' + reservation.numberOfRoom + ' </td>' +
        '                                        <td class="item-col"> ' + reservation.numberOfGuest + ' </td>' +
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