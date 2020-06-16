/**
 * Calculate Machine Epsilon
 */
function calculateME() {
    eps = 1;
    cnt = 0;

    x = 1 + eps;

    while (x > 1) {
        eps = eps / 2;
        x = 1 + eps;
        cnt = cnt + 1;
    }
    // console.log(cnt, eps);
    $("#machine-epsilon").val(eps);
    $("#count").html(cnt);
    $("#show-info").css("display", "block");
}

function showInfo() {
    plot();
    $("#number-info").css("display", "block");
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
 * Plot the histogram
 */
function plot() {
    let x = ['16-bit binary', '32-bit binary',
             '64-bit binary', '80-bit binary',
             '128-bit binary', '32-bit decimal',
             '64-bit decimal', '128-bit decimal',
             'your machine'];
    let y = [11, 24, 53, 64, 113, 7, 16, 34];
    y = y.concat($("#count").html());

    let hovertext =  ['common name: half precision<br>precision: 11<br>machine epsilon: 4.88e-04',
                      'common name: single precision<br>precision: 24<br>machine epsilon: 5.96e-08',
                      'common name: double precision<br>precision: 53<br>machine epsilon: 1.11e-16',
                      'common name: extended precision<br>precision: 64<br>machine epsilon: 5.42e-20',
                      'common name: quad(ruple) precision<br>precision: 113<br>machine epsilon: 9.63e-35',
                      'common name: single precision decimal<br>precision: 7<br>machine epsilon: 5 × 10−7',
                      'common name: double precision decimal<br>precision: 16<br>machine epsilon: 5 × 10−16',
                      'common name: quad(ruple) precision decimal<br>precision: 34<br>machine epsilon: 5 × 10−34'];
    let me = $("#machine-epsilon").val();
    if (me.length > 9) {
        if (me.indexOf('e') !== -1) {
            me = me.substring(0, 4) + me.substring(me.indexOf('e'));
        }
    }
    hovertext = hovertext.concat('precision: ' + $("#count").html() + '<br>machine epsilon: ' + me);

    let color = ['rgba(97, 138, 250, 1)', 'rgba(97, 138, 250, 1)', 'rgba(97, 138, 250, 1)', 'rgba(97, 138, 250, 1)',
                 'rgba(97, 138, 250, 1)', 'rgba(97, 138, 250, 1)', 'rgba(97, 138, 250, 1)', 'rgba(97, 138, 250, 1)',
                 'rgba(245, 171, 53, 1)'];
    let trace = {
        x: x,
        y: y,
        hovertext: hovertext,
        hoverinfo: 'text',
        marker: { color: color },
        type: 'bar'
    };
    let data = [trace];
    // Workaround for asynchronous behavior to get parent width 
    setTimeout(function(){
        let layout = {
            autoresize: true,
            width: $("#epsilon-graph").width(),
            margin: {
              l: 30,
              r: 55,
              b: 75,
              t: 10,
              pad: 5
            }
        };
        Plotly.newPlot('epsilon-graph', data, layout, {displayModeBar: false});
    },0);
}

/**
 * Functions called onload
 */
function initialize() {
    popoverOptIn();
    writeDeviceType();
}