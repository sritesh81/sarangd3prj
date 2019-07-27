/*
*    main.js
*    Mastering Data Visualization with D3.js
*    10.2 - File Separation 
*/

var parseTime = d3.timeParse("%d/%m/%Y");
var formatTime = d3.timeFormat("%d/%m/%Y");

// Event listeners
$("#coin-select").on("change", update)
$("#var-select").on("change", update)

// Add jQuery UI slider
$("#date-slider").slider({
    range: true,
    max: parseTime("31/10/2019").getTime(),
    min: parseTime("12/5/2015").getTime(),
    step: 86400000, // One day
    values: [parseTime("12/5/2015").getTime(), parseTime("30/6/2019").getTime()],
    slide: function(event, ui){
        $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
        $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
        update();
    }
});

d3.json("data/coins.json").then(function(data){
	console.log(data)

    // Prepare and clean data
    filteredData = {};
    for (var coin in data) {
        if (!data.hasOwnProperty(coin)) {
            continue;
        }
        filteredData[coin] = data[coin].filter(function(d){
            return !(d["price_usd"] == null)
        })
        filteredData[coin].forEach(function(d){
            d["price_usd"] = +d["price_usd"];
            d["24h_vol"] = +d["24h_vol"];
            d["market_cap"] = +d["market_cap"];
            d["date"] = parseTime(d["date"])
        });
    }

    // Run the visualization for the first time
    update();
})