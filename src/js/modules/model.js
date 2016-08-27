import View from './view'

export default {
    reviewsList: [],

    createMap(container, coordinates) {

        let result = new ymaps.Map(container, {
			center: coordinates,
            zoom: 13,
            controls: ['zoomControl', 'geolocationControl']
		});

        result.options.set('dragCursor', 'pointer');

        return result
	},

    createClusterer() {

		return new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
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
        this.coordinates = e.get('coords');
        this.positionX = e.get('pagePixels')[0];
        this.positionY = e.get('pagePixels')[1];

        return ymaps.geocode(this.coordinates).then((res) => {
            let firstGeoObject = res.geoObjects.get(0);

            this.address = firstGeoObject.properties.get('text');
            })
    },

    addReview(obj) {
        this.reviewsList.push(obj);
        window.localStorage['geoReviews'] = JSON.stringify(this.reviewsList);
    },

    getReviews(coordinates) {
        return this.reviewsList.filter(review => {
            return review.coordinates[0] === coordinates[0] && review.coordinates[1] === coordinates[1]
        })
    },

    loadReviews() {
        this.reviewsList = JSON.parse(localStorage['geoReviews']);
    }

};
