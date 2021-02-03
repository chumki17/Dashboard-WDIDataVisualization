function plotChoropleth() {
    d3.selectAll("svg").remove();
    d3.json("world-110m-cia.json", draw);
}


function draw(geo_data) {
    "use strict";
    
    var margin = 70,
        width = 1200 - margin,
        height = 600 - margin;
    

    var tooltip = d3.select("body").append("div").attr("class", "tooltip hidden");


    var offsetL = 30;
    var offsetT =30;
    
    //create title
    d3.select("body")
      .append("h2")
      .text("Total Population by Country 2007");
  

    var projection = d3.geo.mercator().translate([0,0]).scale((width -350) /2/ Math.PI);
    var path = d3.geo.path().projection(projection);

    //create svg and append structures for map creation & fill
    
    var svg = d3.select("body").append("svg").attr("width", width + margin)
        .attr("height", height + margin).attr("margin-top","5cm");

    var outterg = svg.append("g")
        .attr("transform", "translate(" + (width+300) / 2 + "," + (height - 100)+ ")");

    var g = outterg.append("g").attr("id", "innerg");
    var  columnlist=["Country", "Population"];

    g.append("path").attr("d", path);
      var topo = topojson.feature(geo_data, geo_data.objects.countries).features
    var country = d3.select("#innerg").selectAll(".country").data(topo);
    
        country.enter().insert("path").attr("class", "country")
                  .attr("d", path)
                  .attr("id", function(d,i) { return d.id; })
                  
                  .attr("title", function(d,i) { return d.properties.name; })
                  .style("fill", "white")
                  .style("stroke", "#111")
                  .attr("class", "country")
                  .attr("d", path)
                  .attr("id", function(d,i) { return d.id; })
                  
                  .attr("title", function(d,i) { return d.properties.name; }) ;
//append table that will show top 10 coffee producers per year
    var table = d3.select("body").append("table")
        .attr("style", "margin-left: 100px")
        .attr("class","table")
        .attr("style", "position:absolute; bottom:10px;left:10px"),
            thead = table.append("thead"),
            tbody = table.append("tbody");
            thead.append("th")
 // append the header row
 
  function plot_points(data) {

    ///take maximum population value from file
         var population_max = d3.max(data, function(d) {
            return +d.Population;});
        var population_min = d3.min(data, function(d) {
            return +d.Population;});
        
          ////color scale for shading based on logarithmic scale
         var color = d3.scale.log().domain([population_min, population_max])
         .range(["white", /*"#08306B"*/"steelblue"]); //#2B0F0E
                
      function update(year) {
                
          d3.select("h2").text("Total Population by Country "+year);


          //filter data for specified year
         var filtered=data.filter(function(d) {if ( d['Year'] == year){return d;}})
         var filteredsorted = filtered.sort(function(a,b) { 
              return d3.descending(+a.Population,+b.Population);});  
              
        
         var PopulationByID=d3.map();
          
          //select ISO and ID data from filtered data
             filtered.forEach(function(f) {
                PopulationByID.set(f['ID'],f['Population']);
                });
          
          
         var countryset = d3.set();
         filtered.forEach(function(d) {
              countryset.add(d['ID']);});
        
            
        
          //update country fill to map, and update tooltip to allow for display of Population
          //upon mouse rollover
        
              country.attr("population", function(d){
                         if(countryset.values().indexOf(d.properties.iso) !== -1) {
                         return PopulationByID.get(d.properties.iso);}
                         else {return 0}})
                         .style("fill", function(d){
                         if(countryset.values().indexOf(d.properties.iso) !== -1) {
                         return color(PopulationByID.get(d.properties.iso));}
                         else {return color(0)}})
                     .on("mousemove", function(d,i) {
                              var mouse = d3.mouse(svg.node()).map( function(d) 
                              { return parseInt(d); } );
                              var pop = ' | Population: '
                              +parseInt(PopulationByID.get(d.properties.iso));

                              tooltip.classed("hidden", false)
                     .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"
                     +(mouse[1]+offsetT)+"px")
                     .html(d.properties.name+pop);})
                     .on("mouseout",  function(d,i) {
                        tooltip.classed("hidden", true);});
                      
         // Add rows to table containing population data
        function tabulate(data, columns) {
                        d3.selectAll("tr").remove();


                 thead.select("th")
                    .text("Top 10 Population countries for "+year)
                    .attr("class","columnsclass")
                    .attr("colspan",2)
                 thead.append("tr")
                      .selectAll("th")
                      .data(columnlist)
                      .enter()
                      .append("th").attr("width",130)
                      .text(function(column) { return column; });



// create a row for each object in the data
                 var rows = tbody.selectAll("tr")
                    .data(data)
                    .enter()
                    .append("tr")
                    .attr("class","dataitems");

// create a cell in each row for each column
                var cells = rows.selectAll("td")
                    .data(function(row) {
                        return columns.map(function(column) {
                            return {column: column, value: row[column]};
                        });
                    })
                    .enter()
                    .append("td")
                    .attr("style", "font-family: Raleway") // sets the font style
                        .html(function(d) { return d.value; })
                        .attr("class",function(d) { return d.value; });

    return table;
        }


        function readCol(data, columns){
            d3.select("#the_SVG_ID").remove();
            var margin = {top: 10, right: 10, bottom: 50, left: 50},
            width = 200 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

            var color = "steelblue";

            var colorScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.Population; })])
            .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
    
    var y = d3.scale.linear().range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

            var svg = d3.select("body").append("svg")
            .attr("id","the_SVG_ID")
            .attr("width", (width) + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                "translate(" +(margin.left) + "," + margin.top + ")");


    x.domain(data.map(function(d) { return d.ID; }));
    y.domain([0, d3.max(data, function(d) { return d.Population; })]);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.2em")
        .attr("transform", "rotate(-90)" );
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
   
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .style("fill", function(d) { return colorScale(d.Population) })
        .attr("x", function(d) { return x(d.ID); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.Population); })
        .attr("height", function(d) {return height - y(d.Population); });  
        
        
        }


        var graph = readCol(filteredsorted.slice(0,10), columnlist);
    // render the table
        var peopleTable = tabulate(filteredsorted.slice(0,10), columnlist);
        }
        
        ///set initial year to 2007 to load data  
        update("2007");
       
        
        
        ///set up slider above map, and parameters for slider, which will run update function
        d3.select('#slider3').call(d3.slider()
            .axis(true).min(2007).max(2018).step(1)
            .on("slide", function( evt,value) { 
                        update(value);}));
                         var w = 160, h = 400;

        //set up legend on upper left
        var key = d3.select("body")
        .append("svg")
        .attr("id", "key")
        .attr("width", w)
        .attr("height", h)
        .attr("style", "position:absolute; top:50px; right:20px");

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "100%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");
            legend
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "steelblue")   //#2B0F0E
            .attr("stop-opacity", 1);
            legend.
            append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 1);

            key.append("rect")
            .attr("width", w - 120)
            .attr("height", h - 100)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(0 ,10)");

        var y = d3.scale.log().range([300, 0]).domain([1, 1392730000]);

        var yAxis = d3.svg.axis();
            yAxis.scale(y).orient("right").tickFormat
                      (function (d) {return y.tickFormat(4,d3.format(",d"))(d)});
                    key.append("g")
                    .attr("class", "yaxis")
                    .attr("transform", "translate(41,10)")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 30)
                    .attr("dy", "2.75em")
                    .style("text-anchor", "end")
                    // .text("thousand 60kg bags");
                //end legend

            
            
            
            
            
            
            
            }

      d3.csv("Alldata.csv",function(d)
      {return d },plot_points);
}