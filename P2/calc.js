//-- elemnto pantalla de calculadora
display = document.getElementById("display")
//-- elemento potencia
potencia = document.getElementById("potencia")
//-- elemento binario
binario = document.getElementById("binario")
//-- elemento igual
igual = document.getElementById("igual")
//-- elemento borrar último y borrar todo
borrar = document.getElementById("borrar")
borra1 = document.getElementById("borra1")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
} 
 

 let estado = ESTADO.INIT;   


function operando(ev)
{
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OP1){

        display.innerHTML += ev.target.value;

    }else if (estado == ESTADO.OPERATION){

        display.innerHTML += ev.target.value;
        estado = ESTADO.OP2;

    }else if (estado == ESTADO.OP2){

        display.innerHTML += ev.target.value;
    }
}


function operacion(ev)
{
    if(estado == ESTADO.OP1){
        display.innerHTML += ev.target.value;
        estado = ESTADO.OPERATION;
    }else{
        console.log("Error, aquí no se puede añadir una operación");
    }
}


operandos = document.getElementsByClassName("operando")


for (let boton of operandos) {

    boton.onclick = operando;
}

operadores = document.getElementsByClassName("operador")

for (let operador of operadores) {

    operador.onclick = operacion;
}
 

igual.onclick = () => {
    if(estado == ESTADO.OP2){
        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1;
    }else{
        console.log("Resultado no válido");
    }
}


borra1.onclick = () => {
    if (display.innerHTML != 1){
        display.innerHTML = display.innerHTML.slice(0, -1);
    }else{
        display.innerHTML = 0;
        estado = ESTADO.INIT;
    }
}


borrar.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}

binario.onclick = () => {
    if (estado==ESTADO.OP1){
        
        binary=(display.innerHTML % 2).toString();
        for(;display.innerHTML>1;){
            display.innerHTML=parseInt(display.innerHTML/ 2);
            binary = (display.innerHTML%2)+(binary);
        }
        display.innerHTML = binary;
        estado=ESTADO.INIT;
    }else{
        console.log("Número no válido")
    }
}
    