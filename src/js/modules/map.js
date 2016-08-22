let reviewsMap;

ymaps.ready(init);

function init() {

    reviewsMap = new ymaps.Map('map', {

        center: [55.76, 37.64],
        zoom: 11,
        controls: ['zoomControl', 'geolocationControl']
    });

    reviewsMap.options.set('dragCursor', 'pointer');

    reviewsMap.events.add('click', function (e) {
        console.log(e.get('coords'));

        let reviewsPlacemark = new ymaps.Placemark(e.get('coords'), {}, {preset: 'islands#violetIcon'});
        reviewsMap.geoObjects.add(reviewsPlacemark);

        ymaps.geocode(e.get('coords')).then(function(res) {
                let firstGeoObject = res.geoObjects.get(0);
                let address = firstGeoObject.properties.get('text');
                console.log(res.geoObjects.get(0));
                console.log(address);

            });
    });
}

export { reviewsMap }


