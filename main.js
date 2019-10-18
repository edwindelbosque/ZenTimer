const inputIntention = document.querySelector('#input-intention');
const inputMinutes = document.querySelector('#input-minutes');
const inputSeconds = document.querySelector('#input-seconds');
const buttonStudy = document.querySelector('#button-study');
const buttonMeditate = document.querySelector('#button-meditate');
const buttonExercise = document.querySelector('#button-exercise');
const buttonSubmit = document.querySelector('#button-submit');
// const buttonStartTimer = document.querySelector('#button-start-timer');
const form = document.querySelector('form');
const formData = {
  intention: undefined,
  category: undefined,
  minutes: undefined,
  seconds: undefined
};

const submitForm = event => {
  if (inputIntention.value && inputMinutes.value && inputSeconds.value && formData.category) {
    formData.intention = inputIntention.value;
    formData.minutes = parseInt(inputMinutes.value);
    formData.seconds = parseInt(inputSeconds.value);
    toggleForm();
    // clearForm(event);
  }
}

const clearForm = event => {
  // const buttons = [buttonStudy, buttonMeditate, buttonExercise];
  // const formElements = [inputIntention, inputMinutes, inputSeconds];
  const formKeys = Object.keys(formData);
  // buttons.forEach(button => button.classList.remove("active"));
  // formElements.forEach(element => element.value = '');
  formKeys.forEach(key => formData[key] = undefined);
}

const toggleForm = () => {
  const { intention, minutes, seconds } = formData;
  const container = document.querySelector('form');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.classList.remove('form-section')
  container.classList.add('timer-section')
  container.innerHTML = `
  <h5>${intention}</h5>
  <h6 id="timer">${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}</h6>
  <h4 id="button-start-timer">START</h4>
  `
}

const startTimer = () => {
  timerNode = document.querySelector('#timer')
  formData.seconds--;
  if (formData.seconds >= 0) {
    setTimeout(() => {
      console.log(formData.seconds);
      timerNode.innerText = `${formData.minutes} : ${formData.seconds < 10 ? `0${formData.seconds}` : formData.seconds}`;
      startTimer();
    }, 1000)
  } else if (formData.minutes > 0) {
    formData.minutes--;
    formData.seconds = 60;
    startTimer();
  } else {
    setTimeout(() => {
      stopTimer();
    }, 1500)
  }
}

const stopTimer = () => {
  console.log('sup');
}

const handleFormButtons = event => {
  event.preventDefault(event);
  if (event.target.id === 'button-study') {
    toggleButton(event);
  } else if (event.target.id === 'button-meditate') {
    toggleButton(event);
  } else if (event.target.id === 'button-exercise') {
    toggleButton(event);
  } else if (event.target.id === 'button-submit') {
    submitForm(event);
  } else if (event.target.id === 'button-start-timer') {
    startTimer();
  }
}

const handleFormInputs = event => {
  event.preventDefault(event);
  if (event.target.id === 'input-intention') {
    console.log(event.target.value)
  } else if (event.target.id === 'input-minutes') {
    console.log(event.target.value)
  } else if (event.target.id === 'input-seconds') {
    console.log(event.target.value)
  }
}

const toggleButton = event => {
  buttonStudy.classList.remove("active");
  buttonMeditate.classList.remove("active");
  buttonExercise.classList.remove("active");
  event.target.classList.add("active");
  formData.category = event.target.value;
}

form.addEventListener('click', handleFormButtons);
form.addEventListener('keyup', handleFormInputs);