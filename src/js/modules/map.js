var map = {
	
	load: () => {
		/*var map_load = false;
		
		function map_create() {
			map_load = true
			$.getScript( 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', function( data, textStatus, jqxhr ) {
				ymaps.ready(function () {
					$('.js-map').each(function() {

						var position1 = $(this).data('len');
						var position2 = $(this).data('lng');

						let len = Number(position1), lng = Number(position2), thisID = $(this).attr('id');
						var myMap = new ymaps.Map(thisID, {
							// 
							center: [len, lng],
							zoom: 16,
							controls: []
						}, {
							searchControlProvider: 'yandex#search'
						}),

						myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
						}, {
							iconLayout: 'default#image',
							iconImageHref: '/app/img/mark.png',
							iconImageSize: [80, 108],
							iconImageOffset: [-50, -110]
						});

						myMap.geoObjects.add(myPlacemark);
						myMap.behaviors.disable('scrollZoom');
						myMap.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullsxreenControl').remove('rullerControl');

						myMap.controls.add('zoomControl', {
							float: 'none',
							position: {
								right: 10,
								top: 50
							}
						});

						myMap.container.fitToViewport();				
					})			

				});
			});  
		}
		
		map_create();
		
		$(window).on('load', function(){
	
			setTimeout(function(){
				map_create();
			},1000);
		});	*/
		
		
		$('.js-map').each(function(){
			//Местоположение: долгота, широта и коэффициент увеличения
			
			var latitude = $(this).data('len'),

				longitude = $(this).data('lng'),
				
				mapId = $(this).attr('id'),

				map_zoom = 16;



			//Адрес к иконке с маркером

			var marker_url = '/app/img/marker.svg';
			
			if ( $(window).width() < 666 ) {
				marker_url = '/app/img/marker_mobile.svg';
			}

			//Стили для элементов на карте

			var style= [
			  {
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#1d2c4d"
				  }
				]
			  },
			  {
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#8ec3b9"
				  }
				]
			  },
			  {
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
					"color": "#1a3646"
				  }
				]
			  },
			  {
				"featureType": "administrative.country",
				"elementType": "geometry.stroke",
				"stylers": [
				  {
					"color": "#4b6878"
				  }
				]
			  },
			  {
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#64779e"
				  }
				]
			  },
			  {
				"featureType": "administrative.province",
				"elementType": "geometry.stroke",
				"stylers": [
				  {
					"color": "#4b6878"
				  }
				]
			  },
			  {
				"featureType": "landscape.man_made",
				"elementType": "geometry.stroke",
				"stylers": [
				  {
					"color": "#334e87"
				  }
				]
			  },
			  {
				"featureType": "landscape.natural",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#023e58"
				  }
				]
			  },
			  {
				"featureType": "poi",
				"stylers": [
				  {
					"visibility": "off"
				  }
				]
			  },
			  {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#283d6a"
				  }
				]
			  },
			  {
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#6f9ba5"
				  }
				]
			  },
			  {
				"featureType": "poi",
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
					"color": "#1d2c4d"
				  }
				]
			  },
			  {
				"featureType": "poi.park",
				"stylers": [
				  {
					"visibility": "off"
				  }
				]
			  },
			  {
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
				  {
					"color": "#023e58"
				  }
				]
			  },
			  {
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#3C7680"
				  }
				]
			  },
			  {
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#304a7d"
				  }
				]
			  },
			  {
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#98a5be"
				  }
				]
			  },
			  {
				"featureType": "road",
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
					"color": "#1d2c4d"
				  }
				]
			  },
			  {
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#2c6675"
				  }
				]
			  },
			  {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
				  {
					"color": "#255763"
				  }
				]
			  },
			  {
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#b0d5ce"
				  }
				]
			  },
			  {
				"featureType": "road.highway",
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
					"color": "#023e58"
				  }
				]
			  },
			  {
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#98a5be"
				  }
				]
			  },
			  {
				"featureType": "transit",
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
					"color": "#1d2c4d"
				  }
				]
			  },
			  {
				"featureType": "transit.line",
				"elementType": "geometry.fill",
				"stylers": [
				  {
					"color": "#283d6a"
				  }
				]
			  },
			  {
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#3a4762"
				  }
				]
			  },
			  {
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#0e1626"
				  }
				]
			  },
			  {
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#4e6d70"
				  }
				]
			  }
			];


			var center_latitude = latitude,

				center_longitude = longitude;



			var map_options = {

				center: new google.maps.LatLng(center_latitude, center_longitude),

				zoom: map_zoom,

				panControl: false,

				mapTypeControl: false,

				streetViewControl: false,

				mapTypeId: google.maps.MapTypeId.ROADMAP,

				styles: style

			}
			
			
			//Инициализация карты

			var map = new google.maps.Map(document.getElementById(mapId), map_options);

			//Добавляем свой маркер местонахождения на карту (свою иконку)			
			
			var marker = new google.maps.Marker({

				position: new google.maps.LatLng(latitude, longitude),

				map: map,

				visible: true,

				icon: marker_url,

			});
		});
	},

	init: () => {
		
		map.load();
		
	}
}

export { map }