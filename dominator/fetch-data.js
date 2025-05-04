
var divs = ['#ecommerce-products', '#ecommerce-products', '#pinterest-tiles', '#ecommerce-products', '#ecommerce-products','#seller-trends-ecommerce-products']
var scrollLimit = 0;
var mobileViewWidth = 500;
localStorage.setItem('flag', 'false');
var scrollFlag = false;

var addTile = (product, prod, pType = 0, from) => {
    let card = '';
    if (product.product_type == "tote-bag") {
        try {
            let url = product.image_url;
            let urlParts = url.split("/");
            let lastPart = urlParts[urlParts.length - 1];
            let lastPartParts = lastPart.split(".");
            let extension = lastPartParts[1];
            let newLastPart = lastPart.replace(extension, "__AC_SY445_SX342_QL70_");
            product.image_url = url.replace(lastPart, newLastPart);
        } catch (err) {
            product.image_url = product.image_url;
        }
    }

    if (product.product_type == "premium") {
        try {
            let url = product.image_url;
            let urlParts = url.split("/");
            let lastPart = urlParts[urlParts.length - 1];
            let lastPartParts = lastPart.split(".");
            let extension = lastPartParts[6];
            let newLastPart = lastPart.replace(extension, "_AC_SX385_");
            product.image_url = url.replace(lastPart, newLastPart);
        } catch (err) {
            product.image_url = product.image_url;
        }
    }
    switch (pType) {
        case 0:
            card = addPrdTile(product, prod, from);
            break;
        case 5:
            card = addPrdTile(product, prod, from);
        break;
        case 1:
            if (product.views != null) {
                var img = `<div class="item-img text-center product-tile-${prod}" style="background-image: url('${product.image_url}');"></div>`;
                if ($('#platform').val() == 'spreadshirt') {
                    img = `<img src="${product.image_url}" alt="${product.title}" class="small-pro-only-image">`;
                }
                div = '';
                if (product.created_date != null) {
                    div = `<h6 class="item-name">
                        <b>Created On</b> ${product.created_date}
                    </h6>
                    <h6 class="item-name">
                        <b>Favorites</b> ${product.num_favorers}
                    </h6>`;
                }
                card = `<div class="card ecommerce-card" >`;
                acOp = card + `<ul class="list-group list-group-horizontal cstm-icos share">
                    <li class="list-group-item icon">
                        <a href="javascript:void(0);" data-product_type="${product.product_type}" data-asin="${product.title}" data-url="${product.image_url}" class="download-product-image" data-title="${product.title}" data-platform="${prod}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download">
                            <i data-feather='arrow-down-circle'></i>
                        </a>
                    </li>
                    <li class="list-group-item icon ${prod == 'etsy' ? "d-none" : ""}">
                        <a href="javascript:void(0);" class="copy-product-image" data-platform="${prod}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Copy" data-url="${product.image_url}">
                            <i data-feather='copy'></i>
                        </a>
                    </li>
                    <li class="list-group-item icon last">
                        <a href="${product.url}" target="_blank" class="" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Open in Website">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </li>
                </ul>`;
                if (product.amazon_climate_pledge_friendly) {
                    // acOp = acOp + `<div class="climate-friendly-wrapper" title="Climate Pledge Friendly"><img src="${climateFriendlyIcon}"></div>`;
                }
                if (product.hasOwnProperty('pro_only') && product.pro_only === true) {
                    acOp = card + `<div class="pro-upgrade-btn" style="top:62%"><a href="/billings_and_plans?open-model=yes" class="btn btn-primary">Upgrade</a></div>`;
                }
                card = acOp + img;
                card = card + `<div class="card-body">
                        <div class="item-wrapper">
                            <div class="item-rating">
                                <div class="reviews_div">${$('#platform').val() == 'spreadshirt' ? '' : product.views + ' views'}</div>
                            </div>
                            <div>
                                <h6 class="item-price">${product.currency_code}${product.price}</h6>
                            </div>
                        </div>
                        <h6 class="item-name">
                            <a class="text-body" href="javascript:void(0);">${product.title}</a>
                        </h6>
                        ` + div + `
                        <p class="card-text item-description"></p>
                    </div>
                </div>`;
            }
            break;
        case 2:
            let date = new Date(product.created_at * 1000);
            card = `<div class="card mb-3 mx-auto">
                <div class="row no-gutters">
                    <div class="col-md-3 my-2 text-center">
                        <img src="${product.image_url}" alt="" class="card-img">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${product.title}
                            </h5>
                            <div class="card-text">
                                <div class="table-responsive">`;
                                pinOp = card + `<table class="table table-sm">
                                        <tbody>

                                            <tr>
                                                <th style="width: 30%;">Author</th>
                                                <td>
                                                    <span class="avatar ${(product.hasOwnProperty('author_image_url') && product.author_image_url !== null) ? '' : 'd-none'}">
                                                        <img class="round" src="${(product.hasOwnProperty('author_image_url') && product.author_image_url !== null) ? product.author_image_url : ''}" alt="avatar" height="30" width="30" onerror="this.style.display='none'">
                                                    </span>
                                                    <a href="${product.author_link}" target="_blank" rel="noopener noreferrer">${product.author_name}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Comments</th>
                                                <td>${(product.comment_count == null ? "N/A" : product.comment_count)}</td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Repins</th>
                                                <td>${product.repin_count}</td>
                                            </tr>
                                            <tr>
                                                <th>Created On</th>
                                                <td>${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</td>
                                            </tr>
                                            <tr>
                                                <th>Source</th>
                                                ${(product.external_link == null ? '<td>N/A</td>' : '<td><a href="' + product.external_link + '" target="_blank" rel="noopener noreferrer">' + new URL(product.external_link) + '</a></td>')}
                                                </tr>
                                            <tr>
                                                <th>Description</th>
                                                <td>${(product.description == null ? "N/A" : product.description)}</td>
                                            </tr>
                                            <tr>
                                                <th>Link</th>
                                                <td><a href="${product.image_link}" target="_blank" rel="noopener noreferrer">Visit Now</a></td>
                                            </tr>
                                        </tbody>
                                    </table>`;
                                    if (product.hasOwnProperty('pro_only') && product.pro_only === true) {
                                        pinOp = card + `<div class="pro-upgrade-btn"><a href="/billings_and_plans?open-model=yes" class="btn btn-primary">Upgrade</a></div>`;
                                    }
                                    card = pinOp + `</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            break;
        case 3:
            card = `<div class="card">
                <div class="card-body simple-border-bottom">
                    <div class="cardtitleWrapper d-flex align-items-start justify-content-between mt-1 mb-0 text-center position-relative">
                        <h4>${product[0]}</h4>
                        <div class="actionButton d-flex align-items-center">
                            <a href="best_sellers" class="seeAllProd">See All</a>
                        </div>
                    </div>
                    <div class="swiper-responsive-breakpoints swiper-container px-0 px-sm-2 px-md-4 px-lg-4 py-2">
                        <div class="swiper-wrapper">`;
            product[1].forEach((subProduct) => {
                card += `<div class="swiper-slide">
                                    <ul class="list-group list-group-horizontal cstm-icos share">
                                        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}">`;
                if (subProduct.is_favorite) {
                    card += `<a class="mark_as_favorite productTileClick" data-click-flag="mark_as_favorite" data-asin="${subProduct.asin}" data-marketplace="${subProduct.market_place_id}" data-title="${subProduct.title}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add to Favorites">
                                                    <i data-feather="heart" class="text-danger" fill="red"></i>
                                                </a>`;

                } else {
                    card += `<a data-asin="${subProduct.asin}" class="btn-light mark_as_favorite productTileClick" data-click-flag="mark_as_favorite" data-marketplace="${subProduct.market_place_id}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add to Favorites">
                                                    <i data-feather="heart"></i>
                                                </a>`;
                }
                card += `</li>
                                        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}">
                                            <a href="${subProduct.image_url}" target="_blank" download class="productTileClick" data-click-flag="download_product_image" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download">
                                                <i data-feather='arrow-down-circle'></i>
                                            </a>
                                        </li>
                                        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}">
                                            <a href="#" class="productTileClick" data-click-flag="copy" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Copy">
                                                <i data-feather='copy'></i>
                                            </a>
                                        </li>
                                        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}">
                                            <a href="${subProduct.amazon_link}" target="_blank" class="" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Open in Amazon">
                                                <i class="fab fa-amazon"></i>
                                            </a>
                                        </li>
                                        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : 'last'}">
                                            <a href="${'products/' + subProduct.market_place_id + '/' + subProduct.asin}" target="_blank" class="" data-bs-toggle="tooltip" data-bs-placement="bottom" title="More Info">
                                                <i data-feather='info'></i>
                                            </a>
                                        </li>`;
                                        if($(window).width() <= mobileViewWidth){
                                            card = card + `<li class="list-group-item icon mobile-icon last"><a href="javascript:void()"><i data-feather="more-vertical"></i></a></li>`;
                                        }
                                        card = card + `</ul>
                                    <div class="item-heading">
                                        <h5 class="text-truncate mb-0">${subProduct.title}</h5>
                                        <small class="text-body">by ${subProduct.brand}</small>
                                    </div>
                                    <div class="">
                                        <img src="${subProduct.image_url}" class="img-fluid" alt="image" />
                                    </div>
                                    <div class="item-wrapper">
                                        <div class="item-rating">
                                            <ul class="unstyled-list list-inline mb-25">
                                                <li class="ratings-list-item"><i data-feather="star" class="${(subProduct.rating >= 1) ? 'filled-star' : 'unfilled-star'}"></i></li>
                                                <li class="ratings-list-item"><i data-feather="star" class="${(subProduct.rating >= 2) ? 'filled-star' : 'unfilled-star'}"></i></li>
                                                <li class="ratings-list-item"><i data-feather="star" class="${(subProduct.rating >= 3) ? 'filled-star' : 'unfilled-star'}"></i></li>
                                                <li class="ratings-list-item"><i data-feather="star" class="${(subProduct.rating >= 4) ? 'filled-star' : 'unfilled-star'}"></i></li>
                                                <li class="ratings-list-item"><i data-feather="star" class="${(subProduct.rating >= 5) ? 'filled-star' : 'unfilled-star'}"></i></li>
                                            </ul>
                                            <div class="reviews_div text-start">${subProduct.reviews}  review(s)</div>
                                        </div>
                                    </div>
                                    <div class="ecommerce-details-price d-flex flex-wrap mt-50 pt-75 text-center">
                                        <h5 class="item-price" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Current Price">${subProduct.currency_symbol}${subProduct.price !== null ? subProduct.price : 'N/A'}</h5>
                                        <h5 class="item-price border-start" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Estimated sales over the last 30 days">
                                            <i data-feather="shopping-cart"></i>
                                            <span> ${(product.hasOwnProperty('estimated_sales') && product.estimated_sales !== null) ? product.estimated_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'} </span>
                                        </h5>
                                        <h5 class="item-price border-start" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Current BSR">
                                            <i class="bi bi-graph-up"></i>
                                            <span> ${(subProduct.best_seller_rank != "" ? subProduct.best_seller_rank : 'N/A')} </span>
                                        </h5>
                                    </div>
                                </div>`;
            });

            card += `</div>
                        <!-- Add Arrows -->
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
                <!-- Related Products ends -->
            </div>`;
            break;
    }

    $(divs[pType]).append(card);
    feather.replace();
}

var addTileInSwiper = (productGroup, prod, pType = 0, payload = []) => {
    var card = '';
    var productSlide = '';
    var linkList = [];
    var links = "";
    switch (pType) {
        case 0:
            var brandCounter = new Date().getTime();
            for (var [key, brandGroup] of Object.entries(productGroup)) {
                card = `<div class="card">
                            <div class="card-body simple-border-bottom">
                                <div class="cardtitleWrapper d-flex align-items-start justify-content-between mt-1 mb-0 text-center position-relative">
                                    <h4 class="slider-header">${key}</h4>
                                    <div class="actionButton d-flex align-items-center">
                                        <a href="${brandGroup.amazon_url}" target="_blank" class="btn btn-primary openAmz me-2" title="Open in Amazon">Open in Amazon</a>
                                        <a href="${brandGroup.search_url}" target="_blank" class="btn btn-primary seeAllProd">See All</a>
                                    </div>
                                </div>
                                <div class="swiper-responsive-breakpoints swiper-container px-0 px-sm-2 px-md-4 px-lg-4 py-2" id="brand_${brandCounter}">
                                    <div class="swiper-wrapper"> </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                </div>
                            </div>
                        </div>`;
                $(divs[pType]).append(card);


                var swiper = new Swiper(`#brand_${brandCounter}`, {
                    slidesPerView: 1,
                    spaceBetween: 55,
                    init: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        1600: {
                            slidesPerView: 5,
                            spaceBetween: 35
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 55
                        },
                        850: {
                            slidesPerView: 3,
                            spaceBetween: 35
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 55
                        },
                        500: {
                            slidesPerView: 2,
                            spaceBetween: 25
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 25
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        }
                    }
                });

                // links = "<ul>";
                if (brandGroup) {
                    brandGroup.products.forEach(product => {
                        // let { hostname, origin } = new URL(product.amazon_link);
                        // let domain = hostname.replace('www.', '');
                        // var amazon_url = "";
                        // if (linkList.includes(domain) == false) {
                        //     linkList.push(domain);
                        //     amazon_url = `${marketProductList[domain]['url']}=${key}${marketProductList[domain]['product'][product.product_type]}`;
                        //     links += `<li> <a href="${amazon_url}" target='_blank'>${domain}</a> </li>`;
                        // }

                        productSlide = addPrdTile(product, prod);

                        swiper.appendSlide(productSlide);
                    });
                }

                // links += "</ul>";
                // $(`#amazon_links_${brandCounter}`).attr('data-bs-content', links);
                linkList = [];
                brandCounter++;
            }
            bindSliderEvent();
            break;
        case 4:
            var brandCounter = new Date().getTime();
            if (getOffsetValPayload(payload) === 0 && productGroup.length <= 0) {
                $(divs[3]).append(`<div class="card"><div class="card-body simple-border-bottom"><div class="m-auto text-center">No Event available.</div></div></div>`);
                appendUpgradeText(3, true);
                break;
            }
            // $(divs[3]).html('')
            productGroup.forEach((event) => {
                var serachPopoverParams = {
                    title: event.title,
                    amazon_link: event.amazon_url,
                    // marketplace: row.market_place_id
                }
                card = `<div class="card">
                    <div class="card-body simple-border-bottom">
                        <div
                            class="cardtitleWrapper d-flex align-items-center justify-content-between mt-1 mb-0 text-center position-relative">
                            <div class="titleInnerWrapper text-start">
                                <h4 class="slider-header">${event.title}<div class="eventDate"><span class="slider-subtitle"><i class="fas fa-calendar-day"></i>&nbsp;<span class="date">${event.start}</span></span></div></h4>
                            </div>
                            <div class="actionButton d-flex align-items-center">
                                <!-- <a href="${event.search_url}" id="amazon_links_${brandCounter}" class="open-in-amazon" data-bs-html="true" data-bs-toggle="popover" data-bs-content="" title="Open in Amazon" data-bs-trigger="click">Open in Amazon</a>
                                <a href="${event.amazon_url}" target="_blank" title="Open in Amazon" class="btn openAmz btn-primary me-2 ">Open in Amazon</a>
                                <a href="${event.search_url}" target="_blank" class="btn btn-primary seeAllProd">See All</a>-->
                                <a href="#" class="btn btn-primary" data-bs-toggle="dropdown" data-bs-placement="right"><i data-feather="search"></i> Search</a>${searchPopovers(serachPopoverParams)}

                            </div>
                        </div>
                        <div class="swiper-responsive-breakpoints swiper-container px-0 px-sm-2 px-md-4 px-lg-4 py-2" id="brand_${brandCounter}">
                            <div class="swiper-wrapper"> </div>
                            <!-- Add Arrows -->
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                    </div>
                </div>`;
                $(divs[0]).append(card);
                var swiper = new Swiper(`#brand_${brandCounter}`, {
                    slidesPerView: 1,
                    spaceBetween: 55,
                    init: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        1600: {
                            slidesPerView: 5,
                            spaceBetween: 35
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 55
                        },
                        850: {
                            slidesPerView: 3,
                            spaceBetween: 35
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 55
                        },
                        500: {
                            slidesPerView: 2,
                            spaceBetween: 25
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 25
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        }
                    }
                });

                if (event.productList.length > 0) {
                    // links = "<ul>";
                    event.productList.forEach((product) => {
                        // let { hostname, origin } = new URL(product.amazon_link);
                        // let domain = hostname.replace('www.', '');
                        // if (linkList.includes(domain) == false) {
                        //     linkList.push(domain);
                        //     links += `<li> <a href='${origin}/s?k="${event.title}"&i=fashion-novelty' target='_blank'>${domain}</a> </li>`;
                        // }

                        swiper.appendSlide(addPrdTile(product, prod))
                    });

                    // links += "</ul>";

                    // $(`#amazon_links_${brandCounter}`).attr('data-bs-content', links);
                    linkList = [];

                } else {
                    $(`#brand_${brandCounter}`).html(`<div class="m-auto text-center">No products available. Click <a href="/realtime_search?k=${event.title}" target="_BLANK" class="realtime-link" onclick="localStorage.setItem('market-id', '${$('#selectMarketplace').val()}'); localStorage.setItem('event', '${event.title}');" >here</a> to fetch realtime products.</div>`);
                }
                brandCounter++;
            });
            bindSliderEvent();
            break;
    }
    feather.replace();
}

var fetchData = (url, data, prod, pType = 0) => {
    if (data.from == "seller_trends") {
        visibleLoaderButton(true);
    }
    if ($('#offset').val() == 0 || (data.platform && $('#offset').val() == 1)) {
        if (data.from == "real_time") {
            $('#realtime_search_modal').modal('show');
        } else {
            if(data.from !== "seller_trends"){
                $('#loader').removeClass('d-none');
            }
        }
    }
    localStorage.setItem('flag', 'true');
    $.ajax({
        type: pType == 4 ? 'GET' : 'POST',
        url,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data,
        cache: false,
        success: function (res) {
            localStorage.setItem('flag', 'false');
            if (($('#offset').val() == 0 || (data.platform && $('#offset').val() == 1)) && res.result.length == 0 && res.customLimit != 0) {
                $(divs[pType]).html(`<div class="text-center no-product-found">No Data Found.</div>`);
                if (data.from == "seller_trends") {
                    visibleLoaderButton(false);
                }
            } else {
                if (Array.isArray(res.result) && pType != 4) {
                    if (data.from == "real_time") {
                        res.result.forEach((product) => {
                            card = addRealTimePrdTile(product, data.marketplace);
                            $(divs[pType]).append(card);
                            feather.replace();
                            console.log("real_time");
                        });
                    } else if (data.from == "deleted_designs") {
                        res.result.forEach((product) => {
                            card = addDeletedPrdTile(product, prod);
                            $(divs[pType]).append(card);
                            feather.replace();
                        });
                        bindHoverEvent();
                    } else if (data.from == "dashboard_best_sellers" || data.from == "dashboard_seller_trends") {

                        if (data.from == "dashboard_best_sellers") {
                            elType = '.seller-swiper-pagination';
                            nextElType = '.swiper-button-next-best-first';
                            prevElType = '.swiper-button-prev-best-first';
                        } else {
                            elType = '.seller-trends-swiper-pagination';
                            nextElType = '.swiper-button-next-best-second';
                            prevElType = '.swiper-button-prev-best-second';
                        }

                        var swiper = new Swiper(divs[pType], {
                            // spaceBetween: 24,
                            // slidesPerView: 3,
                            init: true,
                            breakpoints: undefined,
                            // loop: true,
                            centeredSlidesBounds: true,
                            spaceBetween: 24,
                            disableOnInteraction: true,
                            navigation: {
                                nextEl: nextElType,
                                prevEl: prevElType
                            },
                            // autoplay: {
                            //     delay: 5000,
                            // },
                            // pagination: {
                            //     el: elType,
                            //     clickable: true,
                            // },
                            breakpoints: {
                                1700: {
                                    slidesPerView: 4,
                                },
                                1300: {
                                    slidesPerView: 4,
                                },
                                1199: {
                                    slidesPerView: 4,
                                },
                                991: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                // 600: {
                                //     slidesPerView: 2,
                                // },
                                600: {
                                    slidesPerView: 2,
                                }
                            },
                            // centeredSlides: true,

                        });

                        swiper.removeAllSlides();

                        res.result.forEach((product) => swiper.appendSlide(addPrdTile(product, prod, pType, data.from)));

                        $(window).trigger('resize');
                    } else {
                        // Best sellers & seller trends
                        res.result.forEach((product) => addTile(product, prod, pType, data.from));

                        $('.average-bsr-30-days-div').removeClass('d-none');

                        if (data.selected_date_range == "before") {
                            var inputDate = new Date(data.date[0]);
                            var today = new Date();

                            var pastDate = new Date();
                            pastDate.setDate(today.getDate() - 31);

                            var isOlderThan30Days = (inputDate < pastDate) ? true : false;

                            if(isOlderThan30Days) {
                                $('.average-bsr-30-days-div').addClass('d-none');
                            }
                        }

                        if (data.from == "seller_trends") {
                            visibleLoaderButton(false);
                        }

                        try {
                            if(scrollFlag){
                                $('html, body').animate({
                                    scrollTop: $("#ecommerce-products").offset().top-100
                                }, 500);
                                scrollFlag = false;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                        bindHoverEvent();
                    }
                } else if (typeof res.result === 'object') {
                    // Brands and events
                    addTileInSwiper(res.result, prod, pType, data);
                } else if (pType == 4) {
                    // For now this is not working for events
                    addTileInSwiper(res.result, prod, pType);
                } else {
                    addTile(res.result, pType);
                }
            }

            appendUpgradeText(pType);

            if (data.from == "dashboard_best_sellers" || data.from == "dashboard_seller_trends"){
                appendUpgradeText(pType);
            }

            $('#offset').val(res.offset);
            pType = (pType == 4) ? 3 : pType;
            scrollLimit = parseFloat($(divs[pType]).css('height'));
            if (data.from == "real_time") {
                $('#realtime_search_modal').modal('hide');
            } else {
                $('#loader').addClass('d-none');
            }
        },
        error: function () {
            if (data.from == "seller_trends") {
                visibleLoaderButton(false);
            }
            localStorage.setItem('flag', 'false');
            if (data.from == "real_time") {
                $('#realtime_search_modal').modal('hide');
            } else {
                $('#loader').addClass('d-none');
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        localStorage.setItem('flag', 'true');
        if (data.from == "seller_trends") {
            visibleLoaderButton(false);
        }
        if (jqXHR.status == 422) {
            try {
                Swal.fire({
                    title: (jqXHR.responseJSON.title != undefined ? jqXHR.responseJSON.title : 'Daily Limit Reached'),
                    text: (jqXHR.responseJSON.description != undefined ? jqXHR.responseJSON.description : 'Please upgrade your plan to enhance your access.'),
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Upgrade',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-outline-danger ms-1'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/billings_and_plans?open-model=yes";
                    }
                });
            } catch (error) {
                alert("Please upgrade your plan to enhance your access.");
            }
        }
        if (jqXHR.status == 429) {
            try {
                Swal.fire({
                    title: (jqXHR.responseJSON.title != undefined ? jqXHR.responseJSON.title : 'Unusual Activity Detected'),
                    text: (jqXHR.responseJSON.description != undefined ? jqXHR.responseJSON.description : 'We have noticed unusual activity in your account. Your access has been restricted until tomorrow.'),
                    icon: 'error',
                    showCancelButton: false,
                    buttonsStyling: true
                }).then((result) => {
                });
            } catch (error) {
                alert("We have noticed unusual activity in your account. Your access has been restricted until tomorrow.");
            }
        }
    });
}

var generateDynamicParameters = (allow_empty_search_box = 0) => {
    let data = {
        offset: $('#offset').val()
    };
    let valid = true;
    if ($('#search-keyword').length == 1) {
        if ($('#search-keyword').val().length < 3) {
            $('#lbl-error-keyword').removeClass('d-none');
            valid = false;
        } else {
            $('#lbl-error-keyword').addClass('d-none');
            data['search'] = $('#search-keyword').val();
        }
    }

    if ($('#search-type').length && $('#search-type').val().length > 1) {
        data['search_type'] = $('#search-type').val();
    } else {
        data['search_type'] = 'all';
    }

    valid = allow_empty_search_box == 1 ? true : valid;
    if ($('#marketplace').length == 1) {
        data['marketplace'] = $('#marketplace').val();
    }
    if ($('#platform').length == 1) {
        data['platform'] = $('#platform').val();
    }
    if ($('#domain').length == 1) {
        data['domain'] = $('#domain').val();
    }
    if ($('#product').length == 1) {
        data['product'] = $('#product').val();
    }
    if ($('#sorting').length == 1) {
        data['sorting'] = $('#sorting').val();
    }
    if ($('#trend_type').length == 1) {
        data['trend_type'] = $('#trend_type').val();
    }
    if ($('#selectSubcategory').length == 1) {
        data['subcategory'] = $('#selectSubcategory').val();
    }
    if ($('#selectCategories').length == 1) {
        data['category'] = $('#selectCategories').val();
    }

    if ($('#selecTimePeriod').length == 1) {
        data['time_period'] = $('#selecTimePeriod').val();
    }

    if ($('#customSwitchBSR:checked').length == 1) {
        data['bsr'] = [$('#bsr_range_min').val(), $('#bsr_range_max').val()];
    }

    if ($('#search_by_date').length == 1) {
        data['search_by_date'] = $('#search_by_date').val();
    }

    data['hide_brands'] = 1;

    if ($('#advanced_options_div').hasClass('show')) {
        // if ($('#customHideBrands').is(':checked')) {
        //     data['hide_brands'] = 1;
        // }
        data['hide_deleted'] = 0;
        if ($('#customHideDeleted').val() != "" && $('#customHideDeleted').val() != undefined && ($('#customHideDeleted').val() == "1" || $('#customHideDeleted').val() == 1)) {
            data['hide_deleted'] = 1;
        }

        data['amazon_climate_pledge_friendly'] = "";
        if ($('#amazon_climate_pledge_friendly').val() != "" && $('#amazon_climate_pledge_friendly').val() != undefined && $('#amazon_climate_pledge_friendly').val() != null) {
            data['amazon_climate_pledge_friendly'] = $('#amazon_climate_pledge_friendly').val();
        }

        if ($('#customSwitchBSR:checked').length == 1) {
            data['bsr'] = [$('#bsr_range_min').val(), $('#bsr_range_max').val()];
        }
        if ($('#customSwitchPriceRange:checked').length == 1) {
            data['price'] = [$('#price_range_min').val(), $('#price_range_max').val()];
        }
        if ($('#customSwitchRating:checked').length == 1) {
            data['rating'] = [$('#rating_range_min').val(), $('#rating_range_max').val()];
        }
        // if ($('#ratings').length == 1 && $('#ratings').val() != 0) {
        //     data['rating'] = $('#ratings').val();
        // }
        if ($('#date-range').length == 1 && $('#date-range').val() != '' && $('#date-range').hasClass('d-none') == false) {
            data['selected_date_range'] = $('#selected_date_range').val();
            data['date'] = $('#date-range').val().split(' to ');
        }

        if ($('#picker-date-range').length == 1 && $('#picker-date-range').val() != '' && $('#picker-date-range').hasClass('d-none') == false) {
            data['selected_date_range'] = $('#selected_date_range').val();
            data['pickdaterange'] = $('#picker-date-range').val().split(' - ');
        }

        // if ($('#selectShowTrendTypes').length == 1) {
        //     data['trend_types'] = $('#selectShowTrendTypes').val();
        // }
        if ($('#customSwitchAverageBsr:checked').length == 1) {
            data['average_bsr'] = [$('#average_bsr_range_min').val(), $('#average_bsr_range_max').val()];
        }
        if ($('#customSwitchReview:checked').length == 1) {
            data['review_range'] = [$('#review_range_min').val(), $('#review_range_max').val()];
        }
        if ($('#customHideBrands').val() != "" && $('#customHideBrands').val() != undefined && ($('#customHideBrands').val() == "1" || $('#customHideBrands').val() == 1)) {
            data['hide_brands'] = $('#customHideBrands').val();
        }else{
            delete data['hide_brands'];
        }
        // if ($('#customHideBrands:checked').length == 1) {
        //     data['hide_brands'] = $('#customHideBrands').val();
        // }
        if ($('#selectSubCategoryId').length == 1) {
            data['subcategory'] = $('#selectSubCategoryId').val();
        }
        if ($('#exclude_keywords').val() != "" && $('#exclude_keywords').val() != undefined) {
            data['exclude_keywords'] = $('#exclude_keywords').val();
        }
        if ($('#exclude_brand').val() != "" && $('#exclude_brand').val() != undefined) {
            data['exclude_brand'] = $('#exclude_brand').val();
        }

    }
    if (valid) {
        return data;
    } else {
        return false;
    }
}


var clearParameters = () => {
    //$('#search-keyword').val('');
    //$('#marketplace').val('');
    //$('#platform').val('');
    //$('#domain').val('');
    // $('#product').val('');
    //$('#product').empty('');
    //$('#sorting').val('');
    //$('#selectSubcategory').val('');
    //var newOption = new Option('', '', true, true);
    //$('.select2-data-ajax').append(newOption).trigger('change');
    //$('#selectCategories').val('');

    let customSwitchBSR = document.getElementById('customSwitchBSR');

    if (customSwitchBSR !== null) {
        if (customSwitchBSR.checked == true) {
            customSwitchBSR.checked = false;
            bsrRangeSlider.setAttribute('disabled', true);
            bsrRangeSlider.noUiSlider.reset();
        }
    }

    if ($('#advanced_options_div').hasClass('show')) {
        // $('#bsr_range_min').val('');
        // $('#bsr_range_max').val('');
        // $('#price_range_min').val('');
        // $('#price_range_max').val('');

        let customSwitchPriceRange = document.getElementById('customSwitchPriceRange');

        if (customSwitchPriceRange !== null) {
            if (customSwitchPriceRange.checked == true) {
                customSwitchPriceRange.checked = false;
                priceRangeSlider.setAttribute('disabled', true);
                priceRangeSlider.noUiSlider.reset();
            }
        }

        let customSwitchAverageBsr = document.getElementById('customSwitchAverageBsr');

        if (customSwitchAverageBsr !== null) {
            if (customSwitchAverageBsr.checked == true) {
                customSwitchAverageBsr.checked = false;
                averageBsrRangeSlider.setAttribute('disabled', true);
                averageBsrRangeSlider.noUiSlider.reset();
            }
        }

        let customSwitchReview = document.getElementById('customSwitchReview');

        if (customSwitchReview !== null) {
            if (customSwitchReview.checked == true) {
                customSwitchReview.checked = false;
                reviewRangeSlider.setAttribute('disabled', true);
                reviewRangeSlider.noUiSlider.reset();
            }
        }

        let fullStarRatings = document.querySelector(".full-star-ratings");

        if (fullStarRatings !== null) {
            $(".full-star-ratings").rateYo("rating", 0);
            $('#ratings').val('');
        }

        let flatpickrRange = document.querySelector(".flatpickr-range");

        if (flatpickrRange !== null) {
            $('.flatpickr-range').flatpickr().clear();
            $('#date-range').val('');
        }


        //$('#selecTimePeriod').val('');
        //$('#selectShowTrendTypes').val('');

        $('#offset').val(0);
    }


}

var appendUpgradeText = (pType, hideIt = false) => {
    pType = (pType == 4) ? 3 : pType;
    try {
        if(hideIt){
            if(isFreeToolUser != undefined && isFreeToolUser){
                if($('.upgrade-text').length > 0){
                    $('.upgrade-text').remove();
                }
            }
        }
        else{
            if(isFreeToolUser != undefined && isFreeToolUser){
                if($('.upgrade-text').length <= 0){
                    $(divs[pType]).after('<div class="px-2 py-5 upgrade-text text-center"><a class="update-plan-link pulse-effect btn btn-xl text-capitalize text-white border-0 mb-2" href="/billings_and_plans?open-model=yes">Upgrade For Unlimited Access</a></div>');
                }
                $('.upgrade-btn-centered').removeClass('d-none');
            }
        }
    } catch (error) {
        console.error(error);
    }
}
var getOffsetValPayload = (data) => {
    var retVal = null;
    if(data && data != "" && data.length > 0){
        data.forEach(element => {
           if(element.name == "offset"){
                retVal = element.value;
           }
        });
    }
    return retVal;
}
