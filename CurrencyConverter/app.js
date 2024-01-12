const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".optionContainer select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(".fromContainer select");
const toCurr = document.querySelector(".toContainer select");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(codes in countryList){
        let newOption=document.createElement("option");
        newOption.innerHTML=codes;
        newOption.value=codes;
        if (select.name === "from" && codes === "USD") {
            newOption.selected = "selected";
          } else if (select.name === "to" && codes === "INR") {
            newOption.selected = "selected";
          }
        select.append(newOption);  
    }
    select.addEventListener("click",(e)=>{
        updateFlag(e.target);
    })
}
const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".inputContainer input");
    let amtVal=amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
const updateFlag=(e)=>{
    let currCode=e.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=e.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
  });