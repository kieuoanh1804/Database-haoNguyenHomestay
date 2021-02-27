//comments
var product = [];

//đẩy mảng product vào local
function Save() {
    localStorage.setItem('listProduct', JSON.stringify(product));
}
//lấy sản phẩm
function load() {
    product = JSON.parse(localStorage.getItem('listProduct'));
    productAdmin();
}
//xuất sản phẩm ra html
if (localStorage.getItem("listProduct") != null) {
    load();
}

function productAdmin() {
    var listproduct1 = "";
    for (var i in product) {
        var data = JSON.parse(JSON.stringify(product[i]))
        var listproduct1 = '<div>';
        listproduct1 += '<h4><u>' + data.id + '</u></h4>';
        listproduct1 += '<p>' + data.comment + '</p>';
        listproduct1 += '</div>';

        document.getElementById("comments").innerHTML += listproduct1;
    }
}
//Them du lieu
var addComment = function() {
    var add = {
        id: "Customer " + parseInt(product.length + 1),
        comment: document.getElementById("comment").value,
    }
    product.push(add);
    localStorage.setItem('listProduct', JSON.stringify(product));
    Save();
    window.location.reload();
}