var map = L.map("map", {
   center: [-1.286389,36.817223 ],
   zoom: 6,
   editable: true,
   editOptions: {}
});

var nairobi = L.marker([-1.286389,36.817223]).bindPopup('This is Nairobi');
var kisumu = L.marker([-0.091702,34.767956]).bindPopup('This is Kisumu');
var mombasa = L.marker([-4.043740,39.658871]).bindPopup('This is Mombasa');

var cities = L.layerGroup([nairobi, kisumu, mombasa]);

var tile1="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var tile2="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png";
var tile3="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

var streets = L.tileLayer(tile1, {
   attribution:'BIG_BEN_GEO'
}).addTo(map);

var satellite = L.tileLayer(tile2, {
   attribution:'BIG_BEN_GEO'
});

var satellite2 = L.tileLayer(tile3, {
   attribution:'BIG_BEN_GEO'
});

var baseMaps = {
  "Satellite": satellite,
  "Satellite2":satellite2,
  "Streets": streets
};

var style = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

 function pop_style(feature) {
   switch (feature.properties.COUNTY) {
      case 'Nairobi': return {'color': '#ff0000'};
      case 'Mombasa': return {'color': '#0000ff'};
      case 'Kisumu': return {'color': '#ff8400'};
      default:
         return {
            'color':'#00ff00',
            'opacity':1,
            'weight':2
         };
   }
}


function pop_features(feature, layer) {
   var popupContent = 
   '<table class="table">'+
      '<tbody>'+
         '<tr>'+
            '<th>'+'County'+'</th>'+
            '<td>'+feature.properties.COUNTY+'</td>'+
         '</tr>'+
         '<tr>'+
            '<th>'+'Population'+'</th>'+
            '<td>'+feature.properties.Total_Pop+'</td>'+
         '</tr>'+
      '</tbody>'+
   '</table>';
   layer.bindPopup(popupContent);
}
var counties = L.geoJson(censusData, {'style':pop_style, onEachFeature:pop_features}).addTo(map);

// Initialise the reachability plugin
L.control.reachability({
   // add settings/options here
   apiKey: '5b3ce3597851110001cf6248279b92fbae9e4a26912535a4df2861cd',
}).addTo(map);


function health_features(feature, layer) {
   var popupContent = 
   '<table class="table">'+
      '<tbody>'+
         '<tr>'+
            '<th>'+'Health Facility'+'</th>'+
            '<td>'+feature.properties.F_NAME+'</td>'+
         '</tr>'+
         '<tr>'+
            '<th>'+'Region'+'</th>'+
            '<td>'+feature.properties.Province+'</td>'+
         '</tr>'+
         '<tr>'+
         '<th>'+'County'+'</th>'+
         '<td>'+feature.properties.District+'</td>'+
         '</tr>'+
         '<tr>'+
            '<th>'+'Division'+'</th>'+
            '<td>'+feature.properties.Division+'</td>'+
         '</tr>'+
         '<tr>'+
            '<th>'+'Sublocation'+'</th>'+
            '<td>'+feature.properties.Sub_Locati+'</td>'+
         '</tr>'+
         '<tr>'+
            '<th>'+'Agency'+'</th>'+
            '<td>'+feature.properties.Agency+'</td>'+
         '</tr>'+
      '</tbody>'+
   '</table>';
   layer.bindPopup(popupContent);
}

var markers = new L.MarkerClusterGroup();
var health_facilities = L.geoJson(health, { onEachFeature:health_features});
var hf = markers.addLayer(health_facilities);
// map.addLayer(markers);

counties.on('click', function(e){
    selectedCounty = e.layer.feature.properties;
    displaySelected();
});

function displaySelected() {
    var cont = `
   <h4>${selectedCounty.COUNTY} County statistics</h4>
   <table class="table">
      <tbody>
         <thead>
         <tr><td><h6>Property</h6></td><td><h6>Value</h6></td></tr>
         </thead>
         <tr>
         <th>Total Population</th>
         <td>${selectedCounty.Total_Pop}</td>
         </tr>
      </tbody>
   </table>
`
    $("#selected").html(cont);
}

var vectors = {
   "Health Facilities": hf,
  "Cities": cities
};

L.control.layers(baseMaps, vectors).addTo(map);

// var greenIcon = L.icon({
//     iconUrl: 'images/leaf-green.png',
    

//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// L.marker([-4.043740,39.658871], {icon: greenIcon}).addTo(map);

// var redIcon = L.icon({
//     iconUrl: 'images/leaf-red.png',
    

//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// L.marker([-1.286389,36.817223], {icon: redIcon}).addTo(map);

// var orangeIcon = L.icon({
//     iconUrl: 'images/leaf-orange.png',
    

//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// L.marker([-0.091702,34.7679561], {icon: orangeIcon}).addTo(map);
