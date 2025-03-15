const querySliderElem = (key, root = document) => {
	return root.querySelector(`[data-slider="${key}"]`);
};

const Slider = (rootElem = querySliderElem("root")) => {
	const prevArrowElem = querySliderElem("arrow-prev", rootElem);
	const nextArrowElem = querySliderElem("arrow-next", rootElem);
	const slidesElem = querySliderElem("slides", rootElem);

	if (rootElem === null) return;
	if (!rootElem.hasAttribute("[data-slider='root']")) return;
	if (prevArrowElem === null || nextArrowElem === null) return;
	if (slidesElem === null || slidesElem.children.length === 0) return;

	const imgElems = slidesElem.children;

	let imgIndex = 0;

	prevArrowElem.addEventListener("click", () => {
		imgElems[imgIndex].removeAttribute("data-slider");

		imgIndex -= 1;

		if (imgIndex < 0) {
			imgIndex = imgElems.length - 1;
		}

		imgElems[imgIndex].setAttribute("data-slider", "selection");
	});

	nextArrowElem.addEventListener("click", () => {
		imgElems[imgIndex].removeAttribute("data-slider");

		imgIndex += 1;

		if (imgIndex > imgElems.length - 1) {
			imgIndex = 0;
		}

		imgElems[imgIndex].setAttribute("data-slider", "selection");
	});
};

export default Slider;
