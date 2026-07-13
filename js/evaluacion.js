let indice = 0;
let respuestas = new Array(preguntas.length).fill(null);

const inicio = document.getElementById("pantallaInicio");
const examen = document.getElementById("pantallaExamen");
const resultado = document.getElementById("pantallaResultado");

document.getElementById("btnComenzar").onclick = () => {

inicio.classList.add("oculto");
examen.classList.remove("oculto");

if(typeof iniciarTemporizador==="function"){
iniciarTemporizador();
}

mostrarPregunta();

};

function mostrarPregunta(){

let p = preguntas[indice];

document.getElementById("numeroPregunta").innerText = indice+1;

document.getElementById("totalPreguntas").innerText = preguntas.length;

document.getElementById("competencia").innerText =
"Competencia: "+p.competencia;

document.getElementById("tituloPregunta").innerText=p.pregunta;

let opciones=document.getElementById("opciones");

opciones.innerHTML="";

p.opciones.forEach((texto,i)=>{

let div=document.createElement("label");

div.className="opcion";

div.innerHTML=`
<input type="radio"
name="respuesta"
value="${i}"
${respuestas[indice]==i?"checked":""}>
${texto}
`;

div.onclick=()=>{

respuestas[indice]=i;

document.querySelectorAll("input[name=respuesta]")[i].checked=true;

};

opciones.appendChild(div);

});

let porcentaje=((indice+1)/preguntas.length)*100;

document.getElementById("barraProgreso").style.width=
porcentaje+"%";

document.getElementById("btnAnterior").style.display=
indice==0?"none":"inline-block";

if(indice==preguntas.length-1){

document.getElementById("btnSiguiente").classList.add("oculto");

document.getElementById("btnFinalizar").classList.remove("oculto");

}else{

document.getElementById("btnSiguiente").classList.remove("oculto");

document.getElementById("btnFinalizar").classList.add("oculto");

}

}

document.getElementById("btnAnterior").onclick=()=>{

if(indice>0){

indice--;

mostrarPregunta();

}

};

document.getElementById("btnSiguiente").onclick=()=>{

if(respuestas[indice]==null){

alert("Seleccione una respuesta.");

return;

}

indice++;

mostrarPregunta();

};

document.getElementById("btnFinalizar").onclick=()=>{

if(respuestas[indice]==null){

alert("Seleccione una respuesta.");

return;

}

calcularResultado();

};

function calcularResultado(){

let correctas=0;

let competencias={

Empatía:0,
Definición:0,
Ideación:0,
Prototipado:0,
Validación:0

};

let totalComp={

Empatía:0,
Definición:0,
Ideación:0,
Prototipado:0,
Validación:0

};

preguntas.forEach((p,i)=>{

totalComp[p.competencia]++;

if(respuestas[i]==p.respuesta){

correctas++;

competencias[p.competencia]++;

}

});

let porcentaje=Math.round((correctas/preguntas.length)*100);

examen.classList.add("oculto");

resultado.classList.remove("oculto");

document.getElementById("puntaje").innerText=porcentaje;

function pc(c){

return Math.round(
(competencias[c]/totalComp[c])*100
)+" %";

}

document.getElementById("cEmpatia").innerText=pc("Empatía");

document.getElementById("cDefinicion").innerText=pc("Definición");

document.getElementById("cIdeacion").innerText=pc("Ideación");

document.getElementById("cPrototipado").innerText=pc("Prototipado");

document.getElementById("cValidacion").innerText=pc("Validación");

let nivel="";
let estrellas="";
let insignia="";
let recomendacion="";

if(porcentaje>=95){

nivel="Innovador Estratégico";

estrellas="⭐⭐⭐⭐⭐";

insignia="💎";

recomendacion="Excelente desempeño. Demuestras dominio avanzado del proceso Design Thinking.";

}
else if(porcentaje>=90){

nivel="Innovador Avanzado";

estrellas="⭐⭐⭐⭐⭐";

insignia="🥇";

recomendacion="Muy buen resultado. Continúa fortaleciendo la validación de soluciones.";

}
else if(porcentaje>=80){

nivel="Innovador Competente";

estrellas="⭐⭐⭐⭐";

insignia="🥈";

recomendacion="Buen desempeño. Revisa algunos conceptos para alcanzar el nivel superior.";

}
else if(porcentaje>=70){

nivel="Emprendedor en Desarrollo";

estrellas="⭐⭐⭐";

insignia="🥉";

recomendacion="Tienes una buena base. Es recomendable reforzar Design Thinking.";

}
else if(porcentaje>=60){

nivel="Aprendiz";

estrellas="⭐⭐";

insignia="🔰";

recomendacion="Necesitas fortalecer varias competencias antes de continuar.";

}
else{

nivel="Inicial";

estrellas="⭐";

insignia="📘";

recomendacion="Te recomendamos volver a estudiar el material antes de repetir la evaluación.";

}

document.getElementById("nivel").innerText=nivel;

document.getElementById("estrellas").innerText=estrellas;

document.getElementById("insignia").innerText=insignia;

document.getElementById("recomendacion").innerText=recomendacion;

}

document.getElementById("btnSalir").onclick=()=>{

window.location="panel-emprendedor-junior.html";

};

document.getElementById("btnSolicitar").onclick=()=>{

let nombre=sessionStorage.getItem("nombre");

let dni=sessionStorage.getItem("dni");

let mensaje=
`Hola, soy ${nombre}.
DNI: ${dni}

He culminado la Evaluación Oficial de Design Thinking.

Solicito el envío de mi reporte de resultados.

Muchas gracias.`;

window.open(
"https://wa.me/51930175586?text="+encodeURIComponent(mensaje),
"_blank"
);

};
