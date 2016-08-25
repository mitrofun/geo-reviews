import Model from './modules/model'
import View  from './modules/view'
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
    Route.handle('showMap');
});

Promise.all([promiseWindowLoad, promiseMap]).then(() => {

    console.log('start');

    let closeWidgetReviews = document.getElementById('closeWidgetReviews');
    closeWidgetReviews.onclick = (e) => {
        Route.handle('closeWidgetReviews');
        e.preventDefault();
    };

}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});
