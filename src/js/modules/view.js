import Model from './model'
import { getPosition } from './extra'

export default {

    init() {
        this._widgetReviews = document.getElementById('widgetReviews')
    },

    _setWidgetReviewsPosition() {
        let clientWidth = window.innerWidth,
            clientHeight = window.innerHeight,
            widgetWidth = this._widgetReviews.offsetWidth,
            widgetHeight = this._widgetReviews.offsetHeight;

            this._widgetReviews.style.left = getPosition(clientWidth, widgetWidth, Model.positionX);
            this._widgetReviews.style.top = getPosition(clientHeight, widgetHeight, Model.positionY);
    },

    showWidgetReviews() {
        this._setWidgetReviewsPosition();
        this.showNode(this._widgetReviews);
    },

    showNode(node) {
        node.classList.remove('is_hide');
    },

    showNodeByName(name) {
        let node = document.getElementById(name);
        node.classList.remove('is_hide');
    },

    hideNodeByName(name) {
        let node = document.getElementById(name);
        node.classList.add('is_hide');
    },

    setClustererLayout() {
		return ymaps.templateLayoutFactory.createClass(
            '<div class="my-layout"><h3>Макет</h3><p>Создан на основе шаблона.</p></div>'
		);
	}

};

