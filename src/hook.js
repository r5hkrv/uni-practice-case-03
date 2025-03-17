/**
 * @param {Element | NodeList | HTMLCollection} oneOrMany
 * */
const elementsToArray = (oneOrMany) => {
	let elems;

	if (oneOrMany instanceof Element) {
		elems = [oneOrMany];
	} else if (oneOrMany instanceof NodeList) {
		elems = Array.from(oneOrMany);
	} else if (oneOrMany instanceof HTMLCollection) {
		elems = Array.from(oneOrMany);
	} else return [];

	return elems;
};

/**
 * @param {Element | NodeList | HTMLCollection} target
 * @param {string} type
 * @param {EventListener} cb
 * @param {AddEventListenerOptions | boolean} opts
 */
export const hook = (target, type, cb, opts = {}) => {
	const nodes = elementsToArray(target);

	nodes.forEach((elem) => elem.addEventListener(type, cb, opts));
};

/**
 * @param {Element | NodeList | HTMLCollection} target
 * @param {string} type
 * @param {EventListener} cb
 * @param {AddEventListenerOptions | boolean} opts
 */
export const unhook = (target, type, cb) => {
	const nodes = elementsToArray(target);

	nodes.forEach((elem) => elem.removeEventListener(type, cb));
};
