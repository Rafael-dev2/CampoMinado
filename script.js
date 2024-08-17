canvas = document.querySelector("#Sketch");
createbtn = document.querySelector("#topbtn");
deletebtn = document.querySelector("#deletebtn");
let redPixel = "background-color: red;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
let whitePixel = "background-color: white;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
let input;
createbtn.addEventListener("click",() => {
    input = prompt("How many squares?");
    if(input > 100){
        input = 100;
    }
    generateCanvas(input);
})
deletebtn.addEventListener("click",() =>{
    document.querySelector("#subcanvas").remove();
})
function paintPixel(posx,posy){
    finder = 'div[posy="'+posy+'"]';
    let targetLine = document.querySelector(finder);
    finder = 'div[posx="'+posx+'"]';
    let pixel = targetLine.querySelector(finder);
    pixel.setAttribute("style",redPixel+pixelSize);
}
function generateCanvas(input){
subcanvas = document.createElement("div");
subcanvas.setAttribute("id","subcanvas");

size = 720/input;
str = size.toString();
pixelSize = "width:"+str+"px;"+"height:"+str+"px;";
for(i = 0;i < input;i++){
    let line = document.createElement("div");
    line.setAttribute("id","line")
    line.setAttribute("style","font-size: 0px;")
    line.setAttribute("posy",i.toString());
    for(j = 0;j < input;j++){
        let pixel = document.createElement("div");
        pixel.setAttribute("style",whitePixel+pixelSize);
        pixel.setAttribute("id","pixel");
        pixel.setAttribute("posx",j.toString());
        pixel.addEventListener("click",() => {
            positionX = parseInt(pixel.getAttribute("posx"));
            positionY = parseInt(pixel.parentElement.getAttribute("posy"));
            paintPixel(positionX,positionY);
        })
        line.appendChild(pixel);
}
    subcanvas.appendChild(line);
    canvas.appendChild(subcanvas);
}
}