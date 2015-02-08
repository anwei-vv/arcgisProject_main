/*global require*/
require([
  'controllers/appcontroller',
  'services/mapservices',
  'dojo/domReady!'
], function (appCtrl, mapServices) {

  console.debug('DEBUG - Starting application');
  appCtrl.init({
    elem: 'map-div',
    mapOptions: {
      basemap: 'streets',
      center: [-73.987,40.749],
      zoom: 12
    },
    layers: mapServices.loadServices()
  });

});
