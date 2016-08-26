import Model from './model'
import { getPosition } from './extra'
import templateReviews from '../../hbs/reviews.hbs';

function _fieldIsValid(formField){
    return !!formField.value.length;
}

function _cleaningField(formField) {
    formField.value = ''
}

function _resetError(formField) {
    formField.classList.remove('validate__error');
}

export default {

    init() {
        this._widgetReviews = document.getElementById('widgetReviews');
        this._widgetReviewsTitle = document.getElementById('locationText');
    },

    _setWidgetReviewsPosition() {
        let clientWidth = window.innerWidth,
            clientHeight = window.innerHeight,
            widgetWidth = this._widgetReviews.offsetWidth,
            widgetHeight = this._widgetReviews.offsetHeight;

            this._widgetReviews.style.left = getPosition(clientWidth, widgetWidth, Model.positionX);
            this._widgetReviews.style.top = getPosition(clientHeight, widgetHeight, Model.positionY);
    },

    _setWidgetReviewsTitle() {
        console.log(Model.address);
        this._widgetReviewsTitle.innerHTML = Model.address;
    },

    showWidgetReviews() {
        this._setWidgetReviewsPosition();
        this._setWidgetReviewsTitle();
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

    validatingForm(form) {
    let result = true;

    for (let i=0; i < form.elements.length - 1; i++) {
            let field = form.elements[i];

            if (!_fieldIsValid(field)) {
                form.elements[i].classList.add('validate__error');
                result = false;
            } else {
                form.elements[i].classList.remove('validate__error');
                result = true;
            }
        }
    return result;
    },

    cleaningForm(form) {
        for (let i=0; i < form.elements.length - 1; i++) {
                let field = form.elements[i];
                _cleaningField(field);
                _resetError(field);
            }
    },

    renderReviews(array) {
		let reviewsHTML = document.getElementById('reviews');
        reviewsHTML.innerHTML = templateReviews({reviews: array});
	},

    setClustererLayout() {
		return ymaps.templateLayoutFactory.createClass(
            '<div class="ballon">' +
                '<h3 class=ballon__header>{{properties.name|raw}}</h3>' +
                '<div class=ballon__body>' +
                    '<a class="ballon__link" href="#addres">{{properties.address|raw}}</a>'+
                    '<p>{{properties.text|raw}}</p>' +
                '</div>' +
                '<div class=ballon__footer>{{ properties.date|raw }}</div>' +
            '</div>'
		);
	}

};

