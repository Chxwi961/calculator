const buttoncontainer = document.querySelector(".buttoncontainer")
const buttonHeight = buttoncontainer.offsetHeight
const buttonWidth = buttoncontainer.offsetWidth
const line = document.querySelector(".line")
line.textContent = ""

const result = document.querySelector('.result')
result.textContent = ""

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
        buttonArray[0].textContent = 'AC'
        buttonArray[1].textContent = 'C'
        buttonArray[2].textContent = 'Del'
    } else if ([4,5,6,8,9,10,12,13,14,17].includes(i)) {
        buttonArray[i].classList.add('digits')
        counter += 1 
        if (counter == 10) {
            counter = 0
        }
        buttonArray[i].textContent = counter

    } else { //this is i = 3,7,11,15,16,18,19
        buttonArray[i].classList.add('operations')
        buttonArray[3].textContent = '+'
        buttonArray[7].textContent = '-'
        buttonArray[11].textContent = '×'
        buttonArray[15].textContent = '÷'
        buttonArray[19].textContent = '='

        buttonArray[16].textContent = '00'
        buttonArray[18].textContent = '.'
    }
}


const clearButtons = document.querySelectorAll(".button.clears")
let clearBtnArray = Array.from(clearButtons)

clearBtnArray.forEach(button => {
    button.addEventListener('click', function() {
        clear = this.textContent
        if (clear == 'Del') {
            let currentline = line.textContent
            line.textContent = currentline.slice(0,-1)
        } else {
            line.textContent = ""
        }
    })
})

const numberButtons = document.querySelectorAll(".button.digits")
let numberBtnArray = Array.from(numberButtons)

numberBtnArray.forEach(button => {
    button.addEventListener('click', function() {
       line.textContent += this.textContent
    })
})


const operationButtons = document.querySelectorAll(".button.operations")
let operationBtnArray = Array.from(operationButtons)

operationBtnArray.forEach(button => {
    button.addEventListener('click', function() {
        let operation = this.textContent
        if (operation != "=") {
           line.textContent += this.textContent 
        } else {
            console.log('equal')
        }
        
    })
})