const updateSliderCounter = (elems, props = { imgMaxN: "--", imgN: "--" }) => {
	elems.forEach((elem) => {
		const key = elem.getAttribute("data-value");

		if (key in props) {
			elem.textContent = props[key];
		}
	});
};

const initSlider = (root) => {
	const imgElem = root.querySelector(".js-slider-image");
	const arrowElems = root.querySelectorAll(".js-slider-arrow");
	const countElems = root.querySelectorAll(".js-slider-count");

	if (imgElem === null) return null;
	if (arrowElems === null || arrowElems.length !== 2) return null;
	if (countElems === null || countElems.length !== 2) return null;

	const imgs = [
		{ src: "", alt: "Image #1" },
		{ src: "", alt: "Image #2" },
		{ src: "", alt: "Image #3" },
		{ src: "", alt: "Image #4" },
		{ src: "", alt: "Image #5" },
	];
	const initialImgSrc = imgElem.getAttribute("src");

	let imgIndex = 0;

	// if the first img src here or in markup are different,
	// then they're probably different pictures and we need
	// to update the state to reflect the picture in the markup
	if (initialImgSrc !== imgs[0].src) {
		imgs[0].src = imgElem.getAttribute("src");
		imgs[0].alt = imgElem.getAttribute("alt");
	}

	arrowElems.forEach((elem) => {
		const key = elem.getAttribute("data-action");

		let incr = null;

		if (key === "prevImg") incr = -1;
		if (key === "nextImg") incr = 1;

		elem.addEventListener("click", () => {
			if (incr === null) return;

			imgIndex += incr;

			if (imgIndex >= imgs.length) {
				imgIndex = 0;
			} else if (imgIndex < 0) {
				imgIndex = imgs.length - 1;
			}

			imgElem.setAttribute("src", imgs[imgIndex].src);
			imgElem.setAttribute("alt", imgs[imgIndex].alt);

			updateSliderCounter(countElems, { imgN: imgIndex + 1 });
		});
	});

	updateSliderCounter(countElems, {
		imgN: imgIndex + 1,
		imgMaxN: imgs.length,
	});
};

document.querySelectorAll(".js-slider").forEach(initSlider);
