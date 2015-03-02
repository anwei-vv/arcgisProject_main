/*global define */
/*jshint laxcomma: true*/
define([
    'dojo/_base/declare','dojo/_base/lang','dojo/dom','dojo/on','dojo/_base/array',
    'controllers/mapcontroller',
    'widgets/edit/editTools','esri/toolbars/edit','esri/dijit/editing/Editor',
    'esri/dijit/editing/TemplatePicker','esri/dijit/Geocoder','esri/tasks/GeometryService','esri/dijit/Measurement',
    'esri/domUtils','esri/config',
    'esri/IdentityManager'


], function (decalre, lang, dom, on, array,
             MapController, EditTools, Edit, Editor,
             TemplatePicker, Geocoder,  GeometryService, Measurement,
             domUtils,esriConfig) {

    var url = 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer';

    function mapLoaded(map) {
        //var editTools = new EditTools({
        //  map: map
        //}, 'map-tools');


        esriConfig.defaults.geometryService = new GeometryService(url);

         var requestLayer
            , layers = []
            , templatePicker
            , geocoder
            ,measurement;

        requestLayer = map.getLayer('collisionData');
        layers.push(requestLayer);

        templatePicker = new TemplatePicker({
            featureLayers: layers,
            rows: 'auto',
            columns: 1
        }, "template-div");
        templatePicker.startup();

        geocoder = new Geocoder({
            map: map,
            autocomplete:true,
            arcgisGeocoder:{
                name: "Esri World Geocoder",
                suffix: "Brookhaven, NY"
            }
        }, "search");
//        geocoder.autofocus = false;
        geocoder.startup();

        measurement = new Measurement({
            map: map
        }, 'measurement-div');
//        domUtils.hide(dom.byId('measurement-div'));
       measurement.startup();


        var layerInfos = array.map(layers, function(layer) {
            return {
                featureLayer: layer
            };
        });

        var settings = {
            map: map,
            templatePicker: templatePicker,
            layerInfos: layerInfos
        };
        var params = { settings: settings };
        var editorWidget = new Editor(params);
        editorWidget.startup();

//        on(
//            dom.byId('measurement-toggle'),
//            'click',
//            lang.hitch(this, 'toggleMeasurement')
//        );
    }

    function _init(config) {

        //esriConfig.defaults.io.proxy = '/proxy/proxy/php';

        var mapCtrl = new MapController(config);

        mapCtrl.load().then(mapLoaded);
    }

    function toggleMeasurement(e){
        e.preventDefault();
        domUtils.toggle(this.measurement.domNode);
    }

    return {
        init: _init
    };

});