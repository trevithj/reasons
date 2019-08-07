//  Reasons.js by Dave Kinkead
//  Copyright 2017-2019 University of Queensland
//  Available under the MIT license

'use strict'

const uuid = require('uuid/v4')
const utils = require('./utils')
const findAndReplaceDOMText = require('findandreplacedomtext')
const highlights = []
let tooltip, dom, currentSelectedText

module.exports = Highlighter

function Highlighter (elementID) {

  addStyles()
  dom = document.querySelector(elementID)

  window.addEventListener('mouseup', (event) => {

    let selection = document.getSelection()
    let currentSelectedText = selection.getRangeAt(0).toString()

    if (currentSelectedText.length > 0) {
      addToolTip(selection)
    }



    //   let anno = createAnnotation(selection)
    //   this.highlight(anno)
    //   console.log(anno)      
  })

  window.addEventListener('click', (event) => {

  })
}

function highlight (anno) {
  findAndReplaceDOMText(dom, { 
    find: new RegExp(anno.text, 'g'), 
    wrap: 'mark', 
    wrapClass: 'highlight highlight-' + anno.id
  })
}

function createAnnotation (text) {
  return {
    id: uuid(),
    page: window.location.href,
    text: text
  }
}

function addToolTip (selection) {
  if (!tooltip) {
    tooltip = utils.buildNode('div', { id: 'reasons-tooltip' } )
    tooltip.textContent = 'X'
    document.body.appendChild(tooltip)

    tooltip.addEventListener('click', (event) => {
      let anno = createAnnotation(event.data)
      console.log(anno)
      highlight(anno)
    })    
  }

  let loc = getXandY(selection)
  tooltip.setAttribute('style', `postition: absolute; left: ${loc.x}px; top: ${loc.y}px;`)
  tooltip.setAttribute('data-text', selection.getRangeAt(0).toString())

}

function addStyles () {
  let css = utils.buildNode('style')
  css.textContent = `
    #reasons-tooltip { position: absolute; background-color: rgba(128,0,128,0.5); color: white; line-height: 1; padding: 0.8rem 1rem; border-radius: 50%; }
    mark { padding: 0.25rem 0; background-color: rgba(255,255,0, 0.5);}
  `
  document.querySelector('head').appendChild(css)
}

function getXandY (selection) {
  let minX, maxX, minY
  let range = selection.getRangeAt(0)
  let top = document.documentElement.scrollTop || document.body.scrollTop

  let boxes = range.getClientRects()
  for (let i=0; i<boxes.length; i++) {
    let box = boxes[i]
    minX = Math.min((minX || box.left), box.left)
    maxX = Math.max((maxX || box.right), box.right)
    minY = Math.min((minY || box.top), box.top)
  }
  return { x: (maxX - minX)/2 + minX, y: minY + top - 50}
}







// function addIcons () {
//   //  build the icons
//   let saveIcon = Utils.buildNode('span', { title: 'Save highlight as a reason' })
//   saveIcon.textContent = '+'
//   saveIcon.addEventListener('click', function (event) {
//     icons.classList.add('hide')
//     highlight(last_range)
//   })
//   icons.appendChild(saveIcon)

//   document.querySelector('body').appendChild(icons)
// }

// function buildIcon (opts) {
//   let span = Utils.buildNode('span', opts.opts, opts.attribs)
//   span.textContent = opts.text
//   span.addEventListener('click', opts.func)
//   return span
// }



//   let range = selection.getRangeAt(0)
//   let text = range.toString()
//   let text = selection.anchorNode.textContent

//   if (range.commonAncestorContainer.nodeName == '#text') {

//     //  build a highlight ref 
//     // console.log(highlight)

//     //  get parents and check if they have an ID own property

//     // add it to the store
//     // highlights.push(selection.anchorNode.textContent)
//   } else {
//     //  deal with this
//     console.log('node mismatch')
//   }

//   return {
//     @context: "http://www.w3.org/ns/anno.jsonld",
//     id: 'blah',
//     type: 'Annotation',
//     body: {
//       type: "TextualBody",
//       value: text,
//       format: "text/plain"
//     }


//   }
// }
 



// const Utils = require('./utils')
// const uuid = require('uuid/v4')

// let last_mark, 
//     last_range,
//     reasons = [],
//     icons = Utils.buildNode('div', {id: 'hover-icons'}, {class: 'hide'})


// module.exports = Highlighter

// function Highlighter (elementID) {
//   const dom = document.querySelector(elementID)
//   let text = ''
//   // let reasons = window.localStorage.getItem('reasons')
//   // console.log(reasons)
//   // reasons.forEach((reason) => {
//   //   Document.createRange(reason)
//   // })

//   window.addEventListener('mouseup', (event) => {
//     let width = (icons.getClientRects().length) ? icons.getClientRects()[0].width : 50
//     let new_selection = document.getSelection()

//     if (new_selection && new_selection.focusOffset > new_selection.anchorOffset) {
//       last_range = new_selection.getRangeAt(0).cloneRange()
//       let coords = getXandY(new_selection)
//       icons.classList.remove('hide')
//       icons.setAttribute('style', `top: ${coords.y - 40}px; left: ${coords.x - width/2}px;`)
//     }
//   })

//   addIcons()
//   addStyles()
// }


// function highlight (range) {

//   let mark = Utils.buildNode('mark', {id: uuid()})
//   mark.addEventListener('mouseenter', (event) => {
//     last_mark = mark.id
//   })

//   mark.addEventListener('mouseout', (event) => {
//     icons.classList.add('hide')
//   })

//   save(range)  
//   range.surroundContents(mark)
// }

// function save (range) {
//   console.log(range)
//   reasons.push(range)
//   window.localStorage.setItem('reasons', reasons)
// }



