const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
// let listUser = []
// localStorage.setItem("listUser",JSON.stringify(listUser))
let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());


//REGISTER


let signUpName = document.getElementById("signUpName")
let signUpEmail = document.getElementById("signUpEmail")
let alertEmail = document.getElementById("signUp__AlertEmail")
var Email
function signUp__checkEmail(){
    Email = signUpEmail.value.match(/\w+@gmail\.\w{3}$/)
    if(Email == null){
        alertEmail.innerHTML = "Tài khoản của bạn ko hợp lệ"
        alertEmail.style.color="red"
        alertEmail.style.fontSize="10px"
        return;
    }else{
        alertEmail.innerHTML = ""
        alertEmail.style.color=""
        alertEmail.style.fontSize=""
    }

    for(let i=0;i<listUser.length;i++){
        if(listUser[i].email == Email){
            alertEmail.innerHTML = "Tài khoản của bạn đã tồn tại"
            alertEmail.style.color="red"
            alertEmail.style.fontSize="10px"
            return false;
        }
    }
    alertEmail.innerHTML = "Tài khoản của bạn hợp lệ"
    alertEmail.style.color="green"
    alertEmail.style.fontSize="10px"
    return true
}

let signUpPassword = document.getElementById("signUpPassword");
let alertPassword = document.getElementById("signUp__AlertPassword");
var Password;
function signUp__checkPassword(){
        Password = signUpPassword.value.match(/^(?=.*[!@#$%&*])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8}$/)
        console.log(Password);
        console.log(signUpPassword.value);
        if(Password == null){
            alertPassword.innerHTML = "Mật khẩu của bạn ko hợp lệ"
            alertPassword.style.color="red"
            alertPassword.style.fontSize="10px"
            return;
        }else{
            alertPassword.innerHTML = "Mật khẩu hợp lệ"
            alertPassword.style.color="green"
            alertPassword.style.fontSize="10px"
        }
}

let signUpPassword2 = document.getElementById("signUpPassword2");
let alertPassword2 = document.getElementById("signUp__AlertPassword2");

function signUp__checkPassword2(){
    if(signUpPassword.value != signUpPassword2.value){
        alertPassword2.innerHTML = "Mời nhập lại mật khẩu"
        alertPassword2.style.color="red"
        alertPassword2.style.fontSize="10px"
        return false;
    }else{
        alertPassword2.innerHTML = "Mật khẩu hợp lệ"
        alertPassword2.style.color="green"
        alertPassword2.style.fontSize="10px"
        return  true;
    }
}

function uuid(){
    return Math.floor(Math.random()*99999)
}

function addUser(){
    if(signUpName.value && Email && Password && signUp__checkPassword2() && signUp__checkEmail()){
        let user = {
            username:signUpName.value,
            avatar:"../img/avatar.jpg",
            email:signUpEmail.value,
            password:signUpPassword.value,
            cart:[],
            id:uuid(),
            role:"user",
            status:1,
            alertBill:0
        }
        listUser.push(user);
        localStorage.setItem("listUser",JSON.stringify(listUser))
        document.getElementsByClassName("accept")[0].classList.add("accepDisplay")
        document.getElementsByClassName("accept")[0].innerHTML=`<img src="../img/accept.jpg" alt="">`

        setTimeout (()=>{
        document.getElementsByClassName("accept")[0].classList.remove("accepDisplay")
        signUpName.value=""
        signUpEmail.value=""
        signUpPassword.value=""
        signUpPassword2.value=""
        alertEmail.innerHTML=""
        alertPassword.innerHTML=""
        alertPassword2.innerHTML=""
        },2000)
    }else if(signUpName.value || Email || Password){
        document.getElementsByClassName("accept")[0].classList.add("accepDisplay")
        document.getElementsByClassName("accept")[0].classList.add("notAccept")
        document.getElementsByClassName("accept")[0].innerHTML="Bạn cần nhập hết thông tin đăng kí"
            setTimeout (()=>{
            document.getElementsByClassName("accept")[0].classList.remove("accepDisplay")
            document.getElementsByClassName("accept")[0].innerHTML=""
        },2000)
    }

}


//LOGIN

let signInEmail = document.getElementById("signInEmail")
let signIn__AlertEmail = document.getElementById("signIn__AlertEmail")


function signIn__checkEmail(){
    Email = signInEmail.value.match(/\w+@gmail\.\w{3}$/)
    if(Email == null){
        signIn__AlertEmail.innerHTML = "Tài khoản của bạn ko hợp lệ"
        signIn__AlertEmail.style.color="red"
        signIn__AlertEmail.style.fontSize="10px"
        return false;
    }else{
        signIn__AlertEmail.innerHTML = ""
        signIn__AlertEmail.style.color=""
        signIn__AlertEmail.style.fontSize=""
    }
    for(let i =0;i<listUser.length;i++){
        if(listUser[i].email == Email){
            return true;
        }
    }
    return false;
}

let signInPassword = document.getElementById("signInPassword")
let signIn__AlertPassword = document.getElementById("signIn__AlertPassword")

function signIn__checkPassword(){
    Password = signInPassword.value.match(/^(?=.*[!@#$%&*])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8}$/)
    console.log(Password);
    if(Password == null){
        // signIn__AlertPassword.innerHTML = "Mật khẩu của bạn ko hợp lệ"
        signIn__AlertPassword.style.color="red"
        signIn__AlertPassword.style.fontSize="10px"
        return;
    }else{
        signIn__AlertPassword.innerHTML = ""
        signIn__AlertPassword.style.color="green"
        signIn__AlertPassword.style.fontSize="10px"
    }

    for(let i =0;i<listUser.length;i++){
        if(listUser[i].email == Email){
            if(listUser[i].password == Password){
                return true;
            }
        }
    }
    return false;
}

function changePage(){
    if(signIn__checkEmail()&&signIn__checkPassword()){
        let currentUser ;
        let index;
        for(let i =0;i<listUser.length;i++){
            if(listUser[i].email == Email){
               currentUser = listUser[i].id
               index = i
               localStorage.setItem("currentUser",currentUser)
               break;
            }
        }
        if( listUser[index].status == 1){
            document.getElementsByClassName("accept")[1].classList.add("accepDisplay")
        document.getElementsByClassName("accept")[1].innerHTML="<img src=../img/accept.jpg >"
        setTimeout (()=>{
            document.getElementsByClassName("accept")[1].classList.remove("accepDisplay")
        signInEmail.value=""
        signInPassword.value=""
        signIn__AlertEmail.innerHTML=""
        signIn__AlertPassword.innerHTML=""
        if(listUser[index].role == "user"){
        window.location.href="/index.html"
        }else{
        localStorage.removeItem("currentUser")
        window.location.href="/Project/HTML/admin__chart.html"
        }
        },2000)
        }else{
            document.getElementsByClassName("accept")[1].classList.add("accepDisplay")
            document.getElementsByClassName("accept")[1].innerHTML="Tài khoản của bạn đã bị khóa !!!"
        setTimeout (()=>{
            document.getElementsByClassName("accept")[1].classList.remove("accepDisplay")
            // signInEmail.value=""
            // signInPassword.value=""
            signIn__AlertEmail.innerHTML=""
            signIn__AlertPassword.innerHTML=""
            // window.location.href="http://127.0.0.1:5500/Project/HTML/trangchu.html"
            },2000)
        }
    }else{
    // document.getElementsByClassName("container__form container--signin")[0].style.opacity="0.8"
    document.getElementsByClassName("accept")[1].classList.add("accepDisplay")
    document.getElementsByClassName("accept")[1].classList.add("notAccept")
    document.getElementsByClassName("accept")[1].innerHTML="Tài khoản hoặc mật khẩu của bạn ko đúng !"
        setTimeout (()=>{
        document.getElementsByClassName("accept")[1].classList.remove("accepDisplay")
        document.getElementsByClassName("accept")[1].innerHTML=""
    },2000)
    
    }
}