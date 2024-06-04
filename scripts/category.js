const cRight = document.querySelector(".c-right")
const url = "https://65cf6e90bdb50d5e5f5b4aa1.mockapi.io/category"

async function getGitroCycle() {
    const res = await fetch(url)
    const resData = await res.json()
    console.log(resData[0].gidro[0][0].gidro);
    showData(resData[0].gidro[0][0].gidro)
}
getGitroCycle()

function showData(array) {
    for (const el of array) {
        console.log(el);
        cRight.innerHTML += `<div class="p-card"> 
        <p class="sale">Sale</p> 
        <div class="p-content"> 
          <div class="aya"> <i class="bi bi-heart"></i> </div> 
          <div class="p-img"> 
            <img class="bang" src="${el.image}" alt=""> 
            <p class="niki">${el.name}</p> 
            <h3 class="in">${el.price > 0 ? el.price + '&#8381' : "нет в наличии"} </h3> 
            </div> 
            </div> 
            <div class="binni">
            <button><i class="bi bi-cart3"></i></button> 
            </div>
      </div>`
    }
}