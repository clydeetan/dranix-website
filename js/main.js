var image = {
  url: 'img/dranix_pointer.png',
  size: new google.maps.Size(20, 32),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(0, 32)
};

var markers = [
  ['Calbayog Branch', 12.0676, 124.5930, 5],
  ['Tacloban Branch', 11.1913158, 125.0031254, 4],
  ['Ormoc Branch', 10.977378, 124.631539, 3],
  ['Bohol Branch', 9.8500, 124.1435, 2],
  ['Tagunol Branch', 10.283349, 123.866525, 8],
  ['Paknaan Branch', 10.345964, 123.956950, 1],
  ['Tayud Branch', 10.348997, 123.922271, 9],
  ['Masbate Branch', 12.3719152,123.6361883, 10],
  ['Legazpi Branch', 13.157424, 123.750235, 11],
  ['Bicol Branch', 13.4210, 123.4137, 7],
  ['Lucena Branch', 13.943502, 121.613877, 12]
];
                      
var infoWindowContent = [
  ['<div class="card">' + '<div class="card-header">Sitio Talahib, P-8 Brgy Trinidad Calbayog City</div>' + '<p class="card-text text-center p-2">(055) 533-9885</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Brgy. 82 KM 7 Marasbaras Tacloban City</div>' + '<p class="card-text text-center p-2">(53) 323-2679</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Chulliante Compound, Sitio San Roque, Brgy. Ipil, Ormoc City</div>' + '<p class="card-text text-center p-2">(53) 561-2293, (53) 561-1668</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">P. Castillo St., Purok 1, Dao District, Tagbilaran City, Bohol</div>' + '<p class="card-text text-center p-2">(038) 427-1944, (0917) 501-2147</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Rizal Ave Ext., Antuwanga, Cebu City, Cebu</div>' + '<p class="card-text text-center p-2">(032) 273 2375</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Antonio Bryan Development Corporation M8 S. Jayme Street, Zone Pechay, Paknaan Mandaue City</div>' + '<p class="card-text text-center p-2">(032) 420-4151, (032) 420-4152, (032) 420-6502, 420-6601 (032) 520-8541</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Sitio Binabag, Brgy. Tayud Consolacion, Cebu</div>' + '<p class="card-text text-center p-2">(000) 000-0000</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Lim Warehouse Pinamarbuhan, Mobo Masbate City</div>' + '<p class="card-text text-center p-2">(56) 333-1671, (0917) 139-2083</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Sunwest Compound #333 Peñaranda Extension, Bonot Legazpi City</div>' + '<p class="card-text text-center p-2">(052) 480-1326</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">PNRDC Bldg. New San Roque Pili</div>' + '<p class="card-text text-center p-2">(54) 477-7373, (54) 477-7377, (0917) 771-1524</p>' + '</div>'],
  ['<div class="card">' + '<div class="card-header">Maharlika Highway Brgy Isabang Lucena City</div>' + '<p class="card-text text-center p-2">(042) 710-8011, (042) 373-1145, (042) 717-3512</p>' + '</div>'],
];

function initMap() {
  var myCenter = new google.maps.LatLng(12.2674, 122.5260);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 7};
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

  var infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < markers.length; i++){
    var marker = new google.maps.Marker({
      icon: image,
      position: new google.maps.LatLng(markers[i][1], markers[i][2]),
      map:map,
      title: markers[i][0] + ", Click for more info", 
      animation:google.maps.Animation.BOUNCE
    });

  google.maps.event.addListener(marker, 'click', (function(marker, i){
    return function(){
      infowindow.setContent(infoWindowContent[i][0]);
      infowindow.open(map, marker);
    }
  })(marker,i));
  }
}
