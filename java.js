const buttoncontainer = document.querySelector(".buttoncontainer")
const buttonHeight = buttoncontainer.offsetHeight
const buttonWidth = buttoncontainer.offsetWidth

let cols = 4
let rows = 5

for (let i=0 ; i < (cols * rows); i++) {
    let newCell = document.createElement('div')
    
    newCell.style.width = `${buttonWidth / cols}px`
    newCell.style.height = `${buttonHeight / rows}px`
    newCell.classList.add('button')


    buttoncontainer.appendChild(newCell)
}