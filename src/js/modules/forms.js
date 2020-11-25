import Inputmask from "inputmask";
import validate from "jquery-validation";
import { config } from "../config";

var forms = {
	mask: () => {
		var selector = document.querySelectorAll("input[name='phone']");

		var im = new Inputmask({
			mask: "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: true,
		});

		im.mask(selector);
	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function (error, element) {
					//just nothing, empty
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				submitHandler: (form) => {
					var data = $(form).serialize();
					thank();
					$.ajax({
						type: "POST",
						url: $(form).attr("action"),
						data: data,
						success: function (data) {
							$(form)[0].reset();
						},
					});
				},
				rules: {
					phone: {
						required: true,
						minlength: 10,
					},
				},
			});
		});
		
		function thank() {
			$.magnificPopup.open({
				tClose: 'Закрыть',
				removalDelay: 600,
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'hidden',			
				closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-closeSmall" viewBox="0 0 24 24"><use xlink:href="/app/icons/sprite.svg#closeSmall"></use></svg></div>',
				mainClass: 'css-modal-animate',			
				items: {
					src: '#thank',
					type: 'inline'
				},
				callbacks: {
					beforeOpen: () => {
					},

					beforeClose: () => {
					}
				}
			}, 0);
		}
	},

	events: () => {
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
	},
	
	quiz: () => {
		
		$('.js-quiz-next').click(function(){
			
			$('.js-quiz-input').each(function(){	
				let arrText = [];

				arrText = $('.js-quiz-input:checked').map(function(currElement, arr) {
					let length = $('.js-quiz-input:checked').length-1;

					if ( currElement == length ) {
						return $(this).val() + '.';
					} else {
						return $(this).val() + '; ';
					}
				}).get();

				$('.js-quiz-textarea').val( arrText.join("") );
				
				console.log( arrText );

			});
			
			if ( $('.js-quiz-first').is(":visible") ) {
				
				let index = $('.js-quiz-radio').closest('.js-quiz-item').index();
				
				$('.js-quiz-first').hide();
				$('.js-quiz-variant:eq(' +index+ ')').fadeIn(500);
				
				$('.js-quiz-back').fadeIn(300);
				
			} else {
				$(this).hide();
				
				$("html, body").animate({
					scrollTop: $('#form').offset().top - 100 + "px"
				}, {
					duration: 1000
				});
				return false;
			}
			
		});
		
		$('.js-quiz-back').click(function(){
			
			if ( $('.js-quiz-variant').is(":visible") ) {
				
				$('.js-quiz-variant').hide();
				$('.js-quiz-first').fadeIn(500);
				
				$(this).hide();
				
			}
			
			if ( $('.js-quiz-next').is(":hidden") ) {
				$('.js-quiz-next').fadeIn(300);
			}
			
		});
		
		
		$('.js-quiz-input').change(function(){
			
			if ( $('.js-quiz-next').is(":hidden") ) {
				$('.js-quiz-next').fadeIn(300);
			}

		});
		
	},

	init: () => {
		//forms.mask();
		forms.validate();
		forms.events();
		forms.quiz();
	},
};

export { forms };
