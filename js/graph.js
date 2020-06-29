/**
 * @author Joel Harrison
 * @author Tom Wang
 * 
 * using high charts library (highcharts.js)
 */
function resetGraph(){
    // document.getElementById("current-val").innerHTML = "log(Epsilon) = " + 0;
    // document.getElementById("eps").innerHTML = "Epsilon: " + 1;
    // document.getElementById("graph-count").innerHTML = "Count: " + 0;
    
    return new Highcharts.chart({                  
        chart: {
            renderTo: 'container',
            animation: true,
            width: 750,
            heigth: 900,
        },
        title: {
            text: 'Machine Epsilon Calculation Visualization'
        },
        

        yAxis: {
            title: {
                text: ''
            },
             min: -40,
             max: 1,
             tickInterval: 3,
        },
         tooltip: {
         useHTML: true,
                formatter: function(d){
                            // customize hover box
                             var rV = "Count: " + this.x + "<br/>";
                             rV += "<span style='font-size: 12px'>Epsilon: " + (this.y-1) + "</span><br/>"
                             return rV;
                },
         },

        xAxis: {
                title: {
                    text: 'Step Count'
                },
                tickInterval: 1,
        },

        plotOptions: {
            line: {
                 dataLabels: {
                     enabled: false
                 },
                 enableMouseTracking: true
            },
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1,
            }
        },

        legend: {
            itemStyle: {
                font: '10pt Trebuchet MS, Verdana, sans-serif'
             },
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: -10,
            y: 200,
            padding: 0,
            margin: 3,
        },

        series: [
            {
                name: 'y = Epsilon',
                data: []
            },
            {
                name: 'y = log(Epsilon)',
                data: []
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 300
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
};

var epsilons = calculateME(false);
var chart = resetGraph();
var nextPoint = 0;

function addDataPoint(){
    if(nextPoint >= epsilons.length){
        clearInterval(repeat);
        return;
    }
    let EpArray = [];
    let EpLogArray = [];
    // form new series
    for(let i = 0; i < chart.series[0].data.length; i++){
        EpArray.push(chart.series[0].data[i].y);
        EpLogArray.push(chart.series[1].data[i].y);
    }
    
    EpArray.push(1 + epsilons[nextPoint]);
    EpLogArray.push(Math.log(epsilons[nextPoint]));
    
    // document.getElementById("current-val").innerHTML = "log(Epsilon) = " + Math.log(epsilons[nextPoint]);
    // document.getElementById("eps").innerHTML = "Epsilon: " + epsilons[nextPoint];
    // document.getElementById("graph-count").innerHTML = "Count: " + (nextPoint+1);
    
    // render new data on graph
    chart.series[0].update({
        data: EpArray
    }, true);
    chart.series[1].update({
        data: EpLogArray
    }, true);
    nextPoint += 1;
};

function removePoint(){
    if (nextPoint <= 1) return;
    
    let EpArray = [];
    let EpLogArray = [];

    for(let i = 0; i < chart.series[0].data.length - 1; i++){
        EpArray.push(chart.series[0].data[i].y)
        EpLogArray.push(chart.series[1].data[i].y)
    }
    
    // document.getElementById("current-val").innerHTML = "log(Epsilon) = " + Math.log(epsilons[nextPoint-2]);
    // document.getElementById("eps").innerHTML = "Epsilon: " + epsilons[nextPoint-2];
    // document.getElementById("graph-count").innerHTML = "Count: " + (nextPoint);
    
    // render new data on graph
    chart.series[0].update({
        data: EpArray
    }, true);
    chart.series[1].update({
        data: EpLogArray
    }, true);
    nextPoint -= 1;
};
