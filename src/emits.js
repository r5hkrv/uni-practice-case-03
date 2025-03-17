/**
 * @param {string} dataset
 * @param {string[]} emits
 */
export const defineEmits = (dataset, emits) => {
	if (emits === undefined) return;
	if (emits.length === 0) return;

	/** @type {Object<string, ((...args) => void)[]>} */
	const evts = emits.reduce((obj, key) => {
		obj[key] = [];

		return obj;
	}, {});

	return {
		/**
		 * @param {string} key
		 * @param {(...args) => void} cb
		 */
		on(key, cb) {
			const evt = evts[key];

			if (evt === undefined) return;

			evt.push(cb);
		},

		/**
		 * @param {Element} target
		 * */
		$(target, ...args) {
			const attr = target.getAttribute(`data-${dataset}`);

			if (attr === null) return;

			const tokens = attr.split("@");

			if (tokens.length !== 2) return;

			const evt = evts[tokens[1]];

			if (evt === undefined) return;

			evt.forEach((cb) => cb(...args));
		},
	};
};
