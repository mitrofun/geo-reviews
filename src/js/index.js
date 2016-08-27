import Model from './modules/model'
import Route from './modules/router'

const COORD = [55.76, 37.64];

let promiseWindowLoad = new Promise(resolve => {
    window.onload = resolve;
});

let promiseMap = new Promise(resolve => {
		ymaps.ready(resolve)
	}).then(() => {

    Model.map = Model.createMap('map', COORD);
    Model.clusterer = Model.createClusterer();
    Model.map.geoObjects.add(Model.clusterer);

    Model.map.events.add('click', e => {
        Route.handle('showWidgetReviews', e);
    });

}).then(() => {
    Model.loadReviews();
    Route.handle('setReviews');
}).then(() => {
    Route.handle('showMap');
});

Promise.all([promiseWindowLoad, promiseMap]).then(() => {

    console.log('start');

    let closeWidgetReviews = document.getElementById('closeWidgetReviews');
    let buttonAddReview = document.querySelector('.form__reviews__add-button');

    closeWidgetReviews.addEventListener('click',(e) => {
        e.preventDefault();
        Route.handle('closeWidgetReviews');
    });

    buttonAddReview.addEventListener('click', (e) => {
        Route.handle('addReview', e);
    });

    document.addEventListener('click', (e) => {

        if (e.target.classList.contains('balloon__link')) {
            e.preventDefault();

            let data = e.target.dataset;

            let geoObj = {

                coords: [
                    parseFloat(data.coordinates.split(',')[0]),
                    parseFloat(data.coordinates.split(',')[1])
                ],
                pagePixels: [
                    e.clientX,
                    e.clientY
                ],
                get(name) {
                    return this[name]
                }

            };
            Route.handle('showWidgetReviews', geoObj);
        }
    });

    Model.clusterer.events.add('balloonopen', () => {
        Route.handle('closeWidgetReviews');
	});


}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});
