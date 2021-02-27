var mockUrl = 'https://600ce873f979dd001745c4ad.mockapi.io/api/v1/';

function handleAccessPage() {
    let token = localStorage.getItem('loginToken');
    if (token == null || token == undefined) {
        window.location.replace('../../sites/admin/login.html');
    } else {
        getAllRoomData();
    }
}

async function getAllRoomData() {
    $('#loading-image').show();
    await $.ajax({
        url: mockUrl + 'room',
        type: 'GET',
        success: function(result) {
            $('#room-data').html(fetchRoomData(result));
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

function fetchRoomData(roomData) {
    var loadData = '';
    roomData.forEach((element, index) => {
        var data = JSON.parse(JSON.stringify(element));
        loadData += '<tr>';
        loadData += '<td>' + (parseInt(index) + 1) + '</td>';
        loadData += '<td>' + data.name + '</td>';
        loadData += '<td><img src="../../assets/images/room' + data.image + '" alt="" style ="width: 80%;"></td>';
        loadData += '<td>' + data.accommodates + '</td>';
        loadData += '<td>' + data.beds + '</td>';
        loadData += '<td>' + data.price + '</td>';
        loadData += '<td>' + data.description + '</td>';
        loadData += '<td><button class="btn btn-outline-info" onclick="getRoomInfo(' + data.id + ')" data-toggle="modal" data-target="#roomModal"><i class="fas fa-pen"></i></button>';
        loadData += '&nbsp;&nbsp;';
        loadData += '<button onclick="deleteRoom(' + data.id + ') " class="btn ml-1 btn-outline-danger"><i class="fas fa-trash"></i></button></td>';
        loadData += '</td>';
    });
    return loadData;
}

function onClickAddButton() {
    document.getElementById('modalLabel').innerHTML = 'Create new room';
    document.getElementById('action-button').setAttribute('onclick', 'addNewRoom()');
    document.getElementById('name').value = '';
    document.getElementById('img').value = '';
    document.getElementById('accommodates').value = '';
    document.getElementById('beds').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
}

async function reloadRoomData() {
    await $.ajax({
        url: mockUrl + 'room',
        type: 'GET',
        success: function(result) {
            $('#room-data').html(fetchRoomData(result));
        }
    });
}

async function addNewRoom() {
    var newRoom = {
        name: document.getElementById('name').value,
        image: document.getElementById('img').value,
        accommodates: document.getElementById('accommodates').value,
        beds: document.getElementById('beds').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };
    await $.ajax({
        url: mockUrl + 'room',
        type: 'POST',
        data: newRoom,
        success: function() {
            reloadRoomData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function getRoomInfo(roomId) {
    await $.ajax({
        url: mockUrl + 'room/' + roomId,
        type: 'GET',
        success: function(result) {
            loadRoomDetail(result);
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

function loadRoomDetail(room) {
    document.getElementById('modalLabel').innerHTML = 'Update room info';
    document.getElementById("action-button").setAttribute('onclick', 'submitUpdate(' + room.id + ')');
    document.getElementById('name').value = room.name;
    document.getElementById('img').value = room.image;
    document.getElementById('accommodates').value = room.accommodates;
    document.getElementById('beds').value = room.beds;
    document.getElementById('price').value = room.price;
    document.getElementById('description').value = room.description;
}

function submitUpdate(roomId) {
    let roomData = {
        name: document.getElementById('name').value,
        image: document.getElementById('img').value,
        accommodates: document.getElementById('accommodates').value,
        beds: document.getElementById('beds').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    }
    updateRoom(roomId, roomData);
}

async function updateRoom(roomId, data) {
    await $.ajax({
        url: mockUrl + 'room/' + roomId,
        type: 'PUT',
        data: data,
        success: function() {
            reloadRoomData();
        },
        error: function() {
            alert('Something went wrong!');
        }
    });
}

async function deleteRoom(roomId) {
    let isConfirm = confirm('Do you want to delete this room?');
    if (isConfirm) {
        await $.ajax({
            url: mockUrl + 'room/' + roomId,
            type: 'DELETE',
            success: function() {
                reloadRoomData();
            },
            error: function() {
                alert('Something went wrong!');
            }
        });
    }
}