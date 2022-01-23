const box = document.querySelectorAll('.box > div')

const shakeButton = document.querySelector('.shake-btn')
const leaveButton = document.querySelector('.leave-btn')

// loading animation
const loadingCube = document.querySelectorAll('.loading')

// result container 
const result = document.querySelector('.result')
const resultCube = document.querySelectorAll('.result > div')

// board info
const betSize = document.querySelector('.bet-size')
const totalMoney = document.querySelector(".total-money")

// danger alert
const alertBoxContainer = document.querySelector('.alert-box-container')
const alertBoxText = document.querySelector('.alert-box-text')
const alertBox = document.querySelector('.alert-box')

const alertBoxAddMoneyButton = document.querySelector('.add-money-btn')
const alertBoxCloseButton = document.querySelector('.close-alert-box-btn')

const addMoneyBox = document.querySelector('.add-money-box')
const addMoneyBoxCloseButton = document.querySelector('.add-money-box > button')
const addMoneyBoxList = document.querySelectorAll('.add-money-box-list > li')

const increaseBetLevelBox = document.querySelector('.increase-bet-level-box')
const increaseBetLevelBoxCloseButton = document.querySelector('.increase-bet-level-box > button:first-of-type')
const increaseBetLevelBoxSubmitButton = document.querySelector('.increase-bet-level-box > button:last-of-type')
const increaseBetLevelBoxList = document.querySelectorAll('.increase-bet-level-box > ul > li')

const guideBox = document.querySelector('.guide-box')
const guideBoxCloseButton = document.querySelector('.guide-box > button')
const showGuideBoxButton = document.querySelector('.show-guide-box')

showGuideBoxButton.addEventListener('click', () => guideBox.style.display = 'flex')

guideBoxCloseButton.addEventListener('click', () => guideBox.style.display = 'none')

leaveButton.addEventListener('click', () => window.open('../index.html', "_self"))

alertBoxContainer.addEventListener('click', (e) => {
  if (e.target === alertBoxContainer) {
    alertBoxContainer.style.display = 'none'
    alertBox.style.display = 'none'
    increaseBetLevelBox.style.display = 'none'
    addMoneyBox.style.display = 'none'
  }
})

// alert box - add money button
alertBoxAddMoneyButton.addEventListener('click', () => {
  alertBox.style.display = 'none'
  addMoneyBox.style.display = 'flex'
})

alertBoxCloseButton.addEventListener('click', () => {
  alertBoxContainer.style.display = 'none';
  alertBox.style.display = 'none'
})

addMoneyBoxCloseButton.addEventListener('click', () => {
  alertBoxContainer.style.display = 'none';
  addMoneyBox.style.display = 'none'
})

// SELECTION CHECK =================================
var betLevel = 1       // store bet-size level
var CURRENT_BOX = null // store current selected box

box.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.getAttribute('select') === 'false')
      item.setAttribute('select', true)
    else
      item.setAttribute('select', false)
  })

  if (window.innerWidth > 768) {
    item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      CURRENT_BOX = e.currentTarget
      document.querySelector('.item-name').textContent = CURRENT_BOX.getAttribute('name')

      // display alert box
      alertBoxContainer.style.display = 'flex'
      alertBox.style.display = 'none'
      addMoneyBox.style.display = 'none'
      increaseBetLevelBox.style.display = 'flex'

      // display which bet level is selected at CURRENT BOX
      increaseBetLevelBoxList.forEach(item => item.setAttribute('selected', false))
      let level = parseInt(CURRENT_BOX.getAttribute('bet-level'))
      increaseBetLevelBoxList[level - 1].setAttribute('selected', true)
    })
  }
  else {
    item.addEventListener('dblclick', (e) => {
      CURRENT_BOX = e.currentTarget
      document.querySelector('.item-name').textContent = CURRENT_BOX.getAttribute('name')

      alertBoxContainer.style.display = 'flex'
      alertBox.style.display = 'none'
      addMoneyBox.style.display = 'none'
      increaseBetLevelBox.style.display = 'flex'

      // display which bet level is selected at CURRENT BOX
      increaseBetLevelBoxList.forEach(item => item.setAttribute('selected', false))
      let level = parseInt(CURRENT_BOX.getAttribute('bet-level'))
      increaseBetLevelBoxList[level - 1].setAttribute('selected', true)
    })
  }
})

increaseBetLevelBoxList.forEach(list => {
  list.addEventListener('click', () => {
    if (list.getAttribute('selected') === "true") {
      list.setAttribute('selected', false)
      betLevel = 1
    } else {
      increaseBetLevelBoxList.forEach(item => item.setAttribute('selected', false))
      list.setAttribute('selected', true)
      betLevel = parseInt(list.textContent.substring(1))
    }
    CURRENT_BOX.setAttribute('bet-level', betLevel)
    CURRENT_BOX.childNodes[1].textContent = (betLevel > 1) ? "x" + betLevel : ""
    CURRENT_BOX.childNodes[1].style.color = (betLevel === 10) ? "#ff3321" : "#0fc00f"
  })
})

increaseBetLevelBoxCloseButton.addEventListener('click', () => {
  alertBoxContainer.style.display = 'none'
  increaseBetLevelBox.style.display = 'none'
})

increaseBetLevelBoxSubmitButton.addEventListener('click', (e) => {
  e.preventDefault()
  alertBoxContainer.style.display = 'none'
  increaseBetLevelBox.style.display = 'none'
  CURRENT_BOX.setAttribute('select', true)
})

// SET USER ====================================================

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const BET_SIZE = parseInt(localStorage.getItem('mode')) || 5000
betSize.textContent = formatter.format(BET_SIZE)

const userNameDisplay = document.querySelector('.user')

const randomId = Math.floor(Math.random() * 10000)

let USERS = JSON.parse(localStorage.getItem('USERS'))

if (USERS === null || USERS.length === 0) {
  USERS = [{ name: `user${randomId}`, money: 100000 }]
  localStorage.setItem("USERS", JSON.stringify(USERS))
}

let currentName = localStorage.getItem('CURRENT_NAME')

if (currentName === null) {
  localStorage.setItem('CURRENT_NAME', `user${randomId}`)
  userNameDisplay.textContent = `user${randomId}`
} else {
  userNameDisplay.textContent = currentName
}

let currentUser = USERS.find(item => item.name === currentName) || USERS[0]

let TOTAL_MONEY = currentUser.money

totalMoney.textContent = formatter.format(TOTAL_MONEY);

// ADD-MONEY BOX =============================================
addMoneyBoxList.forEach(item => {
  item.addEventListener('click', () => {
    if (item === addMoneyBoxList[0]) TOTAL_MONEY += 10000
    if (item === addMoneyBoxList[1]) TOTAL_MONEY += 20000
    if (item === addMoneyBoxList[2]) TOTAL_MONEY += 50000
    if (item === addMoneyBoxList[3]) TOTAL_MONEY += 100000
    // hide add money box
    alertBoxContainer.style.display = 'none'
    addMoneyBox.style.display = 'none'
    // add money to current money
    currentUser.money = TOTAL_MONEY
    localStorage.setItem('USERS', JSON.stringify(USERS))
    totalMoney.textContent = formatter.format(TOTAL_MONEY);
  })
})


// ============================= GAME LOGIC ====================================

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const resultAlert = document.querySelector('.result-alert')

const ITEMS = [
  { name: "hươu", att: "../img/deer.png" },
  { name: "bầu", att: "../img/gourd.png" },
  { name: "gà", att: "../img/rooster.png" },
  { name: "cá", att: "../img/fish.png" },
  { name: "cua", att: "../img/crab.png" },
  { name: "tôm", att: "../img/shrimp.png" },
]

shakeButton.addEventListener('click', render)
function render() {
  // store selected button
  const filteredSelection
    = [...box]
      .filter(item => item.getAttribute('select') === 'true')
      .reduce((obj, item) => {
        let name = item.getAttribute('name')
        let betLevel = item.getAttribute('bet-level')
        obj[name] = { bet_level: betLevel, matched: false }
        return obj
      }, {})

  // calculate total bet
  const totalBet = Object.keys(filteredSelection).reduce((total, item) => {
    return total + +filteredSelection[item].bet_level
  }, 0)

  // check if enough money
  if (TOTAL_MONEY === 0 || parseInt(totalBet * BET_SIZE) > TOTAL_MONEY) {
    alertBoxText.textContent = "Không đủ tiền"
    alertBoxContainer.style.display = 'flex'
    alertBox.style.display = 'flex'
    alertBoxAddMoneyButton.style.display = 'flex'
    addMoneyBox.style.display = 'none'
    return
  } else if (totalBet === 0) {
    alertBoxText.textContent = "Hãy chọn ô muốn cược"
    alertBoxContainer.style.display = 'flex'
    alertBox.style.display = 'flex'
    alertBoxAddMoneyButton.style.display = 'none'
    return
  } else {
    // avoid clicking multiple times
    shakeButton.removeEventListener('click', render)
    // avoid clicking on boxes when SHAKING
    box.forEach(item => item.style.pointerEvents = 'none')
    // hide result alert
    resultAlert.style.webkitTransform = 'scale(0)'
    resultAlert.style.transform = 'scale(0)'
  }

  resultCube.forEach(item => item.style.display = 'none') // hide RESULT
  loadingCube.forEach(item => item.style.display = 'block') // loading animation

  setTimeout(() => {
    box.forEach(item => item.style.pointerEvents = 'all')
    shakeButton.addEventListener('click', render)
    loadingCube.forEach(item => item.style.display = 'none')
    resultAlert.style.webkitTransform = 'scale(1)'
    resultAlert.style.transform = 'scale(1)'

    // SET RANDOM ITEMS 
    const result_items = []
    for (let i = 0; i < 3; i++)
      result_items.push(ITEMS[randomNumber(0, 5)])

    // DISPLAY ITEMS
    resultCube.forEach((item, index) => item.childNodes[0].src = result_items[index].att)
    resultCube.forEach(item => {
      item.style.display = 'flex'
      item.style.rotate = randomNumber(-90, 90) + 'deg'
      item.style.webkitTransform = `rotate(${randomNumber(-90, 90)}deg)`
    })

    // FINAL RESULT =======================================
    const finalResult = result_items.reduce((resultObj, item) => {
      resultObj[item.name] = (resultObj[item.name] == null) ? 1 : resultObj[item.name] + 1
      return resultObj
    }, {})

    // CHECK RESULT =======================================
    for (key in filteredSelection)
      for (item_name in finalResult)
        if (key === item_name && filteredSelection[key].matched == false)
          filteredSelection[key].matched = true

    // CALCULATE MONEY =====================================
    let winning_money = 0
    let losing_money = 0
    for (key in filteredSelection)
      if (filteredSelection[key].matched === true)
        winning_money += parseInt(filteredSelection[key].bet_level * finalResult[key] * BET_SIZE)
      else
        losing_money += parseInt(filteredSelection[key].bet_level * BET_SIZE)

    TOTAL_MONEY += winning_money - losing_money
    totalMoney.textContent = formatter.format(TOTAL_MONEY)

    if (winning_money >= losing_money) {
      resultAlert.textContent = `+${formatter.format(+winning_money - +losing_money)}`
      resultAlert.style.background = '#3ecc79'
    }
    else {
      resultAlert.textContent = `-${formatter.format(+losing_money - +winning_money)}`
      resultAlert.style.background = '#ff6257'
    }

    // RESET AFTER 30SECS
    // setTimeout(() => {
    //   [...box].forEach(item => {
    //     item.setAttribute('select', false)
    //     item.setAttribute('bet-level', 1)
    //     item.childNodes[1].textContent = ""
    //     resultAlert.style.webkitTransform = 'scale(0)'
    //     resultAlert.style.transform = 'scale(0)'
    //   })
    // }, 30000)

    // SET USER ==============================================
    currentUser.money = TOTAL_MONEY
    localStorage.setItem('USERS', JSON.stringify(USERS))

  }, randomNumber(2, 8) * 1000)
}