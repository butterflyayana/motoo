
const url1 = "https://65c705cfe7c384aada6e1db6.mockapi.io/category";
const url2 = "https://65c705cfe7c384aada6e1db6.mockapi.io/products"
const tabs = document.querySelectorAll(".search-box");
const boxes = document.querySelector('.boxes');
const pcards = document.querySelector(".p-cards")
const ul = document.querySelector(".p-category")
const cartCount = document.getElementById("cart-count") 

const cart = []
let products = []

const productsCategory = [
    "запчасти",
    "моторы",
    "шины",
    "электроника",
    "инструменты",
    "аксессуары"
]
productsCategory.forEach(el => {
    ul.innerHTML += `<li>${el}</li>`
})

function openTab(tabId) {
    for (const tab of tabs) {
        tab.style.display = 'none';
    }
    document.getElementById(tabId).style.display = 'flex';
}


async function getCategory() {
    const res = await fetch(url1);
    const data = await res.json();
    console.log(data);
    data.forEach(el => {
        boxes.innerHTML += showCategory(el);
    });
}

getCategory();

function showCategory(item) {
    return `<div class="box">
        <div class="box_text">
            <h3>${item.name}</h3>
            <p>Подробнее > </p>
        </div>
        <div class="box-img">
            <img width="170" src="${item.img}" alt="" />
        </div>
    </div>`;
}

const activeTab = document.querySelector(".search-box.active");

function setActiveTab() {
    tabs.forEach(tab => {
        if (tab.classList.contains("active")) {
            tab.style.border = "1px solid black";
            tab.style.display = "flex"; 
        } else {
            tab.style.border = "none";
            tab.style.display = "none";
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveTab);

 async function getProducts () {
    const res = await fetch(url2)
    const items = await res.json()
    console.log(items);
    showProducts(items.slice(0,4))
    products =  [...items]
}
getProducts()

function showProducts(products){
    for (const prod of products) {
        pcards.innerHTML += `<div class="p-card"> 
        <p class="sale">Sale</p> 
        <div class="p-content"> 
          <div class="aya"> <i class="bi bi-heart"></i> </div> 
          <div class="p-img"> 
            <img class="bang" src="${prod.avatar}" alt=""> 
            <h4 class="in">${prod.name} </h4> 
            <p class="niki">${prod.price}&#8381 </p> 
            </div> 
            </div> 
            <div class="binni">
            <button onclick="addCart(${prod.id})"><i class="bi bi-cart3"></i></button> 
            </div>
      </div>`
    }
}

function addCart(id) {
    const item = products.find(el => el.id == id)
    cart.push(item)
    console.log(cart, "--cart--");
    if(cart.length > 0){
      cartCount.innerText = cart.length
      localStorage.setItem("cart", JSON.stringify(cart))
    }
}
window.addEventListener('load', () => {
    const cart = JSON.parse(localStorage.getItem("cart") || [])
    cartCount.innerText = cart.length
})



