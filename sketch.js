let cantidadRebanadas = 3;
let diametroPizza = 200;
let xPizza1 = 200;
let yPizza1 = 200;
let xPizza2 = 500;
let yPizza2 = 300;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  
   circle(xPizza1, yPizza1, diametroPizza);
   circle(xPizza2, yPizza2, diametroPizza);
  
  
  //FOR ALGORITMO PP
  for (let i = 0; i < cantidadRebanadas; i++){
    let anguloRebanada = i * ((2 * PI) / cantidadRebanadas);
    
    let xFinal = round(xPizza1 + (diametroPizza / 2) * cos(anguloRebanada));
    let yFinal = round(yPizza1 + (diametroPizza / 2) * sin(anguloRebanada));
    
    ecuacionPuntoPendiente(xPizza1, xFinal, yPizza1, yFinal);
  }
  
  
  //FOR ALGORITMO DDA
  for (let i = 0; i < cantidadRebanadas; i++){
    let anguloRebanada = i * ((2 * PI) / cantidadRebanadas);
    
    let xFinal = round(xPizza2 + (diametroPizza / 2) * cos(anguloRebanada));
    let yFinal = round(yPizza2 + (diametroPizza / 2) * sin(anguloRebanada));
    
    algoritmoDDA(xPizza2, xFinal, yPizza2, yFinal);
  }
  
}

function ecuacionPuntoPendiente(x1, x2, y1, y2) {
  if (x1 === x2) {
    if (y1 < y2) {
      for (let y = y1; y <= y2; y++) {
        point(x1, y);
      }
    } else {
      for (let y = y1; y >= y2; y--) {
        point(x1, y);
      }
    }
  }else{ 
    let m = (y2 - y1) / (x2 - x1); 
    let b = y1 - (m * x1); 
    if(x1 < x2){
    for (let x = x1; x <= x2; x++) {
    let y = (m * x) + b; 
    point(floor(x), floor(y)); 
    }
  }else{
    for (let x = x1; x >= x2; x--) {
    let y = (m * x) + b; 
    point(floor(x), floor(y)); 
    }
  }
  }
}

function algoritmoDDA(x1, x2, y1, y2){
  distanciaX = x1 - x2;
  distanciaY = y1 - y2;
  
  if(abs(distanciaX) > abs(distanciaY)){
    pasos = abs(distanciaX);
  }else{
    pasos = abs(distanciaY); 
  }

  incrementoX = distanciaX / pasos;
  incrementoY = distanciaY / pasos;

   
  for (let i = 0; i < pasos; i++){
    let xRedondeado = round(x1);
    let yRedondeado = round(y1);

    point(xRedondeado, yRedondeado);  
    
    x1 += incrementoX;
    y1 += incrementoY;
  }
}