let cantidadRebanadas = 0;
let diametroPizza = 200;
let xPizza1 = 200;
let yPizza1 = 200;
let xPizza2 = 500;
let yPizza2 = 300;
let xPizza3 = 800;
let yPizza3 = 400;

function setup() {
  createCanvas(1200, 1200);

  inputRebanadas = createInput(cantidadRebanadas.toString());
  inputRebanadas.position(10, 10);
  inputRebanadas.size(100);

  botonActualizar = createButton('Actualizar rebanadas');
  botonActualizar.position(inputRebanadas.x + inputRebanadas.width + 10, 10);
  botonActualizar.mousePressed(actualizarRebanadas);
}

function actualizarRebanadas() {
  let valor = int(inputRebanadas.value());
  if (!isNaN(valor) && valor > 0) {
    cantidadRebanadas = valor;
  }
}
function draw() {
  background(220);

  puntoMedio(diametroPizza /2, xPizza1, yPizza1);
  puntoMedio(diametroPizza /2, xPizza2, yPizza2);
  puntoMedio(diametroPizza /2, xPizza3, yPizza3);
  
  
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
  
  //FOR ALGORITMO Bresenham 
  for (let i = 0; i < cantidadRebanadas; i++){
    let anguloRebanada = i * ((2 * PI) / cantidadRebanadas);
    
    let xFinal = round(xPizza3 + (diametroPizza / 2) * cos(anguloRebanada));
    let yFinal = round(yPizza3 + (diametroPizza / 2) * sin(anguloRebanada));
    
     algoritmoBresenham(xPizza3, yPizza3, xFinal, yFinal);
    
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

function algoritmoBresenham(x0, y0, x1, y1) {
  if (abs(y1 - y0) < abs(x1 - x0)) {
    lineaHorizontal(x0, y0, x1, y1); 
  } else {
    lineVertical(x0, y0, x1, y1); 
  }
}

function lineaHorizontal(x0, y0, x1, y1) {
  if (x0 > x1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  let dx = x1 - x0;
  let dy = y1 - y0;
  let dir = (dy < 0) ? -1 : 1;
  dy *= dir;

  if (dx !== 0) {
    let y = y0;
    let p = 2 * dy - dx;
    for (let i = 0; i <= dx; i++) {
      point(x0 + i, y);
      if (p >= 0) {
        y += dir;
        p -= 2 * dx;
      }
      p += 2 * dy;
    }
  }
}

function lineVertical(x0, y0, x1, y1) {
  if (y0 > y1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  let dx = x1 - x0;
  let dy = y1 - y0;
  let dir = (dx < 0) ? -1 : 1;
  dx *= dir;

  if (dy !== 0) {
    let x = x0;
    let p = 2 * dx - dy;
    for (let i = 0; i <= dy; i++) {
      point(x, y0 + i);
      if (p >= 0) {
        x += dir;
        p -= 2 * dy;
      }
      p += 2 * dx;
    }
  }
}

function puntoMedio(r,xCentral,yCentral){
  let x = 0;
  let y = r;
  
  let p = 5 / 4 - r; 
  
  for(let k = 0; x < y; k++){
    if(p < 0){
      x = x + 1;
      p = p + (2 * x) + 1;
    }else{
      x = x + 1;
      y = y - 1;
      p = p + (2 * x) + 1 - (2 * y);
    }
    point(xCentral + x, yCentral + y);
    point(xCentral + y, yCentral + x);
    point(xCentral + y, yCentral - x);
    point(xCentral + x, yCentral - y);
    point(xCentral - x, yCentral - y);
    point(xCentral - y, yCentral - x);
    point(xCentral - y, yCentral + x);
    point(xCentral - x, yCentral + y);
  }
  
}

