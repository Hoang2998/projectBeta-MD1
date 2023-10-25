
renderCart()
totalPrice()

function renderCart(){
    console.log("111")
    //   let cart = JSON.parse(localStorage.getItem(listUser)).cart
      let text =""
      for(let i=0;i<cart.length;i++){
        for(let j =0;j<menuFood.length;j++){
            if(menuFood[j].id == cart[i].id){
                let total = cart[i].quantity * menuFood[j].price
        text += 
        `
        <tr>
                <td>${i+1}</td>
                <td><img src=${menuFood[j].imgProduct} width="80vw"  alt=""></td>
                <td>${menuFood[j].name}</td>
                <td>${menuFood[j].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td class="cart__body__button">
                    <button onclick="cart__tang(${i},${j})">+</button>
                    <div class="cart__quantity">${cart[i].quantity}</div>
                    <button onclick="cart__giam(${i})">-</button>
                </td>
                <td>${total. toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })  }</td>
                <td><button onclick="cart__delete(${i})">Xóa</button></td>
             </tr>
        ` 
                }
            }
          }
        
      document.getElementById("cart__body--display").innerHTML = text
      alertProduct()
}
function checkStockCart(index,indexx){
    if(cart[index].quantity >= menuFood[indexx].stock){
        cart[index].quantity = menuFood[indexx].stock
    }
    document.getElementsByClassName("cart__quantity")[index].innerHTML = cart[index].quantity
}
function cart__tang(index,indexx){
    cart[index].quantity++
    checkStockCart(index,indexx)
    
    cart[index].quantity =  document.getElementsByClassName("cart__quantity")[index].innerHTML
    renderCart()
    totalPrice()
    alertProduct()
    localStorage.setItem("listUser",JSON.stringify(listUser))
}
function cart__giam(index){
    cart[index].quantity--
    if(cart[index].quantity < 1){
        cart[index].quantity = 1  
    }
    document.getElementsByClassName("cart__quantity")[index].innerHTML = cart[index].quantity
    localStorage.setItem("listUser",JSON.stringify(listUser))
    renderCart()
    totalPrice()
    alertProduct()
}
function cart__delete(index){
    cart.splice(index,1)
    localStorage.setItem("listUser",JSON.stringify(listUser))
    renderCart()
    totalPrice()
    alertProduct()
}
function totalPrice(){
    let total = 0 
    for(let i=0;i<cart.length;i++){ 
        for(let j =0;j<menuFood.length;j++){ 
            if(menuFood[j].id == cart[i].id){
            total += cart[i].quantity*menuFood[j].price
            }
        }
    }
    total = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    document.getElementById("totalPrice").innerHTML = total
    return 
}
function pay(){
    if(cart.length > 0){
    document.getElementsByClassName("cart__address")[0].style.top="68px"
    let total = 0 
    for(let i=0;i<cart.length;i++){ 
        for(let j =0;j<menuFood.length;j++){ 
            if(menuFood[j].id == cart[i].id){
            total += cart[i].quantity*menuFood[j].price
            }
        }
    }
    total = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    document.querySelector(".totalPay span").innerHTML = total
    }else{
    document.getElementsByClassName("cart__address")[0].style.top="68px"
    document.getElementsByClassName("cart__address")[0].classList.add("alertCartEmpty")
    document.getElementsByClassName("cart__address")[0].innerHTML = "Giỏ Hàng trống mời quay lại mua hàng"
    setTimeout(()=>{
    document.getElementsByClassName("cart__address")[0].style.top="-35vw"
    // document.getElementsByClassName("cart__address")[0].classList.remove("alertCartEmpty")
    },2000)
    }
} 

function close__address(){
    document.getElementsByClassName("cart__address")[0].style.top="-35vw"
} 
function uuid(){
    return Math.floor(Math.random()*99999)
}  


function payTotal(){
    let timenow = new Date()
    // console.log(timenow);
    let timeBill = timenow.getDate() + "/" +  (+timenow.getMonth()+1) + "/" + timenow.getFullYear() +"("+ timenow.getHours() + ":" + timenow.getMinutes() + ":" + timenow.getSeconds()+")"
    console.log(timeBill);
   
    let bill = {
        id:uuid(),
        idUser:currentUser,
        cart:cart,
        nameUser:document.getElementById("inputUserCart").value,
        address:document.getElementById("inputAddressCart").value,
        phone:document.getElementById("inputPhoneNumber").value,
        priceBill:document.getElementById("totalPrice").innerHTML,
        time: timeBill,
        status:0,
    }
    let bills =  JSON.parse(localStorage.getItem("bills"))
    bills.unshift(bill)
    localStorage.setItem("bills",JSON.stringify(bills))
    document.getElementsByClassName("alertPayAccept")[0].classList.add("alert")
    for(let i=0;i<cart.length;i++){
        for(let j=0;j<menuFood.length;j++){
            if(cart[i].id == menuFood[j].id){
                menuFood[j].stock = +menuFood[j].stock - +cart[i].quantity 
                menuFood[j].sold = +menuFood[j].sold + +cart[i].quantity 
            }
        }
    }
    localStorage.setItem("menuFood",JSON.stringify(menuFood))
    cart.splice(0,cart.length)
    localStorage.setItem("listUser",JSON.stringify(listUser))
    renderCart()
    totalPrice()
    setTimeout(()=>{
        document.getElementsByClassName("alertPayAccept")[0].classList.remove("alert")
        document.getElementsByClassName("cart__address")[0].style.top="-35vw"
        document.getElementById("inputUserCart").value = ""
        document.getElementById("inputAddressCart").value = ""
        document.getElementById("inputPhoneNumber").value = ""
    },1500)
}


function closeHistory(){
    document.getElementById("historyBills").style.height="0vw"
}
function history__display(){
    renderHistory()
    document.getElementById("historyBills").style.height="25vw"
}
let bills = JSON.parse(localStorage.getItem("bills"))
function renderHistory(){
    let statusBills = [
        {
            id:0,
            comment:"đang xử lí"
        },
        {
            id:1,
            comment:"thành công",
            color:"green"
        },
        {
            id:2,
            comment:"đơn bị hủy",
            color:"red"
        },
        {
            id:3,
            comment:"hủy đơn thành công ",
            color:"orange"
        },
    ]
    let text = "";
    let count = 0
    let index= -1
    for(let i=0;i<bills.length;i++){
   
        if(bills[i].idUser == currentUser){
            count++
            text += 
            `
        <tr>
            <td>${count}</td>
            <td>${bills[i].nameUser}</td>
            <td>${bills[i].address}</td>
            <td>${bills[i].phone}</td>
            <td>${bills[i].time}</td>
            <td>${bills[i].priceBill}</td>
            <td onclick="showBill(${bills[i].id})" class="showBill"><u>xem chi tiết</u></td> 
            <td class="statusBilla">xem chi tiết</td> 
            <td><button class="btn_Cancel" onclick="cancel_bill(${bills[i].id})">Hủy đơn hàng</button></td> 
        </tr>
            `
        }
    }

    document.getElementById("renderBills").innerHTML = text
    for(let j=0;j<bills.length;j++){
        if(bills[j].idUser == currentUser){
        index++
        for(let i=0;i<statusBills.length;i++){
            if(bills[j].status == statusBills[i].id){
                document.getElementsByClassName("statusBilla")[index].innerHTML=statusBills[i].comment 
                document.getElementsByClassName("statusBilla")[index].style.color=statusBills[i].color
            }
        }
    }
}
}

function cancel_bill(id){
   for(let i=0;i<bills.length;i++){
    if(bills[i].id == id){
        if(bills[i].status == 0){
            bills[i].status = 3
            bills[i].priceBill = "0&nbsp;₫"
            for(let j =0; j<bills[i].cart.length;j++){
                for(let k =0;k<menuFood.length;k++){
                    if(menuFood[k].id == bills[i].cart[j].id){
                        menuFood[k].stock = +menuFood[k].stock + +bills[i].cart[j].quantity
                        menuFood[k].sold = +menuFood[k].sold - +bills[i].cart[j].quantity
                    }
                }
            }
        }
        
    }
   }
    localStorage.setItem("bills",JSON.stringify(bills))
    localStorage.setItem("menuFood",JSON.stringify(menuFood))
    renderHistory()
}

function showBill(id){
    for (let i = 0; i<bills.length; i++) {
        if(bills[i].id == id){
            document.getElementsByClassName("showBillInfo")[0].innerHTML=
    `
    <span class="material-symbols-outlined" onclick="closeShowBill()">
    close
    </span>
    <h2>Hóa đơn mua hàng</h2>
    <div>Khách hàng: <p>${bills[i].nameUser}</p></div>            
    <div>Hoá đơn số: <p>${bills[i].id}</p></div>            
    <div>Địa chỉ: <p>${bills[i].address}</p></div>            
    <div>Số điện thoại: <p>${bills[i].phone}</p></div>            
    <div>thời gian: <p>${bills[i].time}</p></div>            
    <div>
    <table>
        <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
        </tr>
        <tbody id="renderCartBill">

        </tbody>
        <tfoot>
            <th>Tổng bill:</th>
            <th>${bills[i].priceBill}</th>
        </tfoot>
    </table>
</div
    `
    renderCartBill(id)
        } 
    }
    document.getElementsByClassName("showBillInfo")[0].style.visibility="visible"
    
}
function closeShowBill(){
    document.getElementsByClassName("showBillInfo")[0].style.visibility="hidden"
    document.getElementsByClassName("showBillInfo")[0].innerHTML=""

}
function renderCartBill(id){
    let text =""
    for(let i = 0;i<bills.length;i++){
        if(bills[i].id == id){
            for(let j=0;j<bills[i].cart.length;j++){
                for(let k=0;k<menuFood.length;k++){
                if( menuFood[k].id == bills[i].cart[j].id)
                {
                text += 
                `
                <tr>
                    <td>${menuFood[k].name}</td>
                    <td>${bills[i].cart[j].quantity}</td>
                </tr>
                `
                }    
                }
            }
        }
    }
    document.getElementById("renderCartBill").innerHTML =text
}
// for(let i =0;i<bills.length;i++){
//     if(bills[i].status == 3){
//         bills[i].priceBill = "0&nbsp;₫"

//     }
// }
// localStorage.setItem("bills",JSON.stringify(bills))