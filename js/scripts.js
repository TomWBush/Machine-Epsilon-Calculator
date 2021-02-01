/**
 * @author Tom Wang
 * 
 * Helper JS functions
 */

/**
 * Calculate Machine Epsilon
 */
function calculateME() {
    let eps = 1;
    let cnt = 0;

    let x = 1 + eps;
    let results = [];

    while (x > 1) {
        eps = eps / 2;
        x = 1 + eps;
        results.push(eps);
        cnt = cnt + 1;
    }
    return results;
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