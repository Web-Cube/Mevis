import { sliders } from "./sliders";

var defaults = {

	scrollTo: () => {
		
		var attrHref = $(e.currentTarget).attr("href");
		var dataHref = $(e.currentTarget).data("href");
		
		if ( dataHref ) {
			attrHref = dataHref;
		}
		
		if ( $(attrHref) ) {
			
			$("html, body").animate({
				scrollTop: $(attrHref).offset().top + "px"
			}, {
				duration: 1000
			});
			return false;
			
		}
		
	},
	
	selectToggle: (e) => {
		
		$(e.currentTarget).closest('.js-select').toggleClass('is-active');
		
	},
	
	selectChange: (e) => {
		
		let selectValue = $(e.currentTarget).data('value');
		
		$(e.currentTarget).closest('.js-select').removeClass('is-active');
		
		if ( selectValue ) {
			$(e.currentTarget).closest('.js-select').find('.js-select-input').val(selectValue);
			$(e.currentTarget).closest('.js-select').find('.js-select-label').text(selectValue);
		}
		
		if ( $(e.currentTarget).hasClass('js-select-item') ) {
			$(e.currentTarget).closest('.js-select').find('.js-select-item.is-active').removeClass('is-active');
			$(e.currentTarget).addClass('is-active');
		}
		
	},

	init: () => {

		$(document).on('click', '.js-scroll-to', defaults.scrollTo);
		
		$(document).on('click', '.js-select-head', defaults.selectToggle);
		
		$(document).on('click', '.js-select-item, .js-select-close', defaults.selectChange);
		
		if ( $('.js-slider-places').length ) {
			$(document).on('click', '.js-select-item', sliders.tabs);
		}

	}
}

export { defaults }