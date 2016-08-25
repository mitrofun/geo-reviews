import View from './view'

export default {


    createMap(container, coordinates) {

        let result = new ymaps.Map(container, {
			center: coordinates,
            zoom: 11,
            controls: ['zoomControl', 'geolocationControl']
		});

        result.options.set('dragCursor', 'pointer');

        return result
	},

    createClusterer() {

		return new ymaps.Clusterer({
			groupByCoordinates: false,
			clusterOpenBalloonOnClick: true,
			clusterDisableClickZoom: true,
			clusterBalloonContentLayout: 'cluster#balloonCarousel',
			clusterBalloonItemContentLayout: View.setClustererLayout(),
			clusterBalloonPanelMaxMapArea: 0,
			clusterBalloonContentLayoutWidth: 300,
            clusterBalloonContentLayoutHeight: 200,
			hideIconOnBalloonOpen: false
		})
	},

    setGeoData(e) {

        this.latitude = e.get('coords')[0];
        this.longitude = e.get('coords')[1];
        this.coordinates = e.get('coords');
        this.positionX = e.get('pagePixels')[0];
        this.positionY = e.get('pagePixels')[1];
        
        ymaps.geocode(this.coordinates).then((res) => {
            let firstGeoObject = res.geoObjects.get(0);
            this.address = firstGeoObject.properties.get('text');
            })
    }

};

