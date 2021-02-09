/**
 * @author Tom Wang
 * @author Joel Harrison
 * @author Rohan Naik
 * 
 * Helper JS functions
 */

var repeat;
var running = false;

/**
 * Calculate Machine Epsilon
 */
function calculateME(start_value = 1) {
    let cnt = 0;
    let eps = start_value;

    let x = start_value + eps;
    let results = [];

    while (x > start_value) {
        eps /= 2;
        x = start_value + eps;
        results.push(eps);
        cnt = cnt + 1;
    }
    return results;
}

/**
 * Calculate Machine Epsilon with an alternative starting value
 */
function altMECalculate() {
    $("#alt-machine-epsilon").val('');
    let start_val = $("#alt-start-value").val();
    start_val = start_val.trim();
    if (isNaN(start_val) || start_val == '') {
        $('#errmsg').html("Please enter a number").show();
        $('#errmsg').fadeOut(2000);
        return;
    }
    start_val = Number(start_val);
    let result = calculateME(start_val);
    result = result[result.length - 1];
    $("#alt-machine-epsilon").val(result);
}

/**
 * Helper for writing current epsilon into the text field
 */
function writeEpsilonValue(eps) {
    $("#machine-epsilon").val(eps);
}

/**
 * Helper for displaying the device name
 */
function writeDeviceType() {
    document.getElementById("deviceName").innerHTML = platform.description;
}

/**
 * Functions called onload
 */
function initialize() {
    writeDeviceType();
}

function startAnimation(){
    if(running){
        clearInterval(repeat);
    }
    repeat = setInterval(function(){
                            addDataPoint();
                         }, 1050-document.getElementById('speed-slider').value);
    running = true;
    calculateME();
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
    writeEpsilonValue('');
}
