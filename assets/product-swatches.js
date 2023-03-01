$(document).ready(function () {
    $('.container').on('click', '.popover-swatch', function (e) {
        let id = $(this).data('product-id')
        let colorSelected = $(this).data('color').replace("-"," ")
        let handle = $(this).data('handle')
        let url = `/products/${handle}.json`

        fetch(url)
            .then(response => response.json())
            .then(data => {
               var variants = data.product.variants
               const dataText = variants.filter((item) => item.option1 === colorSelected).map((variant) => {
                return `
                    <li>
                        <span class="${variant.inventory_quantity == 0 ? ` not-allow` : `product-sizes__button`}" data-variant="${variant.id}">${variant.option2}</span>
                    </li>
                `
               }).join("");

              document.querySelector(`#product-size-container-${id} ul`).innerHTML = dataText
        }); 
    })
})