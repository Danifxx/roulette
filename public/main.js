var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
let thumbDown = document.getElementsByClassName("fa-thumbs-down")
let complete = document.getElementsByClassName("fa-pencil-alt")
let bet = document.querySelector('.bet').value
let userBalance = 0
let casinoBalance = 0
let winBalance = 0
let lossBalance = 0
let colorChoice = ""
let winCount = 0
let lossCount = 0
let moneyExchanged = 0

document.querySelector('#magicReset').addEventListener('click', function(){
  fetch('cleanSlate',{
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      // 'winCount': 0,
      // 'lossCount': 0,
      // 'moneyExchanged': 0,
      // 'casinoBalance': 0,
      // 'yohannName': 'casino'
    })
  })
  .then((response) => {
    // if (response.ok) return response.json()
  })
})


document.querySelector('#red').addEventListener('click', function(){
  colorChoice = 'red'
  let bet = document.querySelector('.bet').value
  calculateuserBalance(bet)
  console.log('test',bet)
  console.log(colorChoice)
  fetch('play', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'casinoID': 'BobtheMan',
        'winCount': winCount,
        'lossCount': lossCount,
        'casinoBalance': casinoBalance
    })
  })
  .then((response) => {
  if (response.ok) return response.json()
  })
})

document.querySelector('#black').addEventListener('click', function(){
  colorChoice = 'black'
  let bet = document.querySelector('.bet').value
  calculateuserBalance(bet)
  console.log('test',bet)
  console.log(colorChoice)
  fetch('play', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'casinoID': 'BobtheMan',
        'winCount': winCount,
        'lossCount': lossCount,
        'casinoBalance': casinoBalance
    })
  })
  .then((response) => {
  if (response.ok) return response.json()
  })
})

document.querySelector('#green').addEventListener('click', function(){
  colorChoice = 'green'
  let bet = document.querySelector('.bet').value
  calculateuserBalance(bet)
  console.log('test',bet)
  console.log(colorChoice)
  fetch('play', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'casinoID': 'BobtheMan',
        'winCount': winCount,
        'lossCount': lossCount,
        'casinoBalance': casinoBalance
    })
  })
  .then((response) => {
  if (response.ok) return response.json()
  })
})

function multiplyBy10(bet){
  return bet * 10
}

function userBalanceMinusBet(bet){
  return userBalance - bet
}

function calculateuserBalance(bet){
  const outcome = winCheck()
  if (outcome === "loss"){
    userBalance = userBalanceMinusBet(bet)
    casinoBalance = userBalance*-1
  }else if (outcome === "win"){
    userBalance = userBalanceMinusBet(bet) + multiplyBy10(bet)
    casinoBalance = userBalance*-1
  }



  document.getElementById("amount").innerHTML = `${outcome} $${userBalance}.00`//template string to add $ sign and .00 to userBalance
}

function winCheck (){
  const spinResult = rouletteSpin()  //In order to return the results of a function, you need to call the function and make the return a variable in the function your working in.
  document.getElementById("reel-1").innerHTML = spinResult;
  if(spinResult === colorChoice){
    winCount +=1
    console.log('winCount',winCount)
    return "win"

  }else{
    lossCount +=1
    console.log('lossCount',lossCount)
    return "loss"
    }
}

function rouletteSpin(){
  let result = Math.random()
  if (result < .05){
    return "green"
  } else if (result < .55){
    return "red"
  } else if(result < 1){
    return "black"
  }
}


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(complete).forEach(function(element) {
      element.addEventListener('click', function(){
        const  customerName= this.parentNode.parentNode.childNodes[3].innerText
        console.log(customerName)
        const order = this.parentNode.parentNode.childNodes[7].innerText
        console.log(order);
        fetch('cafe', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'customerName':customerName,
            'order':order,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('/thumbDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const baristaName = this.parentNode.parentNode.childNodes[3].innerText
        console.log(baristaName)
        const order = this.parentNode.parentNode.childNodes[5].innerText
        const completed = this.parentNode.parentNode.childNodes[15].innerText
        fetch('cafe', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'baristaName': baristaName,
            'order'      : order,
            'completed': completed
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
