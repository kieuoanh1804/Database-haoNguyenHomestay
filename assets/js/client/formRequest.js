// Set loading data
function setGlobalData() {
    setMinDate();
    setSocialMediaUrl();
}

function setMinDate() {
    let today = new Date().toISOString().slice(0, 10);
    document.getElementById("inputCheckInDate").setAttribute("min", today);
    document.getElementById("inputCheckOutDate").setAttribute("min", today);
}

function setSocialMediaUrl() {
    let tripadvisor = 'https://www.tripadvisor.com.vn/Hotel_Review-g4014591-d8595503-Reviews-Thao_Nguyen_Homestay-Phong_Nha_Ke_Bang_National_Park_Quang_Binh_Province.html';
    let facebook = 'https://www.facebook.com/phongnha.thaonguyen';
    let instagram = 'https://www.instagram.com/phongnhathaonguyen/';
    document.getElementById("tripadvisor").setAttribute("href", tripadvisor);
    document.getElementById("facebook").setAttribute("href", facebook);
    document.getElementById("instagram").setAttribute("href", instagram);
}