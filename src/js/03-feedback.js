import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const inputDataRef = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateInputData();

function onFormInput(event) {
  inputDataRef[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputDataRef));
}

function onFormSubmit(event) {
  event.preventDefault();

  const inputData = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value,
  };
  console.log(inputData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateInputData() {
  const savedInputData = localStorage.getItem(STORAGE_KEY);

  if (savedInputData) {
    form.email.value = JSON.parse(savedInputData).email;
    form.message.value = JSON.parse(savedInputData).message;
    inputDataRef.email = JSON.parse(savedInputData).email;
    inputDataRef.message = JSON.parse(savedInputData).message;
  }
}
