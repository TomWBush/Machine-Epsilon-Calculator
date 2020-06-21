/**
 * @author Joel Harrison
 * @author Tom Wang
 * 
 * using high charts library (highcharts.js)
 */
function resetGraph(){
    document.getElementById("current-val").innerHTML = "1 + Eps = " + 2;
    document.getElementById("eps").innerHTML = "Epsilon: " + 1;
    document.getElementById("graph-count").innerHTML = "Count: " + 0;
    
    return new Highcharts.chart({                  
        chart: {
            renderTo: 'container',
            animation: true,
            width: 650,
            heigth: 400,
        },
        title: {
            text: 'Machine Epsilon Calculation Visualization'
        },
        

        yAxis: {
            title: {
                text: '1 + Epsilon'
            },
             min: 1,
             max: 2,
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
                     enabled: true
                 },
                 enableMouseTracking: true
            },
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0,
            }
        },

        series: [{
            name: '1+Epsilon',
            data: [2]
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
    let newArray = []
    // form new series
    for(i = 0; i < chart.series[0].data.length; i++){
        newArray.push(chart.series[0].data[i].y)
    }
    
    newArray.push(epsilons[nextPoint]+1);
    
    document.getElementById("current-val").innerHTML = "1 + Eps = " + (epsilons[nextPoint]+1);
    document.getElementById("eps").innerHTML = "Epsilon: " + epsilons[nextPoint];
    document.getElementById("graph-count").innerHTML = "Count: " + (nextPoint+1);
    
    // render new data on graph
    chart.series[0].update({
        data: newArray
    }, true);
    nextPoint += 1;
};

function removePoint(){
    if (nextPoint <= 1) return;
    
    let newArray = [];
    for(i = 0; i < chart.series[0].data.length - 1; i++){
        newArray.push(chart.series[0].data[i].y)
    }
    
    document.getElementById("current-val").innerHTML = "1 + Eps = " + (epsilons[nextPoint-2]+1);
    document.getElementById("eps").innerHTML = "Epsilon: " + epsilons[nextPoint-2];
    document.getElementById("graph-count").innerHTML = "Count: " + (nextPoint);
    
    // render new data on graph
    chart.series[0].update({
        data: newArray
    }, true);
    nextPoint -= 1;
};
