mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhncmV2eSIsImEiOiJjbDFwZHg2YzkwMTVqM2lzeTgxa29waDNnIn0.8fJhOwF_qreAF9cEeVNUMw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/sarahgrevy/cl45rpw2w000k15mpdio87vrt', // style URL
zoom: 4.8, // starting zoom
center: [-119.961425, 36.772802] // starting center


});



   



map.on('load', function() {
  map.addLayer(
    {
      id: 'country',
      source: {
        type: 'geojson',
        data: "data/cali3.geojson",
      }, 
      
      type: 'fill',
      paint: {

        'fill-color': {
          property: 'text_new',
          stops: [  [0, '#FFFFFF'],  [1, ' #8b0000']
        ]
          } 
          
          

      },

      
    }, 
    
    
  );


  // map.addLayer({
  //   'id': 'cali',
  //   'type': 'fill',
  //   'source': 'data/cali3.geojson', // reference the data source
  //   'layout': {},
  //   'paint': {
  //   'fill-color': '#0080ff', // blue color fill
  //   'fill-opacity': 0.5
  //   }
  //   });

    // Add a black outline around the polygon.
  map.addLayer(
    {
    'id': 'outline',
    'type': 'line',
    source: {
      type: 'geojson',
      data:    'data/cali3.geojson',
    },
   
    'layout': {},
    'paint': {
    'line-color': '#000',
    'line-width': 1
    }
    });

    // map.addLayer(
    //   {
    //     id: "hej",
    //     type: "line",
    //     source: {
    //       type: "geojson",
    //       data: "data/cali3.geojson",
    //     },
    //     minzoom: 6,
    //     paint: {
    //       "line-color": "#ffffff",
    //       "line-width": 0.25,
    //     },
    //   },

    // );
  
})


  




  // This final argument indicates that we want to add the Boundaries layer
  // before the `waterway-label` layer that is in the map from the Mapbox
  // Light style. This ensures the admin polygons will be rendered on top of



map.on("click", "country", function (e) {
  var diff = e.features[0].properties['Mean cRPS percentile within state'].toFixed(2) *100
 

  var country = e.features[0].properties.NAME_x;

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
        <h3>
        ${country} 
        </h3>
        <p>
            <b>${diff}</b> % general consequences of fire (CRPS) compared to other homes within California

    `
    )
    .addTo(map);
})

map.on("mouseenter", "country", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "country", function () {
  map.getCanvas().style.cursor = "";
});

// create legend




