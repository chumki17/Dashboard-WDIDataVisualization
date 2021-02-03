function bubbleChart(){
  d3.selectAll("svg").remove();
  d3.selectAll("tr").remove();
  d3.selectAll("th").remove();
  d3.selectAll("h2").remove();



d3.csv("Alldata.csv",function(d)
          {return d },plot_bubble);


function plot_bubble(data){
  
  var margin = {top: 40, right: 150, bottom: 60, left: 20},
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var svg = d3.select("body")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + (margin.left+100) + "," + (margin.top + 20)+ ")");

  var x = d3.scale.linear().domain([30,150])
  .range([ 0, width ]);
    
  var y = d3.scale.linear().range([height, 0]).domain([45,90]);
  
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(5);
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height+ ")")
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

  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2)
      .attr("y", height+40 )
      .text("Employment");

  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Life expectancy")
      .attr("text-anchor", "start")

  var z = d3.scale.sqrt()
    .domain([200000, 1310000000])
    .range([ 2, 30]);

  var myColor = d3.scale.category10()   
     .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])

  var tooltip = d3.select("body")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.Country)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }


  var highlight = function(d){
    d3.selectAll(".bubbles").style("opacity", .05)
    d3.selectAll("."+d).style("opacity", 1)
  }

  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }


Asia =["AFG", "ARM" , "AZE", "BHR", "BGD", "BTN","BRN", "KHM", "CHN","CYP",	"GEO",	"HKG",	
"IND",	"IDN",	"IRN",	"IRQ",	"ISR",	"JPN",	"JOR",	"KAZ",	"PRK",	"KOR",	"KWT",	
"KGZ",	"LAO",	"LBN",	"MAC",	"MYS",	"MDV",	"MNG",	"MMR",	"NPL","OMN"	, "PAK",	"PSE",
"PHL",	"QAT",	"SAU",	"SGP",	"LKA",	"SYR",	"TWN",	"TJK",	"THA"	,"TLS",	"TUR",	"TKM",
"ARE",	"UZB",	"VNM",	"YEM"];

Africa=["DZA","AGO","BEN","BWA","IOT","BFA","BDI","CPV","CMR","CAF","TCD","COM","COG","COD","CIV",
"DJI","EGY","GNQ","ERI","SWZ","ETH","ATF","GAB","GMB","GHA","GIN","GNB","KEN","LSO","LBR",
"LBY","MDG","MWI","MLI","MRT","MUS","MYT","MAR","MOZ","NAM","NER","NGA","REU","RWA","SHN","STP",
"SEN","SYC","SLE","SOM","ZAF","SSD","SDN","TZA","TGO","TUN","UGA","ESH","ZMB","ZWE"];

Europe=["ALA","ALB","AND","AUT","BLR","BEL","BIH","BGR","HRV","CZE","DNK","EST","FRO","FIN","FRA","DEU",
"GIB","GRC","GGY","VAT","HUN","ISL","IRL","IMN","ITA","JEY","LVA","LIE","LTU","LUX","MLT","MDA","MCO","MNE",
"NLD","MKD","NOR","POL","PRT","ROU","RUS","SMR","SRB","SVK","SVN","ESP","SJM","SWE","CHE","UKR","GBR"];

Oceania =["ASM","AUS","CXR","CCK","COK","FJI","PYF","GUM","HMD","KIR","MHL","FSM","NRU","NCL","NZL","NIU",
"NFK","MNP","PLW","PNG","PCN","WSM","SLB","TKL","TON","TUV","UMI","VUT","WLF"];

Americas =["AIA","ATG","ARG","ABW","BHS","BRB","BLZ","BMU","BOL","BES","BVT","BRA","CAN","CYM","CHL","COL",
"CRI","CUB","CUW","DMA","DOM","ECU","SLV","FLK","GUF","GRL","GRD","GLP","GTM","GUY","HTI","HND","JAM","MTQ",
"MEX","MSR","NIC","PAN","PRY","PER","PRI","BLM","KNA","LCA","MAF","SPM","VCT","SXM","SGS","SUR","TTO","TCA",
"USA","URY","VEN","VGB","VIR"];

function update(year) {

  //filter data for specified year
 var filtered=data.filter(function(d) {if ( d['Year'] == year){return d;}})
console.log(data);

d3.selectAll("g >#the_one_circle").remove();

var cont = ""; var val1 = 0; var val2 = 0; var val3 = 0;
  // Add dots

 svg.append('g')
  .selectAll("dot")
  .data(filtered).enter().append("circle")
  
  .attr("id","the_one_circle")
      .attr("class", function(d) { 
       
        for(i=0;i< 51;i++){
            if (d.ID == Asia[i]){
                cont = "Asia";
            }
        }
        for(i=0;i< 60;i++){
            if (d.ID == Africa[i]){
                cont = "Africa";
            }
        }

        for(i=0;i< 51;i++){
            if (d.ID == Europe[i]){
                cont = "Europe";
            }
        }

        for(i=0;i< 57;i++){
            if (d.ID == Americas[i]){
                cont = "Americas";
            }
        }

        for(i=0;i< 29;i++){
            if (d.ID == Oceania[i]){
                cont = "Oceania";
            }
        }
        console.log("bubbles " + cont)
        return "bubbles " + cont;
    
    })
      .attr("cx", function (d) { return x(d.Employment); } )
      .attr("cy", function (d) { return y(d.life_expectancy); } )
      .attr("r", function (d) { return z(d.Population); } ) 
      .style("fill", function(d){ 
        for(i=0;i< 51;i++){
            if (d.ID == Asia[i]){
                cont = "Asia";
            }
        }
        for(i=0;i< 60;i++){
            if (d.ID == Africa[i]){
                cont = "Africa";
            }
        }

        for(i=0;i< 51;i++){
            if (d.ID == Europe[i]){
                cont = "Europe";
            }
        }

        for(i=0;i< 57;i++){
            if (d.ID == Americas[i]){
                cont = "Americas";
            }
        }

        for(i=0;i< 29;i++){
            if (d.ID == Oceania[i]){
                cont = "Oceania";
            }
        }  
        
        return myColor(cont)})

    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )
    
      }

      d3.select('#slider3').call(d3.slider()
      .axis(true).min(2007).max(2018).step(1)
      .on("slide", function( evt,value) { 
                  update(value);}));

      update(2007);

    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 800
    var xLabel = 850
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return height - 100 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return height - 100 - z(d) } )
        .attr('y2', function(d){ return height - 100 - z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 100 - z(d) } )
        .text( function(d){ return d/1000000 } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    svg.append("text")
      .attr('x', xCircle)
      .attr("y", height - 100 +30)
      .text("Population (M)")
      .attr("text-anchor", "middle")

    var size = 20
    var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 800)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 800 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
      }
    
}
