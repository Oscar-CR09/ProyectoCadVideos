//query selecto
// const heading = document.querySelector('.header__texto h2') //retorna 0 1 elemntos 
// console.log(heading);

//query selecto all

//getelemtbyid

//generar un enlace de js
const nuevoEnlace = document.createElement('A') //en mayuscula
//Agregar el href
nuevoEnlace.href = 'nuevo-enlace.html';
//Agregar el texto 
nuevoEnlace.textContent = 'Tienda Virtual';
//agregar la clase
nuevoEnlace.classList.add('navegacion__enlace');
//agregar al documnetp
const navegacion = document.querySelector('.navegacion');
navegacion.appendChild(nuevoEnlace);

console.log(nuevoEnlace);

/*funcion que aplica a la opcion seleccionado  */

function seleccionar(link){
    var opciones = document.querySelectorAll('#links a');
    opciones[0].className="";
    opciones[1].className="";
    opciones[2].className="";
    opciones[3].className="";
    opciones[4].className="";
    link.className = "seleccionado"

    // se hace desaparecer el menu que se a seleccionado una opcion en el modo responcive 
    var x = document.getElementById("nav");
    x.className="";


}
/* funcion que muestra el menu responsive*/
function responsiveMenu(){
    var x =document.getElementById("nav")
    if(x.className ===""){
        x.className = "responsive";
    }else{
        x.className = "";
    }
}
// decta el escrolling para aplicar la animacion de la barra  de habilidades
window.onscroll =function(){
    efectoHabilidades()
};
//funcion que aplica la animacion de la barra de habilidades
function efectoHabilidades(){
    var skills= document.getElementById("skills")
    var distancia_skills = window.innerHeight-skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        document.getElementById("html").classList.add("barra-progreso1")
        document.getElementById("js").classList.add("barra-progreso2")
        document.getElementById("bd").classList.add("barra-progreso3")
        document.getElementById("python").classList.add("barra-progreso4")
    }
}