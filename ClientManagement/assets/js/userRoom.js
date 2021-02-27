// Get room data from LocalStorage
let roomData = JSON.parse(localStorage.getItem('roomData'));

// Check is admin logged in

        loadRoomData();
 

function saveAction() {
    localStorage.setItem('roomData', JSON.stringify(roomData));
}

function reloadAction() {
    window.location.reload();
}

function loadData() {
    roomData = JSON.parse(localStorage.getItem('roomData'));
}

if (localStorage.getItem('roomData') != null) {
    loadData();
}


// Load room info
function up(k){
    var data=JSON.parse(JSON.stringify(roomData[k]));
    document.getElementById('name').innerHTML=data.name;
    document.getElementById('description').innerHTML=data.description;
    document.getElementById('accommodates').innerHTML=data.accommodates;
    document.getElementById('beds').innerHTML=data.beds;
    document.getElementById('price').innerHTML=data.price;
    document.getElementById('img').innerHTML='<img src="' + data.image + '" alt="" style ="width: 100%; height:90%;">';
}

// Load room data
function loadRoomData() {
    $('#intro').show();
    roomData.forEach((element, index) => {
        var data = JSON.parse(JSON.stringify(element));
        var loadData = '<div class="row">';  
        

       
        loadData +='<div class="col-lg-4 col-md-4 col-sm-4"></div>'; 
        loadData +='<div class="col-lg-4 col-md-4 col-sm-4"><h4 style="text-align: center;">'+data.name+'</h4></div>'   
        loadData += '<div class="col-lg-4 col-md-4 col-sm-4"></div>';
        loadData += '</div><br>';

        loadData +='<div class="row">';
        loadData +='<div class="col-lg-1 col-md-1 col-sm-1"></div>';
        //Image
        loadData +='<div class="col-lg-5 col-md-5 col-sm-5">';
        
        loadData +='<div class="carousel slide" data-ride="carousel">';//div
        loadData +='<div id="slider" class="carousel slide" data-ride="carousel">';//div
        loadData +='<div class="carousel-inner">';//div
        loadData +='<div class="carousel-item active">'
        loadData += '<img src="' + data.image + '"  class="d-block" alt="" style ="width: 100%; height:100%;"></div>';
        loadData +='<div class="carousel-item">';
        loadData += '<img src="' + data.image2 + '"  class="d-block" alt="" style ="width: 100%; height:100%;"></div>';
        loadData +='<div class="carousel-item">';
        loadData += '<img src="' + data.image3 + '"  class="d-block" alt="" style ="width: 100%; height:100%;"></div>';
        loadData +='<div class="carousel-item">';
        loadData += '<img src="' + data.image4 + '"  class="d-block" alt="" style ="width: 100%; height:100%;"></div>';
        loadData +='<a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">';
        loadData +='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
        loadData +='<span class="sr-only">Previous</span></a>';
        loadData +='<a class="carousel-control-next" href="#slider" role="button" data-slide="next">';
        loadData +='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
        loadData +='<span class="sr-only">Next</span></a>'

        loadData +='</div>';
        loadData +='</div>';
        loadData +='</div>';
        loadData +='</div>';
        //Icon
        loadData +='<div class="col-lg-5 col-md-5 col-sm-5">';  
            //row1
            
            loadData +='<div class=" col-lg-12 col-md-12 col-sm-12">';        

            loadData +='<div class="row">';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="far fa-check-circle"></i></div>';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-couch"></i></div>';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-shower"></i></div></div>';
            //row 2
            loadData +='<div class="row">';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-door-closed"></i></div>';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-bed"></i></div>';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-pump-soap"></i></div></div>';
    
            //row3
            loadData +='<div class="row">';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-blender"></i></div>';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-fan"></i></div>';
            loadData +='<div class="col-lg-4 col-md-4 col-sm-4">';
            loadData +='<i class="fas fa-rss"></i></div></div>';
            //row4
            loadData +='<div class="row">';
            loadData +='<div class="col-lg-6 col-md-6 col-sm-6">';
            loadData +='<h5>MAX Guests - 2 PAX</h5></div>';
            loadData +='<div class="col-lg-6 col-md-6 col-sm-6">';
            loadData +='<h5>Breakfast Included</h5></div>';
            loadData += '</div>';
            //row 5
            loadData +='<div class="row">';
            loadData +='<div class="col-lg-3 col-md-3 col-sm-3">';
            loadData +='</div>';
            loadData +='<div class="col-lg-5 col-md-5 col-sm-5">';
            loadData +='<h5>'+data.price+'</h5></div>';
            loadData +='<div class="col-lg-3 col-md-3 col-sm-3">';
            loadData +='</div></div>';            
            //row 6
            loadData +='<div class="row">';
            loadData +='<div class="col-lg-7 col-md-7 col-sm-7">';
            loadData +='<button type="button" class="btn btn-info btn-lg"  data-toggle="modal" data-target="#myModal" onclick="up('+index+')"><h6>More Information</h6></button></div>';
            loadData +='<div class="col-lg-5 col-md-5 col-sm-5">';
            loadData +='<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#reserveFormModal"><h6>Reserve Now</h6></button></div>';
            loadData += '</div>';


            loadData += '</div>';
           
           //khong dung vao
           loadData += '</div>';

           loadData +='<div class="col-lg-1 col-md-1 col-sm-1"></div>';

        loadData +='</div><br>';

        
        

        document.getElementById("rooms").innerHTML += loadData;
    });
}




