function MapWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'mapWidget';

    /**
     * @type {ol.Map}
     */
    this.map = undefined;

    /**
     * @type {ol.geom.Point}
     */
    this.marker = undefined;

    /**
     * @type {ol.Feature}
     */
    this.markerFeature = undefined;

    /**
     * @type {ol.geom.Polygon}
     */
    this.polygon = undefined;

    this.init = function ()
    {

        this.subscriber = new Subscriber(GeoPositionMessage.topic, 5, 'MapWidget', this.handleMessage);
        this.subscriber.register();

        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({source: new ol.source.OSM()})
            ],
            view: new ol.View({
                zoom: 16
            }),
            target: this.segmentId
        });
        this.initMarkerLayer();
        this.initPolygonLayer();
        this.render(new GeoPosition(47.625347, 13.458292));
        this.render(new GeoPosition(48.625347, 12.458292));
    };

    /**
     * @param {GeoPositionMessage} message
     */
    this.handleMessage = function (message)
    {
    };

    /**
     * @param {GeoPosition} currentPosition
     */
    this.render = function (currentPosition)
    {
        var coordinates = ol.proj.fromLonLat([currentPosition.longitude, currentPosition.latitude]);

        if (this.marker != undefined) {
            var polygonCoordinates = this.polygon.getCoordinates()[0];
            polygonCoordinates.push(this.marker.getCoordinates());
            this.polygon.setCoordinates([polygonCoordinates]);
            this.marker.setCoordinates(coordinates);
        } else {
            this.marker = new ol.geom.Point(coordinates);
            this.markerFeature.setGeometry(this.marker);
        }

        this.map.getView().setCenter(coordinates);
    };
    
    this.initPolygonLayer = function ()
    {
        this.polygon = new ol.geom.Polygon([[]]);
        var feature = new ol.Feature(this.polygon);

        var vectorSource = new ol.source.Vector();
        vectorSource.addFeature(feature);

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        this.map.addLayer(vectorLayer);
    };

    this.initMarkerLayer = function ()
    {
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 1],
                scale: 0.3,
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity: 0.75,
                src: '/images/marker.png'
            }))
        });

        this.markerFeature = new ol.Feature();
        this.markerFeature.setStyle(iconStyle);

        var vectorSource = new ol.source.Vector({
            features: [this.markerFeature]
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        this.map.addLayer(vectorLayer);
    };

    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };

}

/**
 * @type {string}
 */
MapWidget.id = 'mapWidget';