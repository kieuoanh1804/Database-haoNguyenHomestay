// function sendMail() {
//     var firstName = document.getElementById('inputFirstName').value;
//     var lastName = document.getElementById('inputLastName').value;
//     var clientMail = document.getElementById('inputEmail').value;
//     var checkInDate = document.getElementById('inputCheckInDate').value;
//     var checkOutDate = document.getElementById('inputCheckOutDate').value;
//     var roomType = document.getElementById('inputRoomType').value;
//     var numberOfRoom = document.getElementById('inputNumberOfRoom').value;
//     var numberOfGuest = document.getElementById('inputNumberOfGuest').value;

//     Email.send({
//         SecureToken: "ce7d25ac-d344-4e3d-b70c-6829a36e6266",
//         To: clientMail,
//         From: "thaonguyenhomestay2021@gmail.com",
//         Subject: "Reservation Confirmation",
//         Body: settingMailStyle() + ' ' + settingEmail(firstName, lastName, checkInDate, checkOutDate, roomType, numberOfRoom, numberOfGuest),
//     }).then(
//         message => message === 'OK' ? alert('Please check your reservation detail on your booking email!') : alert('Something went wrong, please try again!'),
//         location.reload()
//     );
// }

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

function settingEmail(firstName, lastName, checkInDate, checkOutDate, roomType, numberOfRoom, numberOfGuest) {
    return '<body>' +
        '    <table cellpadding="0" cellspacing="0" width="100%">' +
        '        <tr>' +
        '            <td width="100%" style="background-color: #f7f7f7;" class="content-padding">' +
        '                <center>' +
        '                    <table cellspacing="0" cellpadding="0" width="600" class="w320">' +
        '                        <tr>' +
        '                            <td class="header-lg">' +
        '                                Reservation Confirmation' +
        '                            </td>' +
        '                        </tr>' +
        '                        <tr>' +
        '                            <td class="free-text">' +
        '                                <p>Dear Mr./Ms. ' + firstName + ' ' + lastName + ',</p>' +
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
        '                                                        <span class="header-sm">Price</span> <br /> 450.000 VNĐ (Cash only)' +
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
        '                                                        <span class="header-sm">Check-in Date</span><br/>' + checkInDate + ' <br/>' +
        '                                                        <br />' +
        '                                                        <span class="header-sm">Check-out Date</span><br/> ' + checkOutDate + ' <br/>' +
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
        '                                                        <span style="color: #4d4d4d; font-weight:bold;">' + getRoomTypeName(roomType) + '</span><br/>Very comfortable' +
        '                                                    </td>' +
        '                                                </tr>' +
        '                                            </table>' +
        '                                        </td>' +
        '                                        <td class="item-col quantity"> ' + numberOfRoom + ' </td>' +
        '                                        <td class="item-col"> ' + numberOfGuest + ' </td>' +
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