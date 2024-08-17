canvas = document.querySelector("#Sketch");
createbtn = document.querySelector("#topbtn");
deletebtn = document.querySelector("#deletebtn");
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

function generateCanvas(input){
subcanvas = document.createElement("div");
subcanvas.setAttribute("id","subcanvas");

size = 960/input;
str = size.toString();
for(i = 0;i < input;i++){
    let line = document.createElement("div");
    line.setAttribute("id","line")
    line.setAttribute("style","font-size: 0px;")
    for(j = 0;j < input;j++){
        let pixel = document.createElement("div");
        pixel.setAttribute("style","background-color: white;" + "width:"+str+"px;"+
            "height: "+str+"px;"+ 
            'display: inline-flex;'+
            'align-self: center;'+
            'border: 1px solid gray;'+
            'box-sizing: border-box;'
                     );
        pixel.setAttribute("id","pixel");
        line.appendChild(pixel);
        pixel.addEventListener("mouseover",() => {
        pixel.setAttribute("style","background-color: red;"+"width:"+str+"px;"+
            "height: "+str+"px;"+
            'display: inline-flex;'+
            'align-self: center;'+ 
            'text-color:red;'+
            'border: 1px solid gray;'+
            'box-sizing: border-box;'
     );
    })
}
    subcanvas.appendChild(line);
    canvas.appendChild(subcanvas);
}
}