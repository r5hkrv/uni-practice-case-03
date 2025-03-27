import { initSlider } from ".";

const html = `
	<div data-slider="root">
		<div data-slider="arrow@prev"></div>
		<div data-slider="arrow@next"></div>
		<div data-slider="slides">
			<img src="" width="512" height="512"/>
			<img src="" width="512" height="512" />
			<img src="" width="512" height="512" />
			<img src="" width="512" height="512" />
			<img src="" width="512" height="512" />
		</div>
	</div>
`;

const rootSelector = "[data-slider='root']";
const slidesSelector = "[data-slider='slides']";
const leftArrowSelector = "[data-slider='arrow@prev']";
const rightArrowSelector = "[data-slider='arrow@next']";

describe("clicking on arrows", () => {
	let imgElems;

	beforeEach(() => {
		document.body.innerHTML = html;

		imgElems = document.querySelector(slidesSelector).children;
	});

	it("right arrow moves to next image", () => {
		const button = document.querySelector(rightArrowSelector);

		imgElems[0].setAttribute("data-slider", "selection");

		initSlider(document.querySelector(rootSelector));

		button.click();

		expect(imgElems[0].getAttribute("data-slider")).toBeNull();
		expect(imgElems[1].getAttribute("data-slider")).toBe("selection");
	});

	it("left arrow moves to previous image", () => {
		const button = document.querySelector(leftArrowSelector);

		imgElems[1].setAttribute("data-slider", "selection");

		initSlider(document.querySelector(rootSelector));

		button.click();

		expect(imgElems[1].getAttribute("data-slider")).toBeNull();
		expect(imgElems[0].getAttribute("data-slider")).toBe("selection");
	});

	it("right arrow loops back to first image", () => {
		const button = document.querySelector(rightArrowSelector);
		const start = imgElems.length - 1;

		imgElems[start].setAttribute("data-slider", "selection");

		initSlider(document.querySelector(rootSelector));

		button.click();

		expect(imgElems[start].getAttribute("data-slider")).toBeNull();
		expect(imgElems[0].getAttribute("data-slider")).toBe("selection");
	});

	it("left arrow loops back to last image", () => {
		const button = document.querySelector(leftArrowSelector);
		const end = imgElems.length - 1;

		imgElems[0].setAttribute("data-slider", "selection");

		initSlider(document.querySelector(rootSelector));

		button.click();

		expect(imgElems[0].getAttribute("data-slider")).toBeNull();
		expect(imgElems[end].getAttribute("data-slider")).toBe("selection");
	});
});
