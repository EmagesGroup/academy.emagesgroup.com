let tiempoRestante = 60 * 60;

let intervaloTimer = null;

function iniciarTemporizador(){

if(intervaloTimer!=null)return;

actualizarReloj();

intervaloTimer=setInterval(function(){

tiempoRestante--;

actualizarReloj();

if(tiempoRestante<=0){

clearInterval(intervaloTimer);

alert("El tiempo ha finalizado. La evaluación será enviada.");

calcularResultado();

}

},1000);

}

function actualizarReloj(){

let minutos=Math.floor(tiempoRestante/60);

let segundos=tiempoRestante%60;

document.getElementById("tiempo").innerText=

String(minutos).padStart(2,"0")+":"+

String(segundos).padStart(2,"0");

}
