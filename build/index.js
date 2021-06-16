"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachEvent = exports.renderData = exports.initMap = void 0;
var L = __importStar(require("leaflet"));
var initMap = function (elemId, layers) {
    if (layers === void 0) { layers = []; }
    var map = L.map(elemId).setView([0, 0], 3);
    if (layers.length == 0) {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    else {
        var layer = layers[0];
        L.tileLayer(layer.url, layer.opts).addTo(map);
    }
    return map;
};
exports.initMap = initMap;
var renderData = function (mapObject, geojson, styleProps) {
    if (styleProps === void 0) { styleProps = {}; }
    var styleFunc;
    if (typeof styleProps.conditions !== "undefined") {
        var prop_1 = styleProps.property;
        styleFunc = function (feature) {
            var style = [];
            for (var key in styleProps.conditions) {
                var value = styleProps.conditions[key];
                if (feature.properties[prop_1] == key) {
                    style = value;
                }
            }
            return style;
        };
    }
    else if (typeof styleProps.style !== "undefined") {
        styleFunc = function (feature) {
            return styleProps.style;
        };
    }
    else {
        styleFunc = function (feature) {
            return "#000";
        };
    }
    var layer = L.geoJSON(geojson, { style: styleFunc });
    layer.addTo(mapObject);
    return layer;
};
exports.renderData = renderData;
var attachEvent = function (obj, event, callback) {
    obj.on(event, callback);
};
exports.attachEvent = attachEvent;
