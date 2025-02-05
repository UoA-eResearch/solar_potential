/**
 * Created by Vincent on 11/09/17.
 */

/**
 * Global variables for map controls
 */
var extent = [19339108.58970958, -4504204.6540832445, 19585408.110816702, -4335432.371497248];


/**
 * Elements that make up the popup.
 */
var boundarySelected = 0;
var source = new ol.source.Vector();
/*var container = document.getElementById('popup');*/
var content = document.getElementById('popup-content');
/*var closer = document.getElementById('popup-closer');*/
var sizeElement = document.getElementById("Installation-Size");
var efficiencyElement = document.getElementById("Efficiency");
var estimateElement = document.getElementById('popup-estimate');
var annualRadiation = document.getElementById('total-annual-radiation');
var npvEstimate = document.getElementById('popup-NPVestimate');
var annualRevenue = document.getElementById('popup-AnnualRevenue');
var layerswitcher = new ol.control.LayerSwitcher();
var dragAndDropInteraction = new ol.interaction.DragAndDrop({
    formatConstructors: [
        ol.format.GPX,
        ol.format.GeoJSON,
        ol.format.IGC,
        ol.format.KML,
        ol.format.TopoJSON
    ]
});




/**
 * Create an overlay to anchor the popup to the map.
 */

/**var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ /*({
 /**element: container,
 autoPan: true,
 autoPanAnimation: {
 duration: 250
 }
 }));*/


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
/**closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };*/


/**
 * Set up the legend bar
 */
var scheme = "OrRd";
var scale = 150;
/*var colors = {
 'OrRd': ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
 }*/
var colors = {
    'OrRd': ['#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00'],
};

for (var i = 0; i < colors[scheme].length; i++) {
    var start = i * scale + 100;
    var end = (i + 1) * scale + 100;
    var rangeStr = start + "-" + end;
    if (i + 1 == colors[scheme].length) {
        rangeStr = start + "+";
    }
    $("#legend").append("<font face='Arial' color='white'>" + rangeStr + "</font>" + ":<span class='colorbox' style='background-color:" + colors[scheme][i] + "'></span>&nbsp");
};


/**
 * Add default layers from different sources
 *
 */

var wktStr = "LINESTRING(19456041.3926809 -4417751.40231222, 19456041.3926809 -4417751.40231222, 19456075.2280554 -4417762.54568568, 19456079.4427404 -4417762.64322709, 19456088.9017478 -4417763.58202355, 19456098.3848616 -4417765.82196582, 19456108.2553563 -4417768.9842535, 19456117.3959889 -4417772.71787798, 19456126.3720866 -4417777.57023304, 19456134.2414022 -4417782.62921166, 19456142.3129005 -4417788.61400199, 19456149.0958555 -4417794.99476162, 19456155.1522732 -4417802.13287726, 19456158.4585781 -4417806.35882666, 19456162.1114819 -4417808.96937215, 19456165.5913403 -4417811.30981477, 19456168.758946 -4417813.65609364, 19456166.2476456 -4417817.56110052, 19456169.8020816 -4417823.42695082, 19456162.5474329 -4417844.61969943, 19456174.2216531 -4417848.65049675, 19456166.9822751 -4417869.79862659, 19456155.3080316 -4417865.76768871, 19456148.7271012 -4417884.99216755, 19456140.2690396 -4417888.12513467, 19456131.9891691 -4417890.88299969, 19456123.6989594 -4417893.08308964, 19456114.8398518 -4417894.55027293, 19456105.0415508 -4417895.29109142, 19456095.9696817 -4417895.27466891, 19456086.143835 -4417894.52866928, 19456076.8560207 -4417892.84287902, 19456066.8141085 -4417890.42751261, 19456066.0013826 -4417890.13211893, 19455988.0402852 -4417895.43170879, 19455987.3611781 -4417885.35442314, 19456034.3395295 -4417873.95868096, 19456027.3378432 -4417868.10950475, 19456021.1169143 -4417862.08989023, 19456015.6364477 -4417856.05656996, 19456010.138652 -4417849.0938488, 19456005.367425 -4417841.37390461, 19456002.1145927 -4417835.67087127, 19456008.9103625 -4417832.7548974, 19456015.5733349 -4417830.57602609, 19456015.6615096 -4417827.42272394, 19456016.0962869 -4417820.9070448, 19456017.2574978 -4417813.63414872, 19456019.1590296 -4417806.34730383, 19456021.4478076 -4417799.98295092, 19456024.840184 -4417793.22609895, 19456030.0694701 -4417785.69116183, 19456026.4464813 -4417779.99507984, 19456022.6212046 -4417773.37305962, 19456032.9092401 -4417769.09037552, 19456037.528038 -4417767.48181584, 19456036.0935289 -4417757.89359131, 19456038.9644859 -4417758.83914038, 19456041.3926809 -4417751.40231222)";
var geojson_options = {};
var wkt_format = new ol.format.WKT();
var testFeature = wkt_format.readFeature(wktStr, { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' });
/*var geojson_format = new OpenLayers.Format.GeoJSON(testFeature);
 var out = geojson.write(testFeature);*/
var overlayGroup = new ol.layer.Group({
    'title': 'Overlays',
    zIndex: 10,
    layers: [
        /**
        new ol.layer.Tile({
            title: 'Solar radiation',
            source: new ol.source.XYZ({
                url: 'http://solarpower.cer.auckland.ac.nz/tiles/solar_potential/{z}/{x}/{y}.png'
            }),
            extent: extent,
            visible: false
        }),
         **/

        new ol.layer.Tile({

            title: 'Solar radiation',
            source: new ol.source.XYZ({
                url: 'tiles/solar_potential_circles/{z}/{x}/{y}.png'
            }),
            extent: extent
        }),



        /*new ol.layer.Vector({
         source: new ol.source.Vector({
         features: [testFeature]
         })

         }),
         */

        new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'green',
                    width: 3
                })
            })
        }),


        new ol.layer.Tile({
            title: 'City labels',
            source: new ol.source.XYZ({
                url: 'https://{a-c}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
            }),
            opacity: 1
        })
    ]
});


var boundaryvector = new ol.layer.Vector({
    source: source,


});


/**
 * Set up the map's layout, including layers, controls and view
 */
var map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine(),
        new ol.control.ZoomSlider(),
        layerswitcher
    ]),
    /*overlays: [overlay],*/
    target: 'map',
    interactions: ol.interaction.defaults().extend([
        dragAndDropInteraction
    ]),
    layers: [
        /*new ol.layer.Group({
         'title': 'Base maps',
         layers: [
         new ol.layer.Tile({
         title: 'Terrain',
         source: new ol.source.Stamen({
         layer: 'terrain-background'
         })
         }),
         new ol.layer.Tile({
         title: 'Roads',
         source: new ol.source.Stamen({
         layer: 'terrain-lines'
         })
         })
         ]
         }),*/
        new ol.layer.Tile({
            'title': 'Base Map',
            source: new ol.source.TileArcGISRest({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',

            })
        }),
        overlayGroup,
        boundaryvector

    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([174.766462, -36.891249]),
        zoom: 12,
        minZoom: 10,
        maxZoom: 20,
        extent: extent
    }),
});


/**
 * add a geocoder to map
 */
var geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    key: '__some_key__',
    lang: 'en', //en-US, fr-FR
    placeholder: 'Search for ',
    targetType: 'text-input',
    limit: 5,
    keepOpen: false,
    autoComplete: true,
    countrycodes: "NZ",
    preventDefault: false
});
map.addControl(geocoder);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
    var coordinate = evt.coordinate;
    var issueFormElement = document.getElementById('issue');
    var coordinate_new = ol.proj.fromLonLat([174.766462, -36.891249]);
    issueFormElement.value = '';
    $.get("https://solarpower.cer.auckland.ac.nz/click", { lng: coordinate[0], lat: coordinate[1] }, function (data) {
        if (data.results.length >= 1) {
            var r = data.results[0];
            /*console.log(r);*/
            /*var infoElement = document.getElementById('popup-content');*/
            var estimateElement = document.getElementById('popup-estimate');
            var addressInfoElement = document.getElementById('popup-content');
            var solarInfoElement = document.getElementById('popup-solarenergyinfo');
            var solarInfoTotalElement = document.getElementById('popup-solarenergyinfo-total');
            var top14Val = document.getElementById('top-14');
            var top20Val = document.getElementById('top-20');
            var top28Val = document.getElementById('top-28');
            var top36Val = document.getElementById('top-36');
            //var annualRevenue = document.getElementById('popup-AnnualRevenue');
            if (r.address == '_ _') r.address = "Address unknown";
            /*var lines = ["<i>" + r.address.replace(/_/g, ', ') + "</i>",
             r.up_env,
             "Top 14m²: " + (Math.round(parseInt(r.top14) / 14)).toString() + "kWh/m²",
             "Top 20m²: " + (Math.round(parseInt(r.top14) / 20)).toString() + "kWh/m²",
             "Top 28m²: " + (Math.round(parseInt(r.top14) / 28)).toString() + "kWh/m²",
             "Top 36m²: " + (Math.round(parseInt(r.top14) / 36)).toString() + "kWh/m²",
             "Mean: " + (parseInt(r.mean)).toString() + "kWh/m²",
             "Sum: " + (parseInt(r.sum)).toString() + "kWh",
             ];*/
            var addressInfo = ["<i>" + r.address.replace(/_/g, ', ') + "</i>"];
            var solarInfo = ["Top 14 m²: " + (Math.round(parseInt(r.top14) / 14)).toString() + " kWh/m²",
            "Top 20 m²: " + (Math.round(parseInt(r.top20) / 20)).toString() + " kWh/m²",
            "Top 28 m²: " + (Math.round(parseInt(r.top28) / 28)).toString() + " kWh/m²",
            "Top 36 m²: " + (Math.round(parseInt(r.top36) / 36)).toString() + " kWh/m²"];
            var solarInfoTotal = (parseInt(r.sum)).toLocaleString() + " kWh";
            top14Val.value = (Math.round(parseInt(r.top14) / 14)).toString();
            top20Val.value = (Math.round(parseInt(r.top20) / 20)).toString();
            top28Val.value = (Math.round(parseInt(r.top28) / 28)).toString();
            top36Val.value = (Math.round(parseInt(r.top36) / 36)).toString();
            addressInfoElement.innerHTML = addressInfo.join("<br>");
            solarInfoElement.innerHTML = solarInfo.join("<br>");
            solarInfoTotalElement.innerHTML = "<b>" + "Annual solar radiation on roof：</b><br/>" + solarInfoTotal;
            sizeSelected = sizeElement.options[sizeElement.selectedIndex].value;
            efficiencySelected = efficiencyElement.options[efficiencyElement.selectedIndex].value;
            if (sizeSelected == 14)
                var annualGeneration = parseInt(top14Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
            else if (sizeSelected == 20)
                var annualGeneration = parseInt(top20Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
            else if (sizeSelected == 28)
                var annualGeneration = parseInt(top28Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
            else if (sizeSelected == 36)
                var annualGeneration = parseInt(top36Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
            annualRadiation.value = annualGeneration;

            var wktStr = r.the_geom;
            var parsedWKT = parseWKTToMultipolygonWKT(wktStr);
            var wkt_format = new ol.format.WKT();
            var polygonFeature = wkt_format.readFeature(parsedWKT, { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' });

            source.clear();
            source.addFeature(polygonFeature);
            boundarySelected = 1;

            estimateElement.innerHTML = "Annual energy generation is:  <span style='font-size:20px'>" + Math.round(annualGeneration).toString() + "</span> kWh";
            calculateAnnualRevenue();
            //overlay.setPosition(coordinate);
        } else {
            console.log('No available info')
        }
    });
});

/**
 * add event handlers to the select buttons to calculate and display annual electricity generation
 * according to different equipment size and efficiency
 */
sizeElement.addEventListener("change", function () {
    var top14Val = document.getElementById('top-14');
    var top20Val = document.getElementById('top-20');
    var top28Val = document.getElementById('top-28');
    var top36Val = document.getElementById('top-36');
    var sizeSelected = sizeElement.options[sizeElement.selectedIndex].value;
    var efficiencySelected = efficiencyElement.options[efficiencyElement.selectedIndex].value;
    if (sizeSelected == 14)
        var annualGeneration = parseInt(top14Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    else if (sizeSelected == 20)
        var annualGeneration = parseInt(top20Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    else if (sizeSelected == 28)
        var annualGeneration = parseInt(top28Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    else if (sizeSelected == 36)
        var annualGeneration = parseInt(top36Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    annualRadiation.value = annualGeneration;
    estimateElement.innerHTML = "Annual energy generation is: <span style='font-size:20px'>" + Math.round(annualGeneration).toString() + "</span> kWh";
    calculateAnnualRevenue()
});

efficiencyElement.addEventListener("change", function () {
    var top14Val = document.getElementById('top-14');
    var top20Val = document.getElementById('top-20');
    var top28Val = document.getElementById('top-28');
    var top36Val = document.getElementById('top-36');
    var sizeSelected = sizeElement.options[sizeElement.selectedIndex].value;
    var efficiencySelected = efficiencyElement.options[efficiencyElement.selectedIndex].value;
    if (sizeSelected == 14)
        var annualGeneration = parseInt(top14Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    else if (sizeSelected == 20)
        var annualGeneration = parseInt(top20Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    else if (sizeSelected == 28)
        var annualGeneration = parseInt(top28Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    else if (sizeSelected == 36)
        var annualGeneration = parseInt(top36Val.value) * parseInt(sizeSelected) * parseInt(efficiencySelected) * 0.01 * 0.88;
    annualRadiation.value = annualGeneration;
    estimateElement.innerHTML = "Annual energy generation is:  <span style='font-size:20px'>" + Math.round(annualGeneration).toString() + "</span> kWh";
    calculateAnnualRevenue()
});




/**
 * add an event handler to the drag-and-drop-interaction function to load new layers
 */
dragAndDropInteraction.on('addfeatures', function (event) {
    console.log(event);
    var vectorSource = new ol.source.Vector({
        features: event.features
    });
    overlayGroup.getLayers().push(new ol.layer.Vector({
        title: event.file.name,
        source: vectorSource,
        //style: styleFunction
    }));
    map.getView().fit(
        vectorSource.getExtent(), /** @type {ol.Size} */(map.getSize())
    );
});
/**
 * add an event handler to submit issue reports
 */
$('#issueForm').submit(function (event) {

    /* stop form from submitting normally */
    event.preventDefault();

    /* get the action attribution from the <form action=""> element */
    var $form = $(this), url = $form.attr('action');

    /* send the data using post with element id "issue"*/
    var posting = $.post(url, { issue: $('#issue').val(), address: $('#popup-content').text() });

    posting.done(function (data) {
        alert('You issue report has been submitted. Thank you.');
    });
});

/**
 * calculate annual generation based on input efficiency
 */
function calculate() {
    var top14Val = document.getElementById('top-14');
    var top20Val = document.getElementById('top-20');
    var top28Val = document.getElementById('top-28');
    var top36Val = document.getElementById('top-36');
    var efficiencyVal = document.TESTING.INPUT1.value;
    var installationSize = sizeElement.options[sizeElement.selectedIndex].value;

    if (installationSize == 14)
        var RESULT = parseInt(top14Val.value) * parseInt(installationSize) * parseInt(efficiencyVal) * 0.01 * 0.88;
    else if (installationSize == 20)
        var RESULT = parseInt(top20Val.value) * parseInt(installationSize) * parseInt(efficiencyVal) * 0.01 * 0.88;
    else if (installationSize == 28)
        var RESULT = parseInt(top28Val.value) * parseInt(installationSize) * parseInt(efficiencyVal) * 0.01 * 0.88;
    else if (installationSize == 36)
        var RESULT = parseInt(top36Val.value) * parseInt(installationSize) * parseInt(efficiencyVal) * 0.01 * 0.88;

    //document.TESTING.OUTPUT1.value = RESULT;
    annualRadiation.value = RESULT;
    estimateElement.innerHTML = "Annual energy generation is:  <span style='font-size:20px'>" + Math.round(RESULT).toString() + "</span> kWh";
    calculateAnnualRevenue()
};

function calculateAnnualRevenue() {
    var installationSizeSelected = sizeElement.options[sizeElement.selectedIndex].value;
    if (installationSizeSelected == 14)
        var sizeSelected = 2;
    else if (installationSizeSelected == 20)
        var sizeSelected = 3;
    else if (installationSizeSelected == 28)
        var sizeSelected = 4;
    else if (installationSizeSelected == 36)
        var sizeSelected = 5;
    var selfConsumption = Number(document.formNPV.selfconsumption.value);
    var electricityPrice = Number(document.formNPV.sellprice.value);
    var paybackRate = Number(document.formNPV.paybackrate.value);
    var theNthYear = 1.0;
    var pvLifeTime = Number(document.formNPV.pvlifetime.value);
    var investmentPerKW = Number(document.formNPV.investmentPerKW.value) * sizeSelected;
    var annualOperationMaintenanceCost = Number(document.formNPV.annualMaintenance.value) * sizeSelected;
    var investmentCost15 = Number(document.formNPV.investmentCostInYear15.value) * sizeSelected;
    var discountRate = 0.01 * Number(document.formNPV.discountRate.value);
    var sumOfAnnual = 0;
    var maintenanceCost = 0;
    var annualRadiation = Number(document.getElementById('total-annual-radiation').value);
    var annualRevenueVal = (annualRadiation * 0.01 * selfConsumption * electricityPrice * Math.pow(0.99, theNthYear - 1) + (1.0 - 0.01 * selfConsumption) * annualRadiation * paybackRate * Math.pow(0.99, theNthYear - 1)) / 100.0;
    for (var i = 0; i < pvLifeTime; i++) {
        var sumOfAnnualTmp = (annualRadiation * 0.01 * selfConsumption * electricityPrice * Math.pow(0.99, i) + (1.0 - 0.01 * selfConsumption) * annualRadiation * paybackRate * Math.pow(0.99, i)) / 100.0;
        sumOfAnnual = sumOfAnnual + sumOfAnnualTmp / Math.pow(1.0 + discountRate, i);
        maintenanceCost = maintenanceCost + annualOperationMaintenanceCost / Math.pow(1.0 + discountRate, i);
    };
    var npvVal = sumOfAnnual - investmentPerKW - investmentCost15 / Math.pow(1.0 + discountRate, 15) - maintenanceCost;

    annualRevenue.innerHTML = "<span style='display:inline-block; width: 20px;'></span>Annual revenue (total savings): <span style='font-size:20px'>" + Math.round(annualRevenueVal).toString() + "</span> NZD";
    npvEstimate.innerHTML = "<span style='display:inline-block; width: 20px;'></span>Net present value:: <span style='font-size:20px'>" + Math.round(npvVal).toString() + "</span> NZD";
};

/**
 * parse WKT to multipolygon wkt
 */
function parseWKTToMultipolygonWKT(wkt) {
    var inputStr = wkt;

    var splitStr = inputStr.split('(((');
    var coordinates = splitStr[1].split(')))');
    coordinates = coordinates[0];
    var coordinatesList = coordinates.split(',');
    // get the first x and y
    var coordinateStr = (coordinatesList[0].split(' '))[0] + ' ' + (coordinatesList[0].split(' '))[1];
    var subCoordinatesList = coordinatesList.slice(1);
    var id;
    for (id in subCoordinatesList) {
        var coordinateList = subCoordinatesList[id].split(' ');
        var coordinateStrTmp = coordinateList[0] + ' ' + coordinateList[1];
        coordinateStr = coordinateStr + ', ' + coordinateStrTmp;
    };
    wktStr = "MULTILINESTRING((" + coordinateStr + "))";
    //console.log(wktStr);
    return wktStr;
};

