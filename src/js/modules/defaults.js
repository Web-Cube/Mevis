import { sliders } from "./sliders";

var defaults = {

	scrollTo: (e) => {
		
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
	
	toggleModal: (e) => {
		
		let modalName = $(e.currentTarget).data('modal-name');
		
		$(e.currentTarget).toggleClass('is-active');
		
		$(modalName).toggleClass('is-active');
		
	},
	
	mobileAccordion: (e) => {
		
		let item = $(e.currentTarget).parent();
			
		if ( item.hasClass('is-active') ) {

			item.removeClass('is-active');
			item.find('.js-accordion-body').slideUp(300);
		} else {

			$('.js-accordion-item.is-active').removeClass('is-active');
			$('.js-accordion-body:visible').slideUp(300);
			item.find('.js-accordion-body').slideDown(300);
			item.addClass('is-active');

		}
			
	},
	

	init: () => {
		
		$(document).on('click', '.js-modal-btn', defaults.toggleModal);

		$(document).on('click', '.js-scroll-to', defaults.scrollTo);
		
		$(document).on('click', '.js-select-head', defaults.selectToggle);
		
		$(document).on('click', '.js-select-item, .js-select-close', defaults.selectChange);
		
		if ( $('.js-slider-places').length ) {
			$(document).on('click', '.js-select-item', sliders.tabs);
		}
		
		$(window).on('load scroll', function(){
			
			$('.header').each(function(){
				
				if( $(window).scrollTop() > 30 ) {
					
					$('.header').addClass('is-scroll');
					
					if ( $('.header').hasClass('is-fixed') ) {
						$(this).addClass('is-blue');
					}
				} else {
					$('.header').removeClass('is-scroll');
					if ( $('.header').hasClass('is-fixed') ) {
						$(this).removeClass('is-blue');
					}
				}
			});
			
		});
		
		$(document).on('click', '.js-change-state', function(){
			
			let index = $(this).index()+1;
			
			$('.js-state:visible').hide();
			$('.js-state:nth-child('+index+')').fadeIn(300);
			
		});
		
		if ( $(window).innerWidth() < 580 ) {
			$(document).on('click', '.js-accordion-head', defaults.mobileAccordion);
		}
		
		$('.js-reviews-desc').each(function(){
			if ( $(this).height() > 110 ) {
				$(this).addClass('is-hidden');
				$(this).closest('.js-reviews-parent').find('.js-reviews-right').show();
			}
		});
		
		$(document).on('click', '.js-reviews-more', function(){
			
			$(this).closest('.js-reviews-parent').find('.js-reviews-desc').toggleClass('is-hidden');
			$(this).toggleClass('is-active');
			
		});

	}
}

export { defaults }