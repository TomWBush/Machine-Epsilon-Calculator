/**
 * @author Joel Harrison
 * @author Tom Wang
 * 
 * using high charts library (highcharts.js)
 */
function resetGraph(){
    
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
             min: -1,
             max: 1.5,
        },
         tooltip: {
         useHTML: true,
                formatter: function(d){
                            // customize hover box
                             var rV = "Count: " + this.x + "<br/>";
                             rV += "<span style='font-size: 12px'>Log10(Epsilon): " + (this.y) + "</span><br/>"
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
                name: 'Log10(Epsilon)',
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

var epsilons = calculateME();
var chart = resetGraph();
var nextPoint = 0;

function addDataPoint(){
    if (nextPoint >= epsilons.length) {
        clearInterval(repeat);
        return;
    }
    let EpLogArray = [];
    // form new series
    for (let i = 0; i < chart.series[0].data.length; i++) {
        EpLogArray.push(chart.series[0].data[i].y);
    }
    
    EpLogArray.push(Math.log10(epsilons[nextPoint]));

    writeEpsilonValue(EpLogArray[EpLogArray.length - 1]);

    // Dynamically change y-axis range
    chart.yAxis[0].update({
        min: EpLogArray[EpLogArray.length - 1]
    });
    
    // render new data on graph
    chart.series[0].update({
        data: EpLogArray
    }, true);
    nextPoint += 1;
};

function removePoint(){
    if (nextPoint <= 1) return;
    
    let EpLogArray = [];

    for (let i = 0; i < chart.series[0].data.length - 1; i++) {
        EpLogArray.push(chart.series[0].data[i].y)
    }


    writeEpsilonValue(EpLogArray[EpLogArray.length - 1]);

    // Dynamically change y-axis range
    chart.yAxis[0].update({
        min: EpLogArray[EpLogArray.length - 1]
    });
    
    // render new data on graph
    chart.series[0].update({
        data: EpLogArray
    }, true);
    nextPoint -= 1;
};
