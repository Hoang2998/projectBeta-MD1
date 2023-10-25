let bills = JSON.parse (localStorage.getItem("bills"))
let alertAction = JSON.parse(localStorage.getItem("alertAction"))
console.log(bills);
// let alertAction = []
// localStorage.setItem("alertAction",JSON.stringify(alertAction))
let statusBill = [
    {
        id:0,
        status:"chưa xử lí"
    },
    {
        id:1,
        status:"thành công",
        color:"green"
    },
    {
        id:2,
        status:"đơn bị hủy",
        color:"red"
    },
    {
        id:3,
        status:"khách hàng hủy đơn ",
        color:"orange"
    }
]
let arrBillRender = bills 

renderBill()
function findBill(){
    arrBillRender = bills.filter((element)=>{
        if(element.id == document.getElementById("findBill").value){
            return element
        }
        if(document.getElementById("findBill").value == ""){
            return element
        }
    })
    console.log(arrBillRender);
    renderBill()
}


function renderBill(){
    let text =""
    let index;
    let status;
    for(let i=0;i<arrBillRender.length;i++){
        index = i
        for(let j =0;j<statusBill.length;j++){
            if(arrBillRender[i].status == statusBill[j].id){
                status = j
                break
            }
        }
                text += 
        `
        <tr>
            <td>${i+1}</td>
            <td>${arrBillRender[i].id}</td>
            <td>${arrBillRender[i].nameUser}</td>
            <td>${arrBillRender[i].address}</td>
            <td>${arrBillRender[i].phone}</td>
            <td>${arrBillRender[i].time}</td>
            <td >
                <p onclick="viewBillProduct(${i})"><u>xem chi tiết</u></p>
                <div class="viewBillProduct"></div>
            </td>
            <th>${arrBillRender[i].priceBill}</th>
            <td style="color:${statusBill[status].color};">${statusBill[status].status}</td>
            <td class="btn_bill">
            <button onclick="doneBill(${i})">Xác nhận</button>
            <button onclick="cancelBill(${i})">Hủy đơn</button>
            </td>
        </tr>
        `
    }
    document.getElementById("body").innerHTML = text
    arrBillRender.forEach((element,index) => {
        if(element.status != 0){
        document.getElementsByClassName("btn_bill")[index].innerHTML="đã xử lí"
        }
    });
   
}
renderBill()
let flag = "none"
function viewBillProduct(index){
    if(flag == "none"){ 
        let text =""
        for(let i=0;i<bills[index].cart.length;i++){
            for (let k = 0; k < menuFood.length; k++) {
                if( menuFood[k].id == bills[index].cart[i].id){
                    text += 
                    `
                    <p>${menuFood[k].name} x ${bills[index].cart[i].quantity}</p>
                    `
                    break
                }
            }
        }
    document.getElementsByClassName("viewBillProduct")[index].innerHTML = text
    document.getElementsByClassName("viewBillProduct")[index].style.display = "block"
    flag="block"
}else{
    document.getElementsByClassName("viewBillProduct")[index].style.display = "none"
    flag = "none"
}
}
function doneBill(index){
    let comment = "đã được xử lí thành công"
    addAlertAction(index,comment)
    bills[index].status = 1
    localStorage.setItem("bills",JSON.stringify(bills))
    renderBill()
    document.getElementsByClassName("btn_bill")[index].innerHTML="đã xử lí"

}
function cancelBill(index){
    let comment = "đã bị hủy"
    addAlertAction(index,comment)
    console.log(bills[index]);
    bills[index].status = 2
    localStorage.setItem("bills",JSON.stringify(bills))
    for (let item of bills[index].cart){
        let productId = item.id
        let quantityProduct = item.quantity;
        let findProduct = menuFood.find((product)=> product.id === productId)
        if(findProduct){
            findProduct.stock += +quantityProduct
            findProduct.sold -= +quantityProduct
        }
    }
    localStorage.setItem("menuFood",JSON.stringify(menuFood))
    // for(let i=0;i<bills[index].cart;i++){
    //     for(let j =0 ; j<menuFood.length;j++){
    //         if(menuFood[j].id == bills[index].cart[i].id){

    //             menuFood[j].stock = +menuFood[j].stock + +bills[index].cart[i].quantity
    //         }
    //     }
    // }
    // localStorage.setItem("menuFood",JSON.stringify(menuFood))
    renderBill()
    document.getElementsByClassName("btn_bill")[index].innerHTML="đã xừ lí"
}
function uuid(){
    return Math.floor(Math.random()*99999)
}
function addAlertAction(id,comment){
    let idUser = bills[id].idUser
    let idBill = bills[id].id
    let alert = {
        id: uuid(),
        idBill:idBill,
        idUser:idUser,
        status:comment,
    }
    alertAction.unshift(alert)
    localStorage.setItem("alertAction",JSON.stringify(alertAction))
}
