var menuFood = JSON.parse(localStorage.getItem("menuFood"))
// console.log(menuFood);
let sliderImg = document.getElementById("sliderImg")
let slider =  document.getElementById("slider")
let item = document.getElementsByClassName("sameImg")
let next = document.getElementById("next")
let prev = document.getElementById("pre")
let dots = document.querySelectorAll(".dots li")
let sliderActive = 0
let itemLength = item.length-1;
let open = 0  
let listUser = JSON.parse(localStorage.getItem("listUser"))
let alertAction = JSON.parse(localStorage.getItem("alertAction"))
let currentUser = localStorage.getItem("currentUser")
let alertEmailUsers = document.getElementById("alertInfoEmail")   
let alertPasswordUser = document.getElementById("alertInfoPassword")
let alertPasswordUserNew = document.getElementById("alertInfoPasswordNew")
let indexUser;
let newPassword;
let openAlert=0
// let admin = {
//     avatar: "../img/avatar.jpg",
//     email:"admin@gmail.com",
//     password:"11111111",
//     role:"admin",
//     status:1,
//     username:"Admin1",
//     id:1,
// }
// listUser.push(admin)
// localStorage.setItem("listUser",JSON.stringify(listUser))

window.onscroll = function() {myFunctionA()};

        function myFunctionA() {
          if (document.documentElement.scrollTop > 50 ) {
            document.getElementsByClassName("qsone")[0].classList.add("qsUp")
            setTimeout(()=>{
            document.getElementsByClassName("qstwo")[0].classList.add("qsUp")
            },500)
            setTimeout(()=>{
            document.getElementsByClassName("qsthree")[0].classList.add("qsUp")
            },1000)
            setTimeout(()=>{
            document.getElementsByClassName("qsfour")[0].classList.add("qsUp")
            },1500)
            return
          }
          document.getElementsByClassName("qsone")[0].classList.remove("qsUp")
          document.getElementsByClassName("qstwo")[0].classList.remove("qsUp")
          document.getElementsByClassName("qsthree")[0].classList.remove("qsUp")
          document.getElementsByClassName("qsfour")[0].classList.remove("qsUp")
        }

let openMenu = 0
function displayMenu(){
    openMenu++
    if(openMenu == 1){
      document.getElementById("header__nabbar").style.top="10vw"  
    }else{
        document.getElementById("header__nabbar").style.top="-60vw" 
        openMenu = 0 
    }
    
}

for(let i =0;i<listUser.length;i++){
    if(listUser[i].id == currentUser){
        indexUser = i
        document.getElementById("header__avatar").src=listUser[i].avatar;
        document.getElementById("nameUser").innerHTML=listUser[i].username;
    }
 }
let totalBillUserNow = alertAction.filter((element)=>{
    if(element.idUser == currentUser){
        return element
    }
})
checkNumAlert()
function checkNumAlert(){
    if(totalBillUserNow.length > listUser[indexUser].alertBill){
        document.getElementsByClassName("bellalert")[0].classList.add("ringBell")
        let number = totalBillUserNow.length - listUser[indexUser].alertBill
        document.getElementById("numberAlertBell").innerHTML = number
        renderAlert(number)
    }else{
        document.getElementById("numberAlertBell").style.backgroundColor="rgba(10, 84, 10,0.8)"
        document.getElementsByClassName("bellalert")[0].classList.remove("ringBell")
        let number = totalBillUserNow.length - listUser[indexUser].alertBill
        document.getElementById("numberAlertBell").innerHTML = number
        renderAlert(number)
    }
}

function stopRingBell(){
    openAlert++
    if(openAlert == 1){
            listUser[indexUser].alertBill = totalBillUserNow.length
            localStorage.setItem("listUser",JSON.stringify(listUser))
            document.getElementById("displayAlertBell").style.visibility="visible"
            document.getElementsByClassName("bellalert")[0].classList.remove("ringBell")
    }else{
        openAlert = 0
        document.getElementById("displayAlertBell").style.visibility="hidden"
        checkNumAlert()
    }
}
function renderAlert(number){
    let text =""
    for (let i = 0; i < totalBillUserNow.length; i++) {
        text += 
        `
        <div class="statusN">
        <p style="width: 80%;padding:0px 8px;">
            Đơn hàng <span>${totalBillUserNow[i].idBill}</span> <span>${totalBillUserNow[i].status}</span>
        </p> 
        <div style=" font-size: 1vw;" class="statusAlert"> đã đọc </div>
        </div>
        `
    }
    document.getElementById("displayAlertBell").innerHTML=text
    for(let j=0 ; j<number ; j++){
        document.getElementsByClassName("statusAlert")[j].innerHTML=""
        document.getElementsByClassName("statusAlert")[j].classList.add("seen")
    }
}



// cart = listUser[indexUser].cart
// document.getElementById("alertProduct")=cart.length
function checkLogin(){
    if(currentUser == null){
    document.querySelector("#header button").innerHTML="Đăng Nhập"
    }else{
    document.querySelector("#header button").innerHTML="Đăng xuất"
    }
} 
checkLogin()
function changeCart(){
    if(currentUser == null){
        window.location.href="/Project/HTML/register__login.html"
        }else{
        window.location.href="/Project/HTML/cart.html"
        }
}

next.onclick=()=>{
    if(sliderActive +1 > itemLength){
        sliderActive = 0 
    }else{
        sliderActive = sliderActive + 1
    }
    reloadSlider();
};
prev.onclick=()=>{
    if(sliderActive - 1 < 0){
        sliderActive = itemLength
    }else{
        sliderActive = sliderActive - 1
    }
    reloadSlider();
};
let relaySlider = setInterval(()=>{next.click()},5000)

function reloadSlider() {
    let checkLeft = item[sliderActive].offsetLeft;
    sliderImg.style.left = -checkLeft + `px`  


    let dotActive = document.querySelector(".dots .active");
    dotActive.classList.remove("active")
    document.getElementsByTagName("li")[sliderActive].classList.add("active")

    clearInterval(relaySlider)
    relaySlider = setInterval(()=>{next.click()},5000)

}

    dots.forEach((li,index) => {
    li.onclick=()=>{
        sliderActive = index
        reloadSlider()
    };
});

function openInfoUser(){
    if(currentUser == null){
        window.location.href="/Project/HTML/register__login.html"
    }
    open++;
    if(open<2){
    document.getElementById("tableInfoUser").style.right="0"
    
    }else{
    document.getElementById("tableInfoUser").style.right="-50vw"
    open = 0}
     for(let i =0;i<listUser.length;i++){
        if(listUser[i].id == currentUser){
            document.querySelector(".imgAvatar img").src=listUser[i].avatar
            document.getElementById("info__NameUser").value = listUser[i].username;
            document.getElementById("info__EmailUser").value = listUser[i].email;
            indexUser = i
        }
     }
}

function changeAvatar(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            // console.log('RESULT', reader.result);
            listUser[indexUser].avatar = reader.result
            localStorage.setItem("listUser", JSON.stringify(listUser));
            readerImage()
        }
        reader.readAsDataURL(file);
    }
    function readerImage() {
        let result = listUser[indexUser].avatar
        // console.log("22222",result);
        document.querySelector(".imgAvatar img").src= result;
        document.getElementById("header__avatar").src= result
    }
    // readerImage();
function checkEmailUser(){
    Email = document.getElementById("info__EmailUser").value.match(/\w+@gmail\.\w{3}$/)
    if(Email == null){
        alertEmailUsers.innerHTML = "Tài khoản của bạn ko hợp lệ"
        alertEmailUsers.style.color="red"
        alertEmailUsers.style.fontSize="10px"
        return;
    }else{
        alertEmailUsers.innerHTML = ""
        alertEmailUsers.style.color=""
        alertEmailUsers.style.fontSize=""
    }

    for(let i=0;i<listUser.length;i++){
        if(listUser[i].email == Email ){
           
            if(Email == listUser[indexUser].email){
            return true;
            }
             alertEmailUsers.innerHTML = "Tài khoản của bạn đã tồn tại"
            alertEmailUsers.style.color="red"
            alertEmailUsers.style.fontSize="10px"
            return false;
        }
        
    }
    // alertEmailUsers.innerHTML = "Tài khoản của bạn hợp lệ"
    // alertEmailUsers.style.color="green"
    // alertEmailUsers.style.fontSize="10px"
    return true
}

function checkPasswordUser(){
    Password = document.getElementById("info_PasswordUser").value.match(/^[0-9]{8}$/)
    console.log(Password);
    if(Password == null){
        // alertPasswordUser.innerHTML = "Mật khẩu của bạn ko hợp lệ"
        alertPasswordUser.style.color="red"
        alertPasswordUser.style.fontSize="10px"
        return false;
    }else{
        if(Password == listUser[indexUser].password){
        return true;
        }else{
        return false;
        }
    }
}
 
function checkPasswordUserNew(){
    newPassword = document.getElementById("info_PasswordUserNew").value.match(/^[0-9]{8}$/)
    if(newPassword == null){
        alertInfoPasswordNew.innerHTML = ""
        return false;
    }else{
        if(newPassword == listUser[indexUser].password){
        alertInfoPasswordNew.innerHTML = "Trùng mật khẩu cũ"
        alertInfoPasswordNew.style.color="red"
        alertInfoPasswordNew.style.fontSize="10px"
        return false;
        }else{
        alertInfoPasswordNew.innerHTML = "done"
        alertInfoPasswordNew.style.color="green"
        alertInfoPasswordNew.style.fontSize="10px"
        return true;
        }
    }
}


function updateUser(){
 if(checkEmailUser() && checkPasswordUser() && checkPasswordUserNew()){
        listUser[indexUser].username = document.getElementById("info__NameUser").value;
        listUser[indexUser].email =   document.getElementById("info__EmailUser").value;
        listUser[indexUser].password = document.getElementById("info_PasswordUserNew").value;
        localStorage.setItem("listUser",JSON.stringify(listUser))
        document.getElementById("alertUpdate").innerHTML = "Cập nhập thành công !"
        document.getElementById("alertUpdate").style.bottom="25vw"
        setTimeout (()=>{
            document.getElementById("alertUpdate").innerHTML = "Cập nhập thành công !"
            document.getElementById("alertUpdate").style.bottom="-15vw" 
            document.getElementById("info_PasswordUserNew").value="";
            document.getElementById("info_PasswordUser").value="";
            alertPasswordUser.innerHTML=""
            alertPasswordUserNew.innerHTML=""
        },2000)
        document.getElementById("nameUser").innerHTML= document.getElementById("info__NameUser").value;

 }else if(checkEmailUser() && document.getElementById("info_PasswordUserNew").value == "" && document.getElementById("info_PasswordUser").value == "" ){
        listUser[indexUser].username = document.getElementById("info__NameUser").value;
        listUser[indexUser].email =   document.getElementById("info__EmailUser").value;
        localStorage.setItem("listUser",JSON.stringify(listUser))
        document.getElementById("alertUpdate").innerHTML = "Cập nhập thành công !"
        // document.getElementById("tableInfoUser").style.opacity="0.7" 
        document.getElementById("alertUpdate").style.bottom="25vw"
        // document.getElementById("alertUpdate").style.opacity="1 !important" 
        setTimeout (()=>{
            document.getElementById("alertUpdate").innerHTML = ""
            document.getElementById("alertUpdate").style.bottom="-15vw"
            alertPasswordUser.innerHTML=""
            alertPasswordUserNew.innerHTML="" 
            // document.getElementById("info_PasswordUserNew").value="";
        },2000)
        document.getElementById("nameUser").innerHTML= document.getElementById("info__NameUser").value;

 }else if(checkEmailUser() && document.getElementById("info_PasswordUserNew").value && document.getElementById("info_PasswordUser").value){
    if( checkPasswordUser() == false){
         alertPasswordUser.innerHTML = "sai mật khẩu"
         alertPasswordUser.style.color="red"
         alertPasswordUser.style.fontSize="10px"
    }
 }

}


function logOut(){
    localStorage.removeItem("currentUser")
    document.getElementById("tableInfoUser").style.right="-50vw"
    localStorage.removeItem("cart")
    window.location.href="/Project/HTML/register__login.html"    
}