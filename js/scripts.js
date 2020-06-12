/**
 * Calculate Machine Epsilon
 */
function calculateME() {
    eps = 1;
    cnt = 1;

    x = 1 + eps;

    while (x > 1) {
        eps = eps/2;
        x = 1 + eps;
        cnt = cnt + 1;
    }
    console.log(cnt, eps);
    document.getElementById("count").innerHTML = cnt;
    document.getElementById("epsilon").innerHTML = eps;
}

/**
 * Helper for displaying the device name
 */
function writeDeviceType() {
    document.getElementById("deviceName").innerHTML = platform.description;
}

/**
 * Popover opt-in
 */
function popoverOptIn() {
    $('[data-toggle="popover"]').popover();
}

/**
 * Functions called onload
 */
function initialize() {
    popoverOptIn();
    writeDeviceType();
}