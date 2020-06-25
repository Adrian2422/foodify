//selectory
const surveySelect = document.querySelector('.surveyColLeft select');
const surveyAccept = document.querySelector('.surveyColRight button');
const surveyAmount = document.querySelector('.surveyColMid input');
const resultDiv = document.querySelector('.result');
const resultBtn = document.querySelector('.showResult');
const itemList = document.querySelector('.itemList');
const personalBtn = document.querySelector('.personalBtn');

//flaga ilości itemów
let itemCount = 0;

//obiekt zawierający produkty
const products = {
    rice: [
        {
            id: 0,
            name: "arborio",
            kcal: 130,
        },
        {
            id: 1,
            name: "basmanti",
            kcal: 130,
        },
        {
            id: 2,
            name: "brązowy",
            kcal: 110.9,
        },
        {
            id: 3,
            name: "kleisty",
            kcal: 97,
        },
    ],
    vegetables: [
        {
            id: 4,
            name: "kalafior",
            kcal: 24.9,
        },
        {
            id: 5,
            name: "pomidor",
            kcal: 18,
        },
        {
            id: 6,
            name: "ogórek",
            kcal: 15,
        },
    ],
    fruits: [
        {
            id: 7,
            name: "jabłko",
            kcal: 52,
        },
        {
            id: 8,
            name: "pomarańcza",
            kcal: 49,
        }
    ],
    drinks: [
        {
            id: 9,
            name: "woda",
            kcal: 0,
        },
        {
            id: 10,
            name: "czerwone wino",
            kcal: 85,
        },
        {
            id: 11,
            name: "białe wino",
            kcal: 82,
        },
        {
            id: 12,
            name: "piwo",
            kcal: 43,
        },
        {
            id: 13,
            name: "napój gazowany",
            kcal: 42,
        },
    ],
    meat: [
        {
            id: 14,
            name: "filet z piersi kurczaka",
            kcal: 249,
        },
        {
            id: 15,
            name: "kotlet schabowy",
            kcal: 242.1,
        },
        {
            id: 16,
            name: "stek wołowy",
            kcal: 270.5,
        },
    ]
}

//funkcje
const onlyNumInput = (target) => {
    target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}
const getNames = (el) => {
    const elements = [];
    Object.keys(el).forEach(item => {
        Object.keys(el[item]).forEach(deepItem => {
            elements.push(el[item][deepItem].name);
        })
    })
    return elements;
}
const iterate = (obj, key) => {
    let result;
    for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (property === key) {
                return obj[key]; // returns the value
            }
            else if (typeof obj[property] === "object") {
                // in case it is an object
                result = iterate(obj[property], key);

                if (typeof result !== "undefined") {
                    return result;
                }
            }
        }
    }
}
const productList = getNames(products);
const sumKcal = (nodes) => {
    const dispKcal = document.querySelector('.dispKcal');
    if(dispKcal !== null){
        dispKcal.remove();
    }
    // wywołanie:     sumKcal('{"name": "pomidor", "amount": "6"}')
    let sum = 0;
    nodes.forEach(json => {
        const obj = JSON.parse(json);
        const kcal = (o, name) => {
            if(o.name === name){
                if(o['kcal'] === 0){
                }
                return o['kcal'].toString(10);
            }
            let result;
            let p;
            for(p in o){
                if(o.hasOwnProperty(p) && typeof o[p] === 'object'){
                    result = kcal(o[p], name);
                    if(result){
                        return result;
                    }
                }
            }
            return result;
        }
        sum += obj['amount'] * (kcal(products, `${obj['name']}`))/100;
    })
    return sum.toFixed();
}
const calcPersonalKcal = () => {
    const gender = document.querySelector('input[name=gender]:checked').id;
    const age = document.querySelector('#age').value;
    const height = document.querySelector('#height').value;
    const weight = document.querySelector('#weight').value;
    const activitySelect = document.querySelector('#activity');
    let activity = activitySelect.options[activitySelect.selectedIndex].value;
    const activityTab = [1, 1.10, 1.15, 1.2];
    if(gender === 'man'){
        return ((9.99 * weight) + (6.25 * height) - (4.92 * age) + 5) * activityTab[activity];
    } else {
        return ((9.99 * weight) + (6.25 * height) - (4.92 * age) - 161) * activityTab[activity];
    }
}
const fancyDisplay = (num, selector, str) => {
    const par = document.querySelector(selector);
    par.innerText = "0";
    let actual = 0;

    const time = setInterval(() =>{
        if(num > 1000){
            actual += 50;
        } else if (num > 100){
            actual += 10;
        } else {
            actual++;
        }
        par.innerText = `${str}${actual}`;

        if(actual >= num){
            clearInterval(time);
            par.innerText = `${str}${num}`;
            createVerdictHtml();
        }
    }, 10);
}
const getNodesValues = () => {
    const divs = document.querySelectorAll('.itemDiv');
    const tab = [];
    divs.forEach(node => {
        tab.push(node.getAttribute('value'));
    })
    return tab;
}
const removeItem = (btn) => {
    btn.parentElement.parentElement.remove();
};
const createResultHtml = () => {
    if(document.body.contains(document.querySelector('.resetBtn'))){
        (document.querySelector('.resetBtn')).remove();
    }
    resultBtn.remove();
    const kcal_amount = sumKcal(getNodesValues());
    const dispKcal = document.createElement('div');
    const productsSetKcal = document.createElement('p');
    const resetBtn = document.createElement('button');
    resetBtn.classList.add('resetBtn');
    resetBtn.setAttribute('id', 'resetBtn');
    dispKcal.classList.add('dispKcal');
    productsSetKcal.classList.add('productsSetKcal');
    resetBtn.innerText = "Oblicz jeszcze raz";
    dispKcal.appendChild(productsSetKcal);
    resultDiv.appendChild(dispKcal);
    resultDiv.appendChild(resetBtn);
    fancyDisplay(kcal_amount, '.dispKcal p', 'Ilość kcal w zestawie: ');
}
const createVerdictHtml = () => {
    if(document.body.contains(document.querySelector('.dispKcal'))) {
        const dispKcal = document.querySelector('.dispKcal');
        const verdict = document.createElement('p');
        verdict.classList.add('verdict');
        dispKcal.appendChild(verdict);
        const personalKcal = document.querySelector('.personalKcal').innerText;
        const productsSetKcal = document.querySelector('.productsSetKcal').innerText;
        const kcalRatio = ((productsSetKcal.split(': ')[1]) / (personalKcal.split(': ')[1]) * 100).toFixed();
        const kcalDiff = ((personalKcal.split(': ')[1]) - (productsSetKcal.split(': ')[1])).toFixed();
        if(kcalRatio < 95){
            verdict.innerText = `Dzienne spożycie mniejsze o ${kcalDiff} od zalecanego`;
        } else if(kcalRatio > 100){
            verdict.innerText = `Dzienne spożycie większe o ${Math.abs(kcalDiff)} od zalecanego`;
        }
    }
}

//klasa dla kolejnych itemów z listy
//i jej instancja
class Survey{
    constructor(){
        this._product = "";
        this._amount = 0;
    }
}
const survey = new Survey();

//listenery
surveySelect.addEventListener('change', e => {
    let choice = surveySelect.options[surveySelect.selectedIndex].id;
    survey._product = productList[choice];
})
surveyAccept.addEventListener('click', e => {
    if(survey._product === '' || surveyAmount.value === ''){
         e.preventDefault();
    } else {
        if(document.body.contains(document.querySelector('.itemDiv'))){

        }
        const itemDiv = document.createElement('div');
        const itemColLeft = document.createElement('div');
        const itemTitle = document.createElement('p');
        const itemColMid = document.createElement('div');
        const itemDetails = document.createElement('div');
        const itemColRight = document.createElement('div');
        const removeItemBtn = document.createElement('button');
        itemTitle.innerText = survey._product.charAt(0).toUpperCase() + survey._product.slice(1);
        itemDetails.innerText = `${survey._amount}g`;
        removeItemBtn.innerText = 'x';
        itemDiv.setAttribute('id', `item${itemCount}`);
        itemDiv.setAttribute('value', `{"name": "${survey._product}", "amount": "${survey._amount}"}`);
        removeItemBtn.setAttribute('onclick', `removeItem(this)`);
        itemCount++;
        itemColLeft.classList.add('itemColLeft');
        itemColMid.classList.add('itemColMid');
        itemColRight.classList.add('itemColRight');
        itemDiv.classList.add('itemDiv');
        itemTitle.classList.add('itemTitle');
        itemDetails.classList.add('itemDetails');
        removeItemBtn.classList.add('removeItemBtn');
        itemColLeft.appendChild(itemTitle);
        itemColMid.appendChild(itemDetails);
        itemColRight.appendChild(removeItemBtn);
        itemDiv.appendChild(itemColLeft);
        itemDiv.appendChild(itemColMid);
        itemDiv.appendChild(itemColRight);
        itemList.appendChild(itemDiv);
        surveyAmount.value = '';
    }
})
surveyAmount.addEventListener('input', e => {
    onlyNumInput(surveyAmount);
    survey._amount = Number(surveyAmount.value);
})
personalBtn.addEventListener('click', e =>{
    if(document.querySelector('#age').value === ""){
        alert('Proszę podać wiek');
    } else if (document.querySelector('#height').value === ""){
        alert('Proszę podać wzrost');
    } else if(document.querySelector('#weight').value === ""){
        alert('Proszę podać wagę');
    } else if(document.querySelector('#activity').options[document.querySelector('#activity').selectedIndex].value === "0"){
        alert('Proszę wybrać rodzaj aktywności');
    } else {
        if(document.body.contains(document.querySelector('.personalDiv'))){
            const personalDiv = document.querySelector('.personalDiv');
            personalDiv.remove();
        }
        const personalDiv = document.createElement('div');
        const personalKcal = document.createElement('p');
        personalKcal.classList.add('personalKcal');
        personalDiv.classList.add('personalDiv');
        personalDiv.appendChild(personalKcal);
        resultDiv.prepend(personalDiv);
        fancyDisplay(calcPersonalKcal().toFixed(), '.personalKcal', 'Twoje zapotrzebowanie na kalorie wynosi: ');
    }
})
resultBtn.addEventListener('click', e => {
    if(!document.body.contains(document.querySelector('.itemDiv'))){
        e.preventDefault();
    } else {
        createResultHtml();
    }
})
document.addEventListener('click', e => {
    if(e.target && e.target.id === 'resetBtn'){
        createResultHtml();
    }
})
window.addEventListener('load', e => {
    //tworzenie opcji ankiet
    productList.forEach(item => {
        const surveyOption = document.createElement('option');
        surveyOption.innerText = item.charAt(0).toUpperCase() + item.slice(1);
        surveyOption.setAttribute('value', `${item}`);
        surveyOption.setAttribute('id', `${productList.indexOf(item)}`);
        surveySelect.appendChild(surveyOption);
    })
})