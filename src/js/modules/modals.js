import "magnific-popup";
import { config } from "../config";

var modals = {

	close: (e) => {

		if(!e)
			return false;

		e.preventDefault();

		config.log('close modal');

		$.magnificPopup.close();	

	},

	open: (e, modal) => {

		e = e || false;

		if(e) e.preventDefault();

		$.magnificPopup.close();		

		modal = modal || (e != false ? ($(e.currentTarget).attr('href') ? $(e.currentTarget).attr('href') : $(e.currentTarget).data('modal')) : e);

		if(!modal)
			return false;

		if(e && $(e.currentTarget).attr('data-youtube')){
			$(modal + ' iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).data('youtube')+'?autoplay=1&showinfo=0&rel=0&controls=0')
		}

		if(e && $(e.currentTarget).attr('data-input')){
			$(modal + ' input[name="form"]').val($(e.currentTarget).data('input'))
		}	

		config.log('modal open')

		$.magnificPopup.open({
			tClose: 'Закрыть',
			removalDelay: 600,
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'hidden',			
			closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-closeSmall" viewBox="0 0 24 24"><use xlink:href="/app/icons/sprite.svg#closeSmall"></use></svg></div>',
			mainClass: 'css-modal-animate',				
			items: {
				src: modal,
				type: 'inline'
			},
			callbacks: {
				beforeOpen: () => {
				},

				beforeClose: () => {
				}
			}
		}, 0);

	},


	init: (e) => {

		
		$(document).on('click', '.js-close-modal', modals.close);

		$(document).on('click', '.js-modal', modals.open);
		
		$(document).on('click', '.js-gallerybutton', function(e) {
			e.preventDefault()
			let next = $(this).hasClass('js-gallerybutton-right') ? 1 : 0;
			var magnificPopup = $.magnificPopup.instance;

			console.log('gallery: ' + next)
			
			if(next)
				magnificPopup.next(); // go to next item
			else
				magnificPopup.prev();			
		});
		
		$('.js-gallery').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				tClose: 'Закрыть',
				removalDelay: 600,
				fixedContentPos: false,
				closeOnContentClick: false,
				fixedBgPos: true,
				closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-closeSmall" viewBox="0 0 24 24"><use xlink:href="/app/icons/sprite.svg#closeSmall"></use></svg></div>',
				mainClass: 'css-modal-animate',
				image: {
					verticalFit: true
				},
				gallery: {
				    arrowMarkup: '<div class="modals__arrow modals__arrow_%dir% js-gallerybutton js-gallerybutton-%dir%"></div>',		
					enabled: true,
					navigateByImgClick: true
				}


			});			
		});
		
		$('.js-zoom').each(function() {
			$(this).magnificPopup({
				tClose: 'Закрыть',
				closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-closeSmall" viewBox="0 0 24 24"><use xlink:href="/app/icons/sprite.svg#closeSmall"></use></svg></div>',
				type: "image",
				closeOnContentClick: true,
				closeBtnInside: false,
				mainClass: 'css-modal-animate',
				image: {
					verticalFit: true,
				}

			});			
		});

	}

};


export { modals };