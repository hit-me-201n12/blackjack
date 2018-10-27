'use strict'
//let log = console.log
window.addEventListener('keypress', (e) => {
  let char = e.char || e.charCode || e.which
  if (char === 32) {
    // function call back playerHit()
    log('hit me')
  } else if (char === 13) {
    // function call back playerStand()
    log('stand')
  }
})
