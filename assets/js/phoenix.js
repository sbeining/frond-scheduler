const objectionSound = new Audio('../sfx/Phoenix - objection.mp3');
const holdItSound = new Audio('../sfx/Phoenix - Hold it.mp3');
const takeThatSound = new Audio('../sfx/Phoenix - takethat.mp3');

async function popupCharacter() {
  await animateCSS('#character', 'bounceInUp')
  document.querySelector('#character').classList.remove('invisible')
}

async function popoutCharacter() {
  await animateCSS('#character', 'bounceOutDown')
  document.querySelector('#character').classList.add('invisible')
  document.querySelector('#objection').classList.add('invisible')
  document.querySelector('#hold_it').classList.add('invisible')
  document.querySelector('#take_that').classList.add('invisible')
}

export async function objection() {
  await popupCharacter()
  document.querySelector('#objection').classList.remove('invisible')
  objectionSound.play();
  await animateCSS('#objection', 'shake')
  await sleep(2000);
  popoutCharacter()
}

export async function holdIt() {
  await popupCharacter()
  document.querySelector('#hold_it').classList.remove('invisible')
  holdItSound.play();
  await animateCSS('#hold_it', 'shake')
  await sleep(2000);
  popoutCharacter()
}

export async function takeThat() {
  await popupCharacter()
  document.querySelector('#take_that').classList.remove('invisible')
  let promise = takeThatSound.play();
  promise.catch(function(error) { console.error(error); });
  await animateCSS('#take_that', 'shake')
  await sleep(2000);
  popoutCharacter()
}

function animateCSS(element, animationName) {
  return new Promise((resolve, reject) => {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      resolve()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  })
}

function sleep(duration) {
  return new Promise(_ => setTimeout(_, duration));
}
