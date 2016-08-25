import Controller from './controller'

export default {
	handle(route, args) {
		let routeName = route + 'Route';

		if (!Controller.hasOwnProperty(routeName)) {
      console.error('Маршрут не найден!');
    }
		Controller[routeName](args);
	}
}
