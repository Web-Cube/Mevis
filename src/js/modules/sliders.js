import "owl.carousel";
import { config } from "../config";
import { defaults } from "./defaults";

/*
 *
 * Data atributes:
 * - settings : object (дополнительные настройки для owl-carousel)
 *
 */

var sliders = {
	
	tabs: (e) => {
		
		let index = $(e.currentTarget).index();
  		$('.js-slider-for').trigger( 'to.owl.carousel', [index, 500] );
		
		if ( $(e.currentTarget).hasClass('js-slider-to') ) {
			$('.js-slider-to.is-active').removeClass('is-active');
			$(e.currentTarget).addClass('is-active');
		}
		
	},
	
	selector: ".js-slider",

	settings: {
		items: 1,
		nav: true,
		dots: false,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		navText: [
			'<svg class="icon icon-prev" viewBox="0 0 24 24"><use xlink:href="/app/icons/sprite.svg#prev"></use></svg>',
			'<svg class="icon icon-next" viewBox="0 0 24 24"><use xlink:href="/app/icons/sprite.svg#next"></use></svg>',
		],
	},

	bar: (el, value) => {
		$(el).find(".owl-progress-bar").css("width", `${value}%`);
	},

	build: (selector) => {
		let data = $(selector).attr("data-settings")
			? $(selector).data("settings")
			: {};

		let clone = JSON.parse(JSON.stringify(sliders.settings));

		let current = Object.assign(clone, data);

		$(selector)
			.addClass("owl-carousel")
			.on("initialized.owl.carousel", (e) => {
				let $slider = $(e.target);
				let $logos = $slider.find(".js-logo:not([style])");

				if ($logos.length) {
					$logos.each((i, el) => {
						if ($(el).hasClass("is-changed")) return false;

						defaults.logoLoading(el);
					});
				}

				// counter
				let $counter = $(e.target).find(".owl-counter");
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($slider.attr("data-progress-bar")) {
					let bar = $slider.data("progress-bar");

					sliders.bar(bar, 100 / (length / current));
					console.log("bar is", bar, 100 / (length / current));
				}

				if ($slider.attr("data-counter")) {
					let counter = $slider.data("counter");
					$(counter).html(
						`<div class="owl-counter"><span class="owl-counter-current">${current}</span>/${length}</div>`
					);
				}
			})

			.on("drag.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					e.preventDefault();
				};
			})
			.on("dragged.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					return true;
				};
			})
			.on("changed.owl.carousel", (e) => {
				if (!e.namespace) {
					return;
				}
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($(e.target).attr("data-progress-bar")) {
					let bar = $(e.target).data("progress-bar");

					sliders.bar(bar, 100 / (length / current));

					console.log("bar is", bar, 100 / (length / current));
				}

				if ($(e.target).attr("data-counter")) {
					let counter = $(e.target).data("counter");
					$(counter).find('.owl-counter-current').text(current);
				}
			})
			.owlCarousel(current);
		
		if ( $(sliders.selector).hasClass('js-product-slider') ) {

			console.log('.js-product-slider');
			
			$('.js-product-slider').on('changed.owl.carousel', event => {
				let $slider = $(event.target);
				let $parent = $slider.closest('.js-slider-parent');

				let carousel = event.relatedTarget;
				let current = carousel.relative(carousel.current());

				$parent.find('.js-product-thumbnails').sly('activate', current);
			})
		}
		
	},

	destroy: (selector) => {
		if ($(selector).hasClass("owl-loaded"))
			$(selector)
				.trigger("destroy.owl.carousel")
				.removeClass("owl-carousel");
		$(selector).find(".owl-counter").remove();
	},

	run: (selector) => {
		sliders.build(selector);
	},
	
	resize: () => {
		
		if ( $(sliders.selector).hasClass("owl-resize") && ( $(window).innerWidth() > 1100 ) ) {
			
			let bigSelector = $('.blog__item_big');
			let smallSelector = $('.blog__item_small');
			let containerWidth = $(sliders.selector).innerWidth();
			
			bigSelector.css('width', (containerWidth/2) - 15);
			
			smallSelector.css('width', (containerWidth/4) - 23);
			
		} else {
			$('.blog__item').css('width','');
		}
	},

	init: () => {
		if (!$(sliders.selector).length) return false;

		$(window).on("load", (e) => {
			$(sliders.selector).each((i, el) => {
				sliders.run(el);
			});
		});
		
		sliders.resize();
			
		$(window).on('resize', sliders.resize);
		
		
		$('.js-slider-single').each(function(){
			var main_slider = $('.js-slider-single');
			var nav_slider = $('.js-slider-nav');

			nav_slider.children().each( function( index ) {
				$(this).attr( 'data-position', index );
			});			

			nav_slider.on('initialized.owl.carousel changed.owl.carousel', function(property) {
				var current = property.item.index;
				var src = $(property.target).find(".owl-item").eq(current);
				$(property.target).find('.owl-item.is-current').removeClass('is-current');
				src.addClass('is-current');
				
				main_slider.trigger( 'to.owl.carousel', [current, 500] );
		
			}).on('dragged.owl.carousel', function (e) {
				var carousel = e.relatedTarget;
				var slideIndex = (carousel.relative(carousel.current()));

				main_slider.trigger('to.owl.carousel', [slideIndex])
			});
			
			main_slider.on('dragged.owl.carousel', function (property) {
				var current = property.item.index;

				nav_slider.trigger( 'to.owl.carousel', [current, 500] );
			});

			$(document).on('click', '.js-slider-preview', function() {
				nav_slider.trigger('to.owl.carousel', $(this).data( 'position' ) );
				main_slider.trigger('to.owl.carousel', $(this).data( 'position' ) );
			});
		});
	},
};

export { sliders };