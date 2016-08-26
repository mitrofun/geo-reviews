import View from './view'
import Model from './model'

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
        Model.setGeoData(e).then(() => {
            View.showWidgetReviews();
            View.renderReviews(Model.getReviews(Model.coordinates));
        });

    },

    addReviewRoute(e) {

        e.preventDefault();
        console.log('add review');

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

            let geoObject = new ymaps.Placemark(Model.coordinates, {
                    coordinates: review.coordinates,
                    address: review.address,
                    name: review.name,
					place: review.place,
					text: review.text,
					date: review.date
				}, { preset: 'islands#violetIcon' });

            Model.clusterer.add(geoObject);

            View.renderReviews(Model.getReviews(Model.coordinates));

            View.cleaningForm(form);
        }
    }
}
