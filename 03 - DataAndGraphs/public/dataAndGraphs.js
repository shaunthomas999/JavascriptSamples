/**
 *
 * Highchart configuration
 */
var options = {
  chart: {
    renderTo: "container",
    defaultSeriesType: "line"
  },
  title: {
    text: "Responses"
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    title: {
      text: "Percentage %"
    }
  },
  tooltip: {
    valueSuffix: '%'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: [{
    "name": "Yes",
    "data": []
  }]
};

/**
 * Map to store data from csv file (bcz map is used, correct chart can be made even if the dates in the csv file are
 * not in order)
 * - Keys of the map are the dates (first column of csv file)
 * - Value is an object of form {"yesCount": value, "totalCount": value}
 * @type {Map}
 */
var dataMap = new Map();

/**
 * This function creates a map with dates as keys and corresponding yes and total count as values
 * @param itemKey [String] - Date (first column) from csv file
 * @param yesAnswer [Boolean] - true if the entry is yes (third column) in the csv file
 */
var dataMapper = function(itemKey, yesAnswer) {
  if(dataMap.has(itemKey)) { // Date is already added to Map
    var dataMapValueObj = dataMap.get(itemKey);
    dataMapValueObj.totalCount += 1;
    if(yesAnswer) dataMapValueObj.yesCount += 1;
    dataMap.set(itemKey, dataMapValueObj);
  }
  else { // Date doesn't exists in the Map
    dataMap.set(itemKey, {"yesCount": yesAnswer ? 1 : 0, "totalCount": 1});
  }
};

/**
 * - document.ready handler
 * - This function loads the csv data, process it and creates the chart
 */
$(function() {
  $.get("data.csv", function(data) {
    // Split the lines
    var lines = data.split('\n');

    // Iterate over the lines and populate data into dataMap with the help of dataMapper function
    $.each(lines, function(lineNo, line) {
      var items = line.split(';'); // Split based on separator in csv file

      if (lineNo != 0) { // Ignore the first line
        if((String(items[2]).trim()) === "yes") {
          dataMapper(items[0], true);
        }
        else if((String(items[2]).trim()) === "no"){
          dataMapper(items[0], false);
        }
      }
    });

    // Iterate over the map, calculate percentage and assign values to be shown in the chart
    dataMap.forEach(function(value, key, map) {
      options.xAxis.categories.push(key);
      // Calculate percentage and store it
      options.series[0].data.push((value.yesCount*100)/value.totalCount);
    });

    // Create the chart
    var chart = new Highcharts.Chart(options);
  });
});