import { defineEmits } from "./emits";
import { hook } from "./hook";

const getSliderSelector = (key) => `[data-slider="${key}"]`;

export const useSliderSelectors = () => ({
	rootSelector: getSliderSelector("root"),

	arrowSelectors: ["arrow@prev", "arrow@next"].map(getSliderSelector),

	slidesSelector: getSliderSelector("slides"),
});

export const initSlider = (rootElem = null) => {
	const { arrowSelectors, slidesSelector } = useSliderSelectors();

	if (rootElem === null) return;
	if (!(rootElem instanceof Element)) return;

	const arrowElems = rootElem.querySelectorAll(arrowSelectors);
	const slidesElem = rootElem.querySelector(slidesSelector);

	if (arrowElems.length === 0) return;

	const imgElems = slidesElem.children;

	if (slidesElem === null || imgElems.length === 0) return;

	const emits = defineEmits("slider", ["prev", "next"]);

	let imgIndex = 0;

	emits.on("prev", () => {
		imgIndex -= 1;

		if (imgIndex < 0) imgIndex = imgElems.length - 1;
	});

	emits.on("next", () => {
		imgIndex += 1;

		if (imgIndex > imgElems.length - 1) imgIndex = 0;
	});

	hook(arrowElems, "click", (e) => {
		imgElems[imgIndex].removeAttribute("data-slider");

		emits.$(e.target);

		imgElems[imgIndex].setAttribute("data-slider", "selection");
	});
};
