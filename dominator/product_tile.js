var bulletpoints = "";
var mobileViewWidth = 390;

var addPrdTile = (product, prod, from) => {

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

    let deleted_date = new Date(product.deleted_from_amazon_date);
    let bulletpoints = "";

    if (product.hasOwnProperty('bulletpoints') && product.bulletpoints !== null) {
        bulletpoints = product.productBulletPoints;

        // bulletpoints = '<ul class="item-bulletpoints">';
        // //bulletpoints = product.bulletpoints.replace(/\\\//g, "");
        // if (typeof product.bulletpoints == 'string') {
        //     var pointsString = product.bulletpoints.replace(/(^"|"$)/g, '')
        //         .replace(/\\n/g, "")
        //         .replace(/\\\"/g, "'")
        //         .replace(/\\/g, "");
        //     try {
        //         JSON.parse(pointsString).forEach((bps) => {
        //             bulletpoints += `<li>${checkUnicodeStr(bps)}</li>`;
        //         });
        //     } catch (err) {
        //         console.log('addPrdTile - could not parse bullets ', err.message);
        //     }
        // } else if (typeof product.bulletpoints == 'object' || typeof product.bulletpoints == 'array') {
        //     product.bulletpoints.forEach((bps) => {
        //         bulletpoints += `<li>${checkUnicodeStr(bps)}</li>`;
        //     });
        // }
        // bulletpoints += '</ul>';
    }

    var show_trend_types = "";
    var trendRankDetails = "";
    var trendStatusLabel = "";
    var trendStatusValue = "";
    var product_id = (product.id !== undefined && product.id !== null && product.id !== "") ? product.id : "";
    if (from == "seller_trends") {
        product_id = product.product_id;
        if (product.result != "" && product.result == "newcomers") {
            show_trend_types = `<div class="show_trend_types bg-primary">Newcomers</div>`;
        } else if (product.result != "" && product.result == "winners") {
            show_trend_types = `<div class="show_trend_types bg-success">Winner / +${Math.abs(product.rank_diff)}% <i class="fa fa-angle-double-up"></i></div>`;
            trendStatusLabel = "% Increase";
            trendStatusValue = `+${Math.abs(product.rank_diff)}`;
        } else if (product.result != "" && product.result == "losers") {
            show_trend_types = `<div class="show_trend_types bg-danger">Looser / -${Math.abs(product.rank_diff)}% <i class="fa fa-angle-double-down"></i></div>`;
            trendStatusLabel = "% Decrease";
            trendStatusValue = `-${Math.abs(product.rank_diff)}`;
        } else if (product.result != "" && product.result == "defenders") {
            show_trend_types = `<div class="show_trend_types bg-info">Defenders</div>`;
        }
        trendRankDetails = `<div class="overlay-wrap"><p class="overlay-text">No data found</p></div>`;
        if (product.result != "") {
            trendRankDetails = `<div class="overlay-wrap">
                <div class="table-responsive overlay-text">
                    <table class="table" style="width: max-content;">
                     <input type="hidden" id="tblHidden" name="custId" value="${Math.abs(product.rank_diff)}">
                        <tbody>
                        <tr>
                            <td style="padding: 10px;">Previous rank</td>
                            <td style="padding: 5px 0px;">${numberWithCommas(product.previous_rank)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">Current rank</td>
                            <td style="padding: 5px 0px;">${numberWithCommas(product.current_rank)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">Difference</td>
                            <td id="bsr-diff-value-${product.asin}" style="padding: 5px 0px;">${numberWithCommas(product.previous_rank - product.current_rank)}</td>
                        </tr>`;
            if (trendStatusLabel != '') {
                trendRankDetails += `<tr>
                                <td style="padding: 10px;">${trendStatusLabel}</td>
                                <td id="trend-value-${product.asin}" style="padding: 5px 0px;">${trendStatusValue}</td>
                            </tr>`;
            }
            trendRankDetails += `</tbody>
                    </table>
                </div>
            </div>`;
        }
        if (product.hasOwnProperty('pro_only') && product.pro_only === true) {
            trendRankDetails = '';
            show_trend_types = ''
        }
    }

    var op = `<div class="swiper-slide">${show_trend_types}
    <div class="deleted_date ${(product.hasOwnProperty('deleted_from_amazon_date') && product.deleted_from_amazon_date !== null) ? '' : 'd-none'}"> ${(product.hasOwnProperty('deleted_from_amazon_date') && product.deleted_from_amazon_date !== null) ? 'Removed ' + deleted_date.toDateString() : ''} </div>
    <div class="card ecommerce-card">`;
    if (product.hasOwnProperty('pro_only') && product.pro_only === true) {
        op = op + `<div class="pro-upgrade-btn"><a href="/billings_and_plans?open-model=yes" class="btn btn-primary">Upgrade</a></div>`;
    }
    else {
        op = op + `<ul class="list-group list-group-horizontal cstm-icos share">
        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''} first ${(product.hasOwnProperty('deleted_from_amazon') && product.deleted_from_amazon === 0) ? '' : 'd-none'}">
            <a class="mark_as_favorite ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) !== null ? '' : 'btn-light'} productTileClick" data-click-flag="mark_as_favorite" data-marketplace="${product.market_place_id}" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" title="Add to Favorites"> <i data-feather="heart" class="heart-${product.asin} ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) ? 'text-danger" fill="red' : ''}" ></i> </a>
        </li>

        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}"> <a href="javascript:void(0);" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" data-product_type="${product.product_type}" data-url="${product.image_design_url}" data-title="${product.title}" class="download-product-image productTileClick" data-click-flag="download_product_image" title="Download"> <i data-feather="arrow-down-circle" width="20" height="20"></i> </a> </li>
        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}"> <a href="javascript:void(0);" class="copy-product-image productTileClick" data-click-flag="copy" data-url="${product.image_url}" title="Copy"> <i data-feather="copy"></i> </a> </li>
        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''} ${(product.hasOwnProperty('deleted_from_amazon') && product.deleted_from_amazon === 0) ? '' : 'd-none'} dropup"> <a href="#"  class="product-search-action" data-bs-toggle="dropdown" data-bs-placement="right"> <i data-feather="search"></i></a>${searchPopovers(product)} </li>
        <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : 'last'}"> <a href="products/${product.market_place_id}/${product.asin}" target="_blank" class="" title="More Info"> <i data-feather="info"></i> </a> </li>`;
        if ($(window).width() <= mobileViewWidth) {
            op = op + `<li class="list-group-item icon mobile-icon last"><a href="javascript:void()"><i data-feather="more-vertical"></i></a></li>`;
        }
        op = op + `</ul>`;
    }
    if (product.amazon_climate_pledge_friendly) {
        // op = op + `<div class="climate-friendly-wrapper" title="Climate Pledge Friendly"><img src="${climateFriendlyIcon}"></div>`;
    }
    op = op + `<div class="item-img position-relative text-center product-tile-${prod}" style="background-image: url('${product.image_url}'); background-position: center;">${trendRankDetails}</div>
            <div class="card-body">
                <div class="item-wrapper">
                    <div class="item-row mb-1 ${(product.hasOwnProperty('is_archive') && product.is_archive === true) ? 'd-none' : ''}">
                        <div class='average-bsr-30-days-div' title="Average BSR over 30 days">
                            BSR30 <span style="font-weight: 900;" class='average-bsr-30-days'>${(product.hasOwnProperty('last_month_product_bsr_history_avg_rank') && product.last_month_product_bsr_history_avg_rank !== null) ? parseInt(Math.round(product.last_month_product_bsr_history_avg_rank)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                        </div>
                        <div title="Ratings">
                            <span>${(product.rating !== null) ? parseFloat(product.rating) : 0} <i data-feather="star" class="${(product.rating !== null) ? 'filled-star' : ''}"></i> </span>
                        </div>
                        <div title="Reviews">
                            <span>${(product.hasOwnProperty('reviews') && product.reviews !== null) ? product.reviews : '0'} <i data-feather='message-square'></i> </span>
                        </div>
                        <div class="item-date-first-available">
                            <span><i data-feather="calendar"></i> ${(product.hasOwnProperty('date_first_available') && product.date_first_available !== null) ? product.date_first_available : 'N/A'} </span>
                        </div>
                    </div>
                    <div class="item-row mb-1">
                        <div title="Current BSR">
                            BSR <span style="font-weight: 900;">${product.best_seller_rank !== null ? product.best_seller_rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                        </div>
                        <div title="Price">
                            <span>${(product.hasOwnProperty('currency_symbol') && product.currency_symbol !== null && product.hasOwnProperty('price') && product.price !== null) ? product.currency_symbol + product.price : 'N/A'}</span>
                        </div>
                        <div title="Estimated Sales">
                            <span> <i class="fa-solid fa-bag-shopping"></i> ${(product.hasOwnProperty('estimated_sales') && product.estimated_sales !== null) ? product.estimated_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                        </div>
                        <div class="item-date-first-available" title="Bought in past month">
                            <span><i data-feather="shopping-bag"></i> ${(product.hasOwnProperty('amazon_product_sold_text') && product.amazon_product_sold_text !== null) ? prepareBoughtValue(product.amazon_product_sold_text) : 'N/A'} </span>
                        </div>
                    </div>
                    <div class="item-row item-row-list-view">
                        <div title="Published Date">
                            <span><i data-feather="calendar"></i> ${(product.hasOwnProperty('date_first_available') && product.date_first_available !== null) ? moment(product.date_first_available).format('MMM DD, YYYY') : 'N/A'} </span>
                        </div>
                        <div title="Bought in past month">
                            <span><i data-feather="shopping-bag"></i> ${(product.hasOwnProperty('amazon_product_sold_text') && product.amazon_product_sold_text !== null) ? prepareBoughtValue(product.amazon_product_sold_text) : 'N/A'}</span>
                        </div>

                    </div>

                </div>
                <h6 class="item-name"> <a class="" href="javascript:void(0);">${product.title}</a> <span class="card-text item-company">By ${product.brand}</span> </h6>
                ${bulletpoints}
            </div>`;
    if (product.hasOwnProperty('pro_only') && product.pro_only === true) {

    }
    else {
        op = op + `<div class="item-options text-center">
                    <div class="product-meta-stack">
                        <ul class="list-group">
                            <li class="list-group-item icon">
                                <a href="javascript:void(0);" class="copy-product-asin" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : ''}">
                                    <span id="${product.asin}-asin" class="">ASIN : ${product.asin}</span>
                                    <span id="${product.asin}-asin-copied" class="d-none">Copied !</span>
                                    <span id="${product.asin}-asin-copy-btn"><i data-feather="copy"></i></span>
                                </a>
                            </li>
                            <li class="list-group-item icon ${(product.hasOwnProperty('deleted_from_amazon') && product.deleted_from_amazon === 0) ? '' : 'd-none'}">
                                <a href="javascript:void(0);" class="mark_as_favorite ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) !== null ? '' : 'btn-light'} productTileClick" data-click-flag="mark_as_favorite" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" title="Add to Favorites" data-marketplace="${product.market_place_id}"> <i data-feather="heart"  class="heart-${product.asin} ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) ? 'text-danger" fill="red' : ''}" ></i> <span class="ms-1">Add to Favorites</span> </a>
                            </li>
                            <li class="list-group-item icon">
                                <a href="javascript:void(0);" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" data-product_type="${product.product_type}" data-url="${product.image_design_url}" data-title="${product.title}" class="download-product-image productTileClick" data-click-flag="download_product_image" title="Download"> <i data-feather="arrow-down-circle" width="20" height="20"></i><span class="ms-1">Download</span></a>
                            </li>
                            <li class="list-group-item icon">
                                <a href="javascript:void(0);" class="copy-product-image productTileClick" data-click-flag="copy" data-url="${product.image_url}" title="Copy"> <i data-feather="copy"></i>
                                    <span class="ms-1">Copy</span>
                                </a>
                            </li>
                            <!-- <li class="list-group-item icon ${(product.hasOwnProperty('deleted_from_amazon') && product.deleted_from_amazon === 0) ? '' : 'd-none'}">
                                <a href="${product.amazon_link}" target="_blank" class="" title="Open in Amazon"> <i class="fab fa-amazon"></i>
                                <span class="ms-1">Open in Amazon</span></a>
                            </li>-->
                            <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''} ${(product.hasOwnProperty('deleted_from_amazon') && product.deleted_from_amazon === 0) ? '' : 'd-none'} dropup"> <a href="#"  class="product-search-action" data-bs-toggle="dropdown" data-bs-placement="right"> <i data-feather="search"></i> <span class="ms-1">Open in Search</span> </a>${searchPopovers(product)} </li>
                            <li class="list-group-item icon">
                                <a href="products/${product.market_place_id}/${product.asin}" target="_blank" class="" title="More Info"> <i data-feather="info"></i><span class="ms-1">More Info</span></a>
                            </li>
                            <li class="list-group-item icon">
                                <a href="javascript:void(0);" class="show-list-view-graph" data-product_id="${product_id}" data-asin="${product.asin}" title="Show Graph"> <i data-feather="bar-chart-2"></i><span class="ms-1">Show Graph</span></a>
                            </li>
                        </ul>
                    </div>
                </div>`;
    }
    if (!(product.hasOwnProperty('pro_only') && product.pro_only === true)) {
        op = op + htmlGraphGridView(product);
    }
    op = op + htmlGraphListView(product) + `
            </div>
    </div>`;
    return op;
}


var addDeletedPrdTile = (product, prod) => {
    let deleted_date = new Date(product.deleted_from_amazon_date);
    var delOp = `<div class="swiper-slide">`;
    if (!(product.hasOwnProperty('pro_only') && product.pro_only === true)) {
        delOp = delOp + `<div class="deleted_date ${(product.hasOwnProperty('deleted_from_amazon_date') && product.deleted_from_amazon_date !== null) ? '' : 'd-none'}"> ${(product.hasOwnProperty('deleted_from_amazon_date') && product.deleted_from_amazon_date !== null) ? 'Removed ' + deleted_date.toDateString() : ''} </div>`;
    }
    delOp = delOp + `<div class="card ecommerce-card">`;
    if (product.hasOwnProperty('pro_only') && product.pro_only === true) {
        delOp = delOp + `<div class="pro-upgrade-btn"><a href="/billings_and_plans?open-model=yes" class="btn btn-primary">Upgrade</a></div>`;
    }
    else {
        delOp = delOp + `<ul class="list-group list-group-horizontal cstm-icos share">
                    <li class="list-group-item icon first ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}"> <a href="javascript:void(0);" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" data-product_type="${product.product_type}" data-url="${product.image_design_url}" data-title="${product.title}" class="download-product-image productTileClick" data-click-flag="download_product_image" title="Download"> <i data-feather="arrow-down-circle" width="20" height="20"></i> </a> </li>
                    <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}"> <a href="javascript:void(0);" class="copy-product-image productTileClick" data-click-flag="copy" data-url="${product.image_url}" title="Copy"> <i data-feather="copy"></i> </a> </li>
                    <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : 'last'} "> <a href="products/${product.market_place_id}/${product.asin}" target="_blank" class="" title="More Info"> <i data-feather="info"></i> </a> </li>`;
        if ($(window).width() <= mobileViewWidth) {
            delOp = delOp + `<li class="list-group-item icon mobile-icon last"><a href="javascript:void()"><i data-feather="more-vertical"></i></a></li>`;
        }
        delOp = delOp + `</ul>`;
    }

    if (product.amazon_climate_pledge_friendly) {
        // delOp = delOp + `<div class="climate-friendly-wrapper" title="Climate Pledge Friendly"><img src="${climateFriendlyIcon}"></div>`;
    }

    delOp = delOp + `<div class="item-img text-center product-tile-${prod}" style="background-image: url('${product.image_url}'); background-position: center;"> </div>
                    <div class="card-body">
                        <div class="item-wrapper">
                            <div class="item-row mb-1">
                                <div title="Average BSR over 30 days">
                                    BSR30 <span style="font-weight: 900;">${(product.hasOwnProperty('last_month_product_bsr_history_avg_rank') && product.last_month_product_bsr_history_avg_rank !== null) ? parseInt(Math.round(product.last_month_product_bsr_history_avg_rank)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                                </div>
                                <div title="Ratings">
                                    <span>${(product.rating !== null) ? product.rating : 0} <i data-feather="star" class="${(product.rating !== null) ? 'filled-star' : ''}"></i> </span>
                                </div>
                                <div title="Reviews">
                                    <span>${(product.hasOwnProperty('reviews') && product.reviews !== null) ? product.reviews : '0'} <i data-feather='message-square'></i> </span>
                                </div>
                                <div class="item-date-first-available">
                                    <span><i data-feather="calendar"></i> ${(product.hasOwnProperty('date_first_available') && product.date_first_available !== null) ? moment(product.date_first_available).format('MMM DD, YYYY') : 'N/A'} </span>
                                </div>
                            </div>
                            <div class="item-row mb-1">
                                <div title="Current BSR">
                                    BSR <span style="font-weight: 900;">${product.best_seller_rank !== null ? product.best_seller_rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                                </div>
                                <div title="Price">
                                    <span>${(product.hasOwnProperty('currency_symbol') && product.currency_symbol !== null && product.hasOwnProperty('price') && product.price !== null) ? product.currency_symbol + product.price : 'N/A'}</span>
                                </div>
                                <div title="Estimated Sales">
                                    <span> <i class="fa-solid fa-bag-shopping"></i> ${(product.hasOwnProperty('estimated_sales') && product.estimated_sales !== null) ? product.estimated_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                                </div>
                            </div>
                            <div class="item-row item-row-list-view">
                                <div title="Published Date">
                                    <span><i data-feather="calendar"></i> ${(product.hasOwnProperty('date_first_available') && product.date_first_available !== null) ? moment(product.date_first_available).format('MMM DD, YYYY') : 'N/A'} </span>
                                </div>
                                <div title="Bought in past month">
                                    <span><i data-feather="shopping-bag"></i> ${(product.hasOwnProperty('amazon_product_sold_text') && product.amazon_product_sold_text !== null) ? prepareBoughtValue(product.amazon_product_sold_text) : 'N/A'}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    `+ htmlGraphGridView(product, product.id) + `
                </div>
            </div>
        </div>`;
    return delOp;
}


var addRealTimePrdTile = (product, prod, marketplace) => {

    let bulletpoints = "";
    if (product.hasOwnProperty('feature_bullets') && product.feature_bullets !== null) {

        bulletpoints = product.productBulletPoints;

        // bulletpoints = '<ul class="item-bulletpoints">';
        // //bulletpoints = bulletpoints.replace(/\\\//g, "");
        // if (typeof product.feature_bullets == 'string') {
        //     // bulletpoints = '';
        //     var pointsString = product.feature_bullets.replace(/(^"|"$)/g, '')
        //         .replace(/\\n/g, "")
        //         .replace(/\\\"/g, "'")
        //         .replace(/\\/g, "");
        //     try {
        //         JSON.parse(pointsString).forEach((bps) => {
        //             bulletpoints += `<li>${checkUnicodeStr(bps)}</li>`;
        //         });
        //     } catch (err) {
        //         console.log('addRealTimePrdTile - could not parse bullets ', err.message);
        //     }
        // } else if (typeof product.feature_bullets == 'object' || typeof product.feature_bullets == 'array') {
        //     product.feature_bullets.forEach((bps) => {
        //         bulletpoints += `<li>${checkUnicodeStr(bps)}</li>`;
        //     });
        // }
        // bulletpoints += '</ul>';
    }

    if (prod == "premium") {
        try {
            let url = product.main_image.link;
            let urlParts = url.split("/");
            let lastPart = urlParts[urlParts.length - 1];
            let lastPartParts = lastPart.split(".");
            let extension = lastPartParts[6];
            let newLastPart = lastPart.replace(extension, "_AC_SX385_");
            product.main_image.link = url.replace(lastPart, newLastPart);
        } catch (err) {
            product.main_image.link = product.main_image.link;
        }
    }

    var relOp = `<div class="card ecommerce-card">`;
    relOp += `<ul class="list-group list-group-horizontal cstm-icos share">
            <li class="list-group-item icon first ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}">
                <a class="mark_as_favorite productTileClick" data-click-flag="mark_as_favorite" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" title="Add to Favorites" data-marketplace="${product.market_place_id}"> <i data-feather="heart" class="heart-${product.asin} ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) ? 'text-danger" fill="red' : ''}" ></i> </a>
            </li>
            <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}"> <a href="javascript:void(0);" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" data-url="${(product.hasOwnProperty('main_image') && product.main_image.link !== null) ? (product.image_design_url) : 'N/A'}" data-product_type="${product.product_type}" data-title="${product.title}" class="download-product-image productTileClick" data-click-flag="download_product_image" title="Download"> <i data-feather="arrow-down-circle" width="20" height="20"></i> </a> </li>
            <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''}"> <a href="javascript:void(0);" class="copy-product-image productTileClick" data-click-flag="copy" data-url="${(product.hasOwnProperty('main_image') && product.main_image.link !== null) ? product.main_image.link : null}" title="Copy"> <i data-feather="copy"></i> </a> </li>
            <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : ''} dropup"> <a href="#"  class="product-search-action" data-bs-toggle="dropdown" data-bs-placement="right"> <i data-feather="search"></i></a>${searchPopovers(product, 'realtime')} </li>
            <li class="list-group-item icon ${$(window).width() <= mobileViewWidth ? 'mobile-icon' : 'last'}"> <a href="products/${marketplace}/${product.asin}" target="_blank" class="" title="More Info"> <i data-feather="info"></i> </a> </li>`;
    if ($(window).width() <= mobileViewWidth) {
        relOp = relOp + `<li class="list-group-item icon mobile-icon last"><a href="javascript:void()"><i data-feather="more-vertical"></i></a></li>`;
    }
    relOp = relOp + `</ul>`;
    if (product.amazon_climate_pledge_friendly) {
        // relOp = relOp + `<div class="climate-friendly-wrapper" title="Climate Pledge Friendly"><img src="${climateFriendlyIcon}"></div>`;
    }
    relOp = relOp + `<div class="item-img text-center product-tile-${prod}" style="background-image: url('${(product.hasOwnProperty('main_image') && product.main_image.link !== null) ? product.main_image.link : 'N/A'}'); background-position: center;"> </div>
            <div class="card-body">
                <div class="item-wrapper">
                    <div class="item-row mb-1">
                        <div title="Average BSR over 30 days">
                            BSR30 <span style="font-weight: 900;">${(product.hasOwnProperty('last_month_product_bsr_history_avg_rank') && product.last_month_product_bsr_history_avg_rank !== null) ? parseInt(Math.round(product.last_month_product_bsr_history_avg_rank)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                        </div>
                        <div title="Ratings">
                            <span>${(product.rating !== null) ? product.rating : 0} <i data-feather="star" class="${(product.rating !== null) ? 'filled-star' : ''}"></i> </span>
                        </div>
                        <div title="Reviews">
                            <span>${(product.hasOwnProperty('reviews_total') && product.reviews_total !== null) ? product.reviews_total : '0'} <i data-feather='message-square'></i> </span>
                        </div>
                        <div class="item-date-first-available">
                            <span><i data-feather="calendar"></i> ${(product.hasOwnProperty('date_first_available') && product.date_first_available !== null) ? product.date_first_available : 'N/A'} </span>
                        </div>
                    </div>
                    <div class="item-row mb-1">
                        <div title="Current BSR">
                            BSR <span style="font-weight: 900;">${(product.hasOwnProperty('bestsellers_rank') && product.bestsellers_rank.length > 0 && product.bestsellers_rank[0].rank !== null) ? product.bestsellers_rank[0].rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                        </div>
                        <div title="Price">
                            <span>${(product.hasOwnProperty('price') && product.price.length > 0 && product.price[0].symbol !== null && product.price[0].value !== null) ? product.price[0].symbol + product.price[0].value : 'N/A'}</span>
                        </div>
                        <div title="Estimated Sales">
                            <span> <i class="fa-solid fa-bag-shopping"></i> ${(product.hasOwnProperty('estimated_sales') && product.estimated_sales !== null) ? product.estimated_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</span>
                        </div>
                        <div class="item-date-first-available" title="Bought in past month">
                            <span><i data-feather="shopping-bag"></i> ${(product.hasOwnProperty('amazon_product_sold_text') && product.amazon_product_sold_text !== null) ? prepareBoughtValue(product.amazon_product_sold_text) : 'N/A'} </span>
                        </div>
                    </div>
                    <div class="item-row item-row-list-view">
                        <div title="Published Date">
                            <span><i data-feather="calendar"></i> ${(product.hasOwnProperty('date_first_available') && product.date_first_available !== null) ? moment(product.date_first_available).format('MMM DD, YYYY') : 'N/A'} </span>
                        </div>
                        <div title="Bought in past month">
                            <span><i data-feather="shopping-bag"></i> ${(product.hasOwnProperty('amazon_product_sold_text') && product.amazon_product_sold_text !== null) ? prepareBoughtValue(product.amazon_product_sold_text) : 'N/A'}</span>
                        </div>

                    </div>
                </div>

                <h6 class="item-name">
                    <a class="text-body" href="javascript:void(0);">${(product.hasOwnProperty('title') && product.title !== null) ? product.title : 'N/A'}</a>
                    <span class="card-text item-company">By <a href="#" class="company-name">${(product.hasOwnProperty('brand') && product.brand !== null) ? product.brand : 'N/A'}</a></span>
                </h6>
                ${bulletpoints}
            </div>

            <div class="item-options text-center">
                <div class="product-meta-stack">
                    <ul class="list-group">
                        <li class="list-group-item icon">
                            <a href="javascript:void(0);" class="copy-product-asin" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : ''}">
                                <span id="${product.asin}-asin" class="">ASIN : ${product.asin}</span>
                                <span id="${product.asin}-asin-copied" class="d-none">Copied !</span>
                                <span id="${product.asin}-asin-copy-btn"><i data-feather="copy"></i></span>
                            </a>
                        </li>
                        <li class="list-group-item icon">
                            <a href="javascript:void(0);" class="mark_as_favorite ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) !== null ? '' : 'btn-light'} productTileClick" data-click-flag="mark_as_favorite" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" title="Add to Favorites" data-marketplace="${product.market_place_id}"> <i data-feather="heart" class="heart-${product.asin} ${(product.hasOwnProperty('is_favorite') && product.is_favorite !== null) ? 'text-danger" fill="red' : ''}" ></i> <span class="ms-1">Add to Favorites</span> </a>
                        </li>
                        <li class="list-group-item icon">
                            <a href="javascript:void(0);" data-asin="${(product.hasOwnProperty('asin') && product.asin !== null) ? product.asin : 'N/A'}" data-product_type="${product.product_type}" data-url="${product.image_design_url}" data-title="${product.title}" class="download-product-image productTileClick" data-click-flag="download_product_image" title="Download"> <i data-feather="arrow-down-circle" width="20" height="20"></i><span class="ms-1">Download</span></a>
                        </li>
                        <li class="list-group-item icon">
                            <a href="javascript:void(0);" class="copy-product-image productTileClick" data-click-flag="copy" data-url="${(product.hasOwnProperty('main_image') && product.main_image.link !== null) ? product.main_image.link : null}" title="Copy"> <i data-feather="copy"></i>
                                <span class="ms-1">Copy</span>
                            </a>
                        </li>
                        <li class="list-group-item icon">
                            <a href="${product.link}" target="_blank" class="" title="Open in Amazon"> <i class="fab fa-amazon"></i>
                            <span class="ms-1">Open in Amazon</span></a>
                        </li>
                        <li class="list-group-item icon">
                            <a href="products/${product.market_place_id}/${product.asin}" target="_blank" class="" title="More Info"> <i data-feather="info"></i><span class="ms-1">More Info</span></a>
                        </li>
                        <li class="list-group-item icon">
                            <a href="javascript:void(0);" class="show-list-view-graph" data-asin="${product.asin}" title="Show Graph"> <i data-feather="bar-chart-2"></i><span class="ms-1">Show Graph</span></a>
                        </li>
                    </ul>
                </div>
            </div>
            `+ htmlGraphGridView(product) + `
            `+ htmlGraphListView(product) + `
        </div>`;
    return relOp;
}
var numberWithCommas = (x) => {
    try {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    } catch (error) {
        return 'N/A';
    }
}
var checkUnicodeStr = (str) => {
    var decodedText;

    try {
        var jsonFormattedText = str.replace(/u/g, '\\u');
        decodedText = JSON.parse('"' + jsonFormattedText + '"');
    } catch (error) {
        decodedText = str;
    }

    return decodedText;
}
