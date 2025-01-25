var title = document.getElementById('title')
var price = document.getElementById('price')
var taxes = document.getElementById('taxes')
var discount = document.getElementById('discount')
var total = document.getElementById('total')
var count = document.getElementById('count')
var category = document.getElementById('category')
var submit = document.getElementById('submit')
var mood = "create"
var temp

//calcul total
function calculTotal() {
    if (price.value != '') {
        const res = +price.value + +taxes.value - +discount.value
        total.innerHTML = res
        total.style.background = 'green'
    }
    else {
        total.style.background = 'red '
        total.innerHTML = ''
    }
}
//creation produit
if (localStorage.getItem('product') === null) {
    products = [];
} else {
    products = JSON.parse(localStorage.getItem('product'));
}

showpro()
submit.onclick = function () {
    var product = {
        titleP: title.value.toLowerCase(),
        priceP: price.value,
        taxesP: taxes.value,
        discountP: discount.value,
        countP: count.value,
        totalP: total.innerHTML,
        categoryP: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 100) {
        if (mood === "create") {
            if (count.value > 1) {
                for (var i = 0; i < count.value; i++)
                    products.push(product)
            } else
                products.push(product)
        } else {
            products[temp] = product
            mood = "create"
            submit.innerHTML = "create"
            count.style.display = 'block'
        }
    }
    localStorage.setItem('product', JSON.stringify(products))
    console.log(products)
    cleardata();
    showpro();
}
function cleardata() {
    title.value = ""
    price.value = ""
    taxes.value = 0;
    count.value = "";
    total.innerHTML = "";  //initialisation du champs de texte "total" à ""
    category.value = "";   //reinitilaisation du select categorie
    discount.value = ""
}
//localstorage
//affich produit

function showpro() {
    calculTotal()
    var tbody = document.getElementById('tbody')
    var table = ''
    for (var i = 0; i < products.length; i++) {
        table += ` <tr>
            <td>${i + 1}</td>
            <td>${products[i].titleP}</td>
            <td>${products[i].priceP}</td>
            <td>${products[i].taxesP}</td>
            <td>${products[i].discountP}</td>
            <td>${products[i].totalP}</td>
            <td>${products[i].categoryP}</td>
            <td> <button onclick="updatepro(${i})" id="update"> update</button> </td>
            <td> <button  onclick="delpro(${i})" id="update"> delete</button> </td>
            

        </tr>`}
    tbody.innerHTML = table

}



//clear input

//supprimer produit


function delpro(i) {
    products.splice(i, 1)
    localStorage.setItem("product", JSON.stringify(products));
    showpro()
}
//supprimer ts les produits
if (products.length > 0)
    document.getElementById("delall").innerHTML = ` <button onclick="deleteall()"> delete all (${products.length})</button> </td>`
else
    document.getElementById("delall").innerHTML = ``
function deleteall() {
    products = []
    localStorage.clear()
    showpro()
}




//modifier produit
function updatepro(i) {
    title.value = products[i].titleP
    price.value = products[i].priceP
    taxes.value = products[i].taxesP;
    count.style.display = 'none'
    calculTotal()
    category.value = products[i].categoryP;   //reinitilaisation du select categorie
    discount.value = products[i].discountP
    submit.innerHTML = "update"
    mood = "update"
    temp = i
    scroll({
        top: 0,
        behavior: "smooth"
    })


}





//chercher produit
var search = "title"
function getsearchmood(id) {

    if (id === "searchbycategory") {
        search = "category";
    } else {
        search = "title";
    }
    document.getElementById("searchplace").value = ""
    showpro()
}
function searchPRO(value) {
    var tbody = document.getElementById('tbody')
    var table = ""
    if (search === "title") {
        for (var i = 0; i < products.length; i++) {
            if (products[i].titleP.includes(value.toLowerCase())) {
                table += ` <tr>
                <td>${i + 1}</td>
                <td>${products[i].titleP}</td>
                <td>${products[i].priceP}</td>
                <td>${products[i].taxesP}</td>
                <td>${products[i].discountP}</td>
                <td>${products[i].totalP}</td>
                <td>${products[i].categoryP}</td>
                <td> <button onclick="updatepro(${i})" id="update"> update</button> </td>
                <td> <button  onclick="delpro(${i})" id="update"> delete</button> </td>
                
    
            </tr>`
            }
        }
    } else {
        for (var i = 0; i < products.length; i++) {
            if (products[i].categoryP.includes(value.toLowerCase())) {
                table += ` <tr>
            <td>${i + 1}</td>
            <td>${products[i].titleP}</td>
            <td>${products[i].priceP}</td>
            <td>${products[i].taxesP}</td>
            <td>${products[i].discountP}</td>
            <td>${products[i].totalP}</td>
            <td>${products[i].categoryP}</td>
            <td> <button onclick="updatepro(${i})" id="update"> update</button> </td>
            <td> <button  onclick="delpro(${i})" id="update"> delete</button> </td>
            

        </tr>`
            }

        }
    }
    tbody.innerHTML = table
}

