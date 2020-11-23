var defaults = {

	events: () => {
		$(".js-scroll-to").click(function() {
			var attrHref = $(this).attr("href");
			var dataHref = $(this).data("href");
			if ( dataHref ) {
				attrHref = dataHref;
			}
			$("html, body").animate({
				scrollTop: $(attrHref).offset().top + "px"
			}, {
				duration: 1000
			});
			return false;
		});
	},

	init: () => {

		defaults.events();

	}
}

export { defaults }