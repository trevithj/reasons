//  Reasons.js by Dave Kinkead
//  Copyright 2017-2019 University of Queensland
//  Available under the MIT license

'use strict'

const Utils = require('./utils')
const uuid = require('uuid/v4')

let last_mark, 
    last_range,
    reasons = [],
    icons = Utils.buildNode('div', {id: 'hover-icons'}, {class: 'hide'})


module.exports = Highlighter

function Highlighter (elementID) {
  const dom = document.querySelector(elementID)
  let text = ''
  // let reasons = window.localStorage.getItem('reasons')
  // console.log(reasons)
  // reasons.forEach((reason) => {
  //   Document.createRange(reason)
  // })

  window.addEventListener('mouseup', (event) => {
    let width = (icons.getClientRects().length) ? icons.getClientRects()[0].width : 50
    let new_selection = document.getSelection()

    if (new_selection && new_selection.focusOffset > new_selection.anchorOffset) {
      last_range = new_selection.getRangeAt(0).cloneRange()
      let coords = getXandY(new_selection)
      icons.classList.remove('hide')
      icons.setAttribute('style', `top: ${coords.y - 40}px; left: ${coords.x - width/2}px;`)
    }
  })

  addIcons()
  addStyles()
}

function getXandY (selection) {
  let minX, maxX, minY

  let boxes = selection.getRangeAt(0).cloneRange().getClientRects()
  for (let i=0; i<boxes.length; i++) {
    let box = boxes[i]
    minX = Math.min((minX || box.left), box.left)
    maxX = Math.max((maxX || box.right), box.right)
    minY = Math.min((minY || box.top), box.top)
  }
  return { x: (maxX - minX)/2 + minX, y: minY }
}

function highlight (range) {

  let mark = Utils.buildNode('mark', {id: uuid()})
  mark.addEventListener('mouseenter', (event) => {
    last_mark = mark.id
  })

  mark.addEventListener('mouseout', (event) => {
    icons.classList.add('hide')
  })

  save(range)  
  range.surroundContents(mark)
}

function save (range) {
  console.log(range)
  reasons.push(range)
  window.localStorage.setItem('reasons', reasons)
}

function addIcons () {
  //  build the icons
  let saveIcon = Utils.buildNode('span', { title: 'Save highlight as a reason' })
  saveIcon.textContent = '+'
  saveIcon.addEventListener('click', function (event) {
    icons.classList.add('hide')
    highlight(last_range)
  })
  icons.appendChild(saveIcon)

  document.querySelector('body').appendChild(icons)
}

function buildIcon (opts) {
  let span = Utils.buildNode('span', opts.opts, opts.attribs)
  span.textContent = opts.text
  span.addEventListener('click', opts.func)
  return span
}

function addStyles () {
  let css = Utils.buildNode('style')
  css.textContent = `
    #hover-icons { position: absolute; }
    #hover-icons span { background-color: rgba(128,0,128,0.7); color: white; line-height: 1; padding: 0.8rem 1rem; border-radius: 50%; }
    mark { padding: 0.25rem 0; }
    .hide { display: none; transition: display 2s; }
  `
  document.querySelector('head').appendChild(css)
}

