/* The Calculator class is a JavaScript class that takes two text elements as arguments. It creates a
new instance of the class and sets the previousOpreandTextElement and currentOpreandTextElement
properties. It also calls the clear() function */
class Calculator {
    /**
     * The constructor function takes two parameters, previousOpreandTextElement and
     * currentOpreandTextElement. 
     * It creates a new instance of the JavaScript class, and sets the previousOpreandTextElement and
     * currentOpreandTextElement properties. 
     * It also calls the clear() function
     * @param previousOpreandTextElement - The previous operand text element.
     * @param currentOpreandTextElement - The text element that is currently being edited.
     */
    constructor(previousOpreandTextElement, currentOpreandTextElement){
        this.previousOpreandTextElement = previousOpreandTextElement
        this.currentOpreandTextElement = currentOpreandTextElement
        this.clear()
    }

    /**
     * Delete the last character of the current operand
     */
    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /**
     * Clear the current operand and the previous operand and reset the operation
     */
    clear () {
        this.currentOperand = ''
        this.previoudOperand = ''
        this.operation = undefined
    }

    /**
     * Append a number to the current operand
     * @param number - The number that was just pressed.
     * @returns Nothing.
     */
    appendNumber(number) {
        /* This is checking if the current operand already has a decimal point. If it does, then we
        don't want to add another one. */
        if(number === '.' && this.currentOperand.includes('.')) return

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    /**
     * * If the current operand is empty, return.
     * * If the previous operand is empty, return.
     * * Set the operation to the given operation.
     * * Set the previous operand to the current operand.
     * * Set the current operand to an empty string
     * @param operation - the operation to be performed.
     * @returns Nothing.
     */
    chooseOperation(operation) {
        /* This is checking if the current operand is empty. If it is, then we don't want to add
        another one. */
        if(this.currentOperand === '') return

        /* This is checking if the previous operand is empty. If it is, then we don't want to run the
        compute function. */
        if(this.previoudOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previoudOperand = this.currentOperand
        this.currentOperand = ''
    }

    /**
     * Compute the result of the current operation and store it in the currentOperand
     * @returns Nothing.
     */
    compute() {
        let computation
        const prev = parseFloat(this.previoudOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case "+":
                computation = prev + current
                break;
            case "-":
                computation = prev - current
                break;
            case "*":
                computation = prev * current
                break;
            case "/":
                computation = prev / current
                break;    
            default:
                return;
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previoudOperand = ''

    }

    /**
     * *This function takes a number as an argument and returns a string that represents the number in
     * a more human-readable format.*
     * @param number - The number to be formatted.
     * @returns a string that is the number with the decimal digits truncated.
     */
    getdisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
           integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits : 0 })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }

   /* This is updating the display of the calculator. */
    updateDisplay() {
        this.currentOpreandTextElement.innerText = this.getdisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOpreandTextElement.innerText = `${this.getdisplayNumber(this.previoudOperand)} ${this.operation}`
        } else {
            this.previousOpreandTextElement.innerText = ''
        }
    }
}



const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const previousOpreandTextElement = document.querySelector('[data-previous-operand]')
const currentOpreandTextElement = document.querySelector('[data-current-operand]')

/* This is creating a new instance of the Calculator class. */
const calculator = new Calculator (previousOpreandTextElement, currentOpreandTextElement)

/* A JavaScript for loop. It is looping through each element in the array and running the code in the
curly braces. */

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

/* This is adding an event listener to the equals button. When the button is clicked, the code in the
curly braces is run. */
equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

/* This is adding an event listener to the delete button. When the button is clicked, the code in the
curly braces is run. */
deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

