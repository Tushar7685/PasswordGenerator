const inputslider = document.querySelector("[data-lengthslider]")
const lengthDisplay = document.querySelector("[data-length]")
const passworddisplay = document.querySelector("[data-password-display]")
const copyBtn = document.querySelector("[data-btn]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numberCheck = document.querySelector("#numbers")
const symbolCheck = document.querySelector("#symbols")
const indicator = document.querySelector("[data-indicator]")
const generatebtn = document.querySelector(".generate-button")
const allCheckbox = document.querySelectorAll("input[type=checkbox]")
const symbol = '~`!@#$%^&*()_-+=[]{}\|;":<>,./?'
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()

setIndicator("#CCC");
function handleSlider() {
    inputslider.value = passwordLength;
    lengthDisplay.innerText =passwordLength ;
    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateNumber() {
    return getRandomInteger(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRandomInteger(65, 91))
}

function generateSymbol() {
    const randNum = getRandomInteger(0, symbol.length);
    return symbol.charAt(randNum);
}

function calStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hassym=false;
if(uppercaseCheck.checked) hasUpper=true;
if(lowercaseCheck.checked) hasLower=true;
if(numberCheck.checked) hasNum=true;
if(symbolCheck.checked) hassym=true;

if(hasUpper && hasLower && (hasNum || hassym) && passwordLength>=8)
{
    setIndicator("#0f0");
}
else if((hasLower|| hasUpper)&& ( hasNum || hassym) && passwordLength>=6)
{
    setIndicator("#ff0");
}
else
{
    setIndicator("#f00")
}
    
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passworddisplay.value)
copyMsg.innerText="copied";

    }
    catch(e)
    {
copyMsg.innerText="Failed"
    }
    copyMsg.classList.add('active')

    setTimeout((()=>{
        copyMsg.classList.remove('active')
    }),2000)
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });
    if(passwordLength<checkCount)
        passwordLength=checkCount
    handleSlider();
}

allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)
});

inputslider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

// shuffle password code from CHATGPT

function shufflePassword(password) {
    // Convert the password string into an array of characters
    let passwordArray = password.split('');

    // Loop through the array starting from the end
    for (let i = passwordArray.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap characters at index i and j
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    // Convert the shuffled array back to a string and return it
    return passwordArray.join('');
}

copyBtn.addEventListener('click',()=>{
    if(passworddisplay.value)
    {
        copyContent();
    }
})

generatebtn.addEventListener('click',()=>{
if(checkCount<=0) return;
if(passwordLength<checkCount)
        passwordLength=checkCount
    handleSlider();
password='';
let funarr=[];

if(uppercaseCheck.checked)
{
funarr.push(generateUppercase)
}

if(lowercaseCheck.checked)
{
    funarr.push(generateLowercase)
}
if(numberCheck.checked)
{
    funarr.push(generateNumber)
}
if(symbolCheck.checked)
{
    funarr.push(generateSymbol)
}

for(let i=0;i<funarr.length;i++){
    password+=funarr[i]();

}

for(let i=0;i<passwordLength-funarr.length;i++){
    let randIndex=getRandomInteger(0,funarr.length)
    password+=funarr[randIndex]();
}
password=shufflePassword(password);
passworddisplay.value=password;
calStrength();
})

