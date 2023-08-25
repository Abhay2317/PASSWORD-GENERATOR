const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const symbolsChack =  document.querySelector("#symbols");
const numberscheck = document.querySelector("#numbers");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';



let password = "";
let passwordLength=10;
let checkCount=0;
handleSlider();
// ste strength circle color to grey


//set passwordLength
 

function handleSlider() {
    inputSlider.value =passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max -min) +"% 100%" )
}

function setIndicator(color) {
    indicator.Style.backgroundcolor =color;
    indicator.Style.boxShadow =`0px 0px 12px 1px ${color}`;
} 


function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max-min)) +min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
 return String.fromCharCode(getRndInteger(97,123))   
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91))   
   }

   function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
   }

   function calcsStrength(){
    let hasUpper =false;
    let hasLower =false;
    let hasNum =false;
    let hasSym =false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numberscheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) && 
        (hasNum || hasSym) &&
         passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
   }

    async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText ="faield";
    }

    copyMsg.classList.add("active");

     setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

   }

   function shufflePassword(array) {

    for ( let i = array.length -1; i > 0 ;i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[i];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el) => (str += el));
    return str;
   }

   function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if( checkbox.checked)
          checkCount++;
    });


 if(passwordLength < checkCount ) {
    passwordLength = checkCount;
    handleSlider();
   } 
 }

  allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});


   inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
   }) ;


   copyMsg.addEventListener('click' , () => {
    if(passwordDisplay.value)
    copyContent();
   }) ;

   generateBtn.addEventListener('click',() =>{


     if( checkCount == 0) 
       return;

 if(passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
 }


 console.log("starting the Journey");
 password="";

// let's put the stuff mentioned by checkboxes

 // if(uppercaseCheck.checked) {
 //    password <= generateUpperCase();
 // }

 // if(lowercaseCheck.checked) {
 //    password <= generateLowerCase();
 // }

 // if(numberscheck.checked) {
 //    password <= generatenumber();
 // }

 // if(symbolsCheck.checked) {
 //    password <= generateSymbol();
 // }


     let funArr = [];

 if(uppercaseCheck.checked) 
     funArr.push(generateUpperCase);

 if(lowercaseCheck.checked) 
    funArr.push(generateLowerCase);

 if(numberscheck.checked) 
    funArr.push(generateRandomNumber);

 if(symbolsChack.checked) 
    funArr.push(generateSymbol);
 
 //compulsory addition

 for(let i=0;i<funArr.length; i++){
    password +=funArr[i]();
 }
 console.log("compulsory addition done");

 //reaming addition
 for(let i=0; i<passwordLength-funArr.length; i++) {
    let randIndex = getRndInteger(0 , funArr.length);
    console.log("randIndex" + randIndex);
    password += funArr[randIndex]();
 }
 console.log("Reamining addition done"); 

 //shuffle the password
 password =shufflePassword(Array.from(password));
 console.log("suffling done");
 //show the password
 passwordDisplay.value =password;
 console.log("UI addition done")
 //calculate strength
 calcsStrength();

   });