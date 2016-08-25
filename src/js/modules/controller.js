import View from './view'
import Model from './model'

export default {

    showMapRoute() {
        View.init();
        View.showNodeByName('map');
    },

    closeWidgetReviewsRoute() {
		View.hideNodeByName('widgetReviews');
	},

    showWidgetReviewsRoute(e) {
        Model.setGeoData(e);
        View.showWidgetReviews();
    }
}
