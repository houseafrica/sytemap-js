import * as L from "leaflet";

export declare let layerControl: any;

export const initMap = (elemId: string, layers: any = {}): any => {
	let baseLayers: any = {};
	let mainBaseLayer: any = [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	})];

	for (let layerName in layers){
		let layer = layers[layerName]
		baseLayers[layerName] = L.tileLayer(layer.url, layer.opts);
		mainBaseLayer.push(baseLayers[layerName]);
	}

	const map = L.map(elemId, {
		layers: mainBaseLayer
	}).setView([0,0], 3);

	layerControl = L.control.layers(baseLayers, {}, {collapsed:false});

	layerControl.addTo(map);

	return {
		"mapObject":map,
		"layerControl":layerControl
	};
}

export const renderData = (mapObject: any, geojson: any, layerName: any = "", styleProps: any = {}): any => {
	let styleFunc;
	if (typeof styleProps.conditions !== "undefined"){
		const prop = styleProps.property;
		styleFunc = function(feature: any){
			let style = [];
			for (let key in styleProps.conditions) {
				let value = styleProps.conditions[key];
				if (feature.properties[prop] == key) {
					style = value;
				}
			}

			return style;
		}
	}
	else if (typeof styleProps.style !== "undefined"){
		styleFunc = function(feature: any){
			return styleProps.style;
		}
	}
	else {
		styleFunc = function(feature: any){
			return "#000";
		}
	}

	const layer = L.geoJSON(geojson, {style: styleFunc});
	layer.addTo(mapObject);

	return layer;
}

export const attachEvent = (obj: any, event: string, callback: any): any => {
	obj.on(event, callback);
}

export const initFeatureGroup = (): any => {
	return new L.FeatureGroup();
}

export const initLayerGroup = (): any => {
	return L.layerGroup();
}