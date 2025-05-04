var graphData = [];
var graphAjaxRequest = "";
function htmlGraphGridView(data, moduleName = '') {
    var gOp = '';
    gOp = gOp + `<div class="show-wrapper  ${moduleName !== undefined && moduleName !== "" && moduleName == 'merch_archive' ? 'small-graph' : '' } right" data-product_id="${data.asin}" data-asin="${data.asin}" >

        <h5><span class="title">${data.title}</span> <span class="copyText" data-keyword="${data.title?.replace(/"/g, "&quot;")}"><i data-feather="copy"></i><span></h5>
        <div class="title-wrapper">
            <div class="title-left">
                <div class="brand-title">BRAND : <span class="brand">${data.brand}</span> <span class="copyText span-icon" data-keyword="${data.brand?.replace(/"/g, "&quot;")}"> <i data-feather="copy"></i></span></div>
                <div class="asin">ASIN : ${data.asin} <span class="copyText span-icon" data-keyword="${data.asin}"> <i data-feather="copy"></i></span></div>
            </div>
            <div class="title-right">
                <span class=" d-block badge show-trend-val-${data.asin}" title="BSR Trend"></span>
                <span class=" d-block badge show-bsr-diff-${data.asin}" title="BSR Difference"></span>

            </div>
        </div>


        <div class="show-graph-${data.asin}">
        </div>
    </div>`;
    return gOp;
}
function htmlGraphListView(data){
    var gOp = '';
    gOp += `<div class="list-view-graph d-none">
        <hr>
        <div class="text-right mx-1">
            <span class=" badge show-trend-val-${data.asin}" title="BSR Trend"></span>
            <span class=" badge show-bsr-diff-${data.asin}" title="BSR Difference"></span>
        </div>
        <div class="show-list-view-graph-${data.asin}" data-market-place="${data.market_place_id}"></div>
    </div>`;
    return gOp;
}


$(document).on("click",".copyText",function() {
    try {
        var _this = $(this);
        var tempEle = document.createElement("input");
        document.body.appendChild(tempEle);
        tempEle.setAttribute("id", "temp_id");
        document.getElementById("temp_id").value = _this.attr('data-keyword');
        tempEle.select();
        document.execCommand("copy");
        document.body.removeChild(tempEle);
        toastr['success']('','Text copied!', {
            closeButton: true,
            tapToDismiss: false,
        });
    } catch (error) {
        toastr['error']('','Error copying the text', {
            closeButton: true,
            tapToDismiss: false,
        });
    }
})
var searchPopovers = (data, source = '') => {
    try {
        $('.show-wrapper').css({
            display: 'none'
        });

        var title = data.title;
        var marketPlaceID = $('#marketplace').find('option:selected').val();
        var productTypeId = $('#product').find('option:selected').val();

        var rowAmazonMbaUrl = "";

        if(source == 'realtime'){
            marketPlaceID = $('#selectMarketplace').find('option:selected').val();
            productTypeId = $('#selectProduct').find('option:selected').val();
            rowAmazonMbaUrl = data.link ? data.link : data.amazon_link;
        }else{
            rowAmazonMbaUrl = data.amazon_link;
            productTypeId = (data.product_type != undefined && data.product_type != null && data.product_type != "") ? data.product_type : productTypeId;
            productTypeId = (productTypeId != undefined && productTypeId != null && productTypeId != "") ? productTypeId : 't-shirt';
        }

        var countryCodes = {
            1: 'us',
            2: 'uk',
            3: 'de',
            4: 'fr',
            5: 'it',
            6: 'es',
            7: 'jp'
        }

        if (marketPlaceID == undefined || marketPlaceID == null) {
            marketPlaceID = (data.marketplace != undefined && data.marketplace != null && data.marketplace != "") ? data.marketplace : 1;
        }

        var marketPlaceCode = countryCodes[marketPlaceID] ? countryCodes[marketPlaceID] : 'us';

        var marketPlaceCodeLC = (marketPlaceCode !== undefined && marketPlaceCode !== null && marketPlaceCode !== "") ? marketPlaceCode.toLowerCase() : 'us';
        var marketPlaceCodeUC = (marketPlaceCode !== undefined && marketPlaceCode !== null && marketPlaceCode !== "") ? marketPlaceCode.toUpperCase() : 'US';

        var rowSpreadshirtLink = spreadshirtLink['link'];
        rowSpreadshirtLink = rowSpreadshirtLink.replace('domain_value', spreadshirtLink['domain'][marketPlaceCodeLC]);
        rowSpreadshirtLink = rowSpreadshirtLink.replace('query_value', title).replace('product_type_value', spreadshirtLink['category'][productTypeId]);

        var rowGoogleLink = googleLink;
        rowGoogleLink = rowGoogleLink.replace('query_value', title);

        var rowEtsyLink = etsyLink;
        rowEtsyLink = rowEtsyLink.replace('query_value', title);

        var rowVexelsLink = vexelsLink;
        rowVexelsLink = rowVexelsLink.replace('query_value', title);

        var rowGoogleShop = googleShop;
        rowGoogleShop = rowGoogleShop.replace('query_value', title);

        var rowGoogleSearch = googleSearch;
        rowGoogleSearch = rowGoogleSearch.replace('query_value', title);

        var rowCreativeFabricaLink = creativeFabricaLink;
        rowCreativeFabricaLink = rowCreativeFabricaLink.replace('query_value', title);

        let rowRedbubbleLink = null;
        let redBubbleDomains = ["us", "de", "fr", "es"];
        if (redBubbleDomains.includes(marketPlaceCode)) {
            rowRedbubbleLink = redbubbleLink['domain'][marketPlaceCode];
            rowRedbubbleLink = rowRedbubbleLink.replace('query_value', title).replace('product_type_value', redbubbleLink['category'][productTypeId]);
        } else {
            rowRedbubbleLink = redbubbleLink['domain']['us'];
            rowRedbubbleLink = rowRedbubbleLink.replace('query_value', title).replace('product_type_value', redbubbleLink['category'][productTypeId]);
        }

        var rowGoogleTrendsLink = googleTrendsLink;
        rowGoogleTrendsLink = rowGoogleTrendsLink.replace('query_value', title);
        rowGoogleTrendsLink = rowGoogleTrendsLink.replace('geo_value', (marketPlaceCodeUC == 'UK' ? 'GB' : marketPlaceCodeUC));

        var country_id = $('#marketplace').find('option:selected').attr("code");

        var rowBestSellerLink = bestSellerLink;
        rowBestSellerLink = rowBestSellerLink.replace('query_value', title).replace('product_type_value', productTypeId).replace('country_value', marketPlaceID);

        var rowRealTimeLink = realTimeLink;
        rowRealTimeLink = rowRealTimeLink.replace('query_value', title).replace('product_type_value', productTypeId).replace('country_value', marketPlaceID);

        var rowCanvaLink = canvaLink;
        rowCanvaLink = rowCanvaLink.replace('query_value', title);

        var rowProductSearchUrl = productSearchUrl;
        rowProductSearchUrl = rowProductSearchUrl.replace('query_value', title).replace('product_type_value', productTypeId).replace('country_value', marketPlaceID);

        var rowInspiredPodUrl = inspiredPodUrl;
        rowInspiredPodUrl = rowInspiredPodUrl.replace('query_value', title);
        var op = '';
        op += `<ul class="dropdown-menu dropdown-menu-start simple-border search-popover" aria-labelledby="dropdown-flag">
            <div class="dropdown-menu-header simple-border-bottom">
                <div class="dropdown-header d-flex">
                    <h4 class="mb-0 me-auto"> Search</h4>
                    <div class=""><i data-feather="search"></i></div>
                </div>
            </div>
            <div class="scrollable-section productTileClick" data-click-flag="search_clicked">
                <div class="simple-border-bottom">
                    <a class="dropdown-item" href="${rowProductSearchUrl}" target="_BLANK">Open in Product Search</a>
                    <a class="dropdown-item" href="${rowAmazonMbaUrl}" target="_BLANK" class="${rowAmazonMbaUrl == '' ? 'd-none' : ''}">Open in Amazon</a>
                    <a class="dropdown-item" href="javascript:void(0)" onClick="window.open('${rowRedbubbleLink}', '_blank', 'noopener, noreferrer')">Open in Redbubble</a>
                    <a class="dropdown-item" href="${rowSpreadshirtLink}" target="_BLANK">Open in Spreadshirt</a>
                    <a class="dropdown-item" href="${rowEtsyLink}" target="_BLANK">Open in ETSY</a>
                    <a class="dropdown-item" href="${rowCreativeFabricaLink}" target="_BLANK">Open in Creative Fabrica</a>
                    <a class="dropdown-item" href="${rowVexelsLink}" target="_BLANK">Open in Vexels</a>
                    <a class="dropdown-item" href="${rowCanvaLink}" target="_BLANK">Open in Canva</a>
                </div>
                <div class="simple-border-bottom">
                    <a class="dropdown-item" href="${rowGoogleSearch}" target="_BLANK">Open in Google Search</a>
                    <a class="dropdown-item" href="${rowGoogleTrendsLink}" target="_BLANK">Open in Google Trends</a>
                    <a class="dropdown-item" href="${rowGoogleLink}" target="_BLANK">Open in Google Images</a>
                    <a class="dropdown-item" href="${rowGoogleShop}" target="_BLANK">Open in Google Shopping</a>
                </div>
                <div class="">
                    <a class="dropdown-item" href="${rowBestSellerLink}" target="_BLANK">Search on Best Sellers</a>
                    <a class="dropdown-item" href="${rowRealTimeLink}" target="_BLANK">Search on Live Research</a>
                    <a class="dropdown-item" href="${rowInspiredPodUrl}" target="_BLANK">Open in POD Inspiration</a>
                </div>
            </div>
        </ul>`;


        return  op;
    } catch (error) {
        console.log(error);
    }
}
function bindSliderEvent(){
    $(".slider-view .swiper-container .list-group-horizontal .list-group-item.last").on({
        mouseenter: function () {
            // console.log("Enter");
            $('[data-bs-toggle="dropdown"]').dropdown('hide');
        },
        mouseleave: function () {
            // console.log("out");
            $(this).closest('.swiper-container').css('overflow', 'hidden');
        }
    });

    $(".swiper-slide .ecommerce-card, .slider-view .swiper-container .list-group-horizontal .dropdown-menu").on('mouseleave', function () {
        // console.log("mouse out")
        $(this).closest('.swiper-container').css('overflow', 'hidden');

    })
    $('.list-group-item.dropup').on('show.bs.dropdown', function () {
        // console.log("open");
        $(this).closest('.swiper-container').css('overflow', 'visible');
    })
    $('.list-group-item.dropup').on('hide.bs.dropdown', function () {
        $(this).closest('.swiper-container').css('overflow', 'hidden');
        // console.log("hide");

    })
}
function bindHoverEvent(source=''){
    $("#ecommerce-products.grid-view .ecommerce-card").on({
        mouseenter: function () {
            if($("#ecommerce-products").hasClass("grid-view") && $('#show_bsr_graph').is(":checked") && $(window).width() > mobileViewWidth){

                $('.show-graph-'+$(this).find('.show-wrapper').data('asin')).empty();
                var $item = $(this);
                var itemOffset = $item.offset();
                var viewportWidth = $(window).width();
                var areaToRight = viewportWidth - itemOffset.left;
                if(areaToRight < 750){
                    $(this).find('.show-wrapper').removeClass('right').addClass('left');
                }else{
                    $(this).find('.show-wrapper').addClass('right').removeClass('left');
                }

                /* $(this).find('.show-wrapper').css({
                    display: 'block'
                });

                $(this).closest('.swiper-slide').find('.show_trend_types, .deleted_date').css({
                    top:'-33px'
                }) */
                var lastCellValue;
                var asin = $(this).find('.show-wrapper').data('asin');
                var market_place_id = $('#marketplace').val();
                if(source == 'realtime'){

                    market_place_id = $('#selectMarketplace').val();
                }
                var gElement = document.querySelector('.show-graph-'+$(this).find('.show-wrapper').data('asin'));
                if(graphData[asin] !== undefined && graphData[asin] !== null && graphData[asin] !== ""){
                    prepareTrendsData(graphData[asin]);
                    $('.show-wrapper').css({
                        display: 'none'
                    });

                    if ($('table tr:last').children('td').eq(1).text()) {
                        $('table').on({mouseenter : function() {
                            let rank_diff = $(this).find('tr:last').children('td').eq(1).text();
                            $('#tblHidden').attr('value', rank_diff);
                        }});
                        lastCellValue = $('#tblHidden').attr('value');
                        let symbol = lastCellValue.charAt(0);
                        lastCellValue = (symbol == "-") ? Math.abs(lastCellValue) : -Math.abs(lastCellValue);
                    }

                    var time_period = $('#selecTimePeriod').find(":selected").text();

                    if (time_period != "" && graphData[asin].time_period != time_period) {
                        loadGraph(asin, market_place_id, gElement, $(this));
                    } else {
                        renderGraph(graphData[asin], gElement, $(this));
                    }
                } else{
                    loadGraph(asin, market_place_id, gElement, $(this));
                }
            }
        },
        mouseleave: function () {
            if($("#ecommerce-products").hasClass("grid-view") && $('#show_bsr_graph').is(":checked") && $(window).width() > mobileViewWidth){

                //stuff to do on mouse leave
                $(this).find('.show-wrapper').css('display', 'none');
                $('.show-graph-'+$(this).find('.show-wrapper').data('asin')).empty();

                $(this).closest('.swiper-slide').find('.show_trend_types, .deleted_date ').css({
                    top:'-15px'
                })

                $('[data-bs-toggle="dropdown"]').dropdown('hide');
            }
        }
    });
}
$(document).on("click", ".show-list-view-graph", function() {
    if($(this).closest('.ecommerce-card').find('.list-view-graph').hasClass('d-none')){
        var product_id = $(this).data('asin');
        var asin = $(this).data('asin');
        var market_place_id = $('#marketplace').val();
        
        if (!market_place_id) {
            market_place_id = $('.show-list-view-graph-'+ product_id).data('market-place');
        }
        try {
            if(moduleName == 'realtime_search'){
                market_place_id = $('#selectMarketplace').val();
            }

        } catch (error) {

        }
        $('.show-list-view-graph-'+ product_id).empty();
        var gElement = document.querySelector('.show-list-view-graph-' + product_id);
        $(this).closest('.ecommerce-card').find('.list-view-graph').removeClass('d-none');
        if(graphData[asin] !== undefined && graphData[asin] !== null && graphData[asin] !== ""){
            $('.show-wrapper').css({
                display: 'none'
            });
            renderGraph(graphData[asin], gElement);
        } else{
            loadGraph(asin, market_place_id, gElement);
        }
    }else{
        $(this).closest('.ecommerce-card').find('.list-view-graph').addClass('d-none');
    }

})
var bsrLabelFormatter = function(value) {
    var val = Math.round(Math.abs(value));
    if (val >= 1000000) {
        val = (val / 1000000).toFixed(2) + " M";
    }
    else if (val >= 1000) {
        val = (val / 1000).toFixed(2) + " K";
    }
    return val;
};

var priceLabelFormatter = function(value) {
    return Math.floor(value);
};
var seLabelFormatter = function(value) {
    return numberWithCommas(Math.floor(value));
};

function prepareTrendsData(data){
    try {
        var className, bsrDiffClass = 'bg-info';
        var iconName, bsrDiffIcon = '';
        var val = data.trends;
        var bsrDiff = data.bsr_diff;

        $('.show-trend-val-'+data.asin).removeClass('bg-danger');
        $('.show-trend-val-'+data.asin).removeClass('bg-danger');
        $('.show-bsr-diff-'+data.asin).removeClass('bg-success');
        $('.show-bsr-diff-'+data.asin).removeClass('bg-danger');

        if(val > 0){
            className = 'bg-danger';
            iconName = 'fa fa-angle-double-down';
            val = "-" + Math.abs(val) + "%";
        }else if(val < 0){
            className = 'bg-success';
            iconName = 'fa fa-angle-double-up';
            val = "+" + Math.abs(val) + "%";
        }

        if(bsrDiff > 0) {
            bsrDiffClass = 'bg-success';
            bsrDiffIcon = 'fa fa-angle-double-up';
            bsrDiff = "+" + numberWithCommas(bsrDiff);
        } else if(bsrDiff < 0) {
            bsrDiffClass = 'bg-danger';
            bsrDiffIcon = 'fa fa-angle-double-down';
            bsrDiff = numberWithCommas(bsrDiff);
        }

        if (val && val !== "N/A") {
            $('.show-trend-val-'+data.asin).addClass(className).html(val + " " + "<i class='" + iconName + "'></i>");
            $('.show-bsr-diff-'+data.asin).addClass(bsrDiffClass).html(bsrDiff + " " + "<i class='" + bsrDiffIcon + "'></i>");
        }
    } catch (error) {

    }
}

$(document).on('click', '[data-bs-toggle="dropdown"]', function() {
    // Code to execute when the event is triggered
    $('.show-wrapper').css({
        display: 'none'
    });
});

function renderGraph(data, graphElement, currentElement = null) {
    var bsr = data.bsr;
    var xAxislabels = data.xAxislabels;
    var step_se = (data.step_se != undefined && data.step_se !== null) ? data.step_se : 10;

    $('.show-wrapper').css({
        display: 'none'
    });

    if (bsr.length > 0) {

        //show the graph block
        $(currentElement).find('.show-wrapper').css({
            display: 'block'
        });

        $(currentElement).closest('.swiper-slide').find('.show_trend_types, .deleted_date').css({
            top:'-33px'
        })

        var prices = data.prices;
        var labels = data.labels;
        var sales_estimates = data.sales_estimates;

        var options = {
            chart: {
                height: 250,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                curve: "smooth",
                width: 3
            },
            series: [
                {
                    name: "BSR",
                    data: bsr
                },
                {
                    name: "Price",
                    data: prices
                },
                {
                    name: "Estimated Sales",
                    data: sales_estimates
                }
            ],
            tooltip: {
                enabled: true,
                y: {
                    formatter: function (value, {dataPointIndex, w}) {
                        return numberWithCommas(value);
                    }
                },
                x: {
                    formatter: function (value, {dataPointIndex, w}) {
                        return labels[dataPointIndex];
                    }
                }
            },
            markers: {
                size: 0,
            },
            legend: {
                show: true,
                labels: {
                    colors: "#fff"
                }
            },
            xaxis: {
                categories: xAxislabels,
                tickAmount: 15,
                labels: {
                    style: {
                        colors:  '#b4b7bd'
                    },
                }
            },
            yaxis: [
                {
                    min: data.min_rank,
                    max: data.max_rank,
                    tickAmount: data.step,
                    seriesName: 'BSR',
                    labels: {
                        style: {
                            colors:  '#b4b7bd'
                        },
                        formatter: bsrLabelFormatter,
                    },
                    title: {
                        text: "BSR",
                        style: {
                            color:  '#b4b7bd'
                        },
                    }
                },
                {
                    min: 0,
                    max: 100,
                    opposite: true,
                    tickAmount: data.step,
                    seriesName: "Price",
                    labels: {
                        style: {
                            colors:  '#b4b7bd'
                        },
                        formatter: priceLabelFormatter,
                    },
                    title: {
                        text: "Price",
                        style: {
                            color:  '#b4b7bd'
                        },
                    }
                },
                {
                    min: data.min_se,
                    max: data.max_se,
                    opposite: true,
                    tickAmount: step_se,
                    seriesName: "Estimated Sales",
                    title: {
                        text: "Estimated Sales",
                        style: {
                            color:  '#b4b7bd'
                        },
                    },
                    labels: {
                        style: {
                            colors:  '#b4b7bd'
                        },
                        formatter: seLabelFormatter,
                    }
                }
            ]
        }

        // console.log($(this).find('.show-wrapper').data('product_id'));
        var chart = new ApexCharts(graphElement, options);
        chart.render();
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function loadGraph(asin, market_place_id, graph_element, currentElement = null) {
    let graphDuration = 30;
    let lastCellValue;
    let bsr_diff;
    let time_period;

    if ($('table tr:last').children('td').eq(1).text()) {
        lastCellValue = $(`#trend-value-${asin}`).text();
        let symbol = lastCellValue.charAt(0);
        lastCellValue = (symbol == "-") ? Math.abs(lastCellValue) : -Math.abs(lastCellValue);
        
        bsr_diff = $(`#bsr-diff-value-${asin}`).text();
        let bsr_symbol = bsr_diff.charAt(0);
        bsr_diff = bsr_diff.replace(/\,/g,'');
        bsr_diff = (bsr_symbol == "-") ? -Math.abs(bsr_diff) : Math.abs(bsr_diff);
        
        time_period = $('#selecTimePeriod').find(":selected").text();
   }

    if ($('#bsr_graph_duration') && $('#bsr_graph_duration').val() > 0) {
        graphDuration = $('#bsr_graph_duration').val();
    }

    if(graphAjaxRequest){
        graphAjaxRequest.abort();
    }

    graphAjaxRequest = $.ajax({
        url: productGraphURL,
        type: 'POST',
        data: {
            _token: csrfToken,
            asin: asin,
            market_place_id: market_place_id,
            duration: graphDuration
        },
        success: function(res) {
            // console.log(res);
            if (res.success) {
                if(res.data){
                    var gData = [];
                    gData['bsr'] = (res.data.bsr) ? res.data.bsr : [];
                    gData['step'] = (res.data.step) ? res.data.step : [];
                    gData['labels'] = (res.data.labels) ? res.data.labels : [];
                    gData['prices'] = (res.data.prices) ? res.data.prices : [];
                    gData['sales_estimates'] = (res.data.sales_estimates) ? res.data.sales_estimates : [];
                    gData['max_se'] = ((res.data.max_se != undefined) ? res.data.max_se : 0);
                    gData['min_se'] = ((res.data.min_se != undefined) ? res.data.min_se : 0);
                    gData['step_se'] = ((res.data.step_se != undefined) ? res.data.step_se : 10);
                    gData['max_rank'] = (res.data.max_rank) ? res.data.max_rank : 0;
                    gData['min_rank'] = (res.data.min_rank) ? res.data.min_rank : 0;
                    gData['category'] = (res.data.category) ? res.data.category : "N/A";

                    if (lastCellValue) {
                        gData['trends'] = lastCellValue;
                        gData['time_period'] = time_period;
                        gData['bsr_diff'] = bsr_diff;
                    } else {
                        gData['trends'] = (res.data.trends) ? res.data.trends : "N/A";
                        gData['bsr_diff'] = (res.data.bsr_diff) ? res.data.bsr_diff : "N/A";
                    }
                     
                    gData['asin'] = asin;
                    graphData[asin] = gData;
                    prepareTrendsData(gData);
                    $('.show-wrapper').css({
                        display: 'none'
                    });
                    renderGraph(gData, graph_element, currentElement);
                }
            }else{
            }
        },
        error: function(response) {
        }
    });
}