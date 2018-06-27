class Global {
	constructor() {
		this.ga = new GoogleAnalytics();
		this.sa = new scrollAnimations();
	}

	init() {
		this.ga.init();
		this.sa.init();
	}	
}

const global = new Global();
global.init();