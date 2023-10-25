let currentPage = 1;
let currentPageFind = 1;
let currentPageTra = 1;
let currentPageDav = 1;
let productsPerPage = 3;
let renderArr = menuFood
let cheArr = [];
let traArr = [];
let davArr = []; 
let cart = listUser[indexUser]?.cart || []



for(let i =0;i<menuFood.length;i++){
    if(menuFood[i].category == "chè"){
        cheArr.push(menuFood[i])
    }else if(menuFood[i].category == "trà"){
        traArr.push(menuFood[i])
    }else if(menuFood[i].category == "đồ ăn vặt"){
        davArr.push(menuFood[i])
    }
}
cheArr = cheArr.sort((a,b)=>b.sold - a.sold)
traArr = traArr.sort((a,b)=>b.sold - a.sold)
davArr = davArr.sort((a,b)=>b.sold - a.sold)

checkLogin()
alertProduct()    
hotSale()

let flag = 0
function findProduct(){
    flag++
    if(flag<2){
    document.getElementById("inputFind").style.display="block";
    document.getElementById("findFood").style.height="36vw"
    document.getElementById("findFood").classList.add("blockFind")
    document.documentElement.scrollTop = 150
    }else{
        document.getElementById("inputFind").style.display="none";
        document.getElementById("findFood").style.height="0px"
        document.getElementById("findFood").classList.remove("blockFind")
        flag = 0
    }
}

function inputFindProduct(){
    let arrFind =[]
    for(let i=0;i<menuFood.length;i++){
        if(menuFood[i].name.indexOf( document.getElementById("inputFind").value) !== -1){
            arrFind.push(menuFood[i])
    }
    }
    renderArr = arrFind
    render(renderArr)
}



function render(arr){
    let start = (currentPageFind - 1)*productsPerPage;
    let end = currentPageFind*productsPerPage
    let totalPage = Math.ceil(arr.length/productsPerPage);
    let text="";
    let dots = ""; 
    if(end > arr.length){
        end = arr.length
    }
    for(let i =start;i<end;i++){
        text += 
        `
        <div class="product">
            <img src="${arr[i].hotsale}"  width="60vw" alt="" class="hotSale">
            <img src=${arr[i].imgProduct} alt="" class="productSame">
            <button class="addProduct" onclick="displayInforProduct(${arr[i].id})">+ <p>xem chi tiet</p> 
            </button>
        </div>
        `
    }
    document.getElementById("find__display").innerHTML=text
    
    for(let j = 0;j<totalPage;j++){
        dots += 
        `
        <div class="dotFind" onclick="choosePageShowFind(${j+1})"></div>
        `
    }
    document.getElementById("dotsProductFind").innerHTML = dots
    
    }
    render(renderArr)
    
    function choosePageShowFind(index){
        currentPageFind = index
        render(renderArr)
        document.getElementsByClassName("dotFind")[index-1].classList.add("changeColor")
    }
    
    function prevFind(){
        currentPageFind -- 
        if(currentPageFind<1){
            currentPageFind=Math.ceil(renderArr.length/productsPerPage)
        }
        render(renderArr)
        document.getElementsByClassName("dotFind")[currentPageFind-1].classList.add("changeColor")
    }
    
    function nextFind(){
        currentPageFind ++ 
        if(currentPageFind > Math.ceil(renderArr.length/productsPerPage)){
            currentPageFind = 1
        }
        render(renderArr)
        document.getElementsByClassName("dotFind")[currentPageFind-1].classList.add("changeColor")
    }






function renderChe(arr){
let start = (currentPage - 1)*productsPerPage;
let end = currentPage*productsPerPage
let totalPage = Math.ceil(arr.length/productsPerPage);
let text="";
let dots = ""; 
if(end > arr.length){
    end = arr.length
}
for(let i =start;i<end;i++){
    text += 
    `
    <div class="product">
        <img src="${arr[i].hotsale}"  width="60vw" alt="" class="hotSale">
        <img src=${arr[i].imgProduct} alt="" class="productSame">
        <button class="addProduct" onclick="displayInforProduct(${arr[i].id})">+ <p>xem chi tiet</p> 
        </button>
    </div>
    `
}
document.getElementById("che__display").innerHTML=text

for(let j = 0;j<totalPage;j++){
    dots += 
    `
    <div class="dotChe" onclick="choosePageShow(${j+1})"></div>
    `
}
document.getElementById("dotsProduct").innerHTML = dots

}
renderChe(cheArr)

function closeInfor(){
    document.getElementById("infoProduct").style.width = "0vw"
    document.getElementById("infoProduct").style.height = "0vw"
    document.getElementById("infoProduct").classList.remove("bginfoProduct")
    document.getElementById("infoProduct").innerHTML = ""
}



//Them san pham vao gio hang
//====================================================================================================




function displayInforProduct(id){
    document.getElementById("infoProduct").style.width = "95vw"
    document.getElementById("infoProduct").style.height = "33vw"
    document.getElementById("infoProduct").classList.add("bginfoProduct")
    let index ;
    for(let i= 0;i<menuFood.length;i++){
        if(menuFood[i].id == id ){
            index = i
            break
        }
    }
    setTimeout (()=>{
        document.getElementById("infoProduct").innerHTML = 
        `
        <div class="contain__info">
                        <span class="material-symbols-outlined close" onclick="closeInfor()">
                        close
                        </span>
                        <img src="${menuFood[index].imgProduct}" alt="" class="infoImg">
                        <div class="contain__infoProduct">
                            <p>${menuFood[index].content}</p>
                            <div class="alertAddProduct">
                                <img src="../img/doneAddProduct.png" width="80px" alt="">
                                <p>Thêm vào giỏ hàng thành công</p>
                            </div>
                            <hr>
                            <pre>Sản phẩm: <span id="nameProduct">${menuFood[index].name}</span></pre>
                            <pre>Đơn Giá : <span id="priceProduct">${menuFood[index].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> </pre>
                            <pre>Số lượng: <button onclick="tang(${index})" class="btn">+</button><input type="text" placeholder="0" id="inputQuantity" value = "1" oninput="checkStock(${index})"><button onclick="giam()" class="btn">-</button></pre>
                            <button onclick="addProduct(${index})" id="addProduct">+ thêm vào giỏ hàng</button>
                        </div>
                    </div>
        `
    },500)
}

function tang(index){
    console.log(1111);
    document.getElementById("inputQuantity").value = +document.getElementById("inputQuantity").value + 1
    checkStock(index)
}
function giam(){
    document.getElementById("inputQuantity").value = +document.getElementById("inputQuantity").value - 1
    if(document.getElementById("inputQuantity").value < 1){
        document.getElementById("inputQuantity").value = 1
    }
}

function alertProduct(){
    document.getElementById("alertProduct").innerHTML = cart.length
}
function addProduct(index) {
    for(let i=0;i<cart.length;i++){
        if(cart[i].id == menuFood[index].id){
            cart[i].quantity = +cart[i].quantity + +document.getElementById("inputQuantity").value
            localStorage.setItem("listUser",JSON.stringify(listUser))
            alertProduct()
            document.getElementsByClassName("alertAddProduct")[0].classList.add("effecta")
            setTimeout(()=>{
            document.getElementsByClassName("alertAddProduct")[0].classList.remove("effecta")
            },1500)
            return
        }
    }
    if( document.getElementById("inputQuantity").value <= menuFood[index].stock ){
        let product = {
            quantity:document.getElementById("inputQuantity").value,
            id:menuFood[index].id,
        }
        cart.push(product)
        listUser[indexUser].cart = cart
        localStorage.setItem("listUser",JSON.stringify(listUser))
        alertProduct()
        document.getElementsByClassName("alertAddProduct")[0].classList.add("effecta")
    
        setTimeout(()=>{
            document.getElementsByClassName("alertAddProduct")[0].classList.remove("effecta")
    
            },1500)
    }else{
         document.getElementsByClassName("alertAddProduct")[0].style.color = "white"
        document.getElementsByClassName("alertAddProduct")[0].style.fontSize = "20px"
        document.getElementsByClassName("alertAddProduct")[0].classList.add("effecta")
        document.getElementsByClassName("alertAddProduct")[0].innerHTML = `Chỉ còn ${menuFood[index].stock } sản phẩm trong cửa hàng`  
        setTimeout(()=>{
            document.getElementById("inputQuantity").value = menuFood[index].stock
            document.getElementsByClassName("alertAddProduct")[0].classList.remove("effecta")
            document.getElementsByClassName("alertAddProduct")[0].innerHTML =`<img src="../img/doneAddProduct.png" width="80px" alt="">
            <p>Thêm vào giỏ hàng thành công</p>`
            },1500)
    }

}

function checkStock(index){
    let product = cart.filter((element)=> {
        if(element.id == menuFood[index].id){
            return element
        }
    })
    // console.log(product);
    // let total = document.getElementById("inputQuantity").value + +product[0].quantity
    // console.log(total);

    if(menuFood[index].stock <= document.getElementById("inputQuantity").value + +product[0]?.quantity){
        document.getElementsByClassName("alertAddProduct")[0].style.color = "white"
        document.getElementsByClassName("alertAddProduct")[0].style.fontSize = "20px"
        document.getElementsByClassName("alertAddProduct")[0].classList.add("effecta")
        document.getElementsByClassName("alertAddProduct")[0].innerHTML = `Chỉ còn ${menuFood[index].stock - product[0].quantity} sản phẩm trong cửa hàng`  
        setTimeout(()=>{
            document.getElementById("inputQuantity").value = menuFood[index].stock - product[0].quantity
            document.getElementsByClassName("alertAddProduct")[0].classList.remove("effecta")
            document.getElementsByClassName("alertAddProduct")[0].innerHTML =`<img src="../img/doneAddProduct.png" width="80px" alt="">
            <p>Thêm vào giỏ hàng thành công</p>`
            },1500)
    
    }
}

//========================================================================================================================================================================================================



function choosePageShow(index){
    currentPage = index
    renderChe(cheArr)
    document.getElementsByClassName("dotChe")[index-1].classList.add("changeColor")
}

function prevChe(){
    currentPage -- 
    if(currentPage<1){
        currentPage=Math.ceil(cheArr.length/productsPerPage)
    }
    renderChe(cheArr)
    document.getElementsByClassName("dotChe")[currentPage-1].classList.add("changeColor")
}

function nextChe(){
    currentPage ++ 
    if(currentPage > Math.ceil(cheArr.length/productsPerPage)){
        currentPage = 1
    }
    renderChe(cheArr)
    document.getElementsByClassName("dotChe")[currentPage-1].classList.add("changeColor")
}



function renderTra(arr){
    let start = (currentPageTra - 1)*productsPerPage;
    let end = currentPageTra*productsPerPage
    let totalPage = Math.ceil(arr.length/productsPerPage);
    let text="";
    let dots = ""; 
    if(end > arr.length){
        end = arr.length
    }
    for(let i =start;i<end;i++){
        text += 
        `
        <div class="product">
            <img src="${arr[i].hotsale}"  width="60vw" alt="" class="hotSale">
            <img src=${arr[i].imgProduct} alt="" class="productSame">
            <button class="addProduct" onclick="displayInforProduct(${arr[i].id})">+ <p>xem chi tiet</p> 
            </button>
        </div>
        `
    }
    document.getElementById("traSua__display").innerHTML=text
    
    for(let j = 0;j<totalPage;j++){
        dots += 
        `
        <div class="dotTrasua" onclick="choosePageShowTra(${j+1})"></div>
        `
    }
    document.getElementById("dotsProductTra").innerHTML = dots
    
    }
    renderTra(traArr)
    
    function choosePageShowTra(index){
        currentPageTra = index
        renderTra(traArr)
        document.getElementsByClassName("dotTrasua")[index-1].classList.add("changeColor")
    }
    
    function prevTra(){
        currentPageTra -- 
        if(currentPageTra<1){
            currentPageTra=Math.ceil(traArr.length/productsPerPage)
        }
        renderTra(traArr)
        document.getElementsByClassName("dotTrasua")[currentPageTra-1].classList.add("changeColor")
    }
    
    function nextTra(){
        currentPageTra ++ 
        if(currentPageTra > Math.ceil(traArr.length/productsPerPage)){
            currentPageTra = 1
        }
        renderTra(traArr)
        document.getElementsByClassName("dotTrasua")[currentPageTra-1].classList.add("changeColor")
    }




    function renderDav(arr){
        let start = (currentPageDav - 1)*productsPerPage;
        let end = currentPageDav*productsPerPage
        let totalPage = Math.ceil(arr.length/productsPerPage);
        let text="";
        let dots = ""; 
        if(end > arr.length){
            end = arr.length
        }
        for(let i =start;i<end;i++){
            text += 
            `
            <div class="product">
                <img src="${arr[i].hotsale}"  width="60vw" alt="" class="hotSale">
                <img src=${arr[i].imgProduct} alt="" class="productSame">
                <button class="addProduct" onclick="displayInforProduct(${arr[i].id})">+ <p>xem chi tiet</p> 
                </button>
            </div>
            `
        }
        document.getElementById("dav__display").innerHTML=text
        
        for(let j = 0;j<totalPage;j++){
            dots += 
            `
            <div class="dotDav" onclick="choosePageShowDav(${j+1})"></div>
            `
        }
        document.getElementById("dotsProductDav").innerHTML = dots
        
        }
        renderDav(davArr)
        
        function choosePageShowDav(index){
            currentPageDav = index
            renderDav(davArr)
            document.getElementsByClassName("dotDav")[index-1].classList.add("changeColor")
        }
        
        function prevDav(){
            currentPageDav -- 
            if(currentPageDav<1){
                currentPageDav=Math.ceil(davArr.length/productsPerPage)
            }
            renderDav(davArr)
            document.getElementsByClassName("dotDav")[currentPageDav-1].classList.add("changeColor")
        }
        
        function nextDav(){
            currentPageDav ++ 
            if(currentPageDav > Math.ceil(davArr.length/productsPerPage)){
                currentPageDav = 1
            }
            renderDav(davArr)
            document.getElementsByClassName("dotDav")[currentPageDav-1].classList.add("changeColor")
        }



        window.onscroll = function() {myFunction()};

        function myFunction() {
          if (document.documentElement.scrollTop > 950 ) {
            document.getElementsByClassName("return")[0].classList.add("slideUp")
            return
          }
          document.getElementsByClassName("return")[0].classList.remove("slideUp")
        }

function hotSale(){
    menuFood = menuFood.sort((a,b)=>b.sold - a.sold)
    console.log(menuFood);
    for(let i=0;i<menuFood.length;i++){
        if(0<=i && i<5 && menuFood[i].sold != 0){
            menuFood[i].hotsale ="../img/hot-sale.png"
        }else if(menuFood[i].stock <= 0){
            menuFood[i].hotsale ="../img/SOLD OUT tag free icon 2.png"
        }else{
            menuFood[i].hotsale=""
        }
    }
    localStorage.setItem("menuFood",JSON.stringify(menuFood))
}

