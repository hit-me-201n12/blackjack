'use strict'
// document.getElementById('portrait1').height = 110
// document.getElementById('portrait1').style.margin = '11px 6px 3px 6px'
// document.getElementById('portrait1').style.position = 'relative'
// document.getElementById('portrait1').style.float = 'left'
// //
// document.getElementById('portrait2').height = 110
// document.getElementById('portrait2').style.margin = '11px 6px 3px 6px'
// document.getElementById('portrait2').style.position = 'relative'
// document.getElementById('portrait2').style.float = 'left'
// //
// document.getElementById('portrait3').height = 110
// document.getElementById('portrait3').style.margin = '11px 6px 3px 6px'
// document.getElementById('portrait3').style.position = 'relative'
// document.getElementById('portrait3').style.float = 'left'
// //
// document.getElementById('portrait4').height = 110
// document.getElementById('portrait4').style.margin = '11px 6px 3px 6px'
// document.getElementById('portrait4').style.position = 'relative'
// document.getElementById('portrait4').style.float = 'left'
//
var imageItems = document.querySelectorAll('img.profile')
console.log(imageItems)
for (let i = 0; i < imageItems.length; i++) {
  imageItems[i].height = 110
  imageItems[i].style.margin = '11px 6px 3px 6px'
  imageItems[i].style.position = 'relative'
  imageItems[i].style.float = 'left'
}