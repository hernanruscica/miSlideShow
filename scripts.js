console.log("desde js");

/*elementos del DOM*/
const $d = document;
const $btnPrev = $d.getElementById("slide_prev");
const $btnNext = $d.getElementById("slide_next");
const $dotsContainer = $d.getElementById("dots_container");

/*Variables globales */
let slideActual = 0;
let slidesCantidad = $d.querySelectorAll('.slide').length; 

/*elementos dinamicos del DOM */
let  $slideAnterior, $slideActual, $slideSiguiente;

$d.addEventListener("click", (e) => {    
    //console.log(e.target.id);    
    if (e.target.id === "slide_prev"){
        console.log("click en el boton de slide atras");
        slideActual = atrasarSlide(slideActual);
        console.log(slideActual);
        actualizarSlides();
        dibujarSlides('atras');
        generarPuntos(slidesCantidad);
    }
    if (e.target.id === "slide_next"){
        console.log("click en el boton de slide siguiente");
        slideActual = avanzarSlide(slideActual);
        console.log(slideActual);  
        actualizarSlides(); 
        dibujarSlides('adelante');  
        generarPuntos(slidesCantidad);   
    }
    if (e.target.id.includes("slide_dot0")){
        console.log(e.target.id);
        let idSlideInt;
        idSlideInt = parseInt(e.target.id.slice(-1));
        indicarSlide(idSlideInt);                
        //console.log(slideActual);
    }
});

$d.addEventListener("transitionend", (e) => {
    console.log("transicion terminada", e.target);
    if (e.target.id.includes('slide')){
        mostrarSlides();
    }
    $d.querySelector('#slider_bloqueo').classList.add('slider_bloqueo_hide');
    
})

const avanzarSlide = (slide) => {    
    slide = (slide + 1) % (slidesCantidad);        
    return slide;
}

const atrasarSlide = (slide) => {
    if (slide > 0){
        slide--;
    }else{
        slide = slidesCantidad - 1;
    }
    return slide;
}

const indicarSlide = (id) => {
    let idAnterior = slideActual;
    slideActual = id;        
    // se mueve hacia la izquierda
    if (idAnterior > slideActual){
        actualizarSlides();
        dibujarSlides('atras');
    } 
    if ( idAnterior < slideActual){
        actualizarSlides();
        dibujarSlides('adelante');
    }
    generarPuntos(slidesCantidad);
}

const generarPuntos = (cantidad) => {
    let anchoContenedorPuntos = cantidad * 30; //en pixeles
    $dotsContainer.innerHTML = '';
    $dotsContainer.style.width = `${anchoContenedorPuntos}px`;
    $dotsContainer.style.left = `calc(50% - ${anchoContenedorPuntos / 2}px)`;
    for (let indice = 0; indice < cantidad; indice++){
           
        if (slideActual === indice){
            $dotsContainer.innerHTML += `<i class="fa fa-dot-circle" id = "slide_dot0${indice}"></i>`;    
        }else{
            $dotsContainer.innerHTML += `<i class="fa fa-circle" id = "slide_dot0${indice}"></i>`; 
        }
    }
}
generarPuntos(slidesCantidad);



/*
actualiza las 3 diapositivas que que tiene siempre cargadas 
dinamicamente:  slideAnterior, slideActual y slideSiguiente
*/
const actualizarSlides = () => {
    let idActual = `slide0${slideActual}`;
    let idAnterior = `slide0${atrasarSlide(slideActual)}`;
    let idSiguiente = `slide0${avanzarSlide(slideActual)}`;

    $slideActual = $d.getElementById(idActual);
    $slideAnterior = $d.getElementById(idAnterior);
    $slideSiguiente = $d.getElementById(idSiguiente);
    console.clear();
    console.log($slideAnterior, $slideActual, $slideSiguiente);    
}

const dibujarSlides = (direccion) => {      
    console.log(direccion);
    if (direccion === 'atras'){
        $slideAnterior.classList.add('slide_ocultar');
    }
    $slideAnterior.classList.remove("moverCentro");
    $slideAnterior.classList.remove("moverDerecha");    
    $slideAnterior.classList.add("moverIzquierda");
    
    $slideActual.classList.remove("moverDerecha");
    $slideActual.classList.remove("moverIzquierda");
    $slideActual.classList.add("moverCentro");
    
    if (direccion === 'adelante'){
        $slideSiguiente.classList.add('slide_ocultar');
    }
    $slideSiguiente.classList.remove("moverDerecha");
    $slideSiguiente.classList.remove("moverCentro");
    $slideSiguiente.classList.add("moverDerecha");

    $d.querySelector('#slider_bloqueo').classList.remove('slider_bloqueo_hide');
}

//quita los slide_ocultar
const mostrarSlides = () => {
    if ($slideAnterior.classList.contains('slide_ocultar')){
        $slideAnterior.classList.remove('slide_ocultar');
    }
    $slideActual.classList.remove('slide_ocultar');
    $slideSiguiente.classList.remove('slide_ocultar');
}

actualizarSlides();
dibujarSlides('centro');




