function updateCartDrawer(){
     fetch(window.Shopify.routes.root + 'cart.js', {method: 'GET'}).then(response => {return response.json();}).catch((error) => {console.error('Error:', error);
            }).then(cart=>{
              if(cart.items){
                console.log(cart);
                let drawer=document.querySelector('cart-drawer');
                if(drawer.classList.contains('is-empty')) drawer.classList.remove('is-empty');
                document.querySelector('.drawer__inner-empty')?.remove();
                let updated_cart=`<cart-drawer-items>
        <form action="/cart" id="CartDrawer-Form" class="cart__contents cart-drawer__form" method="post">
          <div id="CartDrawer-CartItems" class="drawer__contents js-contents"><div class="drawer__cart-items-wrapper">
                <table class="cart-items" role="table">
                  <thead role="rowgroup">
                    <tr role="row">
                      <th id="CartDrawer-ColumnProductImage" role="columnheader">
                        <span class="visually-hidden">Imagen del producto</span>
                      </th>
                      <th id="CartDrawer-ColumnProduct" class="caption-with-letter-spacing" scope="col" role="columnheader">
                        Producto
                      </th>
                      <th id="CartDrawer-ColumnTotal" class="right caption-with-letter-spacing" scope="col" role="columnheader">
                        Total
                      </th>
                      <th id="CartDrawer-ColumnQuantity" role="columnheader">
                        <span class="visually-hidden">Cantidad</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">`;
                for(let i=0;i<cart.items.length;i++){
                      let item_str=`<tr id="CartDrawer-Item-${i+1}" class="cart-item" role="row">
                        <td class="cart-item__media" role="cell" headers="CartDrawer-ColumnProductImage">
                          
                            
                            <a href="${cart.items[i].url}" class="cart-item__link" tabindex="-1" aria-hidden="true"> </a>
                            <img class="cart-item__image" src="${cart.items[i].image}&amp;width=300" alt="" loading="lazy" width="150" height="150">
                          
                        </td>

                        <td class="cart-item__details" role="cell" headers="CartDrawer-ColumnProduct"><a href="${cart.items[i].url}" class="cart-item__name h4 break">${cart.items[i].product_title}</a><div class="product-option">
                              ${Shopify.formatMoney(cart.items[i].final_price)}
                            </div><dl>`;
                  
                        for(let j=0;j<cart.items[i].options_with_values.length;j++){
                          if(cart.items[i].options_with_values[j].name != 'Title')
                          item_str+=`<div class="product-option"><dt>${cart.items[i].options_with_values[j].name}:</dt><dd>${cart.items[i].options_with_values[j].value}</dd></div>`
                        }
                                    
                                  

                          item_str+=  `</dl><p class="product-option"></p><ul class="discounts list-unstyled" role="list" aria-label="Descuento"></ul>
                        </td>

                        <td class="cart-item__totals right" role="cell" headers="CartDrawer-ColumnTotal">
                          <div class="loading-overlay hidden">
                            <div class="loading-overlay__spinner">
                              <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                              </svg>
                            </div>
                          </div>

                          <div class="cart-item__price-wrapper"><span class="price price--end">
                                ${Shopify.formatMoney(cart.items[i].final_price)}
                              </span></div>
                        </td>

                        <td class="cart-item__quantity" role="cell" headers="CartDrawer-ColumnQuantity">
                          <div class="cart-item__quantity-wrapper">
                            <quantity-input class="quantity cart-quantity">
                              <button class="quantity__button no-js-hidden disabled" name="minus" type="button">
                                <span class="visually-hidden">Reducir cantidad para ${cart.items[i].product_title}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor">
</path></svg>

                              </button>
                              <input class="quantity__input" type="number" data-quantity-variant-id="${cart.items[i].variant_id}" name="updates[]" value="${cart.items[i].quantity}" data-cart-quantity="${cart.items[i].quantity}" min="1" step="1" aria-label="Cantidad para ${cart.items[i].product_title}" id="Drawer-quantity-${i+1}" data-index="${i+1}">
                              <button class="quantity__button no-js-hidden" name="plus" type="button">
                                <span class="visually-hidden">Aumentar cantidad para ${cart.items[i].product_title}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor">
</path></svg>

                              </button>
                            </quantity-input>

                            <cart-remove-button id="CartDrawer-Remove-${i+1}" data-index="${i+1}">
                              <button type="button" class="button button--tertiary" aria-label="Eliminar ${cart.items[i].title}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="icon icon-remove">
  <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
  <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
</svg>

                              </button>
                            </cart-remove-button>
                          </div>

                          <div id="CartDrawer-LineItemError-${i+1}" class="cart-item__error" role="alert">
                            <small class="cart-item__error-text"></small>
                            <svg aria-hidden="true" focusable="false" class="icon icon-error" viewBox="0 0 13 13">
                              <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                              <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                              <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
                              <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                            </path></svg>
                          </div>
                        </td>
                      </tr>`
                  updated_cart+=item_str;
                }
                updated_cart+=`</tbody></table></div><p id="CartDrawer-LiveRegionText" class="visually-hidden" role="status"></p><p id="CartDrawer-LineItemStatus" class="visually-hidden" aria-hidden="true" role="status">Cargando...</p></div><div id="CartDrawer-CartErrors" role="alert"></div></form></cart-drawer-items>`
                document.querySelector('cart-drawer-items')?.remove();
                document.querySelector('#CartDrawer .drawer__inner .drawer__header').insertAdjacentHTML('afterend',updated_cart);
              }
            })
