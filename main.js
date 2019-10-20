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
  seconds: undefined,
  initialTime: undefined
};

const submitForm = event => {
  if (formData.intention && formData.minutes && formData.seconds && formData.category) {
    const mins = parseInt(formData.minutes);
    const secs = parseInt(formData.seconds);
    formData.minutes = parseInt(formData.minutes);
    formData.seconds = parseInt(formData.seconds);
    formData.initialTime = { mins, secs }
    toggleForm();
  }
}

const clearForm = event => {
  const formElements = [inputIntention, inputMinutes, inputSeconds];
  const formKeys = Object.keys(formData);
  formElements.forEach(element => element.value = '');
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
  const container = document.querySelector('form');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.classList.add('form-section')
  container.classList.remove('timer-section')
  appendToHistory();
  clearForm(event);
  container.innerHTML = `
  <h3>Select a category</h3>
  <section class="categories">
    <button id="button-study" class="inactive" value="study">
      <img src="assets/study.svg" class="button-icon" />
      Study
    </button>
    <button id="button-meditate" class="inactive" value="meditate">
      <img src="assets/meditate.svg" class="button-icon" />
      Meditate
    </button>
    <button id="button-exercise" class="inactive" value="exercise">
      <img src="assets/exercise.svg" class="button-icon" />
      Exercise
    </button>
  </section>
  <h3>What would you like to accomplish during this time?</h3>
  <input id="input-intention" />
  <div class="timer-inputs-section">
    <div>
      <h3>Minutes</h3>
      <input id="input-minutes" type="number" />
    </div>
    <div>
      <h3>Seconds</h3>
      <input id="input-seconds" type="number" />
    </div>
  </div>
  <div class="form-button-container">
    <button class="start-button" id="button-submit">START ACTIVITY</button>
  </div>
  `
}

const appendToHistory = () => {
  const { intention, category, initialTime } = formData;
  const { mins, secs } = initialTime;
  document.querySelector('#card-container').insertAdjacentHTML('afterbegin', `
  <div class="card">
          <div>
            <h3>${category}</h3>
            <p>${mins}:${secs < 10 ? `0${secs}` : secs} mins</p>
            <p>${intention}</p>
          </div>
          <div>
            <div class="colored-bar"></div>
          </div>
        </div>
  `)
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
    formData.intention = event.target.value
  } else if (event.target.id === 'input-minutes') {
    formData.minutes = event.target.value
  } else if (event.target.id === 'input-seconds') {
    formData.seconds = event.target.value
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