// selektory
const page = document.querySelector('.appChoice');
// funkcje
const welcomeMessage = () => {
    const page = document.querySelector('.main');
    const maskDiv = document.createElement('div');
    const welcomeDiv = document.createElement('div');
    const welcomeTitle = document.createElement('p');
    const welcomeMessage = document.createElement('p');
    const closeBtn = document.createElement('button');
    welcomeTitle.innerText = "Witaj w aplikacji Foodify!"
    welcomeMessage.innerText = "Wybierz interesujące Ciebie zadanie."
    maskDiv.classList.add('maskDiv');
    welcomeDiv.classList.add('welcomeDiv');
    welcomeTitle.classList.add('welcomeTitle');
    welcomeMessage.classList.add('welcomeMessage');
    closeBtn.classList.add('closeBtn');
    closeBtn.innerText = "Cześć!";
    welcomeDiv.appendChild(welcomeTitle);
    welcomeDiv.appendChild(welcomeMessage);
    welcomeDiv.appendChild(closeBtn);
    maskDiv.appendChild(welcomeDiv)
    page.appendChild(maskDiv);
    closeBtn.addEventListener('click', e =>{
        maskDiv.remove();
    })
}
// listenery
window.onload = () => {
    welcomeMessage();
};
