// var mockUrl = 'https://600ce873f979dd001745c4ad.mockapi.io/api/v1/';
var mockUrl = 'http://localhost:3000/';

function handleAccessPage() {
    let token = localStorage.getItem('loginToken');
    if (token == null || token == undefined) {
        window.location.replace('../../sites/admin/login.html');
    } else {
        getAllDashBoardData();
    }
}

async function getAllDashBoardData() {
    await getReservationData();
    await getRoomData();
    await getMemberData();
    await getPartnerData();
}

async function getReservationData() {
    await $.ajax({
        url: mockUrl + 'reservation',
        type: 'GET',
        success: function(result) {
            let paidReservation = result.filter(reservation => reservation.status === 'true');
            let totalRevenue = 0;
            paidReservation.forEach(element => {
                totalRevenue += parseInt(element.price);
            });
            document.getElementById('statistic-count').innerHTML = totalRevenue + ' VND';
            document.getElementById('reservation-count').innerHTML = result.length;
        },
        error: function() {
            alert("Something went wrong!");
        }
    });
}

async function getRoomData() {
    await $.ajax({
        url: mockUrl + 'room',
        type: 'GET',
        success: function(result) {
            document.getElementById('room-count').innerHTML = result.length;
        },
        error: function() {
            alert("Something went wrong!");
        }
    });
}


async function getMemberData() {
    await $.ajax({
        url: mockUrl + 'siteMember',
        type: 'GET',
        success: function(result) {
            document.getElementById('member-count').innerHTML = result.length;
        },
        error: function() {
            alert("Something went wrong!");
        }
    });
}

async function getPartnerData() {
    await $.ajax({
        url: mockUrl + 'partner',
        type: 'GET',
        success: function(result) {
            document.getElementById('partner-count').innerHTML = result.length;
        },
        error: function() {
            alert("Something went wrong!");
        }
    });
}