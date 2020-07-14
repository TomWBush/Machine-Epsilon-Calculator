/**
 * @author Tom Wang
 * 
 * Helper JS functions
 */

/**
 * Calculate Machine Epsilon
 */
function calculateME(display) {
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
    if (display) {
        $("#machine-epsilon").val(eps);
        $("#count").html(cnt);
        $("#show-info").css("display", "block");
    }
    return results;
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