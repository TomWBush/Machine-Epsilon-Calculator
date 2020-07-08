/**
 * @author Joel Harrison
 * 
 * For buttons and events
 */

var repeat;
var running = false;

function startAnimation(){
    if(running){
        clearInterval(repeat);
    }
    repeat = setInterval(function(){
                            addDataPoint();
                         }, 1050-document.getElementById('speed-slider').value);
    running = true;
    calculateME(true);
}

function stopAnimation(){
    clearInterval(repeat);
    running = false;
}

function changeSpeed(){
    if(running){
        startAnimation();
    }
}

function reset(){
    stopAnimation();
    nextPoint = 0;
    chart = resetGraph();
}

