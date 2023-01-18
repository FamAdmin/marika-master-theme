/* Collections-page
====================================================================*/

$(function() {
	if (window.location.pathname.indexOf('collections') > -1) {
		// Change image on hover in collections page
		$('.collection-matrix').on('mouseover', '.product-wrap', function() {
			var image = $(this).find('.image__container img');
			image.attr('before-src', image.attr('src'));

			image.attr('src', image.attr('next-src'));
			image.attr('data-src', image.attr('next-data-src'));
			image.attr('data-srcset', image.attr('next-data-srcset'));

		})

		$('.collection-matrix').on('mouseout', '.product-wrap', function() {
			var image = $(this).find('.image__container img');
			image.attr('src', image.attr('before-src'));
		})
        
        $('.js-quick-shop').on('click', '.viewSizeGuide', function() {
        	window.open('/pages/size-guide', '_blank'); 
        })
	}

	// 2 for 25 - append "Final sale" & add line-item property
	if (window.location.pathname.indexOf('2-for-25-leggings') > -1 || window.location.pathname.indexOf('2-for-30-leggings') > -1) {
		// collections page
// 		$('.product-wrap .price').each(function() {
// 			$(this).after('<p style="color: #ff317d;">FINAL SALE</p>');
// 		})
		// product page
		$('.modal_price .current_price').after('<p style="color: #ff317d;">FINAL SALE</p>');
		// line-item property
		$('#finalsale').val(true);
	}

	// Cart pop up remove ': true' for final sale items
	var lineItemProperty = $('.cart_item .line-item').text().split(":")[0];
	$('.cart_item .line-item').text(lineItemProperty);
  
    
        var colorName;
        $('.swatch[data-option-index="0"] input[name="option-0"]').each(function() {
          if ($(this).prop('checked') == true) {
          	colorName = $(this).val();
            return false;
          }
        });
  		$('.variantColorName').remove();
        $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + colorName + '</span>');
  
  
//   $('.js-quick-shop-link').click(function() {
//     setTimeout(function() {
//     var colorNameNew;
//         $('.quick-shop .swatch[data-option-index="0"] input[name="option-0"]').each(function() {
//           if ($(this).prop('checked') == true) {
//           	colorNameNew = $(this).val();
//             $('.variantColorName').remove();
//         $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + colorNameNew + '</span>');
//             return false;
//           }
//         });
  		
//     }, 500);
//   })
  
  //Quick View
    $('.swatch-element').click(function() {
    	
  		 setTimeout(function() {
              var colorNameNew;
              $('.quick-shop .swatch[data-option-index="0"] input[name="option-0"]').each(function() {
                if ($(this).prop('checked') == true) {
                  colorNameNew = $(this).val();
                   $('.variantColorName').remove();
                   $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + colorNameNew + '</span>');
                  return false;
                }
              });

        }, 500);
    });
  
  $('.collection-matrix').on('click', '.js-quick-shop-link', function() {
    setTimeout(function() {
    var colorNameNew;
        $('.quick-shop .swatch[data-option-index="0"] input[name="option-0"]').each(function() {
          if ($(this).prop('checked') == true) {
          	colorNameNew = $(this).val();
            $('.variantColorName').remove();
        $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + colorNameNew + '</span>');
            return false;
          }
        });
  		
    }, 500);
  })
  
  $('.remodal-close').click(function() {
    $('.variantColorName').remove();
  })
  
  
  		// When clicking on variant color swatch, switch featured image on product page
		if ($(window).width() < 768) {
			// TODO: Color swatch Replacement
			$('.swatch[data-option-index="0"] .swatch-element').on('touchstart', function(e) {
				var colorName = $(this).attr('data-value');

				$('.gallery-cell').each(function() {
					if ($(this).attr('data-title') == colorName) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});

				setTimeout(function() {
					$('.gallery-cell').each(function() {
						if ($(this).css('display') != 'none') {
							console.log('change it!')
							$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
							$('.zoomImg').attr('src', $('.image-zoom').attr('src').replace('800x', '500x@2x'));
							$('.gallery-cell').each( function(){
								if($(this)[0].style.display != "none"){
									$(this).click();
									return false;
								}
							});
							return false;
						}
					})
				}, 500);
              $('.variantColorName').remove();
              $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + colorName + '</span>');
			})
		} else {
			$('.swatch[data-option-index="0"] .swatch-element').click(function(e) {
				var colorName = $(this).attr('data-value');

				$('.gallery-cell').each(function() {
					if ($(this).find('img').attr('alt').trim() == colorName) {
						$(this).show();
//                       $('.product-main-image').attr('src', $(this).find("img").attr('src').replace('400x', '800x'));
					} else {
						$(this).hide();
					}
				});

				setTimeout(function() {
					$('.gallery-cell').each(function() {
						if ($(this).css('display') != 'none') {
							console.log('change it!')
							$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
							$('.zoomImg').attr('src', $('.image-zoom').attr('src').replace('800x', '500x@2x'));
							$('.gallery-cell').each( function(){
								if($(this)[0].style.display != "none"){
									$(this).click();
									return false;
								}
							});
							return false;
						}
					})
				}, 500);
              $('.variantColorName').remove();
              $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + colorName + '</span>');
			})
		}
})



// Sort order of size filter on Collections page
$(function() {
	var keywords = ['X', 'S', 'M', 'L'];
	var order = [ 'XS', 'S', 'M', 'L', 'XL', '0X', '1X', '2X', '3X'];
	var rearrangedSizes = [];

	var rearrangeThese = $('.filter-option').filter(function() {
		for (var i = 0; i < keywords.length; i++) {
			if ($(this).html().replace('Size', '').indexOf(keywords[i]) > -1) {
				$(this).remove()
				return true;
			}
		}
		return false;
	})

	for (var i = 0; i < order.length; i++) {
		for (var j = 0; j < rearrangeThese.length; j++) {
			if (rearrangeThese[j].innerText.replace('Size: ', '') == order[i]) {
				rearrangedSizes.push(rearrangeThese[j]);
			}
		}
	}

	for (var k = 0; k < rearrangedSizes.length; k++) {
		$('.tag_filter').append(rearrangedSizes[k])
	}
})

/* Product-page
====================================================================*/

$(function() {
	if (window.location.pathname.indexOf('products') > -1) {

		console.log('search', window.location.search);

		if (window.location.search.indexOf('variant=') > -1) {
			// TODO: Load only variant images on load
			setTimeout(function() {
				var selectedVariant = $('#selected-variant').val().toUpperCase();
				$('.gallery-cell').each(function() {
					if ($(this).attr('data-title').toUpperCase() == selectedVariant) {
						$(this).show();
					} else {
						$(this).hide();
					}
				})
			}, 1500);

			setTimeout(function() {
				var replaceWithThis;
				$('.gallery-cell').each(function() {
					console.log('$this', $(this));
					if ($(this).css('display') != 'none') {
						replaceWithThis = $(this).find('img');
						return false;
					}
				})

					console.log('replaceWithThis', replaceWithThis)
					$('.product-main-image').attr('src', replaceWithThis.attr('src').replace('400x', '500x')).attr('alt', replaceWithThis.attr('alt')).attr('data-image-id', replaceWithThis.attr('data-image-id'));
			}, 2000)
		}
		// Click on thumbnails to switch featured image on product page
		$('.gallery-cell').on('click',function() {
			var newImage = $(this).find('img');
			$(this).siblings().removeClass('thumbnail-selected');
			$(this).addClass('thumbnail-selected');
			if ($(this).attr('data-media-type') == undefined || $(this).attr('data-media-type') == 'image') {
				$('.product-main-image').attr('src', newImage.attr('src').replace('400x', '800x')).attr('alt', newImage.attr('alt')).attr('data-image-id', newImage.attr('data-image-id'));	
				$('.zoomImg').remove();
				$('#imgZoomWrapper').zoom({
					url: $('.image-zoom').attr('src').replace('800x', '500x@2x')
				});
				$('.product-main-image').css('display','');
				$('.product-main-video').css('display','none');
			} else if ($(this).attr('data-media-type') == 'video') {
				$('.product-main-video').remove();
				let imageContainer = document.querySelector('.image__container'),
					videoTag = document.createElement('video'),
					imgTag = document.createElement('img'),
					sources = $(this).attr('data-media-sources').split('-;;-');
				if (imageContainer != null) {
					console.log('sources',sources);
					videoTag.classList.add('product-main-video');
					videoTag.playsinline = true;
					videoTag.autoplay = true;
					videoTag.loop = true;
					videoTag.muted = true;
					videoTag.controls = false;
					sources.forEach(source => {
						console.log('source',source);
						let sourceTag = document.createElement('source');
						sourceTag.setAttribute('src', source.split('-==-')[0]);
						sourceTag.setAttribute('type', source.split('-==-')[1]);
						videoTag.appendChild(sourceTag);
					});
					imgTag.setAttribute('src', newImage.attr('src').replace('400x', '800x'));
					videoTag.appendChild(imgTag);
					imageContainer.appendChild(videoTag);
					videoTag.load();
					videoTag.play();
					$('.zoomImg').remove();
					$('.product-main-image').css('display','none');
					$('.product-main-video').css('display','');
				}
			}
		})

      
		$('.image-zoom')
			.wrap('<span id="imgZoomWrapper" style="display:inline-block"></span>')
			.css('display', 'block')
			.parent()
			.zoom({
			url: $('.image-zoom').data().zoom
		});
		// When clicking on variant color swatch, switch featured image on product page
		if ($(window).width() < 768) {
			// TODO: Color swatch Replacement
// 			$('.product_section .swatch[data-option-index="0"] .swatch-element').on('touchstart', function(e) {
// 				var colorName = $(this).attr('data-value');

// 				$('.gallery-cell').each(function() {
// 					if ($(this).attr('data-title') == colorName) {
// 						$(this).show();
// 					} else {
// 						$(this).hide();
// 					}
// 				});

// 				setTimeout(function() {
// 					$('.gallery-cell').each(function() {
// 						if ($(this).css('display') != 'none') {
// 							console.log('change it!')
// 							$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
// 							$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
// 							return false;
// 						}
// 					})
// 				}, 500);
//               $('#variantColorName').remove();
//               $('.swatch[data-option-index="0"] .option_title').append('<span id="variantColorName">: ' + colorName + '</span>');
// 			})
		} else {

// 			$('.product_section .swatch[data-option-index="0"] .swatch-element').click(function(e) {
// 				var colorName = $(this).attr('data-value');

// 				$('.gallery-cell').each(function() {
// 					if ($(this).attr('data-title') == colorName) {
// 						$(this).show();
// 					} else {
// 						$(this).hide();
// 					}
// 				});

// 				setTimeout(function() {
// 					$('.gallery-cell').each(function() {
// 						if ($(this).css('display') != 'none') {
// 							console.log('change it!')
// 							$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
// 							$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
// 							return false;
// 						}
// 					})
// 				}, 500);
//               $('#variantColorName').remove();
//               $('.swatch[data-option-index="0"] .option_title').append('<span id="variantColorName">: ' + colorName + '</span>');
// 			})
		}

		// Limit thumbnails to 6 images on swatch click
		$('.swatch-element').on('click', function() {

			// setTimeout(function() {
			// 	var variantColor = $(this).attr('data-value');
			//
			// 	console.log('new click!')
			// 	$('.gallery-cell').each(function() {
			// 		if ($(this).attr('data-title') == variantColor) {
			// 			console.log('show', $(this))
			// 			$(this).css('display', 'block');
			// 		} else {
			// 			$(this).css('display', 'none');
			// 		}
			// 	})
			// }, 600)

			setTimeout(function() {
				var displayed = 0;
				$('.gallery-cell').each(function() {
					if ($(this).css('display') != 'none') {
						if (displayed < 6) {
							displayed++;
						}
						else {
							$(this).css('display', 'none');
						}

					}
				})
			}, 800);
		})

		$('.viewSizeGuide a').click(function(e) {
			e.preventDefault();
			$('.size-guide-popup').show();
			$('body').addClass('noScroll');
		})

		$('#close-size-guide img').click(function(e) {
			e.preventDefault();
			$(this).closest('.modal').hide();
//             $('.size-guide-popup').hide();
			$('body').removeClass('noScroll');
		})

		$('.modal').click(function(event) {
			$(this).hide();
			$('body').removeClass('noScroll');
		})

		$('.modal-content').on('click', function(e) {
			e.stopPropagation();
		})

		// $('.add_to_cart').on('click', function() {
		// 	alert($('#product-form-574861279259');
		// })
		setTimeout(() =>{
			$(".gallery-cell")[0].click();

			if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){ 
				$(".gallery-arrow-down").on("touchstart", function(){
					let selected = $(".thumbnail-selected")[0];
					if(selected.nextSibling.nextSibling 
						&& selected.nextSibling.nextSibling.tagName != "I"
						&& selected.nextSibling.nextSibling.style.display != "none"){
						selected = selected.nextSibling.nextSibling;
						selected.click();
					}
				});
				$(".gallery-arrow-up").on("touchstart", function(){
					let selected = $(".thumbnail-selected")[0];
					if(selected.previousSibling.previousSibling 
						&& selected.previousSibling.previousSibling != "I"
						&& selected.previousSibling.previousSibling.style.display != "none"){
						selected = selected.previousSibling.previousSibling;
						selected.click();
					}
				});
			}
			$(".gallery-arrow-down").click( () => {
				let selected = $(".thumbnail-selected")[0];
				if(selected.nextSibling.nextSibling 
					&& selected.nextSibling.nextSibling.tagName != "I"
					&& selected.nextSibling.nextSibling.style.display != "none"){
					selected = selected.nextSibling.nextSibling;
					selected.click();
				}
			})
			$(".gallery-arrow-up").click( () => {
				let selected = $(".thumbnail-selected")[0];
				if(selected.previousSibling.previousSibling 
					&& selected.previousSibling.previousSibling != "I"
					&& selected.previousSibling.previousSibling.style.display != "none"){
					selected = selected.previousSibling.previousSibling;
					selected.click();
				}
			})
		})
	}
})

// Limit thumbnails to 6 images on page load
$(window).on('load', function() {
	setTimeout(function() {
		var displayed = 0;
		$('.gallery-cell').each(function() {
			if ($(this).css('display') != 'none') {
				if (displayed < 6) {
					displayed++;
				}
				else {
					$(this).css('display', 'none');
				}

			}
		})

		var featuredImageHeight = $('.product_gallery').height();
		var thumbnailHeight = featuredImageHeight / 4;
		console.log('featuredImageHeight', featuredImageHeight)
		console.log('thumbnailHeight', thumbnailHeight)

		$('.lSSlideWrapper').height(featuredImageHeight);
		$('.lslide').each(function() {
			if ($(this).css('display') != 'none') {
				console.log('this', $(this))
				$(this).css('height', thumbnailHeight);
			}
		})
	});



	console.log('navigator', navigator)
	console.log('height', $('.lslide.active').height());
	console.log('outerHeight', $('.lslide.active').outerHeight());
	console.log('heightFeatured', $('.product_gallery').outerHeight());
	console.log('heightFeatured', $('.product_gallery').height());

})


/* Quick-view pop-up
====================================================================*/

$(function() {
	if (window.location.pathname.indexOf('collections') > -1 ) {
		const swatchesImgElements = $(".swatch-bg-img");
		for(let el of swatchesImgElements){
			const imgUrl = el.style.backgroundImage.replace('url("','').replace('")','');
			$.get(imgUrl)
				.done(function() { 
					
				}).fail(function() { 
					el.style.backgroundImage = 'url("'+imgUrl.replace(".JPG", '.jpg')+'")';
				})
		}
		// Switch main image when clicking on color swatch in Quick-View
		$('.js-quick-shop').on('click', '.swatch-element.color', function() {
			var variant = $(this).attr('data-value');
			console.log('clicked!', $(this).attr('data-value'))

			$('.product_gallery .gallery-cell').each(function() {
				if ($(this).find('img').attr('alt').indexOf(variant) > -1) {
					$('.pop-up-main-image').attr('src', $(this).find('img').attr('src'));
					return false;
				}
			});
          
          $('.variantColorName').remove();
            $('.swatch[data-option-index="0"] .option_title').append('<span class="variantColorName">: ' + $(this).attr('data-value') + '</span>');
   
		})

		$('.collection-template-section').on('click', '.js-quick-shop-link', function(e) {
			e.preventDefault();
			// var imageSRC = $(this).find('.image__container img').attr('src');
			var imageSRC = $(this).closest('.product_image').find('.image__container img').attr('src');
			console.log('imageSRC', imageSRC)
			console.log('this', $(this))
			$('.pop-up-main-image').attr('src', 'https:' + imageSRC);
		})

		$('.collection-matrix').on('click', '.js-quick-shop-link', function(e) {
			e.preventDefault();
			// var imageSRC = $(this).find('.image__container img').attr('src');
			var imageSRC = $(this).closest('.product_image').find('.image__container img').attr('src');
			console.log('imageSRC', imageSRC)
			console.log('this', $(this))
			$('.pop-up-main-image').attr('src', 'https:' + imageSRC);
		})

		$('.featured-collection-section').on('click', '.js-quick-shop-link', function(e) {
			e.preventDefault();
			// var imageSRC = $(this).find('.image__container img').attr('src');
			var imageSRC = $(this).closest('.product_image').find('.image__container img').attr('src');
			console.log('imageSRC', imageSRC)
			console.log('this', $(this))
			$('.pop-up-main-image').attr('src', 'https:' + imageSRC);
		})


// 		$('#shopify-section-cart-template .js-change-quantity span, .cart_container .js-change-quantity span').click(function(e) {
// 			console.log('reload');
// 			setTimeout(function() {
// 				location.reload();
// 			}, 900)
// 		})

		// $('body').on('click', '.quick_shop', (function() {
		// 	alert('hello')
		// 	setTimeout(function() {
		// 		$('.product_gallery_nav.js-gallery-carousel').flickity({
		// 			cellAlign: 'left',
		//   		contain: true
		// 		})
		// 	}, 1000);
		// })

	}
})


/* Footer (mobile)
====================================================================*/
$(function() {
	var $window = $(window);

	function resize() {
		if ($window.width() < 480) {
			$('.footer-menu-wrap').removeClass('container');
		}
		else if ($window.width() >= 480) {
			if (!$('.footer-menu-wrap').hasClass('container')) {
				$('.footer-menu-wrap').addClass('container');
			}
		}
	}

	function hideOnResize() {
		if ($window.width() < 769) {
			$('.top_bar .icon-cart').show();
			$('.top_bar .menu.right').show();
		}
		else {
			$('.top_bar .icon-cart').hide();
			$('.top_bar .menu.right').hide();
		}
	}

	function resizeThumbs() {
		setTimeout(function() {
			var featuredImageHeight = $('.product_gallery').height();

			$('.lSSlideWrapper').height(featuredImageHeight);
		}, 1000)
	}

	$window.resize(resize).resize(hideOnResize).resize(resizeThumbs).trigger('resize');


})

/* Header
====================================================================*/
$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	if (scroll > 300) {
		$('.inMainNav').hide();
		// $('.main_nav .nav .cart_content').css('top', '59px');
	}
	else {
		$('.inMainNav').show();
	}
})

// Image slider for thumbnails on product page
$(document).ready(function() {
    $('#lightSlider').lightSlider({
      gallery:true,
      item:4,
      vertical:true,
      vThumbWidth:100,
      thumbItem:6,
      thumbMargin:4,
      slideMargin:0,
      adaptiveHeight:true
    });
  });

// Add chevron symbols to image slider
$(function() {
	$('.lSPrev').html('&#x25b3;');
	$('.lSNext').html('&#x25b3;').css('transform', 'scale(1, -1)');
})

// Move dropdown menu down when promo banner is displayed
$(function() {
	if ($('body').hasClass('promo_banner-show')) {
		$('.main_nav .dropdown.menu').css('margin-top', '-11px');
	}

	$('.promo_banner-close').click(function() {
		$('.main_nav .dropdown.menu').css('margin-top', '0');
	})

	$('.icon-search.search-submit').click(function(e) {
		if ($(this).next().val().length < 1 ) {
			e.stopPropagation();
			$('.search-field.tt-input').focus();
		}
	})

	$('.search_form').on('submit', function(e) {
		if ($('.search-field.tt-input').val().length < 1) {
			e.stopPropagation();
			$('.search-field.tt-input').focus();
		}
	})
})

function regexWordsOnly(str) {
	return /^\w+$/i.test(input);
}


// $(function() {
// 	var displayed = 0;
// 	$('.gallery-cell').each(function() {
// 		if ($(this).css('display') != 'none') {
// 			if (displayed < 7) {
// 				displayed++;
// 			}
// 			else {
// 				$(this).css('display', 'none');
// 			}

// 		}
// 	})
// })


/* Home Page
====================================================================*/
$(function() {
	$('#shopify-section-1510004157046').css('height', $('.image-holder img').css('height'));

	$(window).on('resize', function() {
		$('#shopify-section-1510004157046').css('height', $('.image-holder img').css('height'));

		// $('#collection-list-section .thumbnail-overlay').css('height', $('#collection-list-section .product-wrap').css('height'));
		$('.list-collections .product-wrap .thumbnail-overlay').each(function() {
			$(this).css('height', $(this).closest('.thumbnail').find('.product-wrap').css('height'));
		})
	})

	setTimeout(function() {
		$('.lslide').css('height', $('.lslide .gallery-cell').css('height'));
	}, 3000)

	$('.list-collections .product-wrap .thumbnail-overlay').each(function() {
		$(this).css('height', $(this).closest('.thumbnail').find('.product-wrap').css('height'));
	})

	$('.mobile_nav-fixed--true .mobile_nav.dropdown_link').click(function() {
		$('body').toggleClass('noScroll');
	})


})

/* Gift Guide Page
====================================================================*/
$(function() {
	if (window.location.pathname == '/pages/gift-guide') {
		if ($(window).width() < 768) {
			$('.banner-desktop').hide();
			$('.banner-mobile').show();
		}

		$(window).on('resize', function() {
			if ($(window).width() < 768) {
				$('.banner-desktop').hide();
				$('.banner-mobile').show();
			}
			else {
				$('.banner-desktop').show();
				$('.banner-mobile').hide();
			}
		})
	}
})

// $('.icon-cart.mini_cart').hover(function() {
// 	console.log('clicked!');
// 	if ($(window).scrollTop() < 300) {
// 		if ($('.top_bar .cart_container').hasClass('active_link')) {
// 			$('.top_bar .cart_container').removeClass('active_link');
// 		}
// 		else {
// 			$('.top_bar .cart_container').addClass('active_link');
// 		}
// 	}
// 	else {
// 		console.log('triggered!');
// 		$(this).parent().addClass('active_link');
// 		$('.cart_container.active_link').css('top', 0);
// 		// if ($('.main_nav .cart_container').hasClass('active_link')) {
// 		// 	$('.main_nav .cart_container').removeClass('active_link');
// 		// }
// 		// else {
// 		// 	$('.main_nav .cart_container').addClass('active_link');
// 		// }
// 	}

// 	// if ($(this).parent().hasClass('active_link')) {
// 	// 	$(this).parent().removeClass('active_link');
// 	// }
// 	// else {
// 	// 	$(this).parent().addClass('active_link');
// 	// }

// })


// $( function () {
// 	console.log('session', sessionStorage.getItem('reloadAfterPageLoad'))
//     if ( sessionStorage.getItem('reloadAfterPageLoad') == true ) {
//     	console.log('session', sessionStorage.reloadAfterPageLoad)
//         $('.cart_container').addClass('active_link');
//         sessionStorage.reloadAfterPageLoad = false;
//     }
// } )



// $('.purchase').click(function(e) {
// 	var imageSRC = '';
// 	var cartItemHTML = '';
// 	var originalPrice,
// 			salesPrice,


// 	$('.gallery-cell').each(function() {
// 		if ($(this).css('display') != 'none') {
// 			imageSRC = $(this).find(">:first-child").attr('src');
// 			console.log('hello', imageSRC)
// 			return false;
// 		}
// 	})

// 	cartItemHTML += '<li class="cart_item clearfix">'
// 	cartItemHTML += '<div class="cart_image testing">'
// 	cartItemHTML += '<img src="' + imageSRC + '"/> </div>'
// 	cartItemHTML += '</li>'


// 	$('.js-cart_items').append(cartItemHTML);
// 	console.log('imageSRC', imageSRC);
// 	console.log('cartItemHTML', cartItemHTML);
// 	console.log('append!')

// 	// e.preventDefault();
// 	// setTimeout(function() {
// 	// 	location.reload();
// 	// }, 200);
// })

// $('.product_form').submit(function(e){
//   e.preventDefault();
// })


// /* Search Results Page
// ====================================================================*/
// if (window.location.pathname.indexOf('omega-search') > -1) {
// 	var query = window.location.search.split('q=')[1].split('#')[0];
// 	query = query.replace('+', ' ');
// 	$('.main .page h1').append('<span> for: ' + query + '</span>');
// }

/* A/B Testing Page w/ Crazy Egg
  ====================================================================*/
	$(function() {
		$('#shopify-section-header').on('click', '.go_to_checkout_button', function() {
			// alert('Going to checkout!')
			CE2.converted("50d167d5-86dd-4c46-b473-e5b4ea16bef6")
		})

		$('#shopify-section-cart-template').on('click', '.add_to_cart', function() {
			// alert('Going to checkout!!')
			CE2.converted("50d167d5-86dd-4c46-b473-e5b4ea16bef6")
		})
	})


	// $('form.js-cart_content__form').on('submit', function() {
	// 	alert('Going to checkout!!!')
	// 	CE2.converted("50d167d5-86dd-4c46-b473-e5b4ea16bef6")
	// })
    
/* Popular products section on cart page
  ====================================================================*/
$(function() {
		var popularProductsSlider = $('.flickity-popular-products').flickity({
		  // options
		  cellAlign: 'left',
		  contain: true,
			groupCells: true,
			prevNextButtons: true,
          draggable: true
		});

		$('.flickity-prev-next-button.next').click(function(e) {
			e.preventDefault();
			popularProductsSlider.flickity('next');
		})

		$('.flickity-prev-next-button.previous').click(function(e) {
			e.preventDefault();
			popularProductsSlider.flickity('previous');
		})
        
//         $('.container').on('mouseenter', '.popover-swatch', function(e) {
//           console.log('switch!', $(this).attr('data-variant'))

//           $(this).closest('.popover-content').prev().find('.image__container img').attr('src', $(this).next().attr('src'));
//           $(this).closest('.popover-content').prev().find('.image__container img').attr('srcset', $(this).next().attr('srcset'));
//         })
	})


   /* Prop 65 Warning
  ====================================================================*/
    $('#close-modal').on('click', function(e) {
      e.preventDefault();
      $(this).closest('.modal-open').hide();
    })
    
    $('.prop65WarningLink').click(function(){
    	$('.prop-65-popup').show();
    })
    
//     if (window.location.pathname.indexOf('products') > -1) {
//     	var prop65handles = ['M180904', 'M197104', 'M180504', 'M182804', 'M188904', 'M191404', 'M191404', 'M194004', 'M192004', 'M199304', 'M187904', 'M186004', 'M187804', 'B199201', 'M181004', 'M186204', 'M187004', 'B193201', 'B193201', 'B193201', 'B193201', 'M196104', 'M196104', 'M196104', 'M196104', 'M196104', 'M198804', 'M198804', 'M198904', 'MM187408', 'MM187508', 'MM187608'];
//       for (var i = 0; i < prop65handles.length; i++) {
//         if (window.location.pathname.indexOf(prop65handles[i].toLowerCase()) > -1) {
//         	$('.prop65WarningLink').show();
//         }
//       }
//     }
