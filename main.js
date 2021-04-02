const area = document.getElementById('area')
let currentMove = 0
let result
let deadHeat = 0
const contentWrapper = document.getElementById("content")
const modalResult = document.getElementById("modal-result-wrapper")
// const overlay = document.getElementById("overlay")
const btnClose = document.getElementById("btn-close")



area.addEventListener("click", function (event) {
    if (event.target.className === "box") { // Проверяем, что мы ткнули на один из div.box-ов внутри area, т. к. существует возможность ткнуть на тоненький border элемента
        if (currentMove % 2 == 0) {      // area (и это всё ещё будет area, т. е. формально условие выполнено, был произведён клик по area и мы дальше гоним код), поэтому условие должно быть уточнено.
            let xImage = document.createElement("img")
            // xImage.setAttribute("class", "x-image")
            xImage.setAttribute("src", "x.png")
            xImage.setAttribute("height", "100")
            xImage.setAttribute("width", "100")
            let selectedBox = event.target
            selectedBox.innerText = "X"
            // console.dir(selectedBox)
            selectedBox.appendChild(xImage)
            currentMove++
            checkForWinnings()
        } else {
            let oImage = document.createElement("img")
            // oImage.setAttribute("class", "o-image")
            oImage.setAttribute("src", "o.png")
            oImage.setAttribute("height", "100")
            oImage.setAttribute("width", "100")
            let selectedBox = event.target
            selectedBox.innerText = "O"
            selectedBox.appendChild(oImage)
            currentMove++
            checkForWinnings()
        }
    }
})

function checkForWinnings() {
    const boxes = document.getElementsByClassName("box")
    // console.dir(boxes)
    const winCombinations = [ // Как связан этот массив и псевдо-массив HTMLCollection, содержащий 9 проиндексированных div.box-ов? Нам нужно получить доступ к свойству div.box-ов ".innerText",
        [0,1,2],              // содержащему предварительно помещённое при клике значение "X" или "O". В массиве winCombinations перечислены 8 возможных выигрышных комбинаций. Комбинация считается
        [3,4,5],              // выигрышной, если в 3-х определённых div.box-ах (их индексы - это элементы вложенных массивов) будут равны значения свойства .innerText.
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
   for (let i = 0; i < winCombinations.length; i++) {
       if (boxes[winCombinations[i][0]].innerText === "X" && boxes[winCombinations[i][1]].innerText === "X" && boxes[winCombinations[i][2]].innerText === "X") {
            result = "X-es"
           winnerWindow(result)
           // console.log(result)
       } else if (boxes[winCombinations[i][0]].innerText === "O" && boxes[winCombinations[i][1]].innerText === "O" && boxes[winCombinations[i][2]].innerText === "O") {
           result = "O-s"
           winnerWindow(result)
           // console.log(result)
       } else {
           deadHeat++
           // console.log(deadHeat)
           if (deadHeat === 72) {
               result = "Ничья"
               winnerWindow(result)
           }
       }
   }


}

function winnerWindow(param) {
    console.log(param)
    if (param === "Ничья") {
        contentWrapper.innerHTML = "Ничья!"
        modalResult.style.display = "block"
    } else {
        contentWrapper.innerHTML = `${param} won!`
        modalResult.style.display = "block"
    }
}

function newGame() {
    modalResult.style.display = "none"
    location.reload()
}

btnClose.addEventListener("click", newGame)


