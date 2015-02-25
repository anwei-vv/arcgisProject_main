/*global define*/
/*jshint laxcomma:true*/
define([
  'esri/layers/FeatureLayer',
  'esri/renderers/SimpleRenderer',
  'utils/symbolUtil'
], function(FeatureLayer, SimpleRenderer, symbolUtil) {
    var CENSUS_URL = 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CensusLaborDemo/FeatureServer/1'
        , ACCIDENT_URL = 'http://services.arcgis.com/mIRSReQJgSMOKzQ2/arcgis/rest/services/Accident_Report/FeatureServer/0'
        , VIVIDATA_URL = 'http://services1.arcgis.com/ZhjKRreEd5wQZMXX/arcgis/rest/services/ViviLayer/FeatureServer/0'
        , COLLISION_URL = 'http://services1.arcgis.com/ZhjKRreEd5wQZMXX/arcgis/rest/services/GIS_TS_ACCIDENT_REPORT_data_layer/FeatureServer/0';

  function loadServices(config) {
    var layers = []
    // census tract
      , censusLayer = new FeatureLayer(CENSUS_URL, {
            id: 'Census'
        })
//      , accidentLayer = new FeatureLayer(ACCIDENT_URL, {
//                id: 'Accidents',
//                mode: FeatureLayer.MODE_ONDEMAND,
//                outFields: ['*']
//         })
//      , viviDataLayer = new FeatureLayer(VIVIDATA_URL, {
//          id: 'ViviData',
//          mode: FeatureLayer.MODE_ONDEMAND,
//          outFields: ['*']
//      })
        , collisionDataLayer = new FeatureLayer(COLLISION_URL, {
              id: 'collisionData',
              mode: FeatureLayer.MODE_ONDEMAND,
              outFields: ['*']
          })

    // feature renderer
      , renderer = new SimpleRenderer(symbolUtil.renderSymbol());

    censusLayer.setRenderer(renderer);

    layers.push(censusLayer);
//    layers.push(accidentLayer);
//    layers.push(viviDataLayer);
      layers.push(collisionDataLayer);
    return layers;
  }

  return {
    loadServices: loadServices
  };

});
