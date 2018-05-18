class Global {
	constructor() {
		this.ga = new GoogleAnalytics();
	}

	init() {
		this.ga.init();
	}	
}

const global = new Global();
global.init();