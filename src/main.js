const updateSliderCounter = (elems, props = {}) => {
	elems.forEach((elem) => {
		const key = elem.getAttribute("data-value");

		if (key in props) {
			elem.textContent = props[key];
		}
	});
};

const initSlider = (root) => {
	const imgElems = root.querySelectorAll("[data-js-slider='image']");
	const arrowElems = root.querySelectorAll("[data-js-slider='arrow']");
	const countElems = root.querySelectorAll("[data-js-slider='count']");

	if (imgElems.length === 0) return null;
	if (arrowElems.length !== 2) return null;
	if (countElems.length !== 2) return null;

	let imgIndex = 0;

	arrowElems.forEach((elem) => {
		const key = elem.getAttribute("data-action");

		let incr = null;

		if (key === "prevImg") incr = -1;
		if (key === "nextImg") incr = 1;

		elem.addEventListener("click", () => {
			if (incr === null) return;

			console.log(incr);

			imgElems[imgIndex].classList.remove("is-selected");

			imgIndex += incr;

			if (imgIndex >= imgElems.length) {
				imgIndex = 0;
			} else if (imgIndex < 0) {
				imgIndex = imgElems.length - 1;
			}

			imgElems[imgIndex].classList.add("is-selected");

			updateSliderCounter(countElems, { imgN: imgIndex + 1 });
		});
	});

	updateSliderCounter(countElems, {
		imgN: imgIndex + 1,
		imgMaxN: imgElems.length,
	});
};

document.querySelectorAll("[data-js-slider='root']").forEach(initSlider);
