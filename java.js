const buttoncontainer = document.querySelector(".buttoncontainer")
const buttonHeight = buttoncontainer.offsetHeight
const buttonWidth = buttoncontainer.offsetWidth
const line = document.querySelector(".line")
line.textContent = ""

const result = document.querySelector('.result')
result.textContent = ""
let isActuallyZero = false 
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
    } else if ([4,5,6,8,9,10,12,13,14,16,17,18].includes(i)) {
        if (i != 16 && i != 18) {
            buttonArray[i].classList.add('digits')
            counter += 1 
            if (counter == 10) {
                counter = 0
            }
            buttonArray[i].textContent = counter
        } else { //This is specially for the i = 16 and 18 
            buttonArray[16].textContent = '00'
            buttonArray[18].textContent = '.'
            buttonArray[i].classList.add('digits')
        }
        

    } else { //this is i = 3,7,11,15,19
        buttonArray[i].classList.add('operations')
        buttonArray[3].textContent = '+'
        buttonArray[7].textContent = '−'
        buttonArray[11].textContent = '×'
        buttonArray[15].textContent = '÷'
        buttonArray[19].textContent = '='


    }
}

let previousResult = 0

function doOperation(str) {
    operator = ''
    counterBefore = 0
    for (i=0;i<str.length;i++) {
        if (isNaN(str[i]) && str[i] != '.' && str[i] && str[i] != '-') {
            console.log(str[i])
            operator = str[i]
            break
        } else {
            counterBefore += 1 
        }
    }
    // console.log(counterBefore) // This represents the INDEX POSITION OF THE OPERATOR
    console.log(str.slice(0,counterBefore)) // This represents the FIRST NUMBER
    console.log(str.slice(counterBefore+1)) // This represents the SECOND NUMBER
    firstNumber = parseFloat(str.slice(0,counterBefore))
    secondNumber = parseFloat(str.slice(counterBefore+1))
    let res = 0 

    if (operator == '+') {
        res = result.textContent = firstNumber + secondNumber
    } else if (operator == '−') {
        res = result.textContent = firstNumber - secondNumber
    } else if (operator == '×') {
        res = result.textContent = firstNumber * secondNumber
    } else {
        res = result.textContent = firstNumber / secondNumber
    }

    let unformatted = result.textContent.toString()
    let newFormatted = ""

    if (unformatted.length > 12) {
        newFormatted = unformatted.slice(0,12)
        console.log(newFormatted)
    } else {
        newFormatted = parseFloat(result.textContent)
    }

    result.textContent = parseFloat(newFormatted)
    previousResult = parseFloat(newFormatted)
    console.log(previousResult)

    console.warn(res);
    if (res == 0) {
        isActuallyZero = true
        console.log('is actually 0')
    }
}



// This is the new(er) clean(er) version of my previous code
// i deleted everything out of frustration bc i was so lost 

const numButtons = document.querySelectorAll(".button.digits")
let numArray = Array.from(numButtons)
let alreadyComma = false 

const opButtons = document.querySelectorAll(".button.operations")
let opArray = Array.from(opButtons)
let clickedOnce = false 

numArray.forEach(button => {
    button.addEventListener('click', function () {


        let clicked = this.textContent
        if (clicked != '.') {
           line.textContent += clicked
        } else {
            if (alreadyComma == false) {
                line.textContent += clicked 
                alreadyComma = true
            }
        }
        
    })
})


opArray.forEach(button => {
    button.addEventListener('click', function() {
        if (clickedOnce == false && previousResult == 0 && isActuallyZero == false) {
            line.textContent += this.textContent
            alreadyComma = false 
            clickedOnce = true 
        } else if (clickedOnce == false && previousResult == 0 && isActuallyZero == true) {
            line.textContent = `${previousResult}${this.textContent}`
            clickedOnce = true 
            isActuallyZero = false
            
        } else {
            lastDigit = line.textContent[line.textContent.length - 1]
            if (isNaN(lastDigit) == false) {
                doOperation(line.textContent)
                clickedOnce = false
                alreadyComma = false 

                if (this.textContent != '=') {
                    line.textContent = `${previousResult}${this.textContent}`
                    alreadyComma = false
                    clickedOnce = true  
                } 
            } else {
                console.log('wait')
            }
        }
    })
})




const clearButtons = document.querySelectorAll(".button.clears")
let clearArray = Array.from(clearButtons)

clearArray.forEach(button => {
    button.addEventListener('click', function() {
        action = this.textContent
        if (action != 'Del') {
            line.textContent = ""
            result.textContent = ""
            alreadyComma = false
            clickedOnce = false 
            if (action == 'AC') {
                previousResult = 0 
            } 
        } else {
            deleted = line.textContent[line.textContent.length - 1]
            line.textContent = line.textContent.slice(0,-1)

            if (deleted == '.') {
                alreadyComma = false 
            } else if (isNaN(deleted) && deleted != '.') {
                clickedOnce = false 
            }
        }
    })
})