import * as L from "leaflet"

export const initMap = (elemId: string, layers: any = []): any => {
	const map = L.map("map").setView([0,0], 3);
	if (layers.length == 0){	
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);	
	}

	return map;
}

export const renderData = (mapObject: any, geojson: any, styleProps: any = {}): any => {
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



