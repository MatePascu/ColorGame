var colors = []
var total = 6
var pickedColor = ""
var clickedColor = ""

var cuadros = document.querySelectorAll(".square")
var msj = document.querySelector("#message")
var h1 = document.querySelector("h1")

var display = document.querySelector("#colorDisplay")
var dificultad = document.querySelectorAll(".dificultad")
var boton = document.querySelector("#reset")

var validate = true

function changeColors(color) {
    for (let i=0; i<cuadros.length; i++) {
        cuadros[i].style.background=color
    }
}

function pickColor(n) {
    return(colors[parseInt(Math.random()*n)])
}

function randomColor() {
    let color = ("rgb("+(parseInt(Math.random()*255))+", "+(parseInt(Math.random()*255))+", "+
    (parseInt(Math.random()*255))+")")
    return(color)
}

function generateRandomColors(cantidad) {
    let array = []
    for(let i=0; i<cantidad; i++) {
        array[i]=randomColor()
    }
    return(array)
}

function reset(){
    colors = generateRandomColors(total)
    pickedColor = pickColor(total)
    display.textContent=pickedColor
    msj.textContent = ""
    for (let i=0; i<total; i++) {
        cuadros[i].style.background=colors[i]
    }
    validate = true
}

function init(){
    reset()

    boton.addEventListener("click", function(){
        boton.textContent = "Nuevos colores"
        reset()
    })

    for (let i=0; i<cuadros.length; i++) {
        cuadros[i].style.background=colors[i]
    
        cuadros[i].addEventListener("click", function(){
            clickedColor = colors[i]
            if (clickedColor!=pickedColor) {
                if(validate){
                    cuadros[i].style.background="#232323"
                    msj.textContent = "Intentalo Nuevamente"
                }
            } else if (clickedColor==pickedColor) {
                msj.textContent = "¡Correcto!"
                changeColors(pickedColor)
                boton.textContent = "Jugar de nuevo"
                validate = false
            }
        })
    }

    for(let i=0; i<2; i++){
        dificultad[i].addEventListener("click",function(e){
            if(this.textContent=="Dificil"){
                total = 6
                dificultad[1].classList.add("selected")
                dificultad[0].classList.remove("selected")
                for (let j=0; j<6; j++) {
                    cuadros[j].style.display="block"
                }
            }else{
                total=3
                dificultad[1].classList.remove("selected")
                dificultad[0].classList.add("selected")
                for (let j=3;j<6;j++) {
                    cuadros[j].style.display = "none"
                }
            }
            reset()
        })
    }
}

init()