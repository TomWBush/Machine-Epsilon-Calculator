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
 * @param {number} c 
 */
function calculateME(c = 1) {
    let results = [];
    let eps = c;
    let cnt = 1;

    let x = c + eps;

    while (x > c) {
        eps /= 2;
        x = c + eps;
        results.push(eps / c);
        ++cnt;
    }
    return results;
}



/**
 * Calculate the smallest distinguishable value by the machine
 * @param {number} value 
 */
function calculateSmallestDistinguishableValue(value) {
    let cnt = 1;
    let eps = value;

    let x = value + eps;

    while (x > value) {
        eps /= 2;
        x = value + eps;
        ++cnt;
    }
    return eps;
}

/**
 * Calculate Machine Epsilon with an alternative starting value
 */
function altMECalculate() {
    let compare_val = $("#alt-start-value").val();
    compare_val = compare_val.trim();
    if (isNaN(compare_val) || compare_val == '') {
        $('#errmsg').html("Please enter a number").show();
        $('#errmsg').fadeOut(2000);
        return;
    }
    compare_val = Number(compare_val);
    // Get current step of 1 based machine epsilon calculation
    // step_count = chart.series[0].data.length;
    // if (step_count == 0) {
    //     $('#errmsg').html("Please calculate your machine epsilon first").show();
    //     $('#errmsg').fadeOut(2000);
    //     return;
    // }
    // --step_count;

    // Calculate compare value machine epsilon at current step
    let result = calculateME(compare_val);
    // $("#alt-machine-epsilon").html(result[step_count]);
    // $("#smallest-value").html(calculateSmallestDistinguishableValue(compare_val));
    $("#alt-machine-epsilon").html(result[result.length - 1]);
    $("#smallest-value").html(calculateSmallestDistinguishableValue(compare_val));
}

/**
 * Helper for writing current epsilon into the text field
 */
function writeEpsilonValue(eps) {
    $("#machine-epsilon").html(eps);
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
    writeDeviceType('');
    $("#alt-machine-epsilon").html('');
    $("#smallest-value").html('');
}
