//selectory
const itemList = document.querySelector('.itemList');

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
    ]
}

//klasa dla kolejnych itemów z listy
class Survey{
    constructor(){
        this._product = "";
        this._amount = 0;
    }

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
    const productList = getNames(products);

    const surveyDiv = document.createElement('div');
    const surveyColLeft = document.createElement('div');
    const surveySelect = document.createElement('select');
    surveySelect.innerHTML = "<option disabled selected value> --- wybierz produkt --- </option>";
    productList.forEach(item => {
        const surveyOption = document.createElement('option');
        surveyOption.innerText = item;
        surveyOption.setAttribute('value', `${item}`);
        surveyOption.setAttribute('id', `${productList.indexOf(item)}`)
        surveySelect.appendChild(surveyOption);
    })
    const surveyColMid = document.createElement('div');
    const surveyAmount = document.createElement('input');
    const surveyColRight = document.createElement('div');
    const surveyAccept = document.createElement('button');
    surveyAmount.setAttribute('placeholder', 'podaj ilość w g');
    surveyAccept.innerText = "+";
    surveyDiv.classList.add('surveyDiv');
    surveyColLeft.classList.add('surveyCols');
    surveyColMid.classList.add('surveyCols');
    surveyColRight.classList.add('surveyCols');
    surveyColLeft.appendChild(surveySelect);
    surveyDiv.appendChild(surveyColLeft);
    surveyColMid.appendChild(surveyAmount);
    surveyDiv.appendChild(surveyColMid);
    surveyColRight.appendChild(surveyAccept);
    surveyDiv.appendChild(surveyColRight);
    itemList.appendChild(surveyDiv);

    const survey = new Survey();
    surveySelect.addEventListener('change', e => {
        let choice = surveySelect.options[surveySelect.selectedIndex].id;
        survey._product = productList[choice];
    })
    surveyAmount.addEventListener('input', e => {
        survey._amount = Number(surveyAmount.value);
    })

    surveyAccept.addEventListener('click', e => {
        const itemDiv = document.createElement('div');
        const itemTitle = document.createElement('p');
        const itemDetails = document.createElement('div');
        const removeItemBtn = document.createElement('button');
        removeItemBtn.addEventListener('click', removeEventHandler, false);
        itemTitle.innerText = survey._product;
        itemDetails.innerText = `${survey._amount}g`;
        removeItemBtn.innerText = 'X';
        itemDiv.setAttribute('id', `item${itemCount}`);
        itemCount++;
        itemDiv.classList.add('itemDiv');
        itemTitle.classList.add('itemTitle');
        itemDetails.classList.add('itemDetails');
        removeItemBtn.classList.add('removeItemBtn');
        itemDiv.appendChild(itemTitle);
        itemDiv.appendChild(itemDetails);
        itemDiv.appendChild(removeItemBtn);
        itemList.appendChild(itemDiv);
    })

    const removeItem = (itemId) => {
        const element = document.querySelector(`#${itemId}`);
            element.parentNode.removeChild(element);
    }

    const removeEventHandler = () => {
        removeItem(document.querySelector('.removeItemBtn').parentElement.id)
    }