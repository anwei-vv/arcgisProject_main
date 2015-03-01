/*global require*/
require([
  'controllers/appcontroller',
  'services/mapservices',
  'dojo/domReady!'
], function (appCtrl, mapServices) {

  console.debug('DEBUG - Starting application');

  var startExtent

  appCtrl.init({
    elem: 'map-div',
    mapOptions: {
      basemap: 'streets',
      center: [-72.946,40.857],
      zoom: 12
    },
    layers: mapServices.loadServices()
  });

});
