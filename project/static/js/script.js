const button = document.querySelector('.create-desk__button');
const popupWindow = document.querySelector('.create-desk__popup');

button.addEventListener('click', () => {
  popupWindow.classList.add('active');
})