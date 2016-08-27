import View from './view'
import Model from './model'


function _setReviewOnMap(review) {
    let geoObject = new ymaps.Placemark(review.coordinates, {
                    coordinates: review.coordinates,
                    address: review.address,
                    name: review.name,
					place: review.place,
					text: review.text,
					date: review.date
				}, { preset: 'islands#violetIcon' });

            geoObject.events.add('click', (e) => {

                Model.setGeoData(e).then(() => {
                    View.showWidgetReviews();
                    View.renderReviews([review]);
                });

        });

    Model.clusterer.add(geoObject);
}

export default {

    showMapRoute() {
        View.init();
        View.showNodeByName('map');
    },

    closeWidgetReviewsRoute() {
		View.hideNodeByName('widgetReviews');
        View.cleaningForm(document.forms.formAddReview);
	},

    showWidgetReviewsRoute(e) {
        Model.clusterer.balloon.close();

        Model.setGeoData(e).then(() => {
            View.showWidgetReviews();
            View.renderReviews(Model.getReviews(Model.coordinates));
        });

    },

    addReviewRoute(e) {
        e.preventDefault();
        Model.clusterer.balloon.close();

        let form = document.forms.formAddReview,
            name = form.name.value,
            place = form.place.value,
            text = form.review.value,
            date = new Date().toLocaleString();

        if (View.validatingForm(form)) {
            console.log('add data');

            let review = {
                coordinates: Model.coordinates,
                address: Model.address,
                date: date,
                name: name,
                place: place,
                text: text
            };

            Model.addReview(review);

            _setReviewOnMap(review);

            View.renderReviews(Model.getReviews(Model.coordinates));

            View.cleaningForm(form);
        }
    },

    setReviewsRoute() {

        Model.reviewsList.map(review => {
            _setReviewOnMap(review);
        });

    }
}
