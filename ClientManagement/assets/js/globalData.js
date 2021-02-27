var homeStayRoomData = [{
        name: 'Deluxe Queen Corner Suite',
        image: 'room/deluxeQueenCornerSuite/1.JPG',
        image2: 'room/deluxeQueenCornerSuite/2.JPG',
        image3: 'room/deluxeQueenCornerSuite/3.JPG',
        image4: 'room/deluxeQueenCornerSuite/4.JPG',
        image5: 'room/deluxeQueenCornerSuite/5.JPG',
        image6: 'room/deluxeQueenCornerSuite/6.JPG',
        accommodates: '2 People',
        beds: '1 Queen',
        price: '450000',
        description: 'Our Deluxe Queen Corner Suites offer one of the best views in the city. These corner suites have two massive picture windows that face towards the cliff face of the mountain behind our hotel. Relax in bed or on the sofa and watch goats, chickens or the many other birds in the trees. These rooms are also best for watching the sunset from the comfort of your own room or our shared balconies. Inside the room you will find one queen bed, a fridge, dresser, comfortable sofa and a large bathroom with a hot water rain head shower!',
    },
    {
        name: 'Deluxe Queen Suite',
        image: 'room/deluxeQueenSuite/1.JPG',
        image2: 'room/deluxeQueenSuite/2.JPG',
        image3: 'room/deluxeQueenSuite/3.JPG',
        image4: 'room/deluxeQueenSuite/4.JPG',
        accommodates: '2 People',
        beds: '1 Queen',
        price: '450000',
        description: 'Our Deluxe Queen Suite feature a luxurious queen size bed, flat screen smart TV, a fridge, and a large window with partial mountain view. Added comforts such as a powerful AC, fan, and a hot water shower ensure that you have an amazing place to come home to at the end of the day. These rooms also have access to our large pool and shared balconies. ',
    },
    {
        name: 'Double Queen Room',
        image: 'room/doubleQueenRoom/1.JPG',
        image2: 'room/doubleQueenRoom/2.JPG',
        image3: 'room/doubleQueenRoom/3.JPG',
        image4: 'room/doubleQueenRoom/4.JPG',
        accommodates: '2 People',
        beds: '1 Queen',
        price: '450000',
        description: 'Our Double Queen Rooms feature two queen size beds and are ideal for friends travelling together. With lots of space, large windows, and a big armorer, there is no need to squeeze into a small room with nowhere to store your things. There is also a fridge, kettle, and bedside table to ensure that all your comfort needs are covered. Lastly, the luxurious bathroom with rain head shower, toiletries, and stainless steel accents top off the room. ',
    },
    {
        name: 'Triple Room',
        image: 'room/tripleRoom/1.JPG',
        image2: 'room/tripleRoom/2.JPG',
        image3: 'room/tripleRoom/3.JPG',
        accommodates: '2 People',
        beds: '1 Queen',
        price: '450000',
        description: 'Our Triple Corner suite is just a slight variation to our amazing Queen corner suites and have most of the same features. Instead of a couch, these rooms feature a comfortable single bed to allow for a third person. They are also perfect for friends traveling together that want separate beds but stunning mountain views! The large bathrooms also have a luxurious rainhead shower head offering the perfect spot to refresh after an adventerous day exploring the many massive caves in the region!',
    },
    {
        name: 'Family Room',
        image: 'room/familyRoom/1.JPG',
        image2: 'room/familyRoom/2.JPG',
        image3: 'room/familyRoom/3.JPG',
        accommodates: '2 People',
        beds: '1 Queen',
        price: '450000',
        description: 'Our Family Rooms are spacious and can easily fit your entire family. The best part about these family rooms is the 3 bed configuration allowing for your kids to sleep in separate beds giving everyone in your family a comfortable sleep! Our rooms also have a fridge to keep your drinks cold and a kettle to make a coffee or tea in the morning! All guests are invited to have a filling a la carte breakfast with coffee, tea, or juice. '
    }
];

var adminAccount = {
    email: 'admin@gmail.com',
    password: '@bc12354'
}

// Check if null then set to local storage
if (localStorage.getItem('adminAccount') == null) {
    localStorage.setItem('adminAccount', JSON.stringify(adminAccount));
}

// Check if null then set to local storage
if (localStorage.getItem('roomData') == null) {
    localStorage.setItem('roomData', JSON.stringify(homeStayRoomData));
}




