import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import toastr from 'toastr';

const avatarImg = document.querySelector('.avatar');
var userName = document.querySelector('.nameInput');
const insultBtn = document.querySelector('.insultBtn');
const buttons = document.querySelector('.buttons');

// toaster options
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

const myAvatar = 'https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50&eyebrows=variant01&eyes=variant26&mouth=variant23&skinColor=ecad80&hairColor=0e0e0e&hair=short16&glasses=variant01&glassesProbability=100'

var inputName = "";
var gender;

var author = [
    'tariq',
    'mohamed tariq',
    'mohamed'
  ]
let flag = 0;

var urlExtra = 'https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50';
var seed = '';
var hair = '';
var num;

var url = "https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50";

const earring = parseInt(Math.random() * 6);
// url += "&earrings=variant0" + earring + "&earringsProbability=100"; // To add earrings to the avatar
console.log(url);


// Adding event listener to the userNameInputTag that we ahve created
userName.addEventListener('keyup', () => {
    inputName = userName.value;
    console.log(inputName)
    var foundGender = "";
    fetch('https://api.genderize.io/?name=' + inputName)
    .then((res) => res.json())
    .then((data) => {
        foundGender = data.gender;
        gender = foundGender;
        if(author.includes(userName.value.toLowerCase().trim())){
            avatarImg.innerHTML = `
            <img class = 'avatarImg'
                src=${myAvatar}
                alt="avatar"
            />
            `
            flag = 1;
        }
        else if(inputName.length >= 3){
            insultBtn.style.display = 'inline';
            changeAvatar();
        }else{
            avatarImg.innerHTML = '';
            insultBtn.style.display = 'none';
        }
        // console.log(foundGender + gender);
    })
    console.log(url);
})

// Change the avatar
const changeAvatar = function(){
    seed = '&seed=' + userName.value;
    if(gender == 'male'){
        num = parseInt(Math.random() * 19);
        if(num==0) num=1;
        hair = '&hair=short' + ("0" + num).slice(-2);
    }
    if(gender == 'female'){
        num = parseInt(Math.random() * 26);
        if(num == 0) num = 1;
        hair = '&hair=long' + ("0" + num).slice(-2);
    }
    urlExtra = `${url}${seed}${hair}`
    console.log(urlExtra);
    avatarImg.innerHTML = `
    <img class = 'avatarImg'
        src=${urlExtra}
        alt="avatar"
    />
    `
}

// Dowmloading an image
const downloadBtn = document.querySelector('.downloadBtn');
downloadBtn.addEventListener('click', () => {
    console.log('clicked');
    const screenshotTarget = document.querySelector('.container');
    const avatarImg = document.querySelector('.avatarImg')
    buttons.style.display = 'none';
    htmlToImage.toPng(screenshotTarget)
    .then(function (dataUrl) {
        const link = document.createElement('a');
        console.log(dataUrl);
        link.href=dataUrl;
        link.download = "insult-avatar.png";
        link.click();
        link.remove();

    });
    toastr["success"]("This is the message", "Hello")
    console.log('returned')
    buttons.style.display = 'flex';
})

// Insult the person 
insultBtn.addEventListener('click', insult)
window.addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        e.preventDefault()
        insult();
    }
})

// Calling the insult function
function insult(){
    if(!userName.value){
        toastr["error"]("Please enter a name");
        return;
    }
    if(flag){
        flag = 0;
        toastr["info"]("Sorry folks but you cannot insult the owner 😜")
        return;
    }
    const heading = document.querySelector('.heading h1');
    var insult = document.querySelector('.insult');
    var insultainer = document.querySelector('.insultainer')
    console.log(insult)
    fetch('insults.json')
        .then(res => res.json())
        .then(data => {
            buttons.style.display = 'flex';
            console.log(data)
            const num = parseInt(Math.random() * data['insults'].length)
            console.log(num);
            heading.innerHTML = userName.value;
            insultainer.style.display = 'block';
            userName.style.display = 'none';
            insult.innerHTML = data['insults'][num];
            insultBtn.style.display = 'none';
            console.log(userName.value)
            console.log(data['insults'][num])
        })
}

// TODO:
// localStorage
// share


// npm i --save-dev parcel-bundler
// npm init
