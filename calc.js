//selectory
const itemList = document.querySelector('.itemList');
const resultDiv = document.querySelector('.result');
const resultBtn = document.querySelector('.showResult');

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

//funkcje globalne
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
const removeItem = (btn) => {
    btn.parentElement.parentElement.remove();
};

//tworzenie ankiety
const surveyDiv = document.createElement('div');
const surveyColLeft = document.createElement('div');
const surveySelect = document.createElement('select');
surveySelect.innerHTML = "<option disabled selected value> --- wybierz produkt --- </option>";
productList.forEach(item => {
    const surveyOption = document.createElement('option');
    surveyOption.innerText = item.charAt(0).toUpperCase() + item.slice(1);
    surveyOption.setAttribute('value', `${item}`);
    surveyOption.setAttribute('id', `${productList.indexOf(item)}`);
    surveySelect.appendChild(surveyOption);
})
const surveyColMid = document.createElement('div');
const surveyAmount = document.createElement('input');
const surveyColRight = document.createElement('div');
const surveyAccept = document.createElement('button');
surveyAmount.setAttribute('maxlength', '6');
surveyAmount.setAttribute('placeholder', 'podaj ilość w g');
surveyAccept.innerText = "+";
surveyDiv.classList.add('surveyDiv');
surveyColLeft.classList.add('surveyColLeft');
surveyColMid.classList.add('surveyColMid');
surveyColRight.classList.add('surveyColRight');
surveyColLeft.appendChild(surveySelect);
surveyDiv.appendChild(surveyColLeft);
surveyColMid.appendChild(surveyAmount);
surveyDiv.appendChild(surveyColMid);
surveyColRight.appendChild(surveyAccept);
surveyDiv.appendChild(surveyColRight);
itemList.appendChild(surveyDiv);

//klasa dla kolejnych itemów z listy
//i jej instancja
class Survey{
    constructor(){
        this._product = "";
        this._amount = 0;
    }
}
const survey = new Survey();

surveySelect.addEventListener('change', e => {
    let choice = surveySelect.options[surveySelect.selectedIndex].id;
    survey._product = productList[choice];
})
surveyAmount.addEventListener('input', e => {
    survey._amount = Number(surveyAmount.value);
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
})
resultBtn.addEventListener('click', e => {
    if(!document.body.contains(document.querySelector('.itemDiv'))){
        e.preventDefault();
    } else {
        resultBtn.remove();
        const divs = document.querySelectorAll('.itemDiv');
        const tab = [];
        divs.forEach(node => {
            tab.push(node.getAttribute('value'));
        })
        console.log(tab);
        const jsons =  0;
        const kcal_amount = sumKcal('{"name": "pomarańcza", "amount": "5"}');
        const dispKcal = document.createElement('div');
        const kcal = document.createElement('p');
        const dispNutrients = document.createElement('div');
        const nutruents = document.createElement('ul');
        const nutrientsItem = document.createElement('li');
        dispKcal.classList.add('dispKcal');
        dispNutrients.classList.add('dispNutrients');
        kcal.innerText = "Ilość kcal w zestawie: " + kcal_amount;
        nutrientsItem.innerText = "Tłuszcze: ";
        dispKcal.appendChild(kcal);
        nutruents.appendChild(nutrientsItem);
        dispNutrients.appendChild(nutruents);
        resultDiv.appendChild(dispKcal);
        resultDiv.appendChild(dispNutrients);
    }
})

const sumKcal = (json) => {
    // wywołanie:     sumKcal('{"name": "pomidor", "amount": "6"}')
    let sum = 0;
    const obj = JSON.parse(json);
    const kcal = (o, name) => {
        if(o.name === name){
            return o['kcal'];
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
    sum = obj['amount'] * kcal(products, `${obj['name']}`);
    return sum;
}
