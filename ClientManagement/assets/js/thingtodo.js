

var like = 0;
    var like2 = 0;
    function heart(){      
        like++;
        if(like>1)  {
            like="";
        } 
        document.getElementById('tim').innerHTML=like;
    }
    function heart2(){
        like2++;
        if(like2>1)  {
            like2="";
        } 
        document.getElementById('tim2').innerHTML=like2;
    }
    
   

    // // Get the button that opens the modal
    // var btn = document.getElementById("Signin");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];



    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    // if (event.target == modal) {
    //     modal.style.display = "none";
    // }
    // }
   