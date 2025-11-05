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

let buttonArray = Array.from(buttoncontainer.children)
let counter = 0; 

for (let i=0 ; i<buttonArray.length; i++) {
    if (i < 3) {
        buttonArray[i].classList.add('clears')
    } else if ([4,5,6,8,9,10,12,13,14,17].includes(i)) {
        buttonArray[i].classList.add('digits')
        counter += 1 
        if (counter == 10) {
            counter = 0
        }
        buttonArray[i].textContent = counter

    } else {
        buttonArray[i].classList.add('operations')
    }
}