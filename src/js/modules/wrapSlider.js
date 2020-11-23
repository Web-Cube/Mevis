import { config } from "../config";
import { sliders } from "./sliders";

/*
 *
 * Data atributes:
 * - resolution : int (разрешение для постройки слайдера, по умолчанию - 580)
 * - settings : object (дополнительные настройки для owl-carousel)
 *
 */

var wrapSlider = {
	selector: ".js-wrapSlider",
	resolution: 580,

	run: (selector) => {
		let resolution = $(selector).attr("data-resolution")
			? $(selector).data("resolution")
			: wrapSlider.resolution;

		$(window).on("load resize", () => {
			let windowWidth = $(window).width();

			if (windowWidth <= resolution) {
				sliders.build(selector);
			} else {
				sliders.destroy(selector);
			}
		});
	},

	init: () => {
		if (!$(wrapSlider.selector).length) return false;

		$(wrapSlider.selector).each((i, el) => {
			wrapSlider.run(el);
		});
	},
};

export { wrapSlider };