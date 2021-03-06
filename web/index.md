---
title: index
layout: template
permalink: /
---

# Reasons.js

<script>

   //  Variables for some randomized defaults
    const canvas = document.querySelector('#content')
    const box = canvas.getBoundingClientRect()

    const cat = ['humans', 'philosophers', 'doctors', 'students', 'winners', 'cats', 'dogs', 'birds', 'democrats', 'republicans'][Math.floor(Math.random() * 10)]
    const name = ['Socrates', 'Plato', 'Bob', 'Lucy', 'Dazza', 'Shazza', 'Nathan', 'Deborah', 'Dave', 'Pete'][Math.floor(Math.random() * 10)]
    const adj = ['mortal', 'smart', 'lucky', 'poor', 'cute', 'slow', 'fast', 'unlucky', 'furry', 'fluffy'][Math.floor(Math.random() * 10)]

    const graph = buildGraphFromSession()

    //  Invoke the Reasons.js API
    const argMap = Reasons.mapper('#content').render(graph)

    function buildGraphFromSession () {
      const session = sessionStorage.getItem('reasons')
      
      if (session && session !== 'null') {
        let max_per_line = Math.floor(box.width/250)
        let line = 0

        return JSON.parse(session).map((reason, i) => {
          reason.x = (i) % max_per_line * 225 + 125
          reason.y = box.height * (Math.floor(i/max_per_line)+1)/4
          return reason
        })
      } else {
        return [
          {id: 'p1', text: 'All '+cat+' are '+adj, x: box.width*1/3-125, y: box.height*1/3},
          {id: 'p2', text: name+' is a '+cat.substring(0, cat.length-1), x: box.width*2/3-125, y: box.height*1/3-25},
          {id: 'c1', text: name+' is '+adj, x: box.width*1/2, y: box.height*2/3},
          {from: ['p1', 'p2'], to: 'c1'}
        ]
      }
    }

    //  Generate a PNG image of the argument map
    function toPNG () {
      const canvas = document.querySelector('canvas')
      window.open(canvas.toDataURL('image/png'), '_blank')
    }

    function reset () {
      sessionStorage.setItem('reasons', null)
      location.reload()
    }

    //  Save the argument map
    function save() {
      console.log(argMap.export())

    }
</script>