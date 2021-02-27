

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
    

   