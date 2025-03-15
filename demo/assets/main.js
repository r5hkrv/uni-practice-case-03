import Slider from "slider/index.js";

Slider({
	root: "[data-js-slider='root']",

	slide: "[data-js-slider='image']",

	arrows: {
		left: "[data-js-slider='arrow'][data-action='prevImg']",
		right: "[data-js-slider='arrow'][data-action='nextImg']",
	},

	counts: {
		current: "[data-js-slider='count'][data-value='imgN']",
		total: "[data-js-slider='count'][data-value='imgMaxN']",
	},
});
