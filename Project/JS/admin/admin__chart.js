let listUser = JSON.parse(localStorage.getItem("listUser"))
let bills = JSON.parse(localStorage.getItem("bills"))
let data = {
    labels: [
      'Red',
      'Blue',
      'Yellow',
    
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(165, 42, 42)',
        'rgb(255, 213, 0)',
        'rgb(255, 69, 0)',
       
      ],
      hoverOffset: 4,
    }]
  };
listUser = listUser.filter((element)=>element.role == "user")
document.getElementById("viewUsers").innerHTML = listUser.length

let totalStock = menuFood.reduce((a,b)=> a + +b.stock,0  )

document.getElementById("viewProduct").innerHTML=totalStock

let totalSold = menuFood.reduce((a,b)=> a + +b.sold,0  )


document.getElementById("viewSold").innerHTML= totalSold
let billAccept = bills.filter((element)=>{
    if(element.status == 1){
        return element
    }
})

let totalMoney = billAccept.reduce((a,b)=> a + +b.priceBill.match(/[0-9]/g).join(""),0)
// let c = bills[1].priceBill.match(/[0-9]/g).join("")



document.getElementById("money").innerHTML= totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })



let topSale = menuFood.sort((a,b)=>b.sold - a.sold)

console.log(topSale[0].sold);
function renderTopSale(){
    let text =""
    let cupa = [
        {
           cup:"../img/gold-cup.png",
           size:"1.6vw",
           color:"rgba(0, 118, 23, 1) !important" 
        },
        {
            cup:"../img/silver-cup.png",
           size:"1.4vw",
           color:"rgba(0, 118, 23, 0.9)" 

        },
        {
            cup:"../img/bronze-cup.png",
            size:"1.2vw",
            color:"rgba(0, 118, 23, 0.8)" 

        }
    ]
    for(let i=0;i<5;i++){
        text += `
        <tr>
            <td style="width: 10%;">${i+1}</td>
            <td class="size">${topSale[i].name}</td>
            <td style="width: 20%;"><img src=""alt=""></td>
        </tr>
        `
    }
    document.getElementById("body").innerHTML= text
    for(let j=0;j<cupa.length;j++){
        document.getElementsByClassName("size")[j].style.fontSize = cupa[j].size
        document.getElementsByClassName("size")[j].style.color = cupa[j].color 
        document.querySelectorAll("#body img")[j].src = cupa[j].cup
        data.labels[j] = topSale[j].name
        data.datasets[0].data[j] = topSale[j].sold
    }
    chart()
}
renderTopSale()

  function chart(){
    const ctx = document.getElementById('myChart');
         new Chart(ctx, {
                type: 'pie',
                data: data,
            });
}


function renderTopUser(){
    let text ="";
    let arrTopUser =[];
    let index;
    for(let i=0;i<listUser.length;i++){
        let idUser = billAccept.filter((element)=>{
            if(element.idUser == listUser[i].id){
                return element
            }
        })
        let totalPrice = idUser.reduce((a,b)=>{
            return a + +b.priceBill.match(/[0-9]/g).join("")
        },0)

        let user = {
            totalPrice:totalPrice,
            idUser:listUser[i].id,
            name:listUser[i].username,
            avatar:listUser[i].avatar
        }
        arrTopUser.push(user)
    }
    let arrResult = arrTopUser.filter((element)=>{
        if(element.totalPrice > 2000000){
            return element
        }
    })
    arrResult = arrResult.sort((a,b)=>b.totalPrice - a.totalPrice)
    console.log(arrResult);
    for(let j=0;j<arrResult.length;j++){
        text += 
        `
        <tr>
            <th style="width: 10%;">${j+1}</th>
            <th style="width: 15%;">${arrResult[j].idUser}</th>
            <th style="width:30%;">${arrResult[j].name}</th>
            <th style="width: 30%;">${arrResult[j].totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</th>
            <th style="width: 15%;"><img src=${arrResult[j].avatar} width="80%" height="80%" alt=""></th>
        </tr>
        `
    }
    document.getElementById("bodyUser").innerHTML=text
}
renderTopUser()