canvas = document.querySelector("#Sketch");
createbtn = document.querySelector("#topbtn");
deletebtn = document.querySelector("#deletebtn");
let redPixel =   "background-color: red  ;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
let whitePixel = "background-color: white;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
let greenPixel = "background-color: green;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
let lineStyle = "font-size: 16px;";
let input;
let numberMines;
let hasCanvas = false;
createbtn.addEventListener("click",() => {
    input = prompt("How many squares?");
    if(input > 100){
        input = 100;
    }
    numberMines = prompt("How many mines");
    if(input > 50){
        numberMines = 50;
    }
    if (hasCanvas === true){
        document.querySelector("#subcanvas").remove();
    }
    generateCanvas(input);
    hasCanvas = true;
})
deletebtn.addEventListener("click",() =>{
    document.querySelector("#subcanvas").remove();
    hasCanvas = false;
})

function locatePixel(posx,posy){
    if(posx >= 0 && posy >= 0 && posx < input && posy < input){
        finder = 'div[posy="'+posy+'"]';
        let targetLine = document.querySelector(finder);
        finder = 'div[posx="'+posx+'"]';
        let pixel = targetLine.querySelector(finder);
        return pixel;
    }
    return -1;
}
function paintPixel(posx,posy,color){
    pixel = locatePixel(posx,posy);
    pixel.setAttribute("style",color+pixelSize);
}
function generateCanvas(input){
subcanvas = document.createElement("div");
subcanvas.setAttribute("id","subcanvas");
function countMines(posx,posy){
    let sum = 0;
    i = -1;
    j = -1;
    let pixel;
    while (i < 2) {
        if(posx+i < 0 || i == 0){
            i += 1;
            continue;
        }
        while (j < 2) {
            if(posy+j < 0  || posy+j == 0){
                j += 1;
                continue;
            }
            pixel = locatePixel(posx + i, posy + j);
            if(pixel != -1){
                if (pixel.getAttribute("hasMine", "true")) {
                    sum += 1;
            }   }
            j += 1;
        }
        j = -1;
        i += 1;
    }
    return sum;
}

size = 720/input;
str = size.toString();
pixelSize = "width:"+str+"px;"+"height:"+str+"px;";
for(i = 0;i < input;i++){
    let line = document.createElement("div");
    line.setAttribute("id","line")
    line.setAttribute("style",lineStyle + "height:"+size+"px;");
    line.setAttribute("posy",i.toString());
    for(j = 0;j < input;j++){
        let pixel = document.createElement("div");
        pixel.setAttribute("style",whitePixel+pixelSize);
        pixel.setAttribute("id","pixel");
        if(Math.floor(Math.random() * 100) <= numberMines){
            pixel.setAttribute("hasMine","true");
        }
        pixel.setAttribute("posx",j.toString());
        pixel.textContent = "?";
        pixel.addEventListener("click",() => {
            positionX = parseInt(pixel.getAttribute("posx"));
            positionY = parseInt(pixel.parentElement.getAttribute("posy"));
            if(pixel.getAttribute("hasMine") == "true"){
                paintPixel(positionX,positionY,greenPixel);
            }else{paintPixel(positionX,positionY,redPixel);}
            pixel.textContent = countMines(positionX,positionY).toString();
        })
        line.appendChild(pixel);
}
    subcanvas.appendChild(line);
    canvas.appendChild(subcanvas);
}
}