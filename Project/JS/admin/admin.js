let menuFood = JSON.parse (localStorage.getItem("menuFood"))
let currentPage = 1;
let productPerPage = 5;
let renderArr = menuFood;
let imgProduct;
let openAlert = 0
// for (let i = 0; i < menuFood.length; i++) {
//     menuFood[i].sold = 0
// }
// localStorage.setItem("menuFood",JSON.stringify(menuFood))
checkNumberAlert()
function checkNumberAlert(){
   let arrAlert = menuFood.filter((element)=>{
        let product = element.stock 
        if(product < 20){
            return element
        }
   })
   console.log(arrAlert);
   renderAlert(arrAlert)
   if(arrAlert.length > 0){
        document.getElementById("numberAlertBell").innerHTML=arrAlert.length
        document.getElementsByClassName("bellalert")[0].classList.add("ringBell")
   }else{
    document.getElementById("numberAlertBell").innerHTML="0"
    document.getElementsByClassName("bellalert")[0].classList.remove("ringBell")
   }
   
}
function renderAlert(arr){
    let text =""
    for(let i=0;i<arr.length;i++){
        text += 
        `
        <div style="border-bottom: 1px solid black;">
                <p style="margin: 0;padding: 0.5vw 0;"> Sản phẩm <span>${arr[i].name}</span> còn lại: <span>${arr[i].stock}</span> cần nhập hàng thêm </p>
            </div>
        ` 
        document.getElementById("displayAlertBell").innerHTML=text
    }
}
function stopRingBell(){
    openAlert++
    if(openAlert == 1){
            document.getElementById("displayAlertBell").style.visibility="visible"
            document.getElementsByClassName("bellalert")[0].classList.remove("ringBell")
    }else{
        openAlert = 0
        document.getElementById("displayAlertBell").style.visibility="hidden"
    }
}




function changeMainPage(){
    window.location.href="/index.html"
}
function logOut(){
    window.location.href="/Project/HTML/register__login.html"

}
function renderProduct(){
    let start = (currentPage - 1)*productPerPage
    let end = currentPage*productPerPage
    let totalPage = Math.ceil(renderArr.length/productPerPage)
    if(end > renderArr.length){
        end = renderArr.length
    }
    let text=""
    let dots=""
    for(let i = start; i<end;i++){
        text += `
                <tr>
                    <td>${i+1}</td>
                    <td><img src="${renderArr[i].imgProduct}" width="50vw" height="50vw"></td>
                    <td>${renderArr[i].name}</td>
                    <td>${renderArr[i].category}</td>
                    <td>${renderArr[i].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>${renderArr[i].stock}</td>
                    <td>${renderArr[i].sold}</td>
                    <td><button onclick="updateProduct(${renderArr[i].id})">Cập nhập</button><button onclick="alertDeleteProduct(${renderArr[i].id})" class="btn_delete">Ngừng bán</button></td>
                </tr>
        
        `
    }
    document.getElementById("table__body").innerHTML = text

    for(let j =0;j<totalPage;j++){
        dots += `
             <li onclick="changePage(${j})"></li>  
        `
    }
    document.getElementById("dots").innerHTML = dots

}
renderProduct(renderArr)
function changePage(index){
 currentPage = index+1
 renderProduct()
 document.getElementsByTagName("li")[index].style.backgroundColor="rgb(165, 42, 42,1)"
}
let index;

function alertDeleteProduct(id){
    document.getElementsByClassName("alertDelete")[0].classList.add("alertDelete__display")
  
    for(let i=0;i<renderArr.length;i++){
        if(renderArr[i].id == id){
            document.querySelector(".alertDelete span").style.color="wheat"
            document.querySelector(".alertDelete span").innerHTML=renderArr[i].name
            index = i
            return
        }
    }
}
function deleteProduct(){
            renderArr.splice(index,1)
            localStorage.setItem("menuFood",JSON.stringify(menuFood))
            document.getElementsByClassName("alertDelete")[0].classList.remove("alertDelete__display")
            renderProduct()
}
function closeAlert(){
    document.getElementsByClassName("alertDelete")[0].classList.remove("alertDelete__display")
}
function addNewProduct(){
        document.getElementById("viewAddProduct").innerHTML = `
    <div onclick="closeViewAddProduct()"><span class="material-symbols-outlined">
    close
    </span>
</div>
<div style="display: flex; width: 100%;position:relative;">
    <div class="alertAddProducta">
        <img src="../img/doneAddProduct.png" width="80px" alt="">
        <p>Thêm vào kho hàng thành công</p>
    </div>
    <div class="viewNew">
        <table style="text-align: left; width: 100%;border: none;">
            <tr>
                <td>Tên sản phẩm :</td>
                <td><input type="text" name="" id="newNameProduct"></td>
            </tr>
            <tr>
                <td>Phân loại :</td>
                <td><select name="" id="selectProduct" >
                    <option value="">sản phẩm</option>
                    <option value="chè">chè</option>
                    <option value="trà">Trà sữa</option>
                    <option value="đồ ăn vặt">Đồ ăn vặt</option>
                </select></td>
            </tr>
            <tr>
                <td>Giá sản phẩm:</td>
                <td><input type="number" name="" id="newPriceProduct"></td>
            </tr>
            <tr>
                <td>Số lượng :</td>
                <td><input type="number" name="" id="newQuantityProduct"></td>
            </tr>
        </table>
        <div><p><label for="">miêu tả:</label></p><textarea id="newContent" name="w3review" rows="4" cols="50"></textarea></div>
        <button onclick="saveNewProduct()">Thêm sản phẩm</button>
        </div>
    <div style="display: flex;flex-direction: column;align-items: center; padding: 0 5vw; gap:1vw;">
        <div >
            <label for="chooseImg">Chọn ảnh sản phẩm</label>
            <input type="file" id="chooseImg" style="display: none;" onchange="changeAvatar(this)">
        </div>
        <div style="width:15vw;height:15vw;">
            <img src="" width="100%" height="100%" id="imgDisplay">
        </div>
    </div>
    
</div>
    `
    document.getElementById("viewAddProduct").style.height="30vw"
}
function closeViewAddProduct(){
    document.getElementById("viewAddProduct").style.height="0vw"
    // document.getElementById("viewAddProduct").innerHTML=""
    
}
function changeAvatar(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        imgProduct = reader.result
        readerImage(imgProduct)
    }
    reader.readAsDataURL(file);
}
function readerImage(img) {
    let result = img
    document.getElementById("imgDisplay").src= result
}
function saveNewProduct(){
    let food = {
        name:document.getElementById("newNameProduct").value,
        imgProduct:imgProduct,
        price:+document.getElementById("newPriceProduct").value,
        category:document.getElementById("selectProduct").value,
        stock:document.getElementById("newQuantityProduct").value,
        id:uuid(),
        sold:0,
        content:document.getElementById("newContent").value
    }
    console.log(food);
    menuFood.unshift(food)
    localStorage.setItem("menuFood",JSON.stringify(menuFood))
    document.getElementsByClassName("alertAddProducta")[0].style.opacity="1"
    document.getElementsByClassName("alertAddProducta")[0].style.bottom="5vw"
    setTimeout(()=>{
        document.getElementById("newNameProduct").value = ""
        document.getElementById("newPriceProduct").value =""
        document.getElementById("newQuantityProduct").value = ""
        document.getElementById("newContent").value =""
        document.getElementsByClassName("alertAddProducta")[0].style.opacity="0"
        document.getElementsByClassName("alertAddProducta")[0].style.bottom="-15vw"
    },2000)
    renderProduct()
}
function uuid(){
    return Math.floor(Math.random()*99999)
}
function updateProduct(id){
    
    document.getElementById("viewUpdate").style.width="42vw"
    for(let i=0;i<renderArr.length;i++){
        if(renderArr[i].id==id){
            document.getElementById("displayUpdate").innerHTML=
    `
    <div style="display: flex;width: 100%;">
    <div>
        <table style="text-align: left; width: 100%;border: none;">
            <tr>
                <td>Tên sản phẩm :</td>
                <td><input type="text" name="" id="newNameProduct" value="${renderArr[i].name}"></td>
            </tr>
            <tr>
                <td>Phân loại :</td>
                <td><select name="" id="selectProduct" >
                    <option value="${renderArr[i].category}">${renderArr[i].category}</option>
                    <option value="chè">chè</option>
                    <option value="trà">Trà </option>
                    <option value="đồ ăn vặt">Đồ ăn vặt</option>
                </select></td>
            </tr>
            <tr>
                <td>Giá sản phẩm:</td>
                <td><input type="number" name="" id="newPriceProduct" value="${renderArr[i].price}" ></td>
            </tr>
            <tr>
                <td>Số lượng :</td>
                <td><input type="number" name="" id="newQuantityProduct" value="${renderArr[i].stock}"></td>
            </tr>
        </table>
        <div><p><label for="">miêu tả:</label></p><textarea id="newContent" name="w3review" rows="6" cols="50">${renderArr[i].content}</textarea></div>
    
    <div style="display: flex;flex-direction: column; padding: 1vw 8vw;">
        <div style="padding:1vw 0;">
            <label for="chooseImg" >Chọn ảnh sản phẩm</label>
            <input type="file" id="chooseImg" style="display: none;" onchange="changeAvatar(this)">
        </div>
        <div style="width:10vw;height:10vw;">
            <img src="${renderArr[i].imgProduct}" width="100%" height="100%" id="imgDisplay">
        </div>
    </div>
        <button style="padding:0.2vw;border-radius:0.5vw;" onclick="updateNewProduct(${i})">Cập nhập</button>
        </div>
        
    `
        }
    }

    
}
function closeViewUpdate(){
    document.getElementById("viewUpdate").style.width="0vw"
}
function updateNewProduct(index){
    renderArr[index].name = document.getElementById("newNameProduct").value ||  renderArr[index].name
    renderArr[index].category = document.getElementById("selectProduct").value || renderArr[index].category
    renderArr[index].price = +document.getElementById("newPriceProduct").value || renderArr[index].price
    renderArr[index].stock = document.getElementById("newQuantityProduct").value || renderArr[index].stock 
    renderArr[index].content = document.getElementById("newContent").value || renderArr[index].content
    renderArr[index].imgProduct = imgProduct || renderArr[index].imgProduct
    localStorage.setItem("menuFood",JSON.stringify(menuFood))
    renderProduct()
    checkNumberAlert()
    document.getElementById("viewUpdate").style.width="0vw"
    // document.getElementById("displayUpdate").innerHTML=""
}
 let flag1 = 0 
 let flag2 = 0
// tang giam ham sort
function increase(){
    flag1++ 
    flag2 = 0
    if(flag1 < 2){
    renderArr  = [...renderArr].sort((a,b)=> a.price - b.price)
    renderProduct()
    }else{ 
        renderArr = menuFood
        console.log(menuFood);
        renderProduct()
        flag1 = 0
    }
    console.log(flag1)
    console.log(flag2)
}
function decrease(){
    flag2++
    flag1 = 0
    if(flag2 < 2){
        renderArr  = [...renderArr].sort((a,b)=> b.price - a.price)
        renderProduct()
    }else{
        renderArr = menuFood
        renderProduct()
        flag2 = 0
    }
    console.log(flag1)
    console.log(flag2)
}


// tim kiem san pham
function findProducta(){
    let arr = []
    for(let i=0;i<menuFood.length;i++){
        if(menuFood[i].name.toLowerCase().indexOf(document.getElementById("findProduct").value.toLowerCase()) != -1){
            arr.push(menuFood[i])
        }
    }
    renderArr = arr
    renderProduct()
}
