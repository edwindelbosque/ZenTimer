const inputIntention = document.querySelector('#input-intention');
const inputMinutes = document.querySelector('#input-minutes');
const inputSeconds = document.querySelector('#input-seconds');
const buttonStudy = document.querySelector('#button-study');
const buttonMeditate = document.querySelector('#button-meditate');
const buttonExercise = document.querySelector('#button-exercise');
const buttonSubmit = document.querySelector('#button-submit');
const form = document.querySelector('form');

const handleFormButtons = event => {
  event.preventDefault(event);
  if (event.target.id === 'button-study') {
    console.log('study')
  } else if (event.target.id === 'button-meditate') {
    console.log('medi')
  } else if (event.target.id === 'button-exercise') {
    console.log('exer')
  } else if (event.target.id === 'button-submit') {
    console.log('submit')
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


form.addEventListener('click', handleFormButtons);
form.addEventListener('keyup', handleFormInputs);