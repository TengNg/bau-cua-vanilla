const button = document.querySelectorAll('.button-div > button')
const playButton_InputName = document.querySelector('.play-btn-1')
const playButton_Imediate = document.querySelector('.play-btn-2')

const alertBoxContainer = document.querySelector('.alert-box-container')
const alertBoxButton = document.querySelector('.close-alert-box-btn')

const userInputContainer = document.querySelector('.user-input-container')
const userInputCloseButton = document.querySelector('.close-user-input-btn')
const userInputSubmitButton = document.querySelector('.form-submit-btn')
const userName = document.querySelector('.user-input > form > input')

userInputCloseButton.addEventListener('click', (e) => {
  e.preventDefault()
  userInputContainer.style.display = 'none'
})

alertBoxButton.addEventListener('click', () => alertBoxContainer.style.display = 'none')

let modeSelected = false
let selectedButton = null
button.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    let currentButton = e.target
    selectedButton = currentButton
    if (currentButton.getAttribute('select') === "false") {
      button.forEach(item => item.setAttribute('select', false))
      currentButton.setAttribute('select', true)
      modeSelected = true
    } else {
      item.setAttribute('select', false)
      modeSelected = false
    }
  })
})

// **************************************************************************** //

// USER LIST BUTTON //
const openUserSelectionButton = document.querySelector('.current-user-selection-btn')
const currentUserSelection = document.querySelector('.current-user-selection')
const currentUserSelectionCloseButton = document.querySelector('.user-list-container > button')
const currentUserList = document.querySelector('.user-list')
const currentUserListText = document.querySelector('.user-list-container > p')

// OPEN STORED-USER LIST //
openUserSelectionButton.addEventListener('mousedown', () => openUserSelectionButton.classList.add('clicked'))
openUserSelectionButton.addEventListener('mouseleave', () => openUserSelectionButton.classList.remove('clicked'))
openUserSelectionButton.addEventListener('mouseup', () => {
  openUserSelectionButton.classList.remove('clicked')
  currentUserSelection.style.display = 'flex'
})
currentUserSelectionCloseButton.addEventListener('click', () => currentUserSelection.style.display = 'none')

// PLAY BUTTONS //
buttonOnClickEffect(playButton_Imediate)
buttonOnClickEffect(playButton_InputName)
function buttonOnClickEffect(button) {
  button.addEventListener('mouseleave', () => button.setAttribute('clicked', false))
  button.addEventListener('mousedown', () => button.setAttribute('clicked', true))
}


// ======== SET USERS ======== //
const USERS = JSON.parse(localStorage.getItem('USERS')) || []

playButton_Imediate.addEventListener('mouseup', () => {
  if (modeSelected == true) {
    let money = selectedButton.textContent
    money = money.slice(1)
    localStorage.setItem('mode', money)
  }
  if (USERS.length > 0)
    localStorage.setItem('CURRENT_NAME', USERS[0].name)
  else
    localStorage.removeItem('CURRENT_NAME')
  window.open('gameplay/gameplay.html', "_self")
})

playButton_InputName.addEventListener('mouseup', () => {
  userInputContainer.style.display = 'flex'
  userInputSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (userName.value === "")
      return

    // user name
    let user_name = (userName.value).trim()

    // user money
    const default_bet_size = 5000
    let money = default_bet_size

    if (modeSelected) {
      money = selectedButton.textContent
      money = money.slice(1)
    }

    // set mode
    localStorage.setItem('mode', money)

    // set current user
    const currentUser = {
      name: user_name,
      money: 100000
    }

    let checkName = USERS.some(item => item.name == user_name)
    if (checkName === false)
      USERS.unshift(currentUser)

    USERS.splice(8) // store max 8 users

    localStorage.setItem('USERS', JSON.stringify(USERS))
    localStorage.setItem('CURRENT_NAME', user_name)

    window.open('./gameplay/gameplay.html', "_self")
  })
})

if (USERS.length === 0) {
  currentUserListText.innerHTML = 'Không có người chơi nào được lưu'
} else {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // display list
  currentUserList.innerHTML =
    USERS.map(item => {
      return `
      <div class='user'>
        <li>
          <span class='user-name'>${item.name}</span>:
          <span class='user-money'>${formatter.format(item.money)}</span>
        </li>
        <button><i class="far fa-trash-alt"></i></button>
      </div>
      `
    }).join('')

  const userLi = document.querySelectorAll('.user-list > .user > li')
  userLi.forEach(item => {
    item.addEventListener('click', (e) => {
      let user = e.currentTarget
      if (modeSelected == true) {
        let money = selectedButton.textContent
        money = money.slice(1)
        localStorage.setItem('mode', money)
      }
      localStorage.setItem('CURRENT_NAME', user.childNodes[1].textContent)
      window.open('./gameplay/gameplay.html', "_self")
    })
  })

  const removeUserButton = document.querySelectorAll('.user-list > .user > button')
  removeUserButton.forEach(item => {
    item.addEventListener('click', (e) => {
      let currentButton = e.currentTarget
      let currentUser = currentButton.parentElement
      let index = [...currentUserList.children].indexOf(currentUser)
      currentUserList.removeChild(currentUser)
      USERS.splice(index, 1)
      if (USERS.length === 0)
        currentUserListText.innerHTML = 'Không có người chơi nào được lưu'
      localStorage.setItem('USERS', JSON.stringify(USERS))
      localStorage.removeItem('CURRENT_NAME')
    })
  })
}

// GUIDE BOX
const showGuideBoxButton = document.querySelector('.show-guide-btn')
const guideBox = document.querySelector('.guide-box')
const guideBoxCloseButotn = document.querySelector('.guide-box > button')
showGuideBoxButton.addEventListener('click', () => guideBox.style.display = 'flex')
guideBoxCloseButotn.addEventListener('click', () => guideBox.style.display = 'none')