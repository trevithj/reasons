//  Reasons.js by Dave Kinkead
//  Copyright 2017-2019 University of Queensland
//  Available under the MIT license

'use strict'

const Utils = require('./utils')
const uuid = require('uuid/v4')

let last_mark, icons

module.exports = Highlighter

function Highlighter (elementID) {
  const dom = document.querySelector(elementID)
  let text = ''
  let last_selection

  window.addEventListener('mouseup', (event) => {
    last_selection = document.getSelection()
    // text = selection.anchorNode.nodeValue.substring(selection.anchorOffset, selection.focusOffset)
  })

  window.addEventListener('keydown', (event) => {
    if (event.key == 'm') {
      highlight(last_selection)
    }
  })

  addIcons()
  addStyles()
}

function highlight (selection) {
  let mark = Utils.buildNode('mark', {id: uuid()})
  mark.addEventListener('mouseenter', (event) => {
    last_mark = mark.id
  })

  mark.addEventListener('mouseout', (event) => {
  })
  
  let range = selection.getRangeAt(0)
  range.surroundContents(mark)
}

function addIcons () {
  icons = icons || Utils.buildNode('div', {id: 'hover-icons'}, {class: 'hide'})

  //  build the icons
  [
    { text: 'A', func: function (event) { console.log('Aing ' + last_mark) } },
    { text: 'B', func: function (event) { console.log('Bing ' + last_mark) } },
    { text: 'C', func: function (event) { console.log('Cing ' + last_mark) } }
  ].forEach((icon) => icons.appendChild(buildIcon(icon)))

  document.querySelector('body').appendChild(icons)
}

function buildIcon (opts) {
  let span = Utils.buildNode('span')
  span.textContent = opts.text
  span.addEventListener('click', opts.func)
  return span
}

function addStyles () {
  let css = Utils.buildNode('style')
  css.textContent = `
    #hover-icons { position: absolute;  }
    #hover-icons span { background-color: purple; color: white; line-height: 1; padding: 0.8rem 1rem; border-radius: 50%; }
    mark { padding: 0.25rem 0; }
  `
  document.querySelector('head').appendChild(css)
}

