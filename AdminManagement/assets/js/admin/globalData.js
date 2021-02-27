var adminAccount = {
    email: 'admin@gmail.com',
    password: '@bc12354'
}

// Check if null then set to local storage
if (localStorage.getItem('adminAccount') == null) {
    localStorage.setItem('adminAccount', JSON.stringify(adminAccount));
}