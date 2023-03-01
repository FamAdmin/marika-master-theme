$(document).ready(function () {

    new Swiper(".product-swiper", {
        loop: true,
        initialSlide: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

    $('.container').on('click', '.popover-swatch', function (e) {
        let id = $(this).data('product-id')
        let colorSelected = $(this).data('color')
        let handle = $(this).data('handle')
        let url = `/products/${handle}.json`

        fetch(url)
            .then(response => response.json())
            .then(data => {
               var variants = data.product.variants
               var images = data.product.images

               const dataText = variants.filter((item) => item.option1 === colorSelected).map((variant) => {
                return `
                    <li>
                        <span class="${variant.inventory_quantity == 0 ? ` not-allow` : `product-sizes__button`}" data-variant="${variant.id}">${variant.option2}</span>
                    </li>
                `
               }).join("");

               const dataImages = images.filter((x) => {
                return x.alt === colorSelected
               }).map((item) => {
                return `
                <div class="swiper-slide">
                    <img  src="${item.src}"
                        alt="${item.alt}"
                        style="width: 100%; max-width: ${item.width}px;"
                        data-sizes="auto"
                        data-src="${item.src}"
                        data-srcset="${item.src} 300w,
                        ${item.src} 400w,
                        ${item.src} 500w,
                        ${item.src} 600w,
                        ${item.src} 700w,
                        ${item.src} 800w,
                        ${item.src} 900w"
                    />
                </div>
                `
               }).join("")
              document.querySelector(`#product-size-container-${id} ul`).innerHTML = dataText
              document.querySelector(`#main-product-${id} .swiper-wrapper`).innerHTML = ``
               
              setTimeout(()=>{
                document.querySelector(`#main-product-${id} .swiper-wrapper`).innerHTML = dataImages
                new Swiper(".product-swiper", {
                    loop: true,
                    navigation: {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    },
                  });
              },100)
        }); 
    })
})