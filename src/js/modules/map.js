let reviewsMap;

ymaps.ready(init);

function init() {

    reviewsMap = new ymaps.Map('map', {

        center: [55.76, 37.64],
        zoom: 11,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
    });

    reviewsMap.options.set('dragCursor', 'pointer');

    reviewsMap.events.add('click', function (e) {
        console.log(e.get('coords'));
        let reviewsPlacemark = new ymaps.Placemark(e.get('coords'));
        reviewsMap.geoObjects.add(reviewsPlacemark);
    });
}

export { reviewsMap }


