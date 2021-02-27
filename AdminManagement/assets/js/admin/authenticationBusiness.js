let adminAccountData = JSON.parse(localStorage.getItem('adminAccount'));

function generateToken() {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(36).substr(0, 10);
}

function handleLogin() {
    adminEmail = document.getElementById('email').value;
    adminPassword = document.getElementById('password').value;

    if (adminEmail === adminAccountData.email && adminPassword === adminAccountData.password) {
        localStorage.setItem('loginToken', generateToken());
        window.location.replace('../../sites/admin/index.html');
    } else {
        window.alert('Email/password does not match, please try again');
    }
}

function handleLogout() {
    localStorage.removeItem('loginToken');
    window.location.replace('../../sites/admin/login.html');
}

function handleAccessLoginPage() {
    let token = localStorage.getItem('loginToken');
    if (token != null) {
        window.history.back();
    }
}