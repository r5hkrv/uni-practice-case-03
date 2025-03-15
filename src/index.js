const optsParseError = (error = "Failed to parse options") => ({
	opts: null,
	isError: true,
	error,
});

const parseOpts = (o) => {
	const result = {};

	if ("root" in o) {
		result.root = o.root;
	} else return optsParseError("No root element selector");

	if ("slide" in o) {
		result.slide = o.slide;
	} else return optsParseError("No slide element selector");

	if ("arrows" in o && "left" in o.arrows && "right" in o.arrows) {
		result.arrows = o.arrows;
	} else if ("left" in o.arrows) {
		return optsParseError("No right arrow element selector");
	} else if ("right" in o.arrows) {
		return optsParseError("No left arrow element selector");
	} else return optsParseError("No arrow element selectors");

	if ("counts" in o && "current" in o.counts && "total" in o.counts) {
		result.counts = o.counts;
	} else if ("current" in o) {
		return optsParseError("No total count element selector");
	} else if ("total" in o) {
		return optsParseError("No current count element selector");
	} else return optsParseError("No count element selectors");

	return { opts: result, isError: false, error: "" };
};

const Slider = (o) => {
	const { opts, isError, error } = parseOpts(o);

	if (isError) {
		console.error(error);

		return;
	}

	const rootElem = document.querySelector(opts.root);
	const imgElems = rootElem.querySelectorAll(opts.slide);
	const leftArrowElem = rootElem.querySelector(opts.arrows.left);
	const rightArrowElem = rootElem.querySelector(opts.arrows.right);
	const currCountElem = rootElem.querySelector(opts.counts.current);
	const totalCountElem = rootElem.querySelector(opts.counts.total);

	if (rootElem === null) return;
	if (imgElems.length === 0) return;
	if (leftArrowElem === null || rightArrowElem === null) return;
	if (currCountElem === null || totalCountElem === null) return;

	let imgIndex = 0;

	currCountElem.textContent = imgIndex + 1;
	totalCountElem.textContent = imgElems.length;

	leftArrowElem.addEventListener("click", () => {
		imgElems[imgIndex].classList.remove("is-selected");

		imgIndex -= 1;

		if (imgIndex < 0) {
			imgIndex = imgElems.length - 1;
		}

		currCountElem.textContent = imgIndex + 1;

		imgElems[imgIndex].classList.add("is-selected");
	});

	rightArrowElem.addEventListener("click", () => {
		imgElems[imgIndex].classList.remove("is-selected");

		imgIndex += 1;

		if (imgIndex > imgElems.length - 1) {
			imgIndex = 0;
		}

		currCountElem.textContent = imgIndex + 1;

		imgElems[imgIndex].classList.add("is-selected");
	});
};

export default Slider;
