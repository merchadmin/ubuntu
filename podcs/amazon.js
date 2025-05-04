define(['jquery', 'form', 'bootstrap', 'echarts','table','bootstrap-daterangepicker', 'amazon-calculator', 'editable', 'bootstrap-slider', 'swiper'], function ($, Form, bootstrap, echarts, Table, undefined, calculator, undefined, undefined, Swiper) {
    //rank range input value
    $('#bsr_start').val(Config.rankStart);
    $('#bsr_end').val(Config.rankEnd);

    $('#bsr_start').change(function (){
        var rankStart = $("#bsr_start").val();
        var rankEnd = $("#bsr_end").val();
        rankSlider.setValue([parseInt(rankStart),parseInt(rankEnd)]);
    });

    $('#bsr_end').change(function (){
        var rankStart = $("#bsr_start").val();
        var rankEnd = $("#bsr_end").val();
        rankSlider.setValue([parseInt(rankStart),parseInt(rankEnd)]);
    });

    $("#rank-slider").slider({
        id: "slider12c",
        min: 1,
        max: 5000000,
        range: true,
        value: [Config.rankStart, Config.rankEnd],
        ticks: [1, 1000000, 2000000, 3000000, 4000000, 5000000],
        ticks_labels: ['1', '1,000,000', '2,000,000', '3,000,000', '4,000,000', '5,000,000'],
        ticks_tooltip:true,
        ticks_snap_bounds:1
    });
    //rank change
    var rankChange = function (){
        var rankarr = rankSlider.getValue();
        $("#bsr_start").val(rankarr[0]);
        $("#bsr_end").val(rankarr[1]);
    }
    var rankSlider = $("#rank-slider").slider().on('change',rankChange).data('slider');

    //search
    $('#bsr_starts').val(Config.rankStart);
    $('#bsr_ends').val(Config.rankEnd);

    $('#bsr_starts').change(function (){
        var rankStart = $("#bsr_starts").val();
        var rankEnd = $("#bsr_ends").val();
        rankSliders.setValue([parseInt(rankStart),parseInt(rankEnd)]);
    });

    $('#bsr_ends').change(function (){
        var rankStart = $("#bsr_starts").val();
        var rankEnd = $("#bsr_ends").val();
        rankSliders.setValue([parseInt(rankStart),parseInt(rankEnd)]);
    });
    $("#search-slider").slider({
        id: "slider12c",
        min: 1,
        max: 1200000,
        range: true,
        value: [Config.rankStart, Config.rankEnd],
        ticks: [1, 200000, 400000, 600000, 800000, 1000000, 1200000],
        ticks_labels: ['1', '200,000', '400,000', '600,000', '800,000', '1,000,000', 'Infinite'],
        ticks_tooltip:true,
        ticks_snap_bounds:1
    });
    $("#bsr_ends").val('Max.');

    //rank change
    var rankChange = function (){
        var rankarr = rankSliders.getValue();
        if (rankarr[0] > 1000000) {
            $("#bsr_starts").val('Min.');
        } else {
            $("#bsr_starts").val(rankarr[0]);
        }
        if (rankarr[1] > 1000000) {
            $("#bsr_ends").val('Max.');
        } else {
            $("#bsr_ends").val(rankarr[1]);
        }

    }
    var rankSliders = $("#search-slider").slider().on('change',rankChange).data('slider');


    //achive range
    $('#achive_starts').val(Config.rankStart);
    $('#achive_ends').val(Config.rankEnd);

    $('#achive_starts').change(function (){
        var achiveStart = $("#achive_starts").val();
        var achiveEnd = $("#achive_ends").val();
        achiveSlider.setValue([parseInt(achiveStart),parseInt(achiveEnd)]);
    });

    $('#achive_ends').change(function (){
        var achiveStart = $("#bsr_starts").val();
        var achiveEnd = $("#bsr_ends").val();
        achiveSlider.setValue([parseInt(achiveStart),parseInt(achiveEnd)]);
    });
    $("#achive-slider").slider({
        id: "slider12c",
        min: 1,
        max: 5000000,
        range: true,
        value: [Config.rankStart, Config.rankEnd],
        ticks: [1, 1000000, 2000000, 3000000, 4000000, 5000000],
        ticks_labels: ['1', '1,000,000', '2,000,000', '3,000,000', '4,000,000', '5,000,000'],
        ticks_tooltip:true,
        ticks_snap_bounds:1
    });
    var achiveChange = function (){
        var rankarr = achiveSlider.getValue();
        $("#achive_starts").val(rankarr[0]);
        $("#achive_ends").val(rankarr[1]);
    }
    var achiveSlider = $("#achive-slider").slider().on('change',achiveChange).data('slider');


    let layoption = {
        type: 3,
        skin: 'layer-load-box-div',
        shade: 0,
        content: '<img width="200" height="200" src="/assets/img/loading1.gif" alt="">'
    };
    var copyWord = function (text){
        $('body').append('<textarea id="copy_tmp" style="opacity: 0;height: 0;width: 0"></textarea>');
        var copyTarget = $("#copy_tmp");
        copyTarget.val(text.replace(/,,/g,','));
        if (copyTarget.val().length) {
            copyTarget.select();
            document.execCommand("copy");
            layer.msg("Copied to Clipboard");
        };
        $('body').remove('#copy_tmp');
    }
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            if(this.value.length>0){
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
    
    $('[name="marketplace"]').change(function (){
        var market = $(this).val();
        if (market == '2:co_uk' || market == '3:de' || market == '4:fr' ) {
            $('#product option:eq(2)').attr('disabled',true);
            $('#product option:eq(2)').css('color','#BBB');
        }else{
            $('#product option:eq(2)').attr('disabled',false);
            $('#product option:eq(2)').css('color','#495057');
        }
    });

    $('#product').change(function (){
        var products = $(this).val();
        if (products == '3:phone_cases' ) {
            $('[name="marketplace"]:eq(2)').attr('disabled',true);
            $('[for="co_uk-country"]').addClass('lable-dis');
            $('[name="marketplace"]:eq(3)').attr('disabled',true);
            $('[for="de-country"]').addClass('lable-dis');
            $('[name="marketplace"]:eq(4)').attr('disabled',true);
            $('[for="fr-country"]').addClass('lable-dis');
        }else{
            $('[name="marketplace"]:eq(2)').attr('disabled',false);
            $('[name="marketplace"]:eq(3)').attr('disabled',false);
            $('[name="marketplace"]:eq(4)').attr('disabled',false);
            $('[for="co_uk-country"]').removeClass('lable-dis');
            $('[for="de-country"]').removeClass('lable-dis');
            $('[for="fr-country"]').removeClass('lable-dis');
        }
    });
    
    $(document).on('click', '.fa-download', function () {
        let canvas = document.getElementById('canvas-cut');
        let cut = canvas.getContext('2d');
        let img = new Image();
        let sx, sy, sw, sh, dx, dy, dw, dh;
        img.src = $(this).parents('.product-img').css("backgroundImage").replace('url("','').replace('")','');
        img.crossOrigin = 'Anonymous';
        let downloadImgSize = [
            {
                "code": "shirt",
                "category": "mba",
                "name": "T-Shirt",
                "description": "... => todo later",
                "niceClasses": [
                    "25",
                    "42"
                ],
                "productType": "clothing",
                "viewSizings": {
                    "gridView": {
                        "width": 215,
                        "height": 271,
                        "background": {
                            "posX": 50,
                            "posY": 48,
                            "size": "auto"
                        }
                    },
                    "listView": {
                        "width": 238,
                        "height": 300,
                        "background": {
                            "posX": 50,
                            "posY": 48,
                            "size": "auto"
                        }
                    },
                    "detailView": {
                        "width": 308,
                        "height": 388,
                        "background": {
                            "posX": 50,
                            "posY": 48,
                            "size": "auto"
                        }
                    }
                },
                "cropSize": {
                    "cropWidth": 389,
                    "cropHeight": 500,
                    "imgWidth": 990,
                    "imgHeight": 925,
                    "background": {
                        "posX": 50,
                        "posY": 48
                    },
                    getUrl: n=>n.replace(/\..{1,3}_[A-Za-z]{2}\d{3}_\./, "._0_UX990_.")
                }
            },
            {
                "code": "hoodie",
                "category": "mba",
                "name": "Hoodie",
                "description": "... => todo later",
                "niceClasses": [
                    "25",
                    "42"
                ],
                "productType": "clothing",
                "viewSizings": {
                    "gridView": {
                        "width": 215,
                        "height": 271,
                        "background": {
                            "posX": 48,
                            "posY": 50,
                            "size": "auto"
                        }
                    },
                    "listView": {
                        "width": 238,
                        "height": 300,
                        "background": {
                            "posX": 48,
                            "posY": 50,
                            "size": "auto"
                        }
                    },
                    "detailView": {
                        "width": 308,
                        "height": 388,
                        "background": {
                            "posX": 48,
                            "posY": 50,
                            "size": "auto"
                        }
                    }
                },
                "cropSize": {
                    "cropWidth": 389,
                    "cropHeight": 500,
                    "imgWidth": 990,
                    "imgHeight": 925,
                    "background": {
                        "posX": 48,
                        "posY": 50
                    },
                    getUrl: n=>n.replace(/\..{1,3}_[A-Za-z]{2}\d{3}_\./, "._0_UX990_.")
                }
            },
            {
                "code": "popsockets",
                "category": "mba",
                "name": "PopSocket",
                "description": "... => todo later",
                "niceClasses": [
                    "9"
                ],
                "productType": "accessories",
                "viewSizings": {
                    "gridView": {
                        "width": 215,
                        "height": 205,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    },
                    "listView": {
                        "width": 238,
                        "height": 230,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    },
                    "detailView": {
                        "width": 308,
                        "height": 388,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    }
                },
                "cropSize": {
                    "cropWidth": 490,
                    "cropHeight": 500,
                    "imgWidth": 490,
                    "imgHeight": 500,
                    "background": {
                        "posX": 50,
                        "posY": 50
                    },
                    getUrl: n=>n.replace(/\..{1,3}_[A-Za-z]{2}\d{3}_\./, "._0_UY500_.")
                }
            },
            {
                "code": "phone_cases",
                "category": "mba",
                "name": "Phone Case",
                "description": "... => todo later",
                "niceClasses": [
                    "9"
                ],
                "productType": "accessories",
                "viewSizings": {
                    "gridView": {
                        "width": 215,
                        "height": 271,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    },
                    "listView": {
                        "width": 238,
                        "height": 300,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    },
                    "detailView": {
                        "width": 308,
                        "height": 388,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    }
                },
                "cropSize": {
                    "cropWidth": 264,
                    "cropHeight": 500,
                    "imgWidth": 264,
                    "imgHeight": 500,
                    "background": {
                        "posX": 50,
                        "posY": 50
                    },
                    getUrl: n=>n.replace(/\..{1,3}_[A-Za-z]{2}\d{3}_\./, "._0_UY500_.")
                }
            },
            {
                "code": "kdp",
                "category": "kdp",
                "name": "KDP",
                "description": "... => todo later",
                "niceClasses": [
                    "16"
                ],
                "productType": "books",
                "viewSizings": {
                    "gridView": {
                        "width": 215,
                        "height": 271,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    },
                    "listView": {
                        "width": 224,
                        "height": 290,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    },
                    "detailView": {
                        "width": 308,
                        "height": 388,
                        "background": {
                            "posX": 50,
                            "posY": 50,
                            "size": "contain"
                        }
                    }
                },
                "cropSize": {
                    "cropWidth": 388,
                    "cropHeight": 502,
                    "imgWidth": 388,
                    "imgHeight": 502,
                    "background": {
                        "posX": 50,
                        "posY": 50
                    },
                    getUrl: n=>n.replace(/(SX)|(SY)|(SL)/g,"SX1")
                }
            }
        ];
        for (let i = 0; i  < downloadImgSize.length; i++) {
            if (downloadImgSize[i].code == $(this).data('type')) {
                img.src = downloadImgSize[i].cropSize.getUrl(img.src);
                sx = downloadImgSize[i].cropSize.imgWidth / 2 - (downloadImgSize[i].cropSize.cropWidth / 2);
                sy = downloadImgSize[i].cropSize.imgHeight / 2 - (downloadImgSize[i].cropSize.cropHeight / 2);
                sw = downloadImgSize[i].cropSize.cropWidth;
                sh = downloadImgSize[i].cropSize.cropHeight;
                dx = 0;
                dy = 0;
                dw = downloadImgSize[i].cropSize.cropWidth;
                dh = downloadImgSize[i].cropSize.cropHeight;
            }
        }
        img.onload = function() {
            $('#canvas-cut').attr('width', sw)
            $('#canvas-cut').attr('height', sh)
            cut.drawImage(img, Math.ceil(sx), Math.ceil(sy), sw, sh, dx, dy, dw, dh);
            let imgbase64 = canvas.toDataURL("image/png");
            let arr = imgbase64.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let myUrl = URL.createObjectURL(new Blob([u8arr], {type: mime}));
            let a = document.createElement("a");
            a.setAttribute("href", myUrl);
            a.setAttribute("download", Date.now());
            a.setAttribute("target", "_blank");
            let clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            a.dispatchEvent(clickEvent);
        }
    });
    let favLen = Config.favLen | 0;
    let isMember = Config.isMember == undefined ? true : Config.isMember;
    $(document).on('click', '.favorate-btn', function (){
        if(!isMember && favLen >= 10){
            layer.alert('Free version can only add 10 products', {
                title: 'Tips',
                btn: ['Upgrade to unlimited'],
                btn1: function(index, layero){
                    window.open('https://www.podcs.com/price.html')
                }
            });
            $('.fav-box').hide();
            return false;
        }
        $('.fav-box').hide();
        $(this).prev().show();
    });
    $(document).on('mouseleave', '.box-style-grep-left', function () {
        $(this).find('.fav-box').hide();
    });
    $(document).on('click', '.favorate', function (){
        var $that = $(this);
        if($(this).hasClass('waiting')){
            return  false;
        }
        $(this).addClass('waiting')
        $word = $(this).data('trend');
        $type = $(this).data('type');
        protitle = $(this).data('title');
        $opt = $(this).data('opt');
        $favtag = $(this).prev().find('.fav-type').val();
        if (!$favtag || !$favtag.trim()) {
            $favtag = 'Default Tag'
        }
        Fast.api.ajax({
            url: "/amazon/favourateOpt",
            type: "post",
            data: {keyword: $word,'opt':$opt,type:$type,protitle:protitle,reserve:$favtag},
        }, function () {
            if($opt == 'add') {
                favLen++;
            }
            $that.parents('.product-operation-item').find('a.favorate-btn').toggle()
            $that.parents('.product-operation-item').find('a.favorate').toggle()
            $that.removeClass('waiting')
            $('.fav-box').hide();
        },function (){
            $that.removeClass('waiting');
        });
        return  false;
    });
    function getPngLog(url) {
        let  fpPromise = import('https://openfpcdn.io/fingerprintjs/v3').then(FingerprintJS => FingerprintJS.load())
        fpPromise.then(fp => fp.get()).then(result => {
            let visitorId = result.visitorId
            document.cookie = "client_visitor=true";
            $.ajax({
                url: '/amazon/recordLog',
                data: {
                    userId: $("#user_id").val(),
                    fingerprint: visitorId,
                    url:url
                },
                type: 'post',
            })
        });
    }
    function showMsg(val = "") {
        if (val == "kingdom") {
            layer.open({
                title: '<svg t="1650008010410" style="margin-top: -3px" class="icon me-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3117" width="20" height="20"><path d="M555.3 716c12.1-11.8 18.1-26.1 18.1-43 0-16.7-6.1-31.2-18.1-43.3-12.1-12.1-26.6-18.2-43.3-18.2-16.7 0-31.2 6.1-43.3 18.2-12.1 12.1-18.1 26.6-18.1 43.3 0 16.8 6.1 31.1 18.1 43 9.3 9 20 14.6 31.9 16.7 3.8 0.2 7.5 0.3 11.4 0.3 3.9 0 7.6-0.1 11.4-0.3 12-2.1 22.6-7.6 31.9-16.7zM541.4 574.7c8-85.4 32-202.8 32-218.8 0-18.6-5.7-34-17.2-46.4-11.5-12.3-26.2-18.5-44.1-18.5-17.9 0-32.6 6.3-44.2 18.8-11.5 12.4-17.2 27.8-17.2 46.1 0 16 26 133.4 33 218.8h57.7z" fill="#6c757d" p-id="3118"></path><path d="M512 960.5c-60.5 0-119.3-11.9-174.6-35.3-53.4-22.6-101.4-54.9-142.5-96.1-41.2-41.1-73.5-89.1-96.1-142.5C75.4 631.3 63.5 572.5 63.5 512s11.9-119.3 35.3-174.6c22.6-53.4 54.9-101.4 96.1-142.6 41.2-41.2 89.1-73.5 142.6-96.1 55.2-23.3 114-35.2 174.5-35.2s119.3 11.9 174.6 35.3c53.4 22.6 101.4 54.9 142.6 96.1 41.2 41.2 73.5 89.1 96.1 142.6 23.4 55.3 35.3 114.1 35.3 174.6s-11.9 119.3-35.3 174.6c-22.7 53.3-55 101.3-96.2 142.4-41.2 41.2-89.1 73.5-142.6 96.1-55.2 23.4-114 35.3-174.5 35.3z m0-832c-211.5 0-383.5 172-383.5 383.5s172 383.5 383.5 383.5 383.5-172 383.5-383.5-172-383.5-383.5-383.5z" fill="#6c757d" p-id="3119"></path></svg>No data',
                content: '<div style="word-break: break-word">No results were found. '+"<br/>"+
                    "Because we didn't find any new products in the United Kingdom market last month.<br>"+
                    'Please re-select the time period to find the product you are looking for.</div>',
                shadeClose: true
                ,btn: ['OK']
            });
        } else {
            layer.open({
                title: '<svg t="1650008010410" style="margin-top: -3px" class="icon me-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3117" width="20" height="20"><path d="M555.3 716c12.1-11.8 18.1-26.1 18.1-43 0-16.7-6.1-31.2-18.1-43.3-12.1-12.1-26.6-18.2-43.3-18.2-16.7 0-31.2 6.1-43.3 18.2-12.1 12.1-18.1 26.6-18.1 43.3 0 16.8 6.1 31.1 18.1 43 9.3 9 20 14.6 31.9 16.7 3.8 0.2 7.5 0.3 11.4 0.3 3.9 0 7.6-0.1 11.4-0.3 12-2.1 22.6-7.6 31.9-16.7zM541.4 574.7c8-85.4 32-202.8 32-218.8 0-18.6-5.7-34-17.2-46.4-11.5-12.3-26.2-18.5-44.1-18.5-17.9 0-32.6 6.3-44.2 18.8-11.5 12.4-17.2 27.8-17.2 46.1 0 16 26 133.4 33 218.8h57.7z" fill="#6c757d" p-id="3118"></path><path d="M512 960.5c-60.5 0-119.3-11.9-174.6-35.3-53.4-22.6-101.4-54.9-142.5-96.1-41.2-41.1-73.5-89.1-96.1-142.5C75.4 631.3 63.5 572.5 63.5 512s11.9-119.3 35.3-174.6c22.6-53.4 54.9-101.4 96.1-142.6 41.2-41.2 89.1-73.5 142.6-96.1 55.2-23.3 114-35.2 174.5-35.2s119.3 11.9 174.6 35.3c53.4 22.6 101.4 54.9 142.6 96.1 41.2 41.2 73.5 89.1 96.1 142.6 23.4 55.3 35.3 114.1 35.3 174.6s-11.9 119.3-35.3 174.6c-22.7 53.3-55 101.3-96.2 142.4-41.2 41.2-89.1 73.5-142.6 96.1-55.2 23.4-114 35.3-174.5 35.3z m0-832c-211.5 0-383.5 172-383.5 383.5s172 383.5 383.5 383.5 383.5-172 383.5-383.5-172-383.5-383.5-383.5z" fill="#6c757d" p-id="3119"></path></svg>No data',
                content: '<div style="word-break: break-word">No results were found. There are several reasons:<br>'+
                    '&nbsp;&nbsp;&nbsp;&nbsp;1. The keyword is misspelled<br>'+
                    '&nbsp;&nbsp;&nbsp;&nbsp;2. The keyword has no product<br>'+
                    'Please re-enter the keyword or replace it with other keywords.</div>',
                shadeClose: true
                ,btn: ['OK']
            });
        }

    }

    function showAchiveMsg(val = "") {
        layer.open({
            title: '<svg t="1650008010410" style="margin-top: -3px" class="icon me-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3117" width="20" height="20"><path d="M555.3 716c12.1-11.8 18.1-26.1 18.1-43 0-16.7-6.1-31.2-18.1-43.3-12.1-12.1-26.6-18.2-43.3-18.2-16.7 0-31.2 6.1-43.3 18.2-12.1 12.1-18.1 26.6-18.1 43.3 0 16.8 6.1 31.1 18.1 43 9.3 9 20 14.6 31.9 16.7 3.8 0.2 7.5 0.3 11.4 0.3 3.9 0 7.6-0.1 11.4-0.3 12-2.1 22.6-7.6 31.9-16.7zM541.4 574.7c8-85.4 32-202.8 32-218.8 0-18.6-5.7-34-17.2-46.4-11.5-12.3-26.2-18.5-44.1-18.5-17.9 0-32.6 6.3-44.2 18.8-11.5 12.4-17.2 27.8-17.2 46.1 0 16 26 133.4 33 218.8h57.7z" fill="#6c757d" p-id="3118"></path><path d="M512 960.5c-60.5 0-119.3-11.9-174.6-35.3-53.4-22.6-101.4-54.9-142.5-96.1-41.2-41.1-73.5-89.1-96.1-142.5C75.4 631.3 63.5 572.5 63.5 512s11.9-119.3 35.3-174.6c22.6-53.4 54.9-101.4 96.1-142.6 41.2-41.2 89.1-73.5 142.6-96.1 55.2-23.3 114-35.2 174.5-35.2s119.3 11.9 174.6 35.3c53.4 22.6 101.4 54.9 142.6 96.1 41.2 41.2 73.5 89.1 96.1 142.6 23.4 55.3 35.3 114.1 35.3 174.6s-11.9 119.3-35.3 174.6c-22.7 53.3-55 101.3-96.2 142.4-41.2 41.2-89.1 73.5-142.6 96.1-55.2 23.4-114 35.3-174.5 35.3z m0-832c-211.5 0-383.5 172-383.5 383.5s172 383.5 383.5 383.5 383.5-172 383.5-383.5-172-383.5-383.5-383.5z" fill="#6c757d" p-id="3119"></path></svg>No data',
            content: '<div style="word-break: break-word">No data was found. There are several reasons for this.<br>'+
                '1. It was too early in the day for us to record data.<br>'+
                '2. The BSR of the product was not recorded.<br>'+
                '</div>',
            shadeClose: true
            ,btn: ['OK']
        });

    }

    function moneyChange(){
        $('.money-format').each(function(){
            if (!isNaN($(this).text())) {
                $(this).text(Money($(this).text()))
            }
        })
    }
    moneyChange();
    var organizeData = function (data) {
        var  bsrObj={},temp,minprice = -1,LastTemp ='',minBsr = -1,LastBsrTemp = '';
        var price_lock = false
        var bsr_lock = false
        var fast_price = 0
        var fast_bsr = 0
        for (var i = 0; i < data.length; i++) {
            temp = parseInt(data[i]['time']['$date'].$numberLong*1/1000);
            if(bsrObj[temp]){
                if(data[i].value*1>0){
                    if (bsr_lock === false) {
                        fast_bsr = (data[i].value*1).toFixed(2);
                        bsr_lock = true
                    }
                    bsrObj[temp].value = data[i].value;
                }
                if(data[i].price_value*1>0){
                    if (price_lock === false) {
                        fast_price = (data[i].price_value*1).toFixed(2);
                        price_lock = true
                    }
                    bsrObj[temp].price_value = (data[i].price_value*1).toFixed(2);
                }
                if(data[i].sales_value>0){
                    bsrObj[temp].sales_value = parseInt(data[i].sales_value);
                }
            }else{
                data[i].price_value = isNaN(data[i].price_value[0]) ? data[i].price_value.substr(1) : data[i].price_value;
                if (data[i].price_value * 1 > 0 && price_lock === false) {
                    fast_price = (data[i].price_value*1).toFixed(2);
                    price_lock = true
                }
                if (data[i].value * 1 > 0 && bsr_lock === false) {
                    fast_bsr = (data[i].value*1).toFixed(2);
                    bsr_lock = true
                }
                bsrObj[temp] = {
                    time: Moment(temp,'X').utc().format('MM-DD-YYYY'),
                    value:data[i].value,
                    price_value:(data[i].price_value*1).toFixed(2),
                    sales_value:parseInt(data[i].sales_value)
                }
            }
            if(data[i].value*1>0){
                if(minBsr==-1){
                    minBsr=data[i].value;
                }else{
                    data[i].value<minBsr&&(minBsr=data[i].value);
                }
            }
            if(data[i].price_value*1>0){
                if(minprice==-1){
                    minprice=data[i].price_value;
                }else{
                    (data[i].price_value * 1) < (minprice * 1)&&(minprice=data[i].price_value);
                }
            }
        }

        var keys = Object.keys(bsrObj);
        var btimeChar = [], valueChar = [], priceChar = [], salesChar = [],averageBsr = 0, averagePrice = 0;
        keys.forEach(function (key){
            //price != 0
            if (LastTemp !== '' && bsrObj[LastTemp].price_value > 0&&bsrObj[key]['price_value']*1==0) {
                bsrObj[key]['price_value'] = bsrObj[LastTemp].price_value;
            } else if (bsrObj[key].price_value > 0) {
                LastTemp = key;
            } else{
                bsrObj[key]['price_value'] = fast_price
            }
            //bsr != 0
            if (LastBsrTemp !== '' && bsrObj[LastBsrTemp].value > 0&&bsrObj[key]['value']*1==0) {
                bsrObj[key]['value'] = bsrObj[LastBsrTemp].value;
            } else if (bsrObj[key].value > 0) {
                LastBsrTemp = key;
            } else{
                bsrObj[key]['value'] = fast_bsr
            }

            btimeChar.push(bsrObj[key].time);
            valueChar.push(bsrObj[key]['value']);
            salesChar.push(parseInt(bsrObj[key]['sales_value']) < 1 ? 'N/A' : parseInt(bsrObj[key]['sales_value']));
            let price_value = bsrObj[key]['price_value'] + ''
            if (isNaN(price_value.slice(0, 1))) {
                price_value = price_value.slice(1) * 1
            }
            price_value = price_value * 1
            priceChar.push(price_value)
            averageBsr += bsrObj[key]['value'] * 1
            averagePrice += price_value
        });
        return {'bsrObj': bsrObj, 'minprice': minprice, 'btimeChar': btimeChar, 'valueChar': valueChar, 'salesChar': salesChar, 'priceChar': priceChar, 'averageBsr': averageBsr, 'averagePrice': averagePrice, 'minBsr': minBsr}
    }

    $(document).ready(function (){
        $('#sidebar').is(":visible")&&($('#sidebar li.active').parents('.sidebar-item').addClass('active'));
    })
    var searchFlag = false,nullFlag=false, page=1,total = 0;
    function checkScrollDirector() {
        if (searchFlag) {
            var flag = 0;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            var windowHeight = (document.compatMode == "CSS1Compat")? document.documentElement.clientHeight: document.body.clientHeight;
            var scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)

            if (scrollTop + windowHeight>=0.8*scrollHeight) {
                flag = 1;
            }
            return flag;
        }
    }

    //search log
    function searchlog(data) {
        Fast.api.ajax({
            loading: false,
            url: "/amazon/searchResultLog",
            type: "post",
            data:  data,
        }, function () {return false}, function () {return false});
    }
    function getPng(asin, url) {
        let layloed = layer.open(layoption);
        Fast.api.ajax({
            loading: false,
            url: "/amazon/downloadImg",
            type: "post",
            data: {
                asin: asin,
                url: url,
            },
        }, function (data) {
            layer.close(layloed);
            if (!data.filename) {
                layer.msg('The picture cannot be downloaded for the time being. Please try again later.', {icon: 2});
                return false;
            }
            $('#introduction').attr('src', '/' + data.filename);
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.download = new Date().getTime();
            a.href = '/' + data.filename;
            a.dispatchEvent(event);
            return false;
        }, function () {
            layer.close(layloed);
            layer.msg('The picture cannot be downloaded for the time being. Please try again later.', {icon: 2});
            return false;
            // $that.removeClass('waiting');
        });
    }
    var Controller = {
        index:function () {
            var popover=null;
            var myModal = new bootstrap.Modal(document.getElementById('gridSystemModal'), {
                keyboard: false
            })
            if (!isMember) {
                $('#sorting').change(function () {
                    if ($(this).val() !== '0:bsr') {
                        layer.msg('<span style="white-space: nowrap">Sorting is available in the professional version</span>')
                    }
                    $(this).val('0:bsr');
                })
            }
            $('input:radio[name="marketplace"]').click(function(){
                $('#search_form').submit();
            });
            $("#sorting").change(function(){
                $('#search_form').submit();
            });

            //click tab
            $(".original").click(function () {
                var professional = $('input:hidden[name="professional"]').val();
                var basic = $('input:hidden[name="basic"]').val();
                if (professional == 0) {
                    $(".professional").hide();
                    $(".basic").show();
                    $('input:hidden[name="professional"]').val(1);
                    $('input:hidden[name="basic"]').val(0);
                    $(".originals").addClass("actives");
                    $(".exchanged").removeClass("actives");
                }
                first = false;
                search = false;
                $('#search_forms').submit();
            })
            $(".exchanges").click(function () {
                var professional = $('input:hidden[name="professional"]').val();
                var basic = $('input:hidden[name="basic"]').val();
                if (professional == 1) {
                    $(".professional").show();
                    $(".basic").hide();
                    $('input:hidden[name="professional"]').val(0);
                    $('input:hidden[name="basic"]').val(1);
                    $(".originals").removeClass("actives");
                    $(".exchanged").addClass("actives");
                }
                first = false;
                search = false;
                $('#search_form').submit();
            })
			
			$(document).on('click','.fa-copy',function (){
				var word = $(this).parent().find('a').text()
				if(!word){
					word = $(this).parent().text()
				}
				copyWord(word.trim())
			})

            //price
            $("#price").click(function () {
                if($('.select-main').is(':hidden')){
                    $(".select-main").show();
                } else {
                    $(".select-main").hide();
                }
            })

            $(".price-value").click(function () {
                let val = $(this).html();
                if (val == "&gt;20") {
                    $("#price").val('>20');
                } else {
                    $("#price").val(val);
                }
                $(".select-main").hide();
                $('#search_forms').submit();
            })

            $(".price-save").click(function () {
                let price_min = $("#price_mins").val();
                let price_max = $("#price_maxs").val();
                console.log(price_max)
                if (price_min && price_max) {
                    $("#price").val(price_min+"-"+price_max);
                }
                $(".select-main").hide();
                $('#search_forms').submit();
            })

            //review
            $("#review").click(function () {
                if($('.select-review').is(':hidden')){
                    $(".select-review").show();
                } else {
                    $(".select-review").hide();
                }
            })
            $(".review-value").click(function () {
                let val = $(this).html();
                if (val == "&gt;20") {
                    $("#review").val('>20');
                } else {
                    $("#review").val(val);
                }
                $(".select-review").hide();
                $('#search_forms').submit();
            })
            $(".review-save").click(function () {
                let review_min = $("#review_mins").val();
                let review_max = $("#review_maxs").val();
                if (review_min && review_max) {
                    $("#review").val(review_min+"-"+review_max);
                }
                $(".select-review").hide();
                $('#search_forms').submit();
            })

            $(document).bind('click',function(e){
                var e = e || window.event;
                var elem = e.target || e.srcElement;
                while (elem) {
                    if (elem.id && (elem.id=='select-review' || elem.id=='review') ) {
                        return;
                    }
                    elem = elem.parentNode;
                }
                $('#select-review').css('display','none');
            });

            $(document).bind('click',function(e){
                var e = e || window.event;
                var elem = e.target || e.srcElement;
                while (elem) {
                    if (elem.id && (elem.id=='select-main' || elem.id=='price') ) {
                        return;
                    }
                    elem = elem.parentNode;
                }
                $('#select-main').css('display','none');
            });

            $('.form-submit').click(function () {
                //$('#search_forms').submit();
            })

            let first = false;
            $('#search_forms').submit(function () {
                $('.content-good').html('');
                $('.loading-box-bottom').find('div').show()
                $('.data-message').html('');
                $(".no-res").addClass('d-none')
                $(".recommend").addClass('d-none')
                
                $('#list-btn').attr('disabled','disabled')
                $('#grid-btn').attr('disabled','disabled')

                nullFlag =false;
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/index",
                    type: "post",
                    data: $.extend($('#search_forms').serializeJson(), $('#myad_forms').serializeJson()),
                }, function (data) {
                    searchlog({'option': btoa(JSON.stringify($.extend($('#search_forms').serializeJson(), $('#myad_forms').serializeJson()))), 'is_success': 1, 'result': '', 'function': '/amazon/index'});
                    page=1;
                    $('.loading-box-bottom').find('div').hide()
                    $('.data-message').html(data.htmls);
                    $('.content-good').html(data.html);
                    let search_types = $("#search_types").val();
                    if (search_types == 'asin') {
                        $('#default').addClass('notclick');
                    }
                    if( $('.content-good>div').length==0){//no resault
                        $(".no-res").removeClass('d-none')
                        $('.data-message').hide()
                        searchlog({'option': btoa(JSON.stringify($.extend($('#search_forms').serializeJson(), $('#myad_forms').serializeJson()))), 'is_success': -1, 'result': '', 'function': '/amazon/index'});
                        $('.loading-box-bottom').find('div').show()
                        var msgs = $.extend($('#search_forms').serializeJson(), $('#myad_forms').serializeJson())
                        msgs = Object.entries(msgs)
                        msgs.forEach(function (i,index) {
                            if (i[0] == 'match') {
                                msgs.splice(index, 1)
                            }
                        })
                        msgs.push(['match', '2']);
                        objs = Object.fromEntries(msgs);
                        Fast.api.ajax({
                            loading: false,
                            url: "/amazon/index",
                            type: "post",
                            data:objs,
                        }, function (data) {
                            searchlog({'option': btoa(JSON.stringify($.extend($('#search_forms').serializeJson(), $('#myad_forms').serializeJson()))), 'is_success': 1, 'result': '', 'function': '/amazon/index'});
                            page=1;
                            $('.loading-box-bottom').find('div').hide()
                            $('.data-message').hide()
                            $('.content-good').html(data.html);
                            $(".no-res").removeClass('d-none')
                            $(".recommend").removeClass('d-none')
                            let keywords = $("#keyword-search-inputs").val()
                            $(".words").html(keywords)
                            $('.spread').hide();
                            if( $('.content-good>div').length==0){
                                $(".recommend").addClass('d-none')
                                var mark = $("#mark").val();
                                nullFlag = true;
                                searchFlag = false;
                            } else {
                                searchFlag = true;
                                moneyChange();
                            }
                            return false;
                        })
                        return false
                    }else{
                        searchFlag = true;
                        moneyChange();
                    }
                    //echarts start
                    let myCharts = echarts.init(chart);
                    let options;
                    options = {
                        tooltip: {
                            trigger: 'axis',
                            transitionDuration: 0
                        },
                        xAxis: {
                            type: 'category',
                            data: data.count_data
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: 'Data',
                                data: data.count,
                                type: 'line',
                                color: '#5087EC'
                            }
                        ],
                    };
                    options && myCharts.setOption(options);
                    //search
                    $('.spread').hide();
                    $('.collapse-btns').click(function () {
                        $('#default').show()
                        $('#spread').hide()
                    });
                    if (first) {
                        $(".all_design").hide();
                    }
                    let cln = false;
                    $('.collapses-btn').click(function () {
                        if (!cln) {
                            let loading = layer.load(1, {
                                shadeClose: false,
                                title: 'Loading...',
                                shade: [0.8,'#fff']
                            });
                            $('#spread').slideDown('slow')
                            setTimeout("layer.closeAll();$('#default').hide();$('.spread').slideDown('slow')", 1000)

                        } else {
                            $('#spread').show()
                            $('#default').hide()
                            $('.spread').slideDown('slow')
                        }
                        cln = true;
                    });
                    first = true;

                    $('#list-btn').removeAttr('disabled')
                    $('#grid-btn').removeAttr('disabled')
                    return false;
                }, function () {
                    searchlog({'option': btoa(JSON.stringify($.extend($('#search_forms').serializeJson(), $('#myad_forms').serializeJson()))), 'is_success': -1, 'result': '', 'function': '/amazon/index'});
                    showMsg();
                    $('.loading-box-bottom').find('div').hide();
                    return false;
                    // $that.removeClass('waiting');
                });
                return false;
            });


            var  scrollFunc = function (e){
                if (checkScrollDirector()) {
                    if (!isMember) {
                        $('.upgrade-hint-box').show();
                        return false;
                    }
                    if(nullFlag){
                        layer.msg('nothing~~')
                        return false;
                    }
                    total = $('.content-good>div').length;
                    searchFlag = false;
                    let message = '';
                    $('.loading-box-bottom').find('div').show()
                    if ($('input:hidden[name="professional"]').val() == 1) {
                        message = $.extend($('#search_forms').serializeJson(), $('#myad_form').serializeJson(),{page:++page})
                    } else {
                        message = $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(),{page:++page})
                    }
                    Fast.api.ajax({
                        loading: false,
                        url: "/amazon/index",
                        type: "post",
                        data: message,
                    }, function (data) {
                        $('.loading-box-bottom').find('div').hide()
                        $('.content-good').append(data.html);
                        // if( $('.content-good>div').length==total){
                        if( ($('.content-good>div').length>=1000 && $('.content-good>div').length<=1120) || $('.content-good>div').length==total){
                            searchFlag = false;
                            nullFlag =true;
                        }else{
                            searchFlag = true;
                            moneyChange();
                        }
                        return false;
                    }, function () {
                        $('.loading-box-bottom').find('div').hide()
                    });
                    return false
                }
            }
            if (document.addEventListener) {
//webkit
                document.addEventListener('scroll', scrollFunc, false);
//firefox
                document.addEventListener('scrollFunc', scrollFunc, false);

            }else if(window.attachEvent){//IE
                document.attachEvent('scrollFunc',scrollFunc);
            }

            Moment.locale("en");
            let start = Moment().subtract(6, "month").startOf("month");
            let end = Moment().endOf("month");

            function cb(start, end) {
                let timeText = ''
                if (start === '' && end === '') {
                    timeText = 'Please select the date range'
                } else {
                    timeText = start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
                    $('[name=publish_date_begin]').val(start.format('X'));
                    $('[name=publish_date_end]').val(end.format('X'));
                }
                $("#reportrange span").html(timeText);
            }

            function fillSearchCriteria(ele) {
                $('#myad_form').find('input[type="text"]').val('')
                $('#myad_form').find('input[type="number"]').val('')
                let optionList = $(ele).data('option')
                for (let option in optionList) {
                    if (option === 'reportrange') {
                        if (optionList[option].indexOf('days') != -1) {
                            $('#reportrange').data('daterangepicker').setStartDate(Moment().subtract(optionList[option].split('days')[0] * 1, 'days'));
                            $('#reportrange').data('daterangepicker').setEndDate(Moment());
                            cb(Moment().subtract(optionList[option].split('days')[0] * 1, "days"), Moment());
                        } else {
                            $('#reportrange').data('daterangepicker').setStartDate(Moment().subtract(optionList[option].split('month')[0] * 1, 'month'));
                            $('#reportrange').data('daterangepicker').setEndDate(Moment());
                            cb(Moment().subtract(optionList[option].split('month')[0] * 1, "month").startOf("month"), Moment().endOf("month"));
                        }
                        continue
                    }
                    if ($('[name="' + option + '"]').attr('type') === 'radio' || $('[name="' + option + '"]').attr('type') === 'checkbox') {
                        $('[value="' + optionList[option] + '"]').prop("checked", "checked");
                        continue
                    }
                    $('[name="' + option + '"]').val(optionList[option])
                }
            }

            $('.fill-search-criteria').click(function () {
                fillSearchCriteria(this)
                $('.fill-search-criteria').css('background-color', '#4bbf73')
                $(this).css('background-color', '#1b8f43')
            })

            $(document).on('click', '.fill-search-criteria-model', function () {
                fillSearchCriteria(this)
                myModal.hide()
            })

            $(document).on('click', '.delete-diy', function () {
                let that = this
                Fast.api.ajax({
                    url: "/amazon/deleteFav",
                    type: "post",
                    data: {id: $(this).data('id')}
                }, function (data) {
                    $(that).parents('.row').remove()
                    layer.closeAll();
                }, function () {
                });
            })

            $(document).on('click', '.edit-diy', function () {
                $(this).parents('.text-center').find('.editable-click').click()
                return false
            })

            $("#reportrange").daterangepicker({
                showDropdowns: true,
                autoApply: false,
                linkedCalendars:false,
                ranges: {
                    // "Today": [Moment(), Moment()],
                    // "Yesterday": [Moment().subtract(1, "days"), Moment().subtract(1, "days")],
                    "Last 7 Days": [Moment().subtract(6, "days"), Moment()],
                    "Last 30 Days": [Moment().subtract(29, "days"), Moment()],
                    "Last 3 Month": [Moment().subtract(3, "month").startOf("month"), Moment().endOf("month")],
                    "Last 6 Month": [Moment().subtract(6, "month").startOf("month"), Moment().endOf("month")],
                }
            }, cb);
            cb('', '');

            $("#reportranges").daterangepicker({
                showDropdowns: true,
                autoApply: false,
                linkedCalendars:false,
                ranges: {
                    "Last 7 Days": [Moment().subtract(6, "days"), Moment()],
                    "Last 30 Days": [Moment().subtract(29, "days"), Moment()],
                    "Last 3 Month": [Moment().subtract(3, "month").startOf("month"), Moment().endOf("month")],
                    "Last 6 Month": [Moment().subtract(6, "month").startOf("month"), Moment().endOf("month")],
                }
            }, cbs);
            cbs('', '');

            function cbs(start, end) {
                let timeText = ''
                if (start === '' && end === '') {
                    timeText = 'Please select the date range'
                } else {
                    timeText = start.format("MMM D, YYYY") + "-" + end.format("MMM D, YYYY")
                    $('#publish_date_begin').val(start.format('X'));
                    $('#publish_date_end').val(end.format('X'));
                }
                $("#reportranges span").html(timeText);
            }


            $('#myad_reset').click(function (){
                $('input[name="publish_date_begin"]').val('');
                $('input[name="publish_date_end"]').val('');
                $('#reportrange span').html('Please select the date range');
                $('#myad_form')[0].reset();
            });
            $('.submit-search-btn').click(function () {
                $('#search_form').submit();
            })
            let search = false;
            $('#search_form').submit(function () {
                $('.content-good').html('');
                $('.loading-box-bottom').find('div').show();
                $('.data-message').html('');
                $(".no-res").addClass('d-none')
                $(".recommend").addClass('d-none')
                $('#list-btn').attr('disabled','true')
                $('#grid-btn').attr('disabled','true')

                nullFlag =false;
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/index",
                    type: "post",
                    data: $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()),
                }, function (data) {
                    searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))), 'is_success': 1, 'result': '', 'function': '/amazon/index'});
                    page=1;
                    $('.loading-box-bottom').find('div').hide()
                    $('.content-good').html(data.html);
                    let search_types = $("#search_types").val();
                    if (search_types == 'asin') {
                        $('#default').addClass('notclick');
                    }
                    if( $('.content-good>div').length==0){
                        searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))), 'is_success': -1, 'result': '', 'function': '/amazon/index'});
                        $('.loading-box-bottom').find('div').show()
                        var msg = $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson())
                        msg = Object.entries(msg)
                        msg.forEach(function (i,index) {
                            if (i[0] == 'match') {
                                msg.splice(index, 1)
                            }
                        })
                        msg.push(['match', '2']);
                        obj = Object.fromEntries(msg);
                        Fast.api.ajax({
                            loading: false,
                            url: "/amazon/index",
                            type: "post",
                            data:obj,
                        }, function (data) {
                            searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_forms').serializeJson()))), 'is_success': 1, 'result': '', 'function': '/amazon/index'});
                            page=1;
                            $('.loading-box-bottom').find('div').hide()
                            $('.content-good').html(data.html);
                            $(".no-res").removeClass('d-none')
                            $(".recommend").removeClass('d-none')
                            let keywords = $("#keyword-search-input").val()
                            $(".words").html(keywords)
                            if( $('.content-good>div').length==0){
                                $(".recommend").addClass('d-none')
                                var mark = $("#mark").val();
                                nullFlag = true;
                                searchFlag = false;
                            } else {
                                searchFlag = true;
                                moneyChange();
                            }
                            return false;
                        })
                        return false
                    }else{
                        searchFlag = true;
                        moneyChange();
                    }
                    $('#list-btn').removeAttr('disabled')
                    $('#grid-btn').removeAttr('disabled')
                    return false;
                }, function () {
                    searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))), 'is_success': -1, 'result': '', 'function': '/amazon/index'});
                    showMsg();
                    $('.loading-box-bottom').find('div').hide();
                    return false;
                    // $that.removeClass('waiting');
                });
                return false;
            });
            $('#myad_form').submit(function (){
                //save  my
                return  false;
            });
            $('#listRows').val(24);
            // Math.floor($('.content-good').width() / 250) * 3

            $("#myad_form").data("validator-options", {
                invalid: function (form, errors) {
                    $.each(errors, function (i, j) {
                        Layer.msg(j);
                    });
                }
            });
            $('#save-filter').click(function () {
                layer.prompt({
                    title:__('Please Input Title'),
                    btn:['Save','Cancel'],
                    content: '<input type="text" class="layui-layer-input" placeholder="Input length is less than 50">',
                    btn2:function(index){

                    }
                },function(val,index){
                    if(val.length<1||val.length>50){
                        layer.msg('please input the right title')
                        return  false;
                    }
                    let option = $.extend($('#myad_form').serializeJson(), $('#search_form').serializeJson());
                    Fast.api.ajax({
                        url: "/amazon/addFav",
                        type: "post",
                        data: {formData: option, title: val, marketplace: option['marketplace']}
                    }, function (data) {
                        let marketplace = "<div>ALL</div>"
                        switch (option['marketplace']) {
                            case '1:com':
                                marketplace = '<div class="flag-seller flag-us"></div>'
                                break;
                            case '3:de':
                                marketplace = '<div class="flag-seller flag-de"></div>'
                                break;
                            case '4:fr':
                                marketplace = '<div class="flag-seller flag-fr"></div>'
                                break;
                            case '5:it':
                                marketplace = '<div class="flag-seller flag-it"></div>'
                                break;
                            case '6:es':
                                marketplace = '<div class="flag-seller flag-es"></div>'
                                break;
                            case '2:co_uk':
                                marketplace = '<div class="flag-seller flag-uk"></div>'
                                break;
                        }
                        let index_len = $('.div-content-box').find('.text-center').length
                        if (index_len < 1) {
                            $('.div-content-box').html('')
                        }

                        $('.div-content-box').append('' +
                            '                       <div class="row text-center">\n' +
                            '                                <div class="col-md-2 p-2"><td>' + (index_len + 1) + '</td></div>\n' +
                            '                                <div class="col-md-2 p-2"><td>' + marketplace + '</td></div>\n' +
                            '                                <div class="col-md-2 p-2"><td><a href="#" class="status editable editable-click" data-pk="' + data['id'] + '" data-name="title">' + val + '</a></td></div>\n' +
                            '                                <div class="col-md-3 p-2"><td>Now</td></div>\n' +
                            '                                <div class="col-md-3 p-2"><td><i data-id="' + data['id'] + '" class="align-middle me-2 far fa-fw fa-edit edit-diy"></i><i data-id="' + data['id'] + '" class="align-middle me-2 far fa-fw fa-trash-alt delete-diy"></i><button data-option=\'' + JSON.stringify(option) + '\' class="fill-search-criteria-model btn-warning btn form-select-sm">apply</button></td></div>\n' +
                            '                            </div>'
                        )
                        $('.status').editable({
                            type: 'text',
                            mode: 'inline',
                            url: function (params) {
                                console.log(params);
                                Fast.api.ajax({
                                    url: "/amazon/editFav",
                                    type: "post",
                                    data:  {title: params['value'], 'id': params['pk']},
                                }, function (data) {
                                    return false;
                                });
                            }
                        });
                        layer.closeAll();
                    }, function () {
                    });
                })
                return false;
            });

            $('.collapse-btn').click(function () {
                if ($('.cut-line').hasClass('cut-line-close')) {
                    $('.cut-line').removeClass('cut-line-close')
                    $('.indication-down').hide()
                    return
                }
                $('.cut-line').addClass('cut-line-close')
                $('.indication-down').show()
            });
            $('.status').editable({
                type: 'text',
                mode: 'inline',
                url: function (params) {
                    console.log(params);
                    Fast.api.ajax({
                        url: "/amazon/editFav",
                        type: "post",
                        data: {title: params['value'], 'id': params['pk']},
                    }, function (data) {
                        return false;
                    });
                }
            });

            if (Config.initBrand) {
                //brand more
                $(".professional").show();
                $(".basic").hide();
                $('input:hidden[name="professional"]').val(0);
                $('input:hidden[name="basic"]').val(1);
                $(".originals").removeClass("actives");
                $(".exchanged").addClass("actives");
                
                $('#is_not').prop('checked', true);
                $('[name="brand"]').val(Config.initBrand)
            }

            $('#keyword-search-input').val(Config.initkeyword)
            $('#keyword-search-inputs').val(Config.initkeyword)
            $('#is_not').change(function () {
                $('#search_form').submit();
            })
            if ($('input:hidden[name="professional"]').val() == 1) {
                $('#search_forms').submit();
            } else {
                $('#search_form').submit();
            }
			
		$('#grid-btn').click(function () {
		    $(this).addClass("grid-btn-active");
			$(this).removeClass("grid-btn");
        		$('#list-btn-img').attr("src","/assets/img/list-btn-blue.png");
        		$('#grid-btn-img').attr("src","/assets/img/grid-btn-white.png");
			var list_btn = $('#list-btn');
			list_btn.addClass("grid-btn");
			list_btn.removeClass("grid-btn-active");
			$('.content-good').attr('style','display:grid');
			$('.content-good').html("");
			$('[name="showtype"]').val('grid');
        		list_btn.attr('disabled','disabled');
        		$(this).attr('disabled','disabled');
        		page=1;
			getData()
		})
			
		$('#list-btn').click(function () {
		    $(this).addClass("grid-btn-active");
			$(this).removeClass("grid-btn");
        		$('#grid-btn-img').attr("src","/assets/img/grid-btn.png");
        		$('#list-btn-img').attr("src","/assets/img/list-btn.png");
			var grid_btn= $('#grid-btn');
			grid_btn.addClass("grid-btn");
			grid_btn.removeClass("grid-btn-active");
			$('.content-good').attr('style','display:flex; width:96%; margin:0 auto;');
			$('.content-good').html("");
			$('[name="showtype"]').val('list');
        		grid_btn.attr('disabled','disabled');
        		$(this).attr('disabled','disabled');
        		page=1;
			getData()
		})
			
		function getData(){
				
			total = $('.content-good>div').length;
			searchFlag = false;
        		nullFlag = false;
			let message = '';
			$('.loading-box-bottom').find('div').show()
			if ($('input:hidden[name="professional"]').val() == 1) {
			    message = $.extend($('#search_forms').serializeJson(), $('#myad_form').serializeJson(),{page:1})
			} else {
			    message = $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(),{page:1})
			}
			Fast.api.ajax({
			    loading: false,
			    url: "/amazon/index",
			    type: "post",
			    data: message,
			}, function (data) {
			    $('.loading-box-bottom').find('div').hide()
			    $('.content-good').append(data.html);
			    // if( $('.content-good>div').length==total){
			    if( ($('.content-good>div').length>=1000 && $('.content-good>div').length<=1120) || $('.content-good>div').length==total){
			        searchFlag = false;
			        nullFlag =true;
			    }else{
			        searchFlag = true;
			        moneyChange();
			    }
            		    $('#grid-btn').removeAttr('disabled');
            		    $('#list-btn').removeAttr('disabled');
			    return false;
			}, function () {
			    $('.loading-box-bottom').find('div').hide()
			});
				
		}
		
		    $('#mark').change(function (){
                var market = $(this).val();
                if (market == '2:co_uk' || market == '3:de' || market == '4:fr' ) {
                    $('#products option:eq(2)').attr('disabled',true);
                    $('#products option:eq(2)').css('color','#BBB');
                }else{
                    $('#products option:eq(2)').attr('disabled',false);
                    $('#products option:eq(2)').css('color','#495057');
                }
            })

            $('#products').change(function (){
                var products = $(this).val();
                if (products == '3:phone_cases' ) {
                    $('#mark option:eq(2)').attr('disabled',true);
                    $('#mark option:eq(2)').css('color','#BBB');
                    $('#mark option:eq(3)').attr('disabled',true);
                    $('#mark option:eq(3)').css('color','#BBB');
                    $('#mark option:eq(4)').attr('disabled',true);
                    $('#mark option:eq(4)').css('color','#BBB');
                }else{
                    $('#mark option:eq(2)').attr('disabled',false);
                    $('#mark option:eq(3)').attr('disabled',false);
                    $('#mark option:eq(4)').attr('disabled',false);
                    $('#mark option:eq(2)').css('color','#495057');
                    $('#mark option:eq(3)').css('color','#495057');
                    $('#mark option:eq(4)').css('color','#495057');
                }
            })

        },
        detail:function (){
            let marketplaces = [];
            let rules = ['Solid colors', 'Imported', 'Lightweight'];
            let bulletpoints = '';
            for (let j = 0; j < Config.feature.length; j++) {
                for (let i = 0; i < rules.length; i++) {
                    if (Config.feature[j].indexOf(rules[i]) !== -1) {
                        Config.feature.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            for (let j = 0; j < Config.feature.length; j++) {
                 if(Config.feature[j].trim().length ){
                        bulletpoints += '                <div style="display: flex;">\n' +
                        '                            <li> </li>\n' +
                        '                            <p>' + Config.feature[j] + '' + ((Config.feature.length - 1)  === j ? '<i style="margin-left: 3px;cursor: pointer" class="align-middle me-2 far fa-fw fa-copy copy-box"></i>' : '') + '</p>\n' +
                        '                        </div>'
                 }
            }
            $('.copy-box').html(bulletpoints);
            // let bgImg = $("#product-img").css("backgroundImage").replace('url("','').replace('")','');
            // bgImg = bgImg.split('UL320').join('UX532')
            // $("#product-img").css({"backgroundImage": "url(" + bgImg + ")"})
            let {bsrObj, minprice, btimeChar, valueChar, salesChar, priceChar, averageBsr, averagePrice, minBsr} = organizeData(Config.bsr_array)
            if(minprice==-1)minprice=0;
            function bubbleSort(arrS) {
                var arr = JSON.parse(JSON.stringify(arrS))
                var len = arr.length;
                for (var i = 0; i < len - 1; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (arr[j] > arr[j+1]) {
                            var temp = arr[j+1];
                            arr[j+1] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                return arr;
            }
            var numbers = bubbleSort(valueChar);
            var zz_wz =null,zhs=0;
            if(numbers.length%2!=0){
                zz_wz =(numbers.length+1)/2;
                zhs = numbers[zz_wz];
            }else{
                zz_wz = numbers.length / 2;
                zhs = Math.floor((numbers[zz_wz] + numbers[zz_wz-1])/2);
            }
            $('#average-middle-bsr').text(Money(zhs));
            $('#average-price').text(Money((averagePrice / priceChar.length).toFixed(2)))
            $('#average-bsr').text('Average BSR : ' + Money(Math.floor(averageBsr / valueChar.length)))
            $('#bsr-overall-trend').html(valueChar[valueChar.length - 1] - valueChar[0] > 0 ? 'Down<i class="link-danger align-middle me-2 fas fa-fw fa-arrow-down"></i>' : 'Up<i class="link-success align-middle me-2 fas fa-fw fa-arrow-up"></i>')
            $('.keywords-item-box>div').each(function () {
                if ($(this).height() < 100) {
                    $(this).prev().find('.more-less').hide();
                }
                $(this).parent().attr("style", 'height: 85px');
            });
            function rotation() {
                let parentWidth = $('.bigbox').width();
                let sum = Math.floor(parentWidth / 215) < 1 ? 1 : Math.floor(parentWidth / 215);
                let length = $(".content_1").children(".bottom-slide-box").length;
                let boxWidth = parentWidth / sum;
                boxWidth = Math.round(boxWidth, 2)
                let virtual = length * boxWidth;
                let speed = 500;
                let time = 4000;
                $(".bottom-slide-box").width(boxWidth - 24);
                let Item = $('#switcher');
                Item.css({ position: 'relative' });
                let move = boxWidth + 'px';
                let leftCriticalPoint = "-" + virtual + "px";
                let flag = true;
                scrollContentStructure(length);
                function scrollContentStructure(length) {
                    if(length < sum) {
                        $(".content_1").append('');
                    } else {
                        $('#switcher').width(virtual * 2);
                        $(".content_2").html($(".content_1").html());
                    }
                }
                $(".control-box li").click(function() {
                    if(!Item.is(":animated") && flag) {
                        let left = Item[0].style.left;
                        if($(this).index() == 2) {
                            if(left == leftCriticalPoint) {
                                Item[0].style.left = "0px";
                            }
                            Item.animate({ left: '-=' + move }, speed, function() {
                                if(Item[0].style.left == leftCriticalPoint) {
                                    Item[0].style.left = "0px";
                                }
                            });
                        } else if($(this).index() == 0) {
                            if(isNaN(parseInt(left)) || left == "0px") {
                                Item[0].style.left = leftCriticalPoint;
                            }
                            Item.animate({ left: '+=' + move }, speed, function() {
                                if(Item[0].style.left == "0px") {
                                    Item[0].style.left = leftCriticalPoint;
                                }
                            });
                        }
                    }
                });
                if (length < 1) {
                    $('.spider-box').hide();
                }
            }
            $(document).ready(function() {
                if (!isMember) {
                    $('.bigbox').parent().append('<div style="\n' +
                        '    width: 100%;\n' +
                        '    height: 100%;\n' +
                        '    position: absolute;\n' +
                        '    display: flex;\n' +
                        '    align-items: center;\n' +
                        '    justify-content: center;\n' +
                        '    color: #ffffff;\n' +
                        '    font-size: 1.5rem;\n' +
                        '"><a href="https://www.podcs.com/price.html">Upgrade&nbsp;</a> to Professional Membership to see similar designs</div>');
                    $('.bigbox').css('filter', 'blur(20px)');
                    rotation()
                    $('.loading-similar').remove();
                    return false;
                }
                Fast.api.ajax({
                    loading:false,
                    url: "/amazon/index",
                    type: "post",
                    data: {
                        brand: Config.brand,
                        list_rows: 20,
                        not_delete_product: true,
                        sorting: '0:bsr',
                        search_type: 'keyword'
                    },
                }, function (data) {
                    $('.loading-similar').remove();
                    $('.content_1').html(data.html);
                    moneyChange();
                    rotation()
                    return false;
                }, function () {
                    $('.spider-box').remove();
                    return false;
                });
            })
            $('.more-less').click(function () {
                if ($(this).text().indexOf('more') !== -1) {
                    $(this).parents('.keywords-box').find('.keywords-item-box').css('height', 'auto');
                    $(this).text('See less')
                } else {
                    $(this).parents('.keywords-box').find('.keywords-item-box').css('height', '91px');
                    $(this).text('See more')
                }
            });
            $('.keywords-box').find('input[type="checkbox"]').change(function () {
                $(this).parents('.keywords-item').attr('style', '');
                if ($(this).is(':checked')) {
                    $(this).parents('.keywords-item').attr('style', 'box-shadow: 0 0 0 0.2rem rgb(41 48 66);');
                }
                let num = $(this).parents('.keywords-box').find('input:checked').length;
                $(this).parents('.keywords-box').find('.show-num-hint').show();
                if (num > 0) {
                    $(this).parents('.keywords-box').find('.show-num-hint span').show();
                    $(this).parents('.keywords-box').find('.show-num-hint span').text(num);
                    return true;
                }
                $(this).parents('.keywords-box').find('.show-num-hint').hide();
            });
            $('.keyword-copy').click(function () {
                let copyText = '';
                $(this).parents('.keywords-box').find('.form-check-input').each(function () {
                    if ($(this).is(":checked")) {
                        copyText += $(this).parent().text() + ','
                    }
                });
                copyText = copyText.substr(0, copyText.length - 1);
                copyWord(copyText)
            });

            $('.keyword-copy-all').click(function () {
                let copyText = '';
                $(this).parents('.keywords-box').find('.form-check-input').each(function () {
                    copyText += $(this).parent().text() + ','
                });
                copyText = copyText.substr(0, copyText.length - 1);
                copyWord(copyText)
            });

            $('.fa-copy').click(function () {
                let text = $(this).parent().text()
                if ($(this).hasClass('copy-box')) {
                    text = ''
                    $(this).parents('.copy-box').find('p').each(function () {
                        text += $(this).text() + ',\n'
                    });
                    text = text.substr(0, text.length - 1);
                }
                copyWord(text)
            });
			
			$('#product-title').click(function() {
				copyWord($(this).text())
			});
			$('.asin_p').click(function() {
				copyWord($('#asin_text').text())
			});

            let chartDom = document.getElementById('main');
            let myChart = echarts.init(chartDom);
            let option;
            option = {
                legend: {
                    data: ['BSR', 'Price'],
                    itemWidth: 50
                },
                toolbox: {
                    show: false,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: btimeChar,
                    axisLine: {
                        lineStyle: {
                            color: '#cccccc'
                            // ...
                        }
                    },
                },
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    boundaryGap: false,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min:minBsr,
                    inverse:true,
                }, {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    boundaryGap: false,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min:minprice,
                }],
                dataZoom: [
                    {
                        type: 'slider',
                        start: valueChar.length < 10 ? 0: 80,
                        end: 100,
                    }
                ],
                series: [
                    {
                        name: 'BSR',
                        type: 'line',
                        color: '#3F80EA',
                        data: valueChar,
                        lineStyle: {
                            width: 6,
                            color: '#3F80EA'
                        },
                        show: 'false'
                    },
                    {
                        name: 'Price',
                        type: 'line',
                        color: '#66C988',
                        data: priceChar,
                        lineStyle: {
                            type: 'dotted',
                            width: 6,
                            color: '#66C988'
                        },
                        yAxisIndex: 1,
                    }
                ],
                grid: {
                    borderColor: "#f1f1f1",
                }
            };
            option && myChart.setOption(option);

            window.addEventListener('resize', function() {
                myChart.resize();
            });
            $(document).on('change', '.amazon-custom-control-input', function (){
                return;
                if ($(this).is(":checked")) {
                    $(this).parents('label').next().attr('disabled', false)
                    changeRoyalty(this, true, $(this).parents('label').next().val())
                    return
                }
                $(this).parents('label').next().attr('disabled', true)
                changeRoyalty(this, false, 0)
            })
            $('#calculator-btn').click(function () {
                $('.amazon-modal-content-box').toggle();
            });
            $('.close-calculator-btn').click(function () {
                $('.amazon-modal-content-box').toggle();
            })
            const tipsHtml = {2:"The keyword registered for Trademark, and these are specific keywords make people related to the brand possess it. Shouldn’t use, your design will be delete and account will be suspend.",3:'The keyword that’s belongs to General Trademark, this type of key word does not affected to your design when you don’t mention to any brand',4:"The keyword registered for Trademark, and these are specific keywords make people related to the brand possess it. Shouldn’t use, your design will be delete and account will be suspend.",};
            const htmlRepace = function ($1,type){
                return '<span data-tips-placement="right" data-trade="'+type+'" class="trademark-check type-'+type+'">'+$1+'</span>'
            }
            const htmlElemArray =["#product-brand","#product-title","#product-des","#product-bull"]
            $("#check_trade-btn").click(function (){
                if($(this).data('isload')==1){
                    return;
                }
                var layloed = layer.load(4),bull = [];
                $("#product-bull p").text(function (index,item){
                    bull.push(item)
                });
                $(this).data('isload',1)
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/checkDict",
                    type: "post",
                    data: {brand:$('#product-brand').text().trim(),title:$('#product-title').text().trim(),bull:bull.join(" ").trim(),des:$('#product-des').text().trim()}
                }, function (data) {
                    layer.close(layloed);
                    for (var j = 0; j < htmlElemArray.length; j++) {
                        for (var i = 0; i < data.word_list.length; i++) {
                            if(data.word_list[i]['type']*1==1) continue;
                            var $html = $(htmlElemArray[j]).html().replace(new RegExp(data.word_list[i].keyword, 'gi'), function ($1) {
                                return htmlRepace($1, data.word_list[i]['type']);
                            });
                            $(htmlElemArray[j]).html($html)

                        }
                    }
                    $('span.trademark-check').each(function (){
                        var checkFlag = false,that = this;
                        $(this).parents('span').each(function (){
                            if($(this).data('tips')){
                                checkFlag = true;
                                $(that).removeAttr('class')
                            }
                        });
                        if(checkFlag){
                            return;
                        }
                        $(this).attr('data-tips',tipsHtml[$(this).data('trade')])
                    });
                    if($('#product-title [data-tips]')){
                        $('#product-title').css('line-height','26px')
                    }
                    $("[data-tips]").each(tips_popover);
                    return false;
                });
            });
//calc royalty
            var productsArray = {'shirt':["Standard T-Shirt","Premium T-Shirt","V-Neck T-Shirt","Tank Top","Long Sleeve","Raglan","Sweatshirt"],'hoodie':["Pullover Hoodie","Zip Hoodie"],popsockets:["PopSockets Grip"],phone_cases:["iPhone Cases","Samsung Cases"]},productTitle  = $('#product-title').text().split(' ');
            var proLength = productTitle.length,protype='';

            for (let i = 0; i < productsArray[Config.proType].length; i++) {
                if (productsArray[Config.proType][i].toUpperCase() ==(productTitle[proLength-2]+' '+productTitle[proLength-1]).toUpperCase()) {
                    protype = productsArray[Config.proType][i]
                    break
                }
            }

            if(protype.length==0) protype = productsArray[Config.proType][0];
            for (var  i = 0; i < calculator.length; i++) {
                if (calculator[i]['nameShort'] === protype) {
                    marketplaces = calculator[i]['marketplaces'];
                    for (var j = 0; j < marketplaces.length; j++) {
                        if(Config.country.toUpperCase()==marketplaces[j].market){
                            $('.rolaty-conent').append( Money(marketplaces[j]['getRoyalty']($('#price-show').text()*1),2))
                            break;
                        }
                    }
                    break;
                }
            }

            $('.mba-product').click(function () {
                $('.mba-product').removeClass('active-product')
                $(this).addClass('active-product')
                $('.selection-status').hide();
                $(this).find('.selection-status').toggle();
                $('.royalty-message').hide();
                $('.amazon-custom-control-input').attr('disabled', true);
                $('.amazon-custom-control-input').attr('checked', false);
                $('.mba-marketplace-options-dark').show()
                $('.estimated-amount').attr('disabled', true);
                buildCalculator($(this).find('.product-text').text())
            });
            $(document).on('change', '.estimated-amount', function() {
                changeRoyalty(this, true, $(this).val())
            })
            function buildCalculator(calculatorSelect='Standard T-Shirt') {
                for (let i = 0; i < calculator.length; i++) {
                    if (calculator[i]['nameShort'] === calculatorSelect) {
                        marketplaces = calculator[i]['marketplaces'];
                        let str = '';
                        for (let j = 0; j < marketplaces.length; j++) {
                            $('.royalty-' + marketplaces[j]["market"]).attr('disabled', false)
                            $('.royalty-' + marketplaces[j]["market"]).parents('label').next().attr('disabled', false)
                            $('.royalty-' + marketplaces[j]["market"]).parents('.mba-marketplace-options').find('.mba-marketplace-options-dark').hide();
                            $('.royalty-' + marketplaces[j]["market"]).parents('.mba-marketplace-options').find('.royalty-message').show();
                            $('.royalty-' + marketplaces[j]["market"]).parents('.mba-marketplace-options').find('.royalty-message-value').text(0.00);
                            $('.royalty-' + marketplaces[j]["market"]).parents('.mba-marketplace-options').find('.estimated-amount').val(marketplaces[j]['priceMin'])
                        }
                        break;
                    }
                }
            }
            buildCalculator();
            function changeRoyalty(ele, isShow, price) {
                if (!isShow) {
                    $(ele).parents('.mba-marketplace-options').find('.royalty-message').hide();
                    return;
                }
                let marketplacesText = $(ele).parents('.mba-marketplace-options').find('.mba-marketplace-title').text().toLocaleUpperCase().split('Amazon.')[0].split('.').join('_')
                let Royalty = 0;
                for (let j = 0; j < marketplaces.length; j++) {
                    if ('AMAZON_' + marketplaces[j]['market'] === marketplacesText) {
                        price = price < marketplaces[j]['priceMin'] ? marketplaces[j]['priceMin'] : price;
                        Royalty = marketplaces[j]['getRoyalty'](price)
                    }
                }
                $(ele).prev().find('.amazon-custom-control-input').prop('checked', true);
                Royalty = Math.round((Royalty * 100)) / 100;
                $(ele).val(price);
                $(ele).parents('.mba-marketplace-options').find('.royalty-message-value').text(Royalty)
                $(ele).parents('.mba-marketplace-options').find('.royalty-message').show()
            }
            $('.open-in-search').click(function () {
                window.open('/amazon/index?initkeyword=' + $('.keywords-box').eq(1).find('label').eq(0).find('.keywords-left').text().toLocaleLowerCase().trim())
            });
            $('#download-img-btn').click(function () {
                getPng($(this).data('asin'));
            })
        },
        tools:function () {
            let searchNum = {'KeywordsGenerator' : getCookie('KeywordsGenerator') * 1, 'ReverseASINKeywords': getCookie('ReverseASINKeywords') * 1, 'KeywordsResearch': getCookie('KeywordsResearch') * 1};
            var search_keyword_value = '';
            var googleLoad = false;
            function drawRegionsMap(){
                googleLoad =  true;
            }
            function getCookie(cname)
            {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++)
                {
                    var c = ca[i].trim();
                    if (c.indexOf(name)==0 && (c.split('|')[1] * 1) == (new Date()).getDate()) return c.substring(name.length,c.split('|')[0].length);
                }
                return '0';
            }
            function setCookie(cname,cvalue,exdays)
            {
                var d = new Date();
                d.setTime(d.getTime()+(exdays*24*60*60*1000));
                var expires = "expires="+d.toGMTString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }
            google.charts.load('current', {
                'packages':['geochart'],
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
            var initTrendsChart =  this.initTrendsChart;
            $(".btn-click_word").click(function (){
                $('.active .search-input').val($(this).attr('title'))
            });
            //slect  all
            $(document).on('change','#sel_all',function (){
                if($(this).is(':checked')){
                    $('.active [name=checked-keywords]').each(function(){$(this).prop('checked',true)})
                }else {
                    $('.active [name=checked-keywords]').each(function(){$(this).prop('checked',false)})
                }
            });
            $(document).on('change','.active [name=checked-keywords]',function (){
                if($('.active [name=checked-keywords]:checked').length==$('.active [name=checked-keywords]').length){
                    $('#sel_all').prop('checked',true)
                }else{
                    $('#sel_all').prop('checked',false)
                }
            });
            $(document).on('click', '.keywords-item', function () {
                var count = $('.keywords-item .amazon-form-check-input:checked').length
                if (count > 0) {
                    if (count == 1) {
                        $("#count").text(count+' item selected')
                    } else {
                        $("#count").text(count+' items selected')
                    }
                } else {
                    $("#count").text('')
                }
            });
            $(document).on('click','.keyword-copy',function (){
                var copyText = '';
                if($(this).data('type')=='all'){
                    $('.active .content-box').find('[type=checkbox]').each(function (){
                        if ($(this).attr('id')!='sel_all') {
                            copyText += $(this).val() + ', '
                        }
                    })
                }else{
                    $('.active .content-box').find('[type=checkbox]:checked').each(function (){
                        if ($(this).attr('id')!='sel_all') {
                            copyText += $(this).val() + ', '
                        }
                    })
                }

                copyText = copyText.substr(0, copyText.length - 1);
                if(copyText.length==0){
                    layer.msg('Please select Data')
                    return false;
                }
                copyWord(copyText)
            });
            $('.tools_search_form').submit(function () {
                let optionData = {};
                let that = $(this).parent().find('.content-box');
                $(this).find('input').each(function () {
                    optionData[$(this).attr('name')] = $(this).val();
                });
                if (optionData.type == 'KeywordsResearch') {
                    if (optionData.keyword.length == 0) {
                        layer.msg('Please enter keywords');
                        return false;
                    }
                    if (!isMember && ['birthday', 'Christmas', 'love'].indexOf(optionData.keyword) === -1 && searchNum[optionData.type] > 2) {
                        layer.alert('Free version can only search 3 keywords a day.', {
                            title: 'Tips',
                            btn: ['Upgrade to unlimited'],
                            btn1: function(index, layero){
                                window.open('https://www.podcs.com/price.html')
                            }
                        });
                        return false;
                    }
                }else if(optionData.type == 'ReverseASINKeywords') {
                    if (optionData.asin.length == 0) {
                        layer.msg('Please enter keywords');
                        return false;
                    }
                    if (!isMember && searchNum[optionData.type] > 2 && ['B07KGPS6ZN', 'B07QZ7Y17K'].indexOf(optionData.asin) === -1) {
                        layer.alert('Free version can only search 3 asin a day.', {
                            title: 'Tips',
                            btn: ['Upgrade to unlimited'],
                            btn1: function(index, layero){
                                window.open('https://www.podcs.com/price.html')
                            }
                        });
                        return false;
                    }
                }else if(optionData.type == 'KeywordsGenerator') {
                    if (optionData.keyword.length == 0) {
                        layer.msg('Please enter keywords');
                        return false;
                    }
                    if (!isMember && searchNum[optionData.type] > 2 && ['birthday', 'Christmas', 'love'].indexOf(optionData.keyword) === -1 ) {
                        layer.alert('Free version can only search 3 keywords a day.', {
                            title: 'Tips',
                            btn: ['Upgrade to unlimited'],
                            btn1: function(index, layero){
                                window.open('https://www.podcs.com/price.html')
                            }
                        });
                        return false;
                    }
                }

                if (typeof optionData.keyword !== 'undefined') {
                    let reg = new RegExp("([\\u4E00-\\u9FFF]|[\\u3002\\uff1b\\uff0c\\uff1a\\u201c\\u201d\\uff08\\uff09\\u3001\\uff1f\\u300a\\u300b\\uff01\\u3010\\u3011\\uffe5])+","g");
                    if (optionData.keyword.match(reg) !== null) {
                        layer.msg('The entered keyword format is incorrect, please enter the correct format.')
                        return false;
                    }
                    if (optionData.country !== 'jp' && optionData.country !== 'JP') {
                        if (optionData.keyword.match(/[\u0800-\u4e00]/g) !== null) {
                            layer.msg('The entered keyword format is incorrect, please enter the correct format.')
                            return false;
                        }
                    }
                }
                $(this).parents('.tab-pane').find('.tips-box').hide();
                // optionData['loop_num'] = 2;
                that.find('.select-keyword-box').html("")
                getDataRequest(that, optionData)
                return false;
            });
            function getDataRequest(that, optionData) {
                if (optionData.country) {
                    var country = optionData.country.toUpperCase()
                    if (country == 'UK') {
                        country = 'GB'
                    }
                }
                let layloed = layer.open(layoption);
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/tools",
                    type: "post",
                    data: optionData
                }, function (data) {
                    layer.close(layloed);
                    searchlog({'option': btoa(JSON.stringify(optionData)), 'is_success': 1, 'result': '', 'function': '/amazon/tools/' + optionData['type']});
                    // if (data.showMsg) {
                    //     showMsg();
                    // }
                    that.show();
                    if (optionData['type'] === 'KeywordsGenerator') {
                        var str = '';
                        for (let i = 0; i < data.list.length; i++) {
                            str += '<label><div class="flex-style keywords-item me-3 mb-3"><div class="keywords-left"><input type="checkbox" value="'+data.list[i] +'" class="me-1 form-check-input amazon-form-check-input">' + data.list[i] + '</div> </div></label>'
                        }
                        that.find('.select-keyword-box').append(str);
                        optionData['loop_num']--;
                        if (optionData['loop_num'] > 0) {
                            for (let i = 0; i < data.list.length; i++) {
                                optionData['keyword'] = data.list[i];
                                getDataRequest(that, optionData);
                            }
                        }
                    }else if (optionData['type'] === 'KeywordsResearch'){
                        search_keyword_value = optionData['keyword']
                        if (data.showMsg) {
                            $('.content-box').eq(0).html('<div class="text-center no-res" style="width: 100%;padding: 2rem;margin-bottom: 4rem"><div><span style="font-size: 16px; color: #101010;font-family: Poppins-medium">No results for </span><span style="font-size: 16px; color: #101010;font-family: Poppins-medium" class="words">'+optionData.keyword+'</span></div><div style="margin-top: 0.5rem"><span style="font-size: 14px; color: #101010;font-family: Poppins-regular">Try checking your spelling or use more general terms</span></div></div>')
                        }else{
                            $('.content-box').eq(0).html('<table id="keyword-table" class="table table-responsive "></table>')
                            $('#keyword-table').bootstrapTable({
                                data: data.list,
                                fixedColumns: true,
                                fixedNumber: 2,
                                locale: 'en-US',
                                onPostHeader: function () {
                                    $("[data-tips]").each(tips_popover);
                                },
                                columns: [{
                                    title: '',
                                    class: 'text-center opt-con-red postioon-re',
                                    formatter: function (value, row, index) {
                                        return '             <a target="_blank" href="https://www.amazon.com/s?k=' + row['phrase'] + '"><i style="margin-right: 0!important;font-size: 1.1rem" class="align-middle me-2 fab fa-fw fa-amazon"></i></a><br>' +
                                            '                <a target="_blank" href="/research/trademark?brand=' + row['phrase'] + '"> <svg stroke="currentColor" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" class="feather align-middle" width="17" height="17" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 256h426.666667v85.333333H256v426.666667H170.666667V341.333333H0V256zM512 256v512h85.333333V384l149.333334 256L896 384v384h85.333333V256h-106.666666l-128 213.333333-128-213.333333H512z"></path></svg></a><br>\n' +
                                            // '                <a href="#" class="show-google-start" data-trend="' + row['phrase'] + '">\n' +
                                            // '                    <svg t="1646107102472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6236" width="17" height="17"><path d="M910.933333 473.6 519.68 473.6 519.68 590.08 797.44 590.08C783.36 752.64 648.106667 822.186667 520.106667 822.186667 356.693333 822.186667 213.333333 693.333333 213.333333 512 213.333333 337.066667 349.866667 201.813333 520.533333 201.813333 652.373333 201.813333 729.6 285.866667 729.6 285.866667L810.666667 201.386667C810.666667 201.386667 706.56 85.333333 516.266667 85.333333 273.92 85.333333 86.613333 290.133333 86.613333 512 86.613333 727.466667 262.826667 938.666667 522.666667 938.666667 750.933333 938.666667 917.333333 782.08 917.333333 550.826667 917.333333 501.76 910.933333 473.6 910.933333 473.6L910.933333 473.6Z" p-id="6237" fill="#3f80ea"></path></svg>\n' +
                                            // '                </a>\n' +
                                            // '                <br/>\n' +
                                            '                <a target="_blank" href="https://trends.google.com/trends/explore?geo='+country+'&q=' + row['phrase'] + '"> <svg t="1646107102472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6236" width="17" height="17"><path d="M910.933333 473.6 519.68 473.6 519.68 590.08 797.44 590.08C783.36 752.64 648.106667 822.186667 520.106667 822.186667 356.693333 822.186667 213.333333 693.333333 213.333333 512 213.333333 337.066667 349.866667 201.813333 520.533333 201.813333 652.373333 201.813333 729.6 285.866667 729.6 285.866667L810.666667 201.386667C810.666667 201.386667 706.56 85.333333 516.266667 85.333333 273.92 85.333333 86.613333 290.133333 86.613333 512 86.613333 727.466667 262.826667 938.666667 522.666667 938.666667 750.933333 938.666667 917.333333 782.08 917.333333 550.826667 917.333333 501.76 910.933333 473.6 910.933333 473.6L910.933333 473.6Z" p-id="6237" fill="#3f80ea"></path></svg></a><br>' +
                                            '                <div  style="display: none" class="google-trends-box"></div>\n' +
                                            '                <a href="#" class="show-tending-start" data-trend="' + row['phrase'] + '" data-opt="add" data-id="'  + row['keywordid'] + '">\n' +
                                            '                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" stroke="currentColor" stroke-width="8%" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 1024 1024" class="feather-heart align-middle">\n' +
                                            '                        <path d="M0 0h64v1024H0z"></path>\n' +
                                            '                        <path d="M0 960h1024v64H0zM340.48 502.08l52.48-36.736 146.816 209.728-52.48 36.672z"></path>\n' +
                                            '                        <path d="M33.152 639.168l323.072-226.24 36.736 52.48-358.528 251.008zM450.624 659.328l471.872-330.368 36.672 52.48-471.808 330.304z"></path>\n' +
                                            '                    </svg>\n' +
                                            '                </a>\n' +
                                            '                <div style="position:absolute;" class="rating-box"></div>'
                                    },
                                },{
                                    field: 'phrase',
                                    title: '<span style="padding: 0 2rem">Keyword</span>',
                                    class: 'd-md-table-cell text-center',
                                    sortable: true,
                                }, {
                                    field: 'volume',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return value * 1 > 100 ? Money(value) : '<100'
                                    },
                                    sortable: true,
                                    title: '<span style="position:relativere;" class="span-pad-1">Search Vol<a style="position: absolute" href="#" data-tips-placement="right" data-tips="Monthly approximation of how many shoppers are using this term. Built with our proprietary artificial intelligence algorithm." class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    field: 'volumeAvg_3',
                                    sortable: true,
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return value * 1 > 100 ? Money(value) : '<100'
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">3M AVG<a style="position: absolute" href="#" data-tips-placement="right" data-tips="Rolling average of search volumes over the past 3 months, current month included." class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'volumeAvg_12',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return value * 1 > 100 ? Money(value) : '<100'
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">12M AVG<a style="position: absolute" href="#" data-tips-placement="right" data-tips="Rolling average of search volumes over the past 12 months, current month included." class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'rate3',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return (Math.round(value * 1000) / 10) + '%'
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">3M GR<a style="position: absolute" href="#" data-tips-placement="right" data-tips="Last 3 months Growth Rate=(Search volume in the current month - Average search volume in the last 3 months) ÷ Average search volume in the last 3 months." class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'rate12',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return (Math.round(value * 1000) / 10) + '%'
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">12M GR<a style="position: absolute" href="#" data-tips-placement="right" data-tips="Last 12 months Growth Rate=(Search volume in the current month - Average search volume in the last 12 months) ÷ Average search volume in the last 12 months.\n' +
                                        '" class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'trend',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return value > 0 ? '<i style="color: green" class="align-middle me-2 fas fa-fw fa-arrow-up"></i>' : '<i style="color: red" class="align-middle me-2 fas fa-fw fa-arrow-down"></i>';
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">Trend<a style="position: absolute" href="#" data-tips-placement="right" data-tips="The way a keyword search is  trending over the last 12 months." class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'results',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return Money(value)
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">Products<a style="position: absolute" href="#" data-tips-placement="right" data-tips="The total number of products available for sale when searching with the keyword phrase at the time of data collection. " class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'ads',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        if (!isNaN(value)) {
                                            return Money(value);
                                        }
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">ADS<a style="position: absolute" href="#" data-tips-placement="right" data-tips="The total number of Sponsored Ads that show up on the first page of search results for this keyword. " class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                }, {
                                    sortable: true,
                                    field: 'reviewsOnPage',
                                    class: 'd-md-table-cell text-center postioon-re',
                                    formatter: function (value, row, index) {
                                        return Money(value);
                                    },
                                    title: '<span style="position:relativere;" class="span-pad-1">Reviews<a style="position: absolute" href="#" data-tips-placement="right" data-tips="The total number of reviews for all products that appear on the top search results page for each keyword phrase at the time of data collection. " class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                },
                                //     {
                                //     field: 'seasonality',
                                //     class: 'd-md-table-cell text-center postioon-re',
                                //     title: '<span style="position:relativere;" class="span-pad-1">Appearance<a style="position: absolute" href="#" data-tips-placement="right" data-tips="How often a keyword appears in a 12-month period:<br>EVERGREEN: monthlySEMI-ANNUAL: 1-3x per year <br>ONE-TIME: seen 1x before in the past year <br>SEASONAL: seen for 2-4 months <br>REDISCOVERED: last seen 1 year ago <br>BRAND NEW: never seen before <br>VINTAGE: not seen for 13 months+" class="align-middle" data-bs-original-title="" title=""><i class="align-middle me-2 far fa-fw fa-question-circle mx-1 mb-1 fs-4"></i></a></span>'
                                // },
                                    {
                                        sortable: true,
                                        field: 'category',
                                        class: 'd-md-table-cell text-center postioon-re',
                                        title: '<span class="span-pad-1">Dominant Categories</span>'
                                    },]
                            })
                            $("[data-tips]").each(tips_popover);
                        }
                        
                    }
                    else{
                        that.html(data.html);
                        $("[data-tips]").each(tips_popover);
                    }
                    if (!isMember && ['birthday', 'Christmas', 'love'].indexOf(optionData.keyword) === -1 && ['B07KGPS6ZN', 'B07QZ7Y17K'].indexOf(optionData.asin) === -1) {
                        searchNum[optionData.type]++;
                        setCookie(optionData.type, searchNum[optionData.type] + '|' + (new Date()).getDate(), 1);
                    }
                    moneyChange();
                    return false;
                }, function (res) {
                    layer.close(layloed);
                    if (res !== undefined && res.noAuth) {
                        layer.alert('Free version can only search 3 asin a day.', {
                            title: 'Tips',
                            btn: ['Upgrade to unlimited'],
                            btn1: function(index, layero){
                                window.open('https://www.podcs.com/price.html')
                            }
                        });
                        return false;
                    }
                    searchlog({'option': btoa(JSON.stringify(optionData)), 'is_success': -1, 'result': '', 'function': '/amazon/tools/' + optionData['type']});
                    return false;
                    // $that.removeClass('waiting');
                });
            }
            $('.dropdown-item').click(function () {
                $('#' + $(this).parent().attr('aria-labelledby')).find('.country-text').text($(this).text());
                $('#' + $(this).parent().attr('aria-labelledby')).find('i').attr('class', $(this).find('i').attr('class'));
                $(this).parents('.mba-search-box').find('.option-input').val($(this).data('option'));
                $(this).parents('.diy-dropdown-menu').hide();
            });
            $('.country-li').mouseover(function () {
                $('.country-item').hide()
                $(this).find('.country-item').show()
            })
            $('#country-select').click(function () {
                $(this).next().toggle()
            })
            $('.dropdown-toggle').click(function () {
                $('.diy-dropdown-menu').hide();
            })
//detail button
            $('#isDark').click(function () {
                $(this).hide();
                $('.rating-box').hide();
                $('.google-trends-box').hide();
            });
            var  trends = '';
            function GoogleTrendsCHange(elemSHow,that,type){
                var country = $('.google-trends-box:visible .google-country-change').val();
                var dateS = $('.google-trends-box:visible .google-date-change').val() || '12-m';
                Fast.api.ajax({
                    url: "/amazon/googletrends",
                    type: "post",
                    data: {keyword: trends,date:dateS, 'country': country}
                }, function (data) {
                    if(elemSHow){
                        elemSHow.data('show','show');
                        elemSHow.html($('#google-trends-box').html())
                    }
                    var tempGoogle = data.multiline.default.timelineData,dataT=[],dataList=[],dataMap =[ ['Country', 'Popularity']];
                    for (var i = 0; i < tempGoogle.length-1; i++) {
                        dataT.push(tempGoogle[i]['formattedAxisTime']);
                        dataList.push(tempGoogle[i].value[0]);
                    }
                    tempGoogle = data.comparedgeo.default.geoMapData;
                    var html = '',keyIndex = 1;
                    for (var i = 0; i < tempGoogle.length-1; i++) {
                        if(tempGoogle[i]['hasData'][0]){
                            dataMap.push([tempGoogle[i]['geoName'],tempGoogle[i]['formattedValue'][0]*1]);
                            html +=   '<div class="item-li pl-2"> <div>'+keyIndex+' &nbsp;&nbsp;'+tempGoogle[i]['geoName']+'</div><div class="flex-style" style="align-items: center">'+tempGoogle[i]['formattedValue'][0]+' &nbsp;&nbsp;<div class="morris-table-inline progress flex-fill" style="width: 10rem;border-radius: 0;"><div class="progress-bar bg-primary" role="progressbar" style="background-color:#3e7be0!important;width: '+tempGoogle[i]['formattedValue'][0]*1+'%;" aria-valuemin="0" aria-valuemax="100"></div></div></div> </div>';
                            keyIndex++;
                        }
                    }
                    $("[data-tips]").each(tips_popover);
                    if(elemSHow){
                        $(elemSHow).parents().find('.region-conn').html(html);
                        $(that).next().toggle();
                        initTrendsChart($(elemSHow).find('.google-chart-box')[0], {trends: trends, map:dataMap,date:dataT,history:dataList},'google');
                    }else{
                        $('.google-trends-box:visible').find('.region-conn').html(html);
                        initTrendsChart($('.google-trends-box:visible').find('.google-chart-box')[0], {trends: trends, map:dataMap,date:dataT,history:dataList},'google');
                    }
                    return false;
                })
            }
            $(document).on('click', '.doneBtn', function () {
                $('.google-trends-box').hide();
                $('#isDark').hide();
            });
            $(document).on('change','.google-date-change,.google-country-change',function (){
                GoogleTrendsCHange()
            })
            $(document).on('click','.show-tending-start',function () {
                // $('#isDark').toggle();
                if (!$(this).data('id') || $(this).data('id') === 'undefined') {
                    return layer.msg('This service is not available for the time being')
                }
                var elemSHow = $('[data-index=' + $(that).parents('tr').attr('data-index') + ']').find('.rating-box');
                if ($(elemSHow).data('show')) {
                    elemSHow.toggle();
                } else {
                    var that = this;
                    var word = $('.active [name=keyword]').val();
                    var country = $('.active [name=country]').val()
                    // jiazai
                    Fast.api.ajax({
                        url: "/amazon/trenddetail",
                        type: "post",
                        data: {keyword: $(that).data('trend'), 'country': country, 'keywordId': $(that).data('id'), 'searchTerm': search_keyword_value}
                    }, function (data) {
                        elemSHow.data('show','show');
                        var dataT = data.history.reverse(),dataList = [];
                        dataT.push(data.volume);
                        var starDate = Moment(data.lastSeen+'');
                        dataList.push(starDate.format('MM-YYYY'))
                        for (var i = 0; i < dataT.length-1; i++) {
                            dataList.push(starDate.subtract(1,'months').format('MM-YYYY'));
                        }
                        initTrendsChart($('[data-index=' + $(that).parents('tr').attr('data-index') + ']').find('.rating-box')[0], {history:dataT,date:dataList.reverse()},'','Search volume (approx.)')
                        $('[data-index=' + $(that).parents('tr').attr('data-index') + ']').find('.rating-box').toggle()
                        $('[data-index=' + $(that).parents('tr').attr('data-index') + ']').find('.rating-box').prepend('<svg style="position:absolute;cursor:pointer;right: 1rem;z-index: 100;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-trend-btn feather-x align-middle me-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>')
                    })
                }
                return false;
            });
            $(document).on('click', '.close-trend-btn', function () {
                $('[data-index=' + $(this).parents('tr').attr('data-index') + ']').find('.rating-box').toggle()
            });
            $(document).on('click','.show-google-start',function () {
                // $('#isDark').toggle();

                var elemSHow = $(this).next();

                if ($(elemSHow).data('show')) {
                    elemSHow.toggle();
                    echarts.getInstanceById(elemSHow.find('.google-chart-box').eq(0).attr('_echarts_instance_')).resize();
                } else {
                    var that = this;
                    trends = $(that).data('trend')
                    // jiazai
                    GoogleTrendsCHange(elemSHow,that)
                }
                return false;
            });
            $('.two-select .dropdown-toggle, .option-item .dropdown-item').click(function() {
                var dropdown = bootstrap.Dropdown;
                dropdown = new bootstrap.Dropdown(this);
                var show = false;
                let that = $(this);
                if (that.hasClass('dropdown-item')) {
                    that = that.parents('ul')
                }
                show = that.hasClass('show');
                if (show) {
                    that.parents('.mba-search-box').find('input').val($(this).data('info'));
                    that.parents('.mba-search-box').find('.dropdown-toggle').eq(0).text($(this).text());
                    that.removeClass('show');
                    $('.dropdown-menu').removeClass('show');
                    $('.dropdown-toggle').removeClass('show');
                    dropdown.hide();
                } else {
                    that.attr('data-bs-toggle', 'dropdown');
                    dropdown.show();
                    that.attr('data-bs-toggle', '');
                }
            });
            if (Config.initkeyword !== '') {
                $('#tab-1').find('input[name="keyword"]').val(Config.initkeyword);
                $('#tab-1').find('.tools_search_form').submit()
            }
            if (Config.initasin !== '') {
                $('#tab-2').find('input[name="asin"]').val(Config.initasin);
                $('#tab-2').find('.tools_search_form').submit()
            }
        },
        salesestimation:function () {
            $('.dropdown-item').click(function () {
                $('#' + $(this).parent().attr('aria-labelledby')).find('.country-text').text($(this).text());
                $('#' + $(this).parent().attr('aria-labelledby')).find('i').attr('class', $(this).find('i').attr('class'));
                $(this).parent().parent().find('.option-input').val($(this).data('option'));
                $(this).parents('.diy-dropdown-menu').hide();
            });
            $(".btn-click_word").click(function (){
                $('.active .search-input').val($(this).attr('title'))
            });
            var asinChart,timeout = 0,zoomList = [];
            $(document).on('mouseover mouseout', '.date-change', function (event) {
                if (event.type == "mouseover") {
                    var mon = $(this).data('stats');
                    if (!mon || !asinChart) return;
                    mon = mon.split('-');
                    var scope = [];
                    for (let i in zoomList) {
                        let day = zoomList[i].split('-');
                        if (mon[0] === day[2] && mon[1] === day[0]) {
                            scope.push(parseInt(i));
                        }
                        if (scope.length >= 2 && mon[1] < day[0]) break;
                    }

                    if (scope.length >= 2) {
                        asinChart.setOption({
                            dataZoom: {
                                startValue: scope[0],
                                endValue: scope[scope.length - 1],
                            }
                        });
                    }
                }
            });
            $('.tools_search_form').submit(function () {
                let optionData = {};
                $(this).find('input').each(function () {
                    optionData[$(this).attr('name')] = $(this).val();
                });
                if (optionData.asin.length == 0) {
                    layer.msg('Please input the ASIN')
                    return false;
                }

                let layloed = layer.open(layoption);
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/salesEstimation",
                    type: "post",
                    data: optionData
                }, function (data) {
                    layer.close(layloed);
                    if (data.length < 1) {
                        searchlog({'option': btoa(JSON.stringify(optionData)), 'is_success': -1, 'result': '', 'function': '/amazon/salesestimation'});
                        $('.content-box').hide();
                        $('.tips-box').hide();
                        $('.no-res').removeClass('d-none');
                        $('.words').html(optionData.asin)
                        //showMsg();

                        return false;
                    }
                    searchlog({'option': btoa(JSON.stringify(optionData)), 'is_success': 1, 'result': '', 'function': '/amazon/salesestimation'});
                    $('.tips-box').hide();
                    $('.no-res').addClass('d-none');
                    $('.content-box').show();
                    if (data == null) {
                        data = {'bsr_array': []};
                    }
                    let monthEnglish = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"];
                    $('.preset-background').find('div').attr('style', "background-image:url('" + data['img_src'].replace(/\.0_.+[A-Z,0-9_]\./, "._0_UX532_.") + "');");
                    $('.product-text').html(data['title']);
                    $('.product-asin').html((data['ansi'] === undefined ? data['asin'] : data['ansi']));
                    $('.product-asin').next().attr('href', data['amazonAddress'][(typeof data['country'] === "undefined" ? data['station']['code'] : data['country']).toLocaleLowerCase()] + '/dp/' + (data['ansi'] === undefined ? data['asin'] : data['ansi']));
                    let createDate = new Date(data['create_date']['$date']['$numberLong'] * 1)
                    $('.product-fast-time').html('Date First Available: ' + monthEnglish[createDate.getMonth()] + ' ' + createDate.getDate() + ',' + createDate.getFullYear());
                    $('.product-score').html('Customer reviews: ' + (data['star'] === undefined ? data['rating'] : data['star']) + ' out of 5    &nbsp;&nbsp;&nbsp;&nbsp;' + (data['comm_num'] === undefined ? data['reviews'] : data['comm_num']) + ' Ratings');

                    let {bsrObj, minprice, btimeChar, valueChar, salesChar, priceChar, averageBsr, averagePrice, minBsr} = organizeData(data.bsr_array)
                    zoomList = btimeChar;
                    var productarr = {}
                    for (let item in bsrObj) {
                        let temp = Moment(item, 'X').format('YYYY-MM');
                        if(!productarr[temp]){
                            productarr[temp] = {}
                            productarr[temp]['day_price'] = []
                            productarr[temp]['day_sales'] = []
                            productarr[temp]['day_sales_price'] = [];
                        }
                        if(bsrObj[item].price_value*1>0) {
                            productarr[temp]['day_price'].push(bsrObj[item].price_value);
                        }
                        if(bsrObj[item].sales_value*1>0) {
                            productarr[temp]['day_sales'].push(bsrObj[item].sales_value);
                            productarr[temp]['day_sales_price'].push((bsrObj[item].price_value * bsrObj[item].sales_value).toFixed(2));
                        }
                    }

                    var timeStr = '', salesStr = '', revenueStr = '', priceStr = '';
                    for (var item in productarr) {
                        timeStr += '<td class="align-middle text-nowrap text-center ">' + item + '</td>'
                        salesStr += '<td class="align-middle text-nowrap text-center">' + (productarr[item]['day_sales'].length == 0 ? '<i class="text-muted">i</i>' : '<span class="date-change money-format" data-stats="'+item+'">'+eval(productarr[item]['day_sales'].join('+'))+'</span') + '</td>'
                        revenueStr += '<td class="align-middle text-nowrap text-center money-format">' + (productarr[item]['day_sales_price'].length == 0 ? '<i class="text-muted">i</i>' :  (eval(productarr[item]['day_sales_price'].join('+'))).toFixed(2) )+ '</td>'
                        priceStr += '<td class="align-middle text-nowrap text-center money-format">' + (productarr[item]['day_price'].length == 0 ? '<i class="text-muted">i</i>' : eval(productarr[item]['day_price'].join('+')) / productarr[item]['day_price'].length) + '</td>'
                    }
                    $('.time-tr-con').html(timeStr);
                    $('.sales-tr-con').html(salesStr);
                    $('.reven-tr-con').html(revenueStr);
                    $('.price-tr-con').html(priceStr);
                    moneyChange()
                    var data  = {
                        "dailyPrices": priceChar,
                        "dailySales": salesChar,
                        "dates": btimeChar,
                        "bsrs": valueChar,
                    }
                    var asinChartOptionvar = {
                        color: ['#6EC952', '#FFAE2D','#5FB0FF'],
                        tooltip: {
                            trigger: 'axis',
                        },
                        legend: {
                            data: ['BSR', 'Estimated Daily Units Sold', 'Price']
                        },
                        dataZoom: {
                            type: 'slider',
                            filterMode: 'filter',
                            show: true,
                            realtime: true,
                            startValue: data.dates[data.dates.length > 30 ? data.dates.length - 30 : 0],
                            endValue: data.dates[data.dates.length - 1],
                            xAxisIndex: [0]
                        },
                        grid: {left: '7%', right: '3%', bottom: '50px', containLabel: !0},
                        // legend: {data: [_this.text.bsr, _this.text.estimated_daily_sales,_this.text.estimated_daily_price_name]},
                        xAxis: {
                            type: 'category',
                            axisLine: {onZero: false,
                                lineStyle: {
                                    color: "#e5e5e5"
                                }},
                            data: data.dates.map(function (str) {
                                return str.replace(' ', '\n');
                            }),
                            axisLabel: {color: "#8b93a6", margin: 15, rotate: 60},
                        },
                        yAxis: [{
                            name: 'BSR',
                            type: 'value',
                            inverse: true,
                            nameLocation: 'start',
                            axisLabel: {color: "#6EC952"},
                            splitLine: {lineStyle: {type: "solid", color: "#e5e9f2"}},
                            axisLine: {lineStyle: {color: "#6EC952"}}
                        }, {
                            name: 'Estimated Daily Units Sold',
                            type: 'value',
                            show: true,
                            nameLocation: 'end',
                            axisLabel: {color: "#fb8c1e"},
                            splitLine: {show: false},
                            axisLine: {lineStyle: {color: "#fb8c1e"}}
                        },{
                            name: 'Price',
                            type: 'value',
                            step: 'middle',
                            show: true,
                            position : 'left',
                            offset : 70,
                            axisLabel: {color: "#5FB0FF"},
                            splitLine: {show: false},
                            axisLine: {lineStyle: {color: "#5FB0FF"}}
                        }],
                        grid: {
                            x: 100,
                            x2: 100,
                            y: 40,
                            y2: 120,
                        },
                        series: [
                            {
                                id:'bsr',
                                name: 'BSR',
                                type: 'line',
                                step: 'middle',
                                data: data['bsrs']
                            },
                            {
                                id:'sales',
                                name: 'Estimated Daily Units Sold',
                                type: 'bar',
                                yAxisIndex: 1,
                                data: data['dailySales']
                            },
                            {
                                id:'price',
                                name: 'Price',
                                type: 'line',
                                yAxisIndex: 2,
                                data: data['dailyPrices']
                            }
                        ]
                    };
                    asinChart = echarts.init(document.getElementById("asin-sales-chart"), 'light');
                    asinChart.setOption(asinChartOptionvar);
                    asinChart.resize();
                    return false;
                }, function () {
                    layer.close(layloed);
                    searchlog({'option': btoa(JSON.stringify(optionData)), 'is_success': -1, 'result': '', 'function': '/amazon/salesestimation'});
                    return false;
                    // $that.removeClass('waiting');
                });
                return false;
            });

            $(window).resize(function () {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function () {
                    asinChart.resize();
                }, 100);
            });
        },
        initTrendsChart: function (chartDom,data,type,title) {
            var myChart = echarts.init(chartDom);
            let option;
            option = {
                title: {
                    text: title,
                    textStyle: {
                        color: '#3f80ea'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    transitionDuration:0
                },

                xAxis: {
                    data:data.date,
                    axisLine:{
                        lineStyle: {
                            color: '#cccccc'
                        }
                    }
                },
                yAxis: {
                    axisLabel: {
                        align: 'right',
                        color: '#cccccc'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show:false
                    }
                },

                series: [
                    {
                        data: data.history,
                        type: 'line',
                        color: '#3F80EA'
                    }
                ]
            };
            if(type=='google'){
                option.title.text = data.trends
                option.title.textStyle = {
                    fontSize: '14',
                    color: '#495057'
                }
                option.grid = {
                    x: 50,
                    x2: 40,
                    y: 50,
                    y2:30,
                };
                var optionG = {"backgroundColor":{"fill":"transparent"},"datalessRegionColor":"#E0E0E0","legend":"none","colorAxis":{"minValue":0,"maxValue":100,"colors":["#B2CDF9","#0058EB"]},"sizeAxis":{"minValue":0,"maxValue":100},"tooltip":{"isHtml":true,"showTitle":false,"trigger":"focus"},"displayMode":"regions","region":"world","resolution":"countries","defaultColor":"#CFCFCF"};
                var data2 = google.visualization.arrayToDataTable(data.map);
                var chart = new google.visualization.GeoChart($(chartDom).parent().next().children('.google-trends-map')[0]);
                if( $('.google-trends-box:visible .google-country-change').val()!=''){
                    optionG.region = $('.google-trends-box:visible .google-country-change').val();
                    optionG.resolution = 'provinces';
                }
                chart.draw(data2, optionG);
            }
            option && myChart.setOption(option);
        },
        deleted: function () {
            this.index();
        },
        favkey: function () {
            let searchTag = null;
            let tagList = Config.tagList;
            $('.status').editable({
                type: 'text',
                mode: 'inline',
                url: function (params) {
                    console.log(params);
                    Fast.api.ajax({
                        url: "/amazon/editFavTag",
                        type: "post",
                        data:  {newReserve: params['value'], 'reserve': params['pk']},
                    }, function (data) {
                        // $('.open-diy-con').find('button').each(function () {
                        //     if ($(this).text() == data.reserve) {
                        //         $(this).text(data.newReserve);
                        //     }
                        // })
                        return false;
                    });
                }
            });
            var  scrollFunc = function (e){
                if (checkScrollDirector()) {
                    /*if(nullFlag){
                        layer.msg('nothing~~')
                        return false;
                    }*/
                    total = $('.content-good>div').length;
                    searchFlag = false;
                    $('.loading-box-bottom').find('div').show()
                    Fast.api.ajax({
                        loading: false,
                        url: "/amazon/favkey",
                        type: "post",
                        data:  $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(),{page:++page},{'searchTag': searchTag}),
                    }, function (data) {
                        $('.loading-box-bottom').find('div').hide()
                        $('.content-good').append(data.html);
                        /*if( $('.content-good>div').length==total){
                            searchFlag = false;
                            nullFlag =true;
                        }else{
                            searchFlag = true;
                            moneyChange();
                        }*/
                        return false;
                    }, function () {
                        $('.loading-box-bottom').find('div').hide()
                    });
                    return false
                }
            }
            if (document.addEventListener) {
//webkit
                document.addEventListener('scroll', scrollFunc, false);
//firefox
                document.addEventListener('scrollFunc', scrollFunc, false);

            }else if(window.attachEvent){//IE
                document.attachEvent('scrollFunc',scrollFunc);
            }
            $(document).on('click', '.delete-diy', function () {
                let that = this
                layer.confirm('Deleting a favorite tag will also delete the product in it. If you don\'t want to delete the product, please modify the product\'s tag.', {
                    title: 'Delete',
                    btn : ['OK', 'Cancel'],
                    btn1: function() {
                        Fast.api.ajax({
                            url: "/amazon/deleteFavTag",
                            type: "post",
                            data: {reserve: $(that).data('id')}
                        }, function (data) {
                            $(that).parents('.row').remove()
                            layer.closeAll();
                        }, function () {
                        });
                    }
                });
            })

            $(document).on('click', '.edit-diy', function () {
                $(this).parents('.text-center').find('.editable-click').click()
                return false
            })
            $('.submit-search-btn').click(function () {
                $('.content-good').html('');
                $('#search_form').submit();
            })
            $('#search-top-btn').click(function () {
                $('.content-good').html('');
            });
            $('#myad_form').submit(function (){
                //save  my
                return  false;
            });
            $('#myad_reset').click(function (){
                $('#myad_form')[0].reset();
                $('#search_form')[0].reset();
            });
            Moment.locale("en");
            let start = Moment().subtract(6, "month").startOf("month");
            let end = Moment().endOf("month");
            $("#reportrange").daterangepicker({
                showDropdowns: true,
                autoApply: false,
                linkedCalendars:false,
                ranges: {
                    // "Today": [Moment(), Moment()],
                    // "Yesterday": [Moment().subtract(1, "days"), Moment().subtract(1, "days")],
                    "Last 7 Days": [Moment().subtract(6, "days"), Moment()],
                    "Last 30 Days": [Moment().subtract(29, "days"), Moment()],
                    "Last 3 Month": [Moment().subtract(3, "month").startOf("month"), Moment().endOf("month")],
                    "Last 6 Month": [Moment().subtract(6, "month").startOf("month"), Moment().endOf("month")],
                }
            }, cb);
            cb('', '');
            function cb(start, end) {
                let timeText = ''
                if (start === '' && end === '') {
                    timeText = 'Please select the date range'
                } else {
                    timeText = start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
                    $('[name=publish_date_begin]').val(start.format('X'));
                    $('[name=publish_date_end]').val(end.format('X'));
                }
                $("#reportrange span").html(timeText);
            }
            $(document).on('mouseleave', '.box-style-grep-left', function () {
                $(this).find('.fav-box').hide();
            });
            $('#search_form').submit(function () {
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/favkey",
                    type: "post",
                    data: $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(), {'searchTag': searchTag}),
                }, function (data) {
                    page=1;
                    $('.loading-box-bottom').find('div').hide()
                    $('.content-good').html(data.html);
                    if( $('.content-good>div').length==0){
                        nullFlag = true;
                        searchFlag = false;
                        showMsg();
                    }else{
                        searchFlag = true;
                        moneyChange();
                    }
                    return false;
                }, function () {
                    showMsg();
                    $('.loading-box-bottom').find('div').hide();
                    return false;
                    // $that.removeClass('waiting');
                });
                return false;
            });
            $(document).on('click', '.fill-search-criteria', function () {
                if (!isMember) {
                    layer.alert('Free version can only show 10 favorite products.', {
                        title: 'Tips',
                        btn: ['Upgrade to unlimited'],
                        btn1: function(index, layero){
                            window.open('https://www.podcs.com/price.html')
                        }
                    });
                    $('.fav-box').hide();
                    return false;
                }
                searchTag = $(this).text();
                $('#search_form').submit();
                return false
            })
            $(document).on('click', '.all-tag', function () {
                searchTag = null;
                $('#search_form').submit();
                return false
            })
            $('.collapse-btn').click(function () {
                if ($('.cut-line').hasClass('cut-line-close')) {
                    $('.cut-line').removeClass('cut-line-close')
                    $('.indication-down').hide()
                    return
                }
                $('.cut-line').addClass('cut-line-close')
                $('.indication-down').show()
            });
            $('#search_form').submit();
        },
        getinspiration: function () {
            $('#get-png').click(function () {
                let url = $('.img-src').val();
                getPngLog(url)
                if (!url || url.length === 0 || url.indexOf('https') == -1) {
                    layer.msg('Please enter the correct url', {icon: 2});
                    return false
                }
                getPng('', url);
            })
        },

        productsearch: function () {
            var popover=null;
            var myModal = new bootstrap.Modal(document.getElementById('gridSystemModal'), {
                keyboard: false
            })
            if (!isMember) {
                $('#sorting').change(function () {
                    if ($(this).val() !== '0:bsr' || $(this).val() !== '5:bsr_up_b') {
                        layer.msg('<span style="white-space: nowrap">Sorting is available in the professional version</span>')
                    }
                    $(this).val('5:bsr_up_b');
                })
            }
			
			$('#grid-btn').click(function () {
                $(this).addClass("grid-btn-active");
                $(this).removeClass("grid-btn");
                $('#list-btn-img').attr("src","/assets/img/list-btn-blue.png");
                $('#grid-btn-img').attr("src","/assets/img/grid-btn-white.png");
                var list_btn = $('#list-btn');
                list_btn.addClass("grid-btn");
                list_btn.removeClass("grid-btn-active");
                $('.content-good').attr('style','display:grid');
                $('.content-good').html("");
                $('[name="showtype"]').val('grid');
                list_btn.attr('disabled','disabled');
                $(this).attr('disabled','disabled');
                page=1;
                getData()
            })
            
            $('#list-btn').click(function () {
                $(this).addClass("grid-btn-active");
                $(this).removeClass("grid-btn");
                $('#grid-btn-img').attr("src","/assets/img/grid-btn.png");
                $('#list-btn-img').attr("src","/assets/img/list-btn.png");
                var grid_btn= $('#grid-btn');
                grid_btn.addClass("grid-btn");
                grid_btn.removeClass("grid-btn-active");
                $('.content-good').attr('style','display:flex; width:96%; margin:0 auto;');
                $('.content-good').html("");
                $('[name="showtype"]').val('list');
                grid_btn.attr('disabled','disabled');
                $(this).attr('disabled','disabled');
                page=1;
                getData()
            })
			
        	function getData(){
        		total = $('.content-good>div').length;
        		searchFlag = false;
        		$('.loading-box-bottom').find('div').show()
        		Fast.api.ajax({
        		    loading: false,
        		    url: "/amazon/productSearch",
        		    type: "post",
        		    data:  $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(),{page:1}),
        		}, function (data) {
        		    // $("input[name='trends']").val('');
        		    $('.loading-box-bottom').find('div').hide()
        		    $('.content-good').append(data.html);
        		    $('#grid-btn').removeAttr('disabled');
        		    $('#list-btn').removeAttr('disabled');
        		    // if( $('.content-good>div').length==total){
        		    if( ($('.content-good>div').length>=1000 && $('.content-good>div').length<=1120) || $('.content-good>div').length==total){
        		        searchFlag = false;
        		        nullFlag =true;
        			return false;
        		    }else{
        		        searchFlag = true;
        		        moneyChange();
        			return false;
        		    }
        		    $('#list-btn').removeAttr('disabled')
                    $('#grid-btn').removeAttr('disabled')
        		})
        		return false;
        	}
			
	        $(document).on('click','.fa-copy',function (){
				var word = $(this).parent().find('a').text()
				if(!word){
					word = $(this).parent().text()
				}
				copyWord(word.trim())
			})
			
            var  scrollFunc = function (e){
                if (checkScrollDirector()) {
                    if (!isMember) {
                        $('.upgrade-hint-box').show();
                        return false;
                    }
                    if(nullFlag){
                        layer.msg('nothing~~')
                        return false;
                    }
                    total = $('.content-good>div').length;
                    searchFlag = false;
                    $('.loading-box-bottom').find('div').show()
                    Fast.api.ajax({
                        loading: false,
                        url: "/amazon/productSearch",
                        type: "post",
                        data:  $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(),{page:++page}),
                    }, function (data) {
                        // $("input[name='trends']").val('');
                        $('.loading-box-bottom').find('div').hide()
                        $('.content-good').append(data.html);
                        // if( $('.content-good>div').length==total){
                        if( ($('.content-good>div').length>=1000 && $('.content-good>div').length<=1120) || $('.content-good>div').length==total){
                            searchFlag = false;
                            nullFlag =true;
                        }else{
                            searchFlag = true;
                            moneyChange();
                        }
                        return false;
                    }, function () {
                        $('.loading-box-bottom').find('div').hide()
                    });
                    return false
                }
            }
            if (document.addEventListener) {
//webkit
                document.addEventListener('scroll', scrollFunc, false);
//firefox
                document.addEventListener('scrollFunc', scrollFunc, false);

            }else if(window.attachEvent){//IE
                document.attachEvent('scrollFunc',scrollFunc);
            }

            Moment.locale("en");
            let start = Moment().subtract(6, "month").startOf("month");
            let end = Moment().endOf("month");

            function cb(start, end) {
                let timeText = ''
                if (start === '' && end === '') {
                    timeText = 'Please select the date range'
                } else {
                    timeText = start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
                    $('[name=publish_date_begin]').val(start.format('X'));
                    $('[name=publish_date_end]').val(end.format('X'));
                }
                $("#reportrange span").html(timeText);
            }

            function fillSearchCriteria(ele) {
                $('#myad_form').find('input[type="text"]').val('')
                $('#myad_form').find('input[type="number"]').val('')
                let optionList = $(ele).data('option')
                for (let option in optionList) {
                    if (option === 'reportrange') {
                        if (optionList[option].indexOf('days') != -1) {
                            $('#reportrange').data('daterangepicker').setStartDate(Moment().subtract(optionList[option].split('days')[0] * 1, 'days'));
                            $('#reportrange').data('daterangepicker').setEndDate(Moment());
                            cb(Moment().subtract(optionList[option].split('days')[0] * 1, "days"), Moment());
                        } else {
                            $('#reportrange').data('daterangepicker').setStartDate(Moment().subtract(optionList[option].split('month')[0] * 1, 'month'));
                            $('#reportrange').data('daterangepicker').setEndDate(Moment());
                            cb(Moment().subtract(optionList[option].split('month')[0] * 1, "month").startOf("month"), Moment().endOf("month"));
                        }
                        continue
                    }
                    if ($('[name="' + option + '"]').attr('type') === 'radio' || $('[name="' + option + '"]').attr('type') === 'checkbox') {
                        $('[value="' + optionList[option] + '"]').prop("checked", "checked");
                        continue
                    }
                    $('[name="' + option + '"]').val(optionList[option])
                }
            }

            $(document).on('click', '.fill-search-criteria-model', function () {
                fillSearchCriteria(this)
                myModal.hide()
            })

            $(document).on('click', '.delete-diy', function () {
                let that = this
                Fast.api.ajax({
                    url: "/amazon/deleteFav",
                    type: "post",
                    data: {id: $(this).data('id')}
                }, function (data) {
                    $(that).parents('.row').remove()
                    layer.closeAll();
                }, function () {
                });
            })

            $(document).on('click', '.edit-diy', function () {
                $(this).parents('.text-center').find('.editable-click').click()
                return false
            });


            var starts = Moment().subtract(6, 'days');
            var ends = Moment();

            $('#reportrange').daterangepicker({
                startDate: starts,
                endDate: ends,
                showCustomRangeLabel:false,
                ranges: {
                    'Last 7 Days': [Moment().subtract(6, 'days'), Moment()],
                    'Last 30 Days': [Moment().subtract(29, 'days'), Moment()],
                    "Last 3 Month": [Moment().subtract(3, "month").startOf("month"), Moment().endOf("month")],
                    "Last 6 Month": [Moment().subtract(6, "month").startOf("month"), Moment().endOf("month")],
                }
            }, cb);

            cb(starts, ends);

            $('#myad_reset').click(function (){
                rankSlider.setValue([parseInt(1),parseInt(5000000)]);
                $('#myad_form')[0].reset();
            });
            $('#search_form').submit(function () {
                $('.content-good').html('');
                $('.loading-box-bottom').find('div').show();
                if (!$("input[name='trends']").val()) {
                    $("input[name='trends']").val('all');
                }
                $('#list-btn').attr('disabled','disabled')
                $('#grid-btn').attr('disabled','disabled')
                nullFlag =false;
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/productSearch",
                    type: "post",
                    data: $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()),
                }, function (data) {
                    searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))), 'is_success': 1, 'result': '', 'function': '/amazon/productSearch'});
                    page=1;
                    $('.loading-box-bottom').find('div').hide()
                    $('.no-res').addClass('d-none')
                    $('.content-good').html(data.html);
                    // $('.m-auto').prepend($('.message').html());
                    //$("input[name='trends']").val('');
                    if( $('.content-good>div').length==0){
                        nullFlag = true;
                        searchFlag = false;
                        //searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))), 'is_success': -1, 'result': '', 'function': '/amazon/productSearch'});
                        // showMsg();
                        $('.no-res').removeClass('d-none')
                        $('.words').html($('#keyword-search-input').val())
                        $('.content-good').html();
                    }else{
                        searchFlag = true;
                        moneyChange();
                    }
                    $('#list-btn').removeAttr('disabled')
                    $('#grid-btn').removeAttr('disabled')
                    return false;
                }, function () {
                    //searchlog({'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))), 'is_success': -1, 'result': '', 'function': '/amazon/productSearch'});
                    // showMsg();
                    $('.loading-box-bottom').find('div').hide();
                    return false;
                    // $that.removeClass('waiting');
                });
                return false;
            });
            $('#myad_form').submit(function (){
                //save  my
                return  false;
            });
            $('#listRows').val(24);
            // Math.floor($('.content-good').width() / 250) * 3

            $("#myad_form").data("validator-options", {
                invalid: function (form, errors) {
                    $.each(errors, function (i, j) {
                        Layer.msg(j);
                    });
                }
            });
            $('#save-filter').click(function () {
                layer.prompt({
                    title:__('Please Input Title'),
                    btn:['Save','Cancel'],
                    content: '<input type="text" class="layui-layer-input" placeholder="Input length is less than 50">',
                    btn2:function(index){

                    }
                },function(val,index){
                    if(val.length<1||val.length>50){
                        layer.msg('please input the right title')
                        return  false;
                    }
                    let option = $.extend($('#myad_form').serializeJson(), $('#search_form').serializeJson());
                    Fast.api.ajax({
                        url: "/amazon/addFav",
                        type: "post",
                        data: {formData: option, title: val, marketplace: option['marketplace']}
                    }, function (data) {
                        let marketplace = "<div>ALL</div>"
                        switch (option['marketplace']) {
                            case '1:com':
                                marketplace = '<div class="flag-seller flag-us"></div>'
                                break;
                            case '3:de':
                                marketplace = '<div class="flag-seller flag-de"></div>'
                                break;
                            case '4:fr':
                                marketplace = '<div class="flag-seller flag-fr"></div>'
                                break;
                            case '5:it':
                                marketplace = '<div class="flag-seller flag-it"></div>'
                                break;
                            case '6:es':
                                marketplace = '<div class="flag-seller flag-es"></div>'
                                break;
                            case '2:co_uk':
                                marketplace = '<div class="flag-seller flag-uk"></div>'
                                break;
                        }
                        let index_len = $('.div-content-box').find('.text-center').length
                        if (index_len < 1) {
                            $('.div-content-box').html('')
                        }

                        $('.div-content-box').append('' +
                            '                       <div class="row text-center">\n' +
                            '                                <div class="col-md-2 p-2"><td>' + (index_len + 1) + '</td></div>\n' +
                            '                                <div class="col-md-2 p-2"><td>' + marketplace + '</td></div>\n' +
                            '                                <div class="col-md-2 p-2"><td><a href="#" class="status editable editable-click" data-pk="' + data['id'] + '" data-name="title">' + val + '</a></td></div>\n' +
                            '                                <div class="col-md-3 p-2"><td>Now</td></div>\n' +
                            '                                <div class="col-md-3 p-2"><td><i data-id="' + data['id'] + '" class="align-middle me-2 far fa-fw fa-edit edit-diy"></i><i data-id="' + data['id'] + '" class="align-middle me-2 far fa-fw fa-trash-alt delete-diy"></i><button data-option=\'' + JSON.stringify(option) + '\' class="fill-search-criteria-model btn-warning btn form-select-sm">apply</button></td></div>\n' +
                            '                            </div>'
                        )
                        $('.status').editable({
                            type: 'text',
                            mode: 'inline',
                            url: function (params) {
                                console.log(params);
                                Fast.api.ajax({
                                    url: "/amazon/editFav",
                                    type: "post",
                                    data:  {title: params['value'], 'id': params['pk']},
                                }, function (data) {
                                    return false;
                                });
                            }
                        });
                        layer.closeAll();
                    }, function () {
                    });
                })
                return false;
            });

            $('.collapse-btn').click(function () {
                if ($('.cut-line').hasClass('cut-line-close')) {
                    $('.cut-line').removeClass('cut-line-close')
                    $('.indication-down').hide()
                    return
                }
                $('.cut-line').addClass('cut-line-close')
                $('.indication-down').show()
            });
            $('.status').editable({
                type: 'text',
                mode: 'inline',
                url: function (params) {
                    console.log(params);
                    Fast.api.ajax({
                        url: "/amazon/editFav",
                        type: "post",
                        data: {title: params['value'], 'id': params['pk']},
                    }, function (data) {
                        return false;
                    });
                }
            });
            $('#keyword-search-input').val(Config.initkeyword)
            // $('#is_not').change(function () {
            //     $('#search_form').submit();
            // })
            $('.all-trends').click(function (){
                $("input[name='trends']").val('all');
                $("input[name='new100']").val('');
                $('#search_form').submit();
            });
            $('.trends-up').click(function (){
                $(".all-trends").removeClass("trends");
                $("input[name='trends']").val('up');
                $("input[name='new100']").val('');
                $('#search_form').submit();
            });
            $('.trends-down').click(function (){
                $(".all-trends").removeClass("trends");
                $("input[name='trends']").val('down');
                $("input[name='new100']").val('');
                $('#search_form').submit();
            });
            $('.trends-stable').click(function (){
                $(".all-trends").removeClass("trends");
                $("input[name='trends']").val('stable');
                $("input[name='new100']").val('');
                $('#search_form').submit();
            });
            $('.newcomer').click(function (){
                $(".all-trends").removeClass("trends");
                $("input[name='trends']").val('newcomer');
                $(".dropdown-menu").removeClass('show');
                $(".dropdown-toggle").removeClass('show');
                $("input[name='new100']").val('');
                $('#search_form').submit();
            });
            $('.new100').click(function (){
                $(".all-trends").removeClass("trends");
                $("input[name='trends']").val('newcomer');
                $("input[name='new100']").val('newcomer');
                $(".dropdown-menu").removeClass('show');
                $(".dropdown-toggle").removeClass('show');
                $('#search_form').submit();
            });
            
            $('.submit-search-btn').click(function () {
                //$("input[name='trends']").val('');
                $('#search_form').submit();
            })
            $('#search_form').submit();
        },
        sellertrends: function () {
            this.index();
        },
        brand: function () {
            let country_codelet = {
                com: "https://www.amazon.com/s?rh=n%3A7141123011%2Cp_4%3A",
                co_uk:"https://www.amazon.co.uk/s?rh=n%3A83450031%2Cp_4%3A",
                de: "https://www.amazon.de/s?rh=n%3A77028031%2Cp_4%3A",
                kr: "https://www.amazon.fr/s?rh=n%3A340855031%2Cp_4%3A",
                it: "https://www.amazon.it/s?rh=n%3A2844433031%2Cp_4%3A",
                es: "https://www.amazon.es/s?rh=n%3A2846220031%2Cp_4%3A",
                jp: "https://www.amazon.co.jp/s?rh=n%3A352484011%2Cp_4%3A",
            };
            function initSwiper(e) {
                let rowNum = Math.floor($('.mySwiper').eq(0).width() / 300);
                new Swiper(e.find('.mySwiper')[0], {
                    slidesPerView: rowNum,
                    loop: true,
                    preventClicks : false,
                    watchSlidesProgress:true,
                    navigation: {
                        nextEl: '.swiper-button-next1',
                        prevEl: '.swiper-button-prev1',
                    },
                });
                var popoverTriggerList = Array.prototype.slice.call(e.find('[data-bs-toggle="popover"]'))
                var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                    return new bootstrap.Popover(popoverTriggerEl, {
                        html: true,
                        trigger: 'focus'
                    })
                })
            }
            let page = 1;
            let listRows = 3;
            function getBrand() {
                $('.loading-box-bottom').find('div').show();
                let data = {page:page, list_rows: listRows};
                if ($('#keyword-search-input').val()) {
                    data['keyword'] = $('#keyword-search-input').val();
                }
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/brand",
                    type: "get",
                    data: data,
                }, function (data) {
                    $('.loading-box-bottom').find('div').hide();
                    let str = '';
                    for (let i =0; i < data.data.length; i++) {
                        str += '<div class="card-body card"><div class="d-flex justify-content-between"><div class="d-flex">\n' +
                            '                            <h4 class="brand-title waiting-load">' + data.data[i]['keyword'] + '</h4>&nbsp;&nbsp;\n' +
                    '                                           <a tabindex="0" class="country-link" data-bs-toggle="popover" title="Open in Amazon" data-bs-content="loading">\n' +
                            '                                        <svg class="icon-amazon" t="1662096001841" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2473" width="16" height="16"><path d="M886.285714 843.428571q8.571429-3.428571 14.857143-1.714285t6.285714 10-8.571428 19.142857q-7.428571 9.142857-25.142857 24.857143t-54.571429 38.857143-80.571428 42.285714-107.428572 33.142857T500 1024q-68 0-136-17.714286t-119.428571-43.714285-98.571429-59.428572-75.714286-60-48-50q-4.571429-5.142857-5.714285-9.428571t0.571428-6.857143 4.571429-4 6.571428-1.142857T34.857143 774.285714q109.714286 66.857143 171.428571 94.857143 222.285714 100.571429 456.571429 51.428572 108.571429-22.857143 223.428571-77.142858z m118.285715-65.714285q6.285714 9.142857 1.428571 39.714285T989.714286 876q-19.428571 47.428571-48.571429 70.857143-9.714286 8-14.857143 5.142857t0-13.714286q12-25.714286 25.428572-69.428571t3.714285-56.285714q-2.857143-4-8.857142-6.571429t-15.428572-3.428571-16.857143-1.428572-20 0-18 1.142857-17.714285 1.714286-12.857143 1.142857q-3.428571 0.571429-7.428572 0.857143t-6.285714 0.571429-4.857143 0.571428-4 0.285714h-5.714286l-1.714285-0.285714-1.142857-0.857143-0.857143-1.714285q-3.428571-9.142857 26.857143-22.857143t58.857142-17.142857q26.285714-4 61.714286-0.571429t43.428572 13.714286z m-225.142858-253.142857q0 17.714286 7.714286 36.571428t18.285714 33.142857 21.428572 26.285715 18.857143 18.285714l7.428571 6.285714-129.714286 128q-22.857143-21.142857-45.142857-43.142857t-33.142857-33.428571l-10.857143-11.428572q-6.285714-6.285714-14.285714-18.857143-21.714286 33.714286-55.714286 58.571429T491.428571 761.142857t-80 13.142857-78.571428-12-67.142857-37.428571-47.428572-64.571429T200.571429 567.428571q0-48 16-88t41.142857-66.571428 60.857143-47.428572 70-32.571428T462.857143 313.142857t68.285714-10.571428 56.857143-3.714286V226.285714q0-37.142857-12-55.428571-19.428571-30.285714-69.142857-30.285714-3.428571 0-9.428572 0.571428T474.285714 148t-32 16.857143-32 34-27.428571 54.857143l-168-15.428572q0-34.285714 12.571428-68t38.285715-64.571428 61.714285-54.285715 86.571429-37.428571T522.857143 0q57.142857 0 103.428571 14.285714t74 35.142857 46.285715 47.428572 25.714285 49.142857T779.428571 188v336.571429z m-384 12q0 49.142857 40 76 37.714286 25.142857 79.428572 12.571428 48-14.285714 65.142857-70.285714 8-25.714286 8-57.714286V404.571429q-33.714286 1.142857-63.428571 6.857142t-60.857143 19.142858-49.714286 40.571428T395.428571 536.571429z" p-id="2474" fill="#3E7BE0"></path></svg>&nbsp;\n' +
                            '                                   </a>' +
                            '                           </div>\n' +
                            '                                <div>\n' +
                            '                                    <a target="_blank" href="/amazon/index?initBrand=' + data.data[i]['keyword'] + '"><strong><h4 class="btn-link">More</h4></strong></a>\n' +
                            '                                </div>\n' +
                            '                            </div>' +
                            '                            <div class="swiper py-3 mySwiper ">\n' +
                            '                                <div class="swiper-wrapper d-flex justify-content-center">\n' +
                            '                                    <div class="spinner-border text-primary me-2" role="status">\n' +
                            '                                        <span class="sr-only"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">正在加载...</font></font></span>\n' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                                <div class="swiper-button-prev1"><svg t="1662095561417" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2226" width="32" height="32"><path d="M801.92 768c12.224 0 24.576-4.672 33.92-14.08 18.752-18.752 18.752-49.152 0-67.904l-222.08-222.08 222.08-222.08c18.752-18.752 18.752-49.152 0-67.904s-49.152-18.752-67.904 0l-256 256C493.248 448.832 493.248 479.168 512 497.92l256 256C777.344 763.328 789.632 768 801.92 768z" p-id="2227" fill="#495057"></path><path d="M481.92 768c12.288 0 24.576-4.672 33.92-14.08 18.752-18.752 18.752-49.152 0-67.904l-222.08-222.08 222.08-222.08c18.752-18.752 18.752-49.152 0-67.904S466.752 155.328 448 174.08l-256 256C173.248 448.832 173.248 479.168 192 497.92l256 256C457.344 763.328 469.632 768 481.92 768z" p-id="2228" fill="#495057"></path></svg></div>\n' +
                            '                                <div class="swiper-button-next1"><svg t="1662095521096" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1933" width="32" height="32"><path d="M240 800c-12.288 0-24.576-4.672-33.92-14.08-18.752-18.752-18.752-49.152 0-67.904l222.08-222.08L206.08 273.92c-18.752-18.752-18.752-49.152 0-67.904s49.152-18.752 67.904 0l256 256c18.752 18.752 18.752 49.152 0 67.904l-256 256C264.576 795.328 252.288 800 240 800z" p-id="1934" fill="#495057"></path><path d="M560 800c-12.288 0-24.576-4.672-33.92-14.08-18.752-18.752-18.752-49.152 0-67.904l222.08-222.08L526.08 273.92c-18.752-18.752-18.752-49.152 0-67.904s49.152-18.752 67.904 0l256 256c18.752 18.752 18.752 49.152 0 67.904l-256 256C584.576 795.328 572.288 800 560 800z" p-id="1935" fill="#495057"></path></svg></div>\n' +
                            '                            </div>\n' +
                            '                        </div>';
                    }
                    $('.brand-box').append(str);
                    if( $('.brand-box>div').length==0){
                        searchFlag = false;
                        // showMsg();
                        $('.no-res').removeClass('d-none')
                        $('.words').html($('#keyword-search-input').val())
                        $('.brand-box').html()
                    }
                    getProduct()
                    // console.log(data)
                    return false;
                }, function (res) {
                    $('.loading-box-bottom').find('div').hide();
                    // console.log(res)
                    return false
                });
            }
            function getProduct() {
                let data = {};
                data['marketplace'] = $('input[name="marketplace"]:checked').val();
                data['product'] = $('[name="product"]').val();
                data['sorting'] = $('[name="sorting"]').val();
                $('.waiting-load').each(function () {
                    let that = this;
                    Object.assign(data, {brand: $(that).text().trim()});
                    Fast.api.ajax({
                        loading: false,
                        url: "/amazon/getBrandProduct",
                        type: "post",
                        data: data,
                    }, function (data) {
                        if (data['total']) {
                            $(that).parents('.card-body').find('.swiper-wrapper').removeClass('d-flex')
                            $(that).parents('.card-body').find('.swiper-wrapper').removeClass('justify-content-center')
                            $(that).removeClass('waiting-load')
                            $(that).parents('.card-body').find('.swiper-wrapper').html(data.html);
                            $(that).parents('.card-body').find('.bottom-slide-box').addClass('swiper-slide');
                            $(that).parents('.card-body').find('.bottom-slide-box').addClass('swiper-no-swiping');
                            $(that).parents('.card-body').find('.bottom-slide-box').attr('style', '');
                            let country_str = "";
                            for (item in data.brandCountry){
                                country_str += '<a class="country-link-item" target="_blank" href="' + country_codelet[item] + $(that).text().trim() + '">amazon.' + item + '</a>';
                            }
                            $(that).parents('.card-body').find('.country-link').attr('data-bs-content', country_str);
                            initSwiper($(that).parents('.card-body'))
                        } else {
                            $(that).removeClass('waiting-load')
                            $(that).parents('.card-body').find('.swiper-wrapper').html('<div class="text-center no-data">\n' +
                                '                                        <h4><svg style="margin-top: -3px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle align-middle me-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>No data found</h4>\n' +
                                '                                        Maybe the brand was misspelled. Or the brand has no<br>\n' +
                                '                                        products in this market. Please reduce the keywords<br>\n' +
                                '                                        to core keywords or replace them with other keywords.\n' +
                                '                                    </div>');
                        }
                        searchFlag = true;
                        return false;
                    }, function () {
                        return false;
                        // $that.removeClass('waiting');
                    });
                })
            }
            $('form').submit(function () {
                $('.brand-box').html('');
                page = 1
                getBrand();
                return false
            })
            getBrand();
            var  scrollFunc = function (e){
                if (checkScrollDirector() && $('.waiting-load').length < 1) {
                    if(nullFlag){
                        layer.msg('nothing~~')
                        return false;
                    }
                    total = $('.brand-box>div').length;
                    searchFlag = false;
                    $('.loading-box-bottom').find('div').show()
                    page++;
                    getBrand();
                    return false
                }
            }
            if (document.addEventListener) {
//webkit
                document.addEventListener('scroll', scrollFunc, false);
//firefox
                document.addEventListener('scrollFunc', scrollFunc, false);

            }else if(window.attachEvent){//IE
                document.attachEvent('scrollFunc',scrollFunc);
            }
            $(document).ready(function () {
                $('.form-submit').attr('type', 'submit')
            })
        },
        archive: function () {

			$('#grid-btn').click(function () {
                $(this).addClass("grid-btn-active");
                $(this).removeClass("grid-btn");
                $('#list-btn-img').attr("src","/assets/img/list-btn-blue.png");
                $('#grid-btn-img').attr("src","/assets/img/grid-btn-white.png");
                var list_btn = $('#list-btn');
                list_btn.addClass("grid-btn");
                list_btn.removeClass("grid-btn-active");
                $('.content-good').attr('style','display:grid');
                $('.content-good').html("");
                $('[name="showtype"]').val('grid');
                list_btn.attr('disabled','disabled');
                $(this).attr('disabled','disabled');
                page=1;
                getData()
            })
            
            $('#list-btn').click(function () {
                $(this).addClass("grid-btn-active");
                $(this).removeClass("grid-btn");
                $('#grid-btn-img').attr("src","/assets/img/grid-btn.png");
                $('#list-btn-img').attr("src","/assets/img/list-btn.png");
                var grid_btn= $('#grid-btn');
                grid_btn.addClass("grid-btn");
                grid_btn.removeClass("grid-btn-active");
                $('.content-good').attr('style','display:flex; width:96%; margin:0 auto;');
                $('.content-good').html("");
                $('[name="showtype"]').val('list');
                grid_btn.attr('disabled','disabled');
                $(this).attr('disabled','disabled');
                page=1;
                getData()
            })
            
        	function getData(){
        		total = $('.content-good>div').length;
        		searchFlag = false;
        		$('.loading-box-bottom').find('div').show()
        		Fast.api.ajax({
        		    loading: false,
        		    url: "/amazon/archive",
        		    type: "post",
        		    data: $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(), {page: 1}),
        		}, function (data) {
        		    $('.loading-box-bottom').find('div').hide()
        		    $('.content-good').append(data.html);
            		    $('#grid-btn').removeAttr('disabled');
            		    $('#list-btn').removeAttr('disabled');
        		    // if( $('.content-good>div').length==total){
        		    if (($('.content-good>div').length >= 1000 && $('.content-good>div').length <= 1120) || $('.content-good>div').length == total) {
        		        searchFlag = false;
        		        nullFlag = true;
        				return false;
        		    } else {
        		        searchFlag = true;
        		        moneyChange();
        				return false;
        		    }
        		    $('#list-btn').removeAttr('disabled')
                    $('#grid-btn').removeAttr('disabled')
        		})
        		return false;
        	}
			
	        $(document).on('click','.fa-copy',function (){
				var word = $(this).parent().find('a').text()
				if(!word){
					word = $(this).parent().text()
				}
				copyWord(word.trim())
			})
			
            var scrollFunc = function (e) {
                if (checkScrollDirector()) {
                    if (!isMember) {
                        $('.upgrade-hint-box').show();
                        return false;
                    }
                    if (nullFlag) {
                        layer.msg('nothing~~')
                        return false;
                    }
                    total = $('.content-good>div').length;
                    searchFlag = false;
                    $('.loading-box-bottom').find('div').show()
                    Fast.api.ajax({
                        loading: false,
                        url: "/amazon/archive",
                        type: "post",
                        data: $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson(), {page: ++page}),
                    }, function (data) {
                        $('.loading-box-bottom').find('div').hide()
                        $('.content-good').append(data.html);
                        // if( $('.content-good>div').length==total){
                        if (($('.content-good>div').length >= 1000 && $('.content-good>div').length <= 1120) || $('.content-good>div').length == total) {
                            searchFlag = false;
                            nullFlag = true;
                        } else {
                            searchFlag = true;
                            moneyChange();
                        }
                        return false;
                    }, function () {
                        $('.loading-box-bottom').find('div').hide()
                    });
                    return false
                }
            }
            if (document.addEventListener) {
//webkit
                document.addEventListener('scroll', scrollFunc, false);
//firefox
                document.addEventListener('scrollFunc', scrollFunc, false);

            } else if (window.attachEvent) {//IE
                document.attachEvent('scrollFunc', scrollFunc);
            }

            Moment.locale("en");
            var start = Moment().subtract(6, 'days');
            var end = Moment();
            $("#reportranges").daterangepicker({
                showDropdowns: true,
                autoApply: false,
                linkedCalendars:false,
                startDate: start,
                endDate: end,
                maxDate: Moment(),
                "maxSpan": {
                    "days": 6
                },
                "minDate": "05/01/18",
            }, cb);
            cb(start, end);
            function cb(start, end) {
                let timeText = ''
                if (start === '' && end === '') {
                    timeText = 'Please select the date range'
                } else {
                    if ((end.format('X') - start.format('X')) < 518400 ) {
                        layer.alert('Please reselect a time period of at least 7 days.', {
                            title: 'Tips',
                            btn: ['OK'],
                        });
                        return false
                    }
                    timeText = start.format("MMM D, YYYY") + " - " + end.format("MMM D, YYYY")
                    $('[name=publish_date_begin]').val(start.format('X'));
                    $('[name=publish_date_end]').val(end.format('X'));
                }
                $("#reportranges span").html(timeText);
            }

            $('#search_form').submit(function () {
                $('.content-good').html('');
                $('.loading-box-bottom').find('div').show();
                $('#list-btn').attr('disabled','disabled')
                $('#grid-btn').attr('disabled','disabled')
                nullFlag = false;
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/archive",
                    type: "post",
                    data: $.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()),
                }, function (data) {
                    searchlog({
                        'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))),
                        'is_success': 1,
                        'result': '',
                        'function': '/amazon/archive'
                    });
                    page = 1;
                    $('.loading-box-bottom').find('div').hide()
                    $('.content-good').html(data.html);
                    // $('.m-auto').prepend($('.message').html());
                    //$("input[name='trends']").val('');
                    if ($('.content-good>div').length == 0) {
                        nullFlag = true;
                        searchFlag = false;
                        searchlog({
                            'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))),
                            'is_success': -1,
                            'result': '',
                            'function': '/amazon/archive'
                        });
                        showAchiveMsg();
                    } else {
                        searchFlag = true;
                        moneyChange();
                    }
                    $('#list-btn').removeAttr('disabled')
                    $('#grid-btn').removeAttr('disabled')
                    return false;
                }, function () {
                    searchlog({
                        'option': btoa(JSON.stringify($.extend($('#search_form').serializeJson(), $('#myad_form').serializeJson()))),
                        'is_success': -1,
                        'result': '',
                        'function': '/amazon/archive'
                    });
                    showAchiveMsg();
                    $('.loading-box-bottom').find('div').hide();
                    return false;
                    // $that.removeClass('waiting');
                });
                return false;
            });
            $('#search_form').submit();
        },
        searchtermsrank: function () {

            var layloed = null
            Moment.locale("en");
            Template.defaults.debug=true
            Template.defaults.openTag = "{{#"
            var initTrendsChart =  this.initTrendsChart;

            $('.tools_search_form').submit(function () {
                ajax()
                return false;
            });

            $('.dropdown-item').click(function () {
                $('#' + $(this).parent().attr('aria-labelledby')).find('.country-text').text($(this).text());
                $('#' + $(this).parent().attr('aria-labelledby')).find('i').attr('class', $(this).find('i').attr('class'));
                $(this).parent().parent().find('.option-input').val($(this).data('option'));
                $(this).parents('.diy-dropdown-menu').hide();
                ajax();
            });

            function ajax(){
                var keywords = $("#keywords").val()
                /*if (keywords.length == 0) {
                    layer.msg('Please enter keywords');
                    return false;
                }*/
                var country = $("#country").val()
                var range   = $("#range_val").val()
                var rank    = $("#rank_val").val()
                var page    = $(".pagination .active").text().trim();
                var pagenum = $("#pagenum").val();
                
                // console.log('page',page);
                // page = page > 1 ? page : 1;
                // console.log('page1',page);
                page = 1;
                $('.content-box').show();
                layloed = layer.open({
                    type: 3,
                    skin: 'layer-load-box-div',
                    shade: 0,
                    content: '<img width="200" height="200" src="/assets/img/loading1.gif" alt="">'
                });
                Fast.api.ajax({
                    loading: false,
                    url: "/amazon/SearchTermsRank",
                    type: "post",
                    data: {'keyword': keywords, 'country': country, 'range':range, 'rank':rank, 'page':page,'pagenum':pagenum} 
                }, function (data) {
                    layer.close(layloed)
                    if (data.data.length == 0) {
                        showMsg()
                        return false
                    }
                    $('.tm-content').show();
                    $('#trade_con').html(Template("tradetpl", {list:data.data,moment:Moment}));
                    $('#page-con').html(data.pageModel);
                    $('#updatetime').html(data.updatetime);
                    return false
                }, function () {
                    layer.close(layloed)
                    showMsg()
                    return false
                })
                return false;
            
            }

            $(document).on('click', '.copy', function () {
                let copyText = $(this).parents('.line').find('.title').text();
                copyWord(copyText)
            });

            $(document).on('click','.show-tending-start',function () {
                // $('#isDark').toggle();
                if (!$(this).data('id') || $(this).data('id') === 'undefined') {
                    return layer.msg('This service is not available for the time being')
                }
                var elemSHow = $('[data-index=' + $(that).parents('tr').attr('data-index') + ']').find('.rating-box');
                if ($(elemSHow).data('show')) {
                    elemSHow.toggle();
                } else {
                    var that = this;
                    var country = $('#country').val()
                    if (country == 'usa') {
                        country = 'us';
                    }
                    var keyword = $(that).data('trend');
                    Fast.api.ajax({
                        url: "/amazon/getMocigf",
                        type: "post",
                        data: {keyword: keyword, 'country': country}
                    }, function (json) {
                        console.log(json);
                        var keywordId = '';
                        if (json.list.length > 0) {
                            for(let i in json.list){
                                if (json.list[i].phrase == keyword) {
                                   keywordId = json.list[i].keywordid;
                                   break
                                }
                            }
                            if (keywordId === undefined || keywordId == '' ) {
                                return false
                            }

                            if (!keywordId) {
                                return false
                            }
                            Fast.api.ajax({
                                url: "/amazon/trenddetail",
                                type: "post",
                                data: {keyword: $(that).data('trend'), 'country': country, 'keywordId': keywordId, 'searchTerm': $(that).data('trend')}
                            }, function (data) {
                                elemSHow.data('show','show');
                                var dataT = data.history.reverse(),dataList = [];
                                dataT.push(data.volume);
                                var starDate = Moment(data.lastSeen+'');
                                dataList.push(starDate.format('MM-YYYY'))
                                for (var i = 0; i < dataT.length-1; i++) {
                                    dataList.push(starDate.subtract(1,'months').format('MM-YYYY'));
                                }
                                var dom = $('[data-index=' + $(that).parents('tr').attr('data-index') + ']');
                                var charts = $('[data-index=' + $(that).parents('tr').attr('data-index') + ']').find('.rating-box');
                                if ($(window).height() - dom.height() -[dom.offset().top-$(document).scrollTop()] < charts.height()) {
                                    var top = dom.offset().top - charts.height();
                                    charts.css("top",top+"px");
                                }
                                initTrendsChart(charts[0], {history:dataT,date:dataList.reverse()},'','Search Trends')
                                charts.toggle()
                                charts.prepend('<svg style="position:absolute;cursor:pointer;right: 1rem;z-index: 100;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-trend-btn feather-x align-middle me-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>')
                            })
                        }else{
                            Toastr.error("no data");
                        }
                        return false;
                    })
                }
                return false;
            });
            $(document).on('click', '.close-trend-btn', function () {
                $('[data-index=' + $(this).parents('tr').attr('data-index') + ']').find('.rating-box').toggle()
            });


            $("#pagenum").change(function (){
                var page_zf;
                var now_url = window.location.href;
                now_url.indexOf("?")>0?page_zf="&":page_zf="?";
                if (now_url.indexOf("pagenum=")>0){
                    var page_now_num = getQueryVariable('form_pagenum');
                    //console.log(page_data);
                    now_url = now_url.replace('form_pagenum='+page_now_num,'form_pagenum='+$("#pagenum").val());
                    page_zf=""
                }else{
                    page_zf+="form_pagenum="+$("#pagenum").val();
                }
                document.location.href = now_url+page_zf;
            });


            function getQueryVariable(variable)
            {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            }


            return false;
        }
    }
    return Controller;
});