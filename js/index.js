var gActionType = "restaurant";
var gCountyCode = "008";
var login = {
    chcek: false,
    user: {
        "lumi": {
            "id": "001",
            "pwd": "qaz123",
            "mail": "lumi@gmail.com",
            "check": false
        }
    }
};




$(document).ready(function() {
    // $(window).resize(function() {
    //     const sw = $(window).width();
    //     if (sw <= 820) {
    //         $("#modalActionCardBox").appendTo("#modalHeaderBox");
    //         // $("#modalActionCardBox").detach().after('#modalHeaderBox');
    //     }
    // });

    const showPlaceDataList = $("#showPlaceDataList");
    const showActionDataList = $("#showActionDataList");

    // Default Display
    showPlaceDataList.html(combineDataList());
    showActionDataList.html(combineActionList());

    $(".cuz-action-btn-box").on("click", function() {
        let activeAction = $(".cuz-action-btn-box").siblings().children(".cuz-bg-color-secondary-green");
        activeAction.removeClass("cuz-bg-color-secondary-green");
        activeAction.children("img").attr("src", "./img/btn-" + gActionType + "-fill.png");
        activeAction.next(".cuz-color-secondary-green").removeClass("cuz-color-secondary-green")

        gActionType = $(this).attr("id");
        showPlaceDataList.html(combineDataList());

        $(this).children(".cuz-action-btn-circle").addClass("cuz-bg-color-secondary-green");
        $(this).find("img").attr("src", "./img/btn-" + gActionType + ".png");
        $(this).children(".cuz-btn-text").addClass("cuz-color-secondary-green");

        $('.cuz-card-box .cuz-card-bookmark').on('click', function(e) {
            e.stopPropagation();
        });
    });

    $('.cuz-card-bookmark').on('click', function(event) {
        event.stopPropagation();
    });

    // ---------------------- d3 js Start ---------------------- //


    // svg init
    const width = 300;
    const height = 500;

    const svg = d3.select("#twMap");
    const mapCityName = d3.select("#mapCityName");
    const mapCityEngName = d3.select("#mapCityEngName");

    const projection = d3.geoMercator()
        .center([121, 24])
        .scale(7000)
        .translate([width / 2, height / 2.5])
    const path = d3.geoPath()
        .projection(projection);

    // load data and append
    d3.json("./js/d3/city.json").then(function(data) {
            svg
                .append("g")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append('g')
                .attr("id", function(d) {
                    return "g" + d.properties.COUNTYCODE
                })
                .append("path")
                .attr("id", function(d) {
                    return "city" + d.properties.COUNTYCODE
                })
                .attr("d", path)
                .attr("class", function(d) {
                    if (d.properties.COUNTYCODE == gCountyCode) {
                        return "cuz-city-path cuz-city-path-active";
                    } else {
                        return "cuz-city-path";
                    }
                })
                .on("click", function(e, d) {
                    mapCityName.html(d.properties.COUNTYNAME);
                    mapCityEngName.html(d.properties.COUNTYENG);

                    let activeCity = $('.cuz-city-path-active');
                    if (activeCity) {
                        activeCity.removeClass('cuz-city-path-active');
                    }
                    $(this).addClass('cuz-city-path-active');

                    gCountyCode = d.properties.COUNTYCODE;
                    showPlaceDataList.html(combineDataList());

                    $('.cuz-card-bookmark').on('click', function(event) {
                        event.stopPropagation();
                    });

                })
                .on("mouseover", function(e, d) {
                    let centroid = path.centroid(d);
                    svg
                        .append("text")
                        .text(d.properties.COUNTYNAME)
                        .attr("class", "h5 cuz-cityname-mouseover")
                        .attr("transform", "translate(" + centroid + ")");
                })
                .on("mouseout", function() {
                    d3.select(".cuz-cityname-mouseover").remove();
                });
        })
        // ---------------------- d3 js End ---------------------- //


});



// ---------------------- 登入註冊 Modal 相關 Start ---------------------- //

// 顯示登入畫面
function showLoginModal() {
    $("#loginModal").modal('show');
}

// 取消登入
function disLogin() {
    $("#loginAccount").val("");
    $("#loginPasswd").val("");
    $("#loginModal").modal('hide');
}

// 顯示註冊畫面（第一步）
function showSignUp() {
    $("#loginBlock").addClass("cuz-opacity-none");
    setTimeout(function() {
        $("#loginBlock").addClass("d-none");
        $("#signUpBlock").removeClass("d-none");
        $("#signUpBlock").addClass("cuz-opacity-display");

    }, 500);
}
// 取消註冊
function disSignUp() {
    $("#loginAccount").val("");
    $("#loginPasswd").val("");
    $("#email").val("");
    $("#passwd").val("");
    $("#nickName").val("");
    $("input[name=havePet][value=1]").prop("checked", true);
    $("#checkboxNews").prop("checked", true);
    $("#checkboxAgree").prop("checked", true);
    $("#loginModal").modal('hide');
    setTimeout(function() {
        $("#loginBlock").removeClass("cuz-opacity-none");
        $("#loginBlock").removeClass("d-none");
        $("#signUpBlock").addClass("d-none");
        $("#signUpBlock").removeClass("cuz-opacity-display");
    }, 1000);
    jQuery("#NodesToMove").detach().appendTo('#DestinationContainerNode')
}

// 顯示註冊第二步
function showSignUpNext() {
    if ($("#stepSecondLine").hasClass("cuz-login-modal-step-line-process-back")) {
        $("#stepSecondLine").removeClass("cuz-login-modal-step-line-process-back")
    }
    if ($("#stepSecondCircle").hasClass("cuz-login-modal-step-circle-process-back")) {
        $("#stepSecondCircle").removeClass("cuz-login-modal-step-circle-process-back")
    }
    $("#stepSecondCircle").addClass("cuz-login-modal-step-circle-process");
    $("#stepSecondLine").removeClass("d-none");
    $("#stepSecondLine").addClass("cuz-login-modal-step-line-process");

    $("#stepFirstBlock").addClass("cuz-opacity-none");
    setTimeout(function() {
        $("#stepFirstBlock").addClass("d-none");
        $("#stepSecondBlock").removeClass("d-none");
        $("#stepSecondBlock").addClass("cuz-opacity-display");

    }, 500);
}

// 顯示註冊上一步（第一步）
function showSignUpBack() {
    $("#stepSecondLine").removeClass("cuz-login-modal-step-line-process");
    $("#stepSecondLine").addClass("cuz-login-modal-step-line-process-back");
    $("#stepSecondCircle").removeClass("cuz-login-modal-step-circle-process");
    $("#stepSecondCircle").addClass("cuz-login-modal-step-circle-process-back");

    setTimeout(function() {
        $("#stepFirstBlock").removeClass("cuz-opacity-none");
        $("#stepFirstBlock").removeClass("d-none");
        $("#stepFirstBlock").addClass("cuz-opacity-display");

        $("#stepSecondBlock").addClass("d-none");
        $("#stepSecondBlock").removeClass("cuz-opacity-display");
    }, 500);
}

// 顯示註冊第三步
function showSignUpEnd() {
    $("#stepEndCircle").addClass("cuz-login-modal-step-circle-process");
    $("#stepEndLine").removeClass("d-none");
    $("#stepEndLine").addClass("cuz-login-modal-step-line-process");

    $("#stepSecondBlock").addClass("cuz-opacity-none");
    setTimeout(function() {
        $("#stepSecondBlock").addClass("d-none");
        $("#stepEndBlock").removeClass("d-none");
        $("#stepEndBlock").addClass("cuz-opacity-display");

    }, 150);
    let id = (Object.keys(login.user).length + 1).toString().padStart(3, '0');
    login.user[$("#nickName").val()] = {
        "id": id,
        "pwd": $("#passwd").val(),
        "mail": $("#email").val(),
        "check": true
    };
    login.chcek = true;

    setTimeout(function() {
        $("#loginModal").modal('hide');
        if (typeof($("#headerLogout").attr("id")) == 'undefined') {
            $("#headerLogin").remove();
            $("#navTitle").after(combineAfterLoginHeaderBtn($("#nickName").val()));
        }
    }, 3000);



}


// 回首頁
function backHome() {
    $("#loginModal").modal('hide');
    if (typeof($("#headerLogout").attr("id")) == 'undefined') {
        $("#headerLogin").remove();
        $("#navTitle").after(combineAfterLoginHeaderBtn($("#nickName").val()));
    }
}

// ---------------------- 登入註冊 Modal 相關 End ---------------------- //

// 顯示詳細內容 Modal
function showModal(e) {
    $("#placeModal .modal-body").html(combineModalData($(e).attr('id')));
    $("#placeModal").modal('show');
}

// 列表加入/移除書籤
function bookmark(e) {
    let loginList = login;
    if (loginList.chcek) {

        let cardId = $(e).closest('.cuz-card-box').attr('id');
        let toast = $(".toast");
        toast.toast({
            delay: 700
        })

        let innerHtml = "";
        innerHtml += '<i class="bi bi-check-circle-fill cuz-color-primary-dark h1 mb-3 mx-auto"></i>'

        if ($(e).children('i').hasClass('bi-bookmark')) {
            innerHtml += '<div class="h6 text-center cuz-w-100">已收藏</div>';
            locationList[gCountyCode][gActionType][cardId].modalAction.bookmark.check = true;
            $(e).children('i').removeClass("bi-bookmark")
            $(e).children('i').addClass("bi-bookmark-fill");
        } else if ($(e).children('i').hasClass('bi-bookmark-fill')) {
            innerHtml += '<div class="h6 text-center cuz-w-100">已移除收藏</div>';
            locationList[gCountyCode][gActionType][cardId].modalAction.bookmark.check = false;
            $(e).children('i').removeClass("bi-bookmark-fill")
            $(e).children('i').addClass("bi-bookmark");
        };
        $("#toastContent").html(innerHtml);
        $('.toast').toast('show');
    } else {
        showLoginModal();
    }
}

function combineAfterLoginHeaderBtn(nickName) {
    let innerHtml = "";
    innerHtml += '<div id="headerLogout" class="ml-auto">';
    innerHtml += '<ul class="navbar-nav" onclick="logout();">';
    innerHtml += '<li class="nav-item text-nowrap cuz-active">';
    innerHtml += '<spen class="nav-link h5 font-weight-bold p-1 cuz-color-secondary-black">';
    innerHtml += 'Hi, ' + nickName + ' / ';
    innerHtml += '<a class="nav-link h5 font-weight-bold d-inline-block cuz-color-secondary-black">';
    innerHtml += "登出";
    innerHtml += '</a>';
    innerHtml += '</li>';
    innerHtml += '</ul>';
    innerHtml += '</div>';
    return innerHtml;
}

function combineActionList() {
    let myItemList = itemList;
    let innerHtml = "";

    Object.entries(myItemList.action).forEach(([key, value]) => {
        innerHtml += '<div class="d-inline-block mx-4 cuz-action-btn-box" id="' + key + '">';
        innerHtml += '<div class="d-flex cuz-action-btn-circle cuz-bg-color-primary-dark' + (key == gActionType ? ' cuz-bg-color-secondary-green' : '') + '">';
        innerHtml += '<img src="./img/btn-' + key + (key == gActionType ? '' : '-fill') + '.png" class="mx-auto my-auto">';
        innerHtml += '</div>';
        innerHtml += '<div class="font-weight-bold text-center my-2 cuz-btn-text' + (key == gActionType ? ' cuz-color-secondary-green' : '') + '">' + value + '</div>';
        innerHtml += '</div>';
    });

    return innerHtml;
}

function combineModalData(cardId) {
    let myItemList = itemList;
    let myData = locationList[gCountyCode][gActionType][cardId];
    let innerHtml = "";

    innerHtml += '<section class="col-xl-5 col-lg-5 col-md-12">';
    innerHtml += '<div class="mx-3 my-3">';
    innerHtml += '<img src="' + myData.imgSrc + '" class="img-fluid cuz-modal-main-img">';
    innerHtml += '</div>';
    innerHtml += '</section>';

    innerHtml += '<section class="col-xl-7 col-lg-7 col-md-12 ml-md-3 ml-1">';
    innerHtml += '<div class="mr-3 my-3 d-flex flex-column">';
    innerHtml += '<div id="modalHeaderBox" class="d-flex mb-3 ml-xl-0 ml-lg-0 ml-md-0 ml-sm-3 ml-1">';
    innerHtml += '<div class=" mr-xl-1 mr-lg-1 mr-md-1 mr-sm-0">';

    innerHtml += '<div class="mb-4">';
    innerHtml += '<h1>' + myData.title + '</h1>';
    innerHtml += '</div>';

    innerHtml += '<div>';
    Object.entries(myData.basci).forEach(([key, value]) => {
        innerHtml += '<div class="d-flex my-2">';
        innerHtml += '<i class="bi bi-' + key + ' h5 cuz-color-primary-dark my-auto"></i>';
        innerHtml += '<div class="d-inline-block my-auto ml-2">' + value + '</div>';
        innerHtml += '</div>';
    });
    innerHtml += '</div>';
    innerHtml += '</div>';

    // innerHtml += '<div>';
    innerHtml += '<div id="modalActionCardBox" class="card-deck  mb-md-5 mb-sm-5 ml-xl-auto ml-lg-auto ml-md-auto ml-sm-auto">';

    Object.entries(myItemList.modalAction).forEach(([key, value]) => {
        innerHtml += '<div class="card cuz-modal-action-card-box m-xl-1 m-sm-1 m-1">';
        innerHtml += '<div class="card-body p-2 d-flex flex-column justify-content-center align-items-center">';

        innerHtml += '<div>';
        innerHtml += '<i class="bi bi-' + value.class + ' h3 ' + (myData.modalAction[key].check ? 'cuz-color-secondary-green' : 'cuz-color-secondary-black-30') + '"></i>';
        innerHtml += '</div>';

        innerHtml += '<div id="modalActionTitle" class="mt-2 ' + (myData.modalAction[key].check ? 'cuz-color-secondary-green' : 'cuz-color-secondary-black-30') + '">';
        innerHtml += (myData.modalAction[key].check ? '已' : '') + value.title;
        innerHtml += '</div>';

        innerHtml += '<div id="modalActionSubTitle" class="font-weight-lighter mt-2 cuz-font-size-12">';
        innerHtml += myData.modalAction[key].num + value.subTitle;
        innerHtml += '</div>';

        innerHtml += '</div>';
        innerHtml += '</div>';
    });
    innerHtml += '</div>';
    // innerHtml += '</div>';

    innerHtml += '</div>';

    innerHtml += '<div class="mb-4 mb-3 ml-xl-0 ml-lg-0 ml-md-0 ml-sm-3 ml-1">';

    innerHtml += '<div id="cusScoreTitle" class="d-flex">';
    innerHtml += '<h4 class="mr-1">來自 ' + myData.modalAction.star.num + ' 位毛友的真實評分</h4>';
    innerHtml += '<h6 class="mt-auto cuz-color-secondary-black-30">滿分5分</h6>';
    innerHtml += '</div>';

    innerHtml += '<div id="cusScoreItem" class="d-flex row">';
    Object.entries(myItemList.cusScore).forEach(([key, value]) => {
        innerHtml += '<div class="d-flex my-2 col-xl-4 col-lg-6 col-md-4 col-sm-4">';
        innerHtml += '<img src="./img/icon/' + key + '-fill.png" class="cuz-icon-20">';
        innerHtml += '<div class="d-inline-block my-auto ml-2">' + value.title + '</div>';
        innerHtml += '<div class="d-inline-block my-auto ml-2">' + myData.cusScore[key] + '</div>';
        innerHtml += '</div>';
    });
    innerHtml += '</div>';
    innerHtml += '</div>';

    innerHtml += '<div class="mb-4 mb-3 ml-xl-0 ml-lg-0 ml-md-0 ml-sm-3 ml-1">';

    innerHtml += '<div class="d-flex">';
    innerHtml += '<h4 class="">場所規範</h4>';
    innerHtml += '</div>';

    innerHtml += '<div id="placeRuleItem" class="d-flex row">';
    Object.entries(myItemList.placeRule).forEach(([key, value]) => {
        innerHtml += '<div class="d-flex my-2 col-xl-4 col-lg-6 col-md-4 col-sm-4">';
        innerHtml += '<img src="./img/icon/' + key + (myData.placeRule[key] ? '-fill' : '') + '.png" class="cuz-icon-20">';
        innerHtml += '<div class="d-inline-block my-auto ml-2">' + value.title + '</div>';
        innerHtml += '</div>';
    });

    innerHtml += '</div>';
    innerHtml += '</div>';

    innerHtml += '<div class="mb-4 mb-3 ml-xl-0 ml-lg-0 ml-md-0 ml-sm-3 ml-1">';

    innerHtml += '<div class="d-flex">';
    innerHtml += '<h4 class="ml-xl-0">毛孩入場需知</h4>';
    innerHtml += '</div>';
    innerHtml += '<div id="petRuleItemBox">';
    let countPetRule = 1;
    Object.entries(myItemList.petRule).forEach(([key, value]) => {
        if (countPetRule % 3 == 1) {
            innerHtml += '<div class="d-flex row">';
        }
        innerHtml += '<div class="d-flex my-2 col-xl-4 col-lg-7 col-md-4 col-sm-4">';
        innerHtml += '<img src="./img/icon/' + key + (myData.petRule[key] ? '-fill' : '') + '.png " class="cuz-icon-20 ">';
        innerHtml += '<div class="d-inline-block my-auto ml-2 ">' + value.title + '</div>';
        innerHtml += '</div>';

        if (countPetRule % 3 == 0) {
            innerHtml += '</div>';
        }
        countPetRule++;
    });
    innerHtml += '</div>';

    innerHtml += '</div>';
    innerHtml += '</section>';

    return innerHtml;
}



function combineDataList() {
    let myDataList = locationList[gCountyCode][gActionType];
    let size = (Object.keys(myDataList).length === 0 ? false : true);
    let innerHtml = "";

    if (size) {
        Object.entries(myDataList).forEach(([key, value]) => {
            innerHtml += '<div class="card mx-4 mb-5 cuz-card-box" id="' + value.id + '" onclick="showModal(this);">';
            innerHtml += '<img class="card-img-top" src="' + value.imgSrc + '" >';
            innerHtml += '<div class="card-body pb-2">';
            innerHtml += '<h4 class="card-title">' + value.title + '</h4>';
            innerHtml += '<h6 class="card-subtitle text-secondary">' + value.subTitle + '</h6>';
            innerHtml += '<div class="mt-3 w-100 d-flex">';
            innerHtml += '<div class="h5 my-auto">';
            innerHtml += '<i class="h4 bi bi-star-fill cuz-color-primary-dark mr-2"></i>';
            innerHtml += '<span>' + value.star + '</span>';
            innerHtml += '</div>';
            innerHtml += '<div class="ml-auto">';
            innerHtml += '<button type="button" class="btn cuz-card-bookmark" onclick="bookmark(this)">';
            innerHtml += '<i class="h4 bi bi-bookmark' + (value.modalAction.bookmark.check ? '-fill' : '') + ' cuz-color-secondary-green"></i>';
            innerHtml += '</button>';
            innerHtml += '</div>';
            innerHtml += '</div>';
            innerHtml += '</div>';
            innerHtml += '</div>';
        });
    } else {
        innerHtml += '<div class="h4 my-5">'
        innerHtml += '很抱歉，目前尚無資料'
        innerHtml += '</div>'
    }
    return innerHtml;
}



var itemList = {
    "action": {
        "restaurant": "找餐廳",
        "stay": "找住宿",
        "attractions": "找景點",
    },
    "modalAction": {
        "bookmark": {
            "title": "收藏",
            "subTitle": "人也收藏",
            "class": "bookmark-fill"
        },
        "geo": {
            "title": "打卡",
            "subTitle": "人也來過",
            "class": "geo-alt-fill"
        },
        "star": {
            "title": "評分",
            "subTitle": "人已評分",
            "class": "star-fill"
        },
        "chat": {
            "title": "評論",
            "subTitle": "人已留言",
            "class": "chat-left-dots-fill"
        }
    },
    "cusScore": {
        "spoon": {
            "title": "餐點美味"
        },
        "money": {
            "title": "價格實惠"
        },
        "smile": {
            "title": "環境舒適"
        }
    },
    "placeRule": {
        "ticket": {
            "title": "門票入場"
        },
        "minimum": {
            "title": "低消制"
        },
        "stopwatch": {
            "title": "有限時"
        }
    },
    "petRule": {
        "onFloor": {
            "title": "可落地"
        },
        "chair": {
            "title": "可上椅"
        },
        "cage": {
            "title": "需籠內"
        },
        "rope": {
            "title": "需繫繩"
        },
        "adoption": {
            "title": "開放領養"
        },
        "petMeal": {
            "title": "提供毛孩餐點"
        }
    }
};


var locationList = {
    "001": {
        "restaurant": {
            "001r01": {
                "id": "001r01",
                "title": "稻邸",
                "subTitle": "台北市 大同區",
                "imgSrc": "./img/data-main-img/001-r-1.jpeg",
                "star": "4.5",
                "basci": {
                    "clock": "10:30–19:30",
                    "telephone": "02-25577980",
                    "house": "台北市大同區迪化街一段244號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "384"
                    },
                    "geo": {
                        "check": true,
                        "num": "597"
                    },
                    "star": {
                        "check": true,
                        "num": "483"
                    },
                    "chat": {
                        "check": false,
                        "num": "65"
                    }
                },
                "cusScore": {
                    "spoon": "4.3",
                    "money": "4.0",
                    "smile": "4.6"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": true,
                    "adoption": true,
                    "petMeal": true
                }

            },
            "001r02": {
                "id": "001r02",
                "title": "慵懶咖啡",
                "subTitle": "台北市 信義區",
                "imgSrc": "./img/data-main-img/001-r-2.jpeg",
                "star": "5.0",
                "basci": {
                    "clock": "11:00–19:00",
                    "telephone": "02-87800383",
                    "house": "台北市信義區光復南路419巷49號1樓"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "263"
                    },
                    "geo": {
                        "check": true,
                        "num": "679"
                    },
                    "star": {
                        "check": false,
                        "num": "483"
                    },
                    "chat": {
                        "check": false,
                        "num": "402"
                    }
                },
                "cusScore": {
                    "spoon": "5.0",
                    "money": "5.0",
                    "smile": "5.0"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": false,
                    "adoption": false,
                    "petMeal": true
                }

            },
            "001r03": {
                "id": "001r03",
                "title": "FUFUCatCafe",
                "subTitle": "台北市 萬華區",
                "imgSrc": "./img/data-main-img/001-r-3.jpeg",
                "star": "4.7",
                "basci": {
                    "clock": "12:00–21:00",
                    "telephone": "02-23883722",
                    "house": "台北市萬華區武昌街二段3號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "124"
                    },
                    "geo": {
                        "check": true,
                        "num": "556"
                    },
                    "star": {
                        "check": false,
                        "num": "392"
                    },
                    "chat": {
                        "check": false,
                        "num": "468"
                    }
                },
                "cusScore": {
                    "spoon": "4.5",
                    "money": "4.3",
                    "smile": "5.0"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": false
                }

            },
            "001r04": {
                "id": "001r04",
                "title": "Woodid우리韓食",
                "subTitle": "台北市 大安區",
                "imgSrc": "./img/data-main-img/001-r-4.jpeg",
                "star": "4.3",
                "basci": {
                    "clock": "11:30–14:00, 17:30–21:00",
                    "telephone": "02-27017739",
                    "house": "台北市大安區仁愛路四段300巷19弄"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "23"
                    },
                    "geo": {
                        "check": false,
                        "num": "76"
                    },
                    "star": {
                        "check": false,
                        "num": "172"
                    },
                    "chat": {
                        "check": false,
                        "num": "163"
                    }
                },
                "cusScore": {
                    "spoon": "4.3",
                    "money": "4.5",
                    "smile": "4"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": false,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": false
                }

            },
            "001r05": {
                "id": "001r05",
                "title": "益生寵愛餐廳",
                "subTitle": "台北市 大安區",
                "imgSrc": "./img/data-main-img/001-r-5.jpeg",
                "star": "4.9",
                "basci": {
                    "clock": "10:30–19:30",
                    "telephone": "02-27083289",
                    "house": "台北市大安區和平東路二段265巷7號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "102"
                    },
                    "geo": {
                        "check": true,
                        "num": "289"
                    },
                    "star": {
                        "check": true,
                        "num": "136"
                    },
                    "chat": {
                        "check": false,
                        "num": "238"
                    }
                },
                "cusScore": {
                    "spoon": "4.7",
                    "money": "4.5",
                    "smile": "4.9"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": false,
                    "adoption": true,
                    "petMeal": true
                }

            },
            "001r06": {
                "id": "001r06",
                "title": "金屋藏車食堂",
                "subTitle": "台北市 士林區",
                "imgSrc": "./img/data-main-img/001-r-6.jpeg",
                "star": "4.3",
                "basci": {
                    "clock": "12:00–21:00",
                    "telephone": "02-28760698",
                    "house": "台北市士林區中山北路七段140巷1號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "263"
                    },
                    "geo": {
                        "check": true,
                        "num": "679"
                    },
                    "star": {
                        "check": true,
                        "num": "483"
                    },
                    "chat": {
                        "check": false,
                        "num": "402"
                    }
                },
                "cusScore": {
                    "spoon": "4.7",
                    "money": "3.9",
                    "smile": "4.0"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": false,
                    "adoption": false,
                    "petMeal": true
                }

            }
        },
        "stay": {
            "001s01": {
                "id": "001s01",
                "title": "金普頓酒店",
                "subTitle": "台北市 大安區",
                "imgSrc": "./img/data-main-img/001-s-1.jpeg",
                "star": "4.5",
                "basci": {
                    "clock": "00:00–23:59",
                    "telephone": "02-21737999",
                    "house": "台北市大安區仁愛路四段27巷25號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "12"
                    },
                    "geo": {
                        "check": true,
                        "num": "109"
                    },
                    "star": {
                        "check": false,
                        "num": "56"
                    },
                    "chat": {
                        "check": false,
                        "num": "13"
                    }
                },
                "cusScore": {
                    "spoon": "3.9",
                    "money": "3.5",
                    "smile": "4.3"
                },
                "placeRule": {
                    "ticket": true,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": false,
                    "chair": false,
                    "cage": true,
                    "rope": true,
                    "adoption": false,
                    "petMeal": false
                }
            }
        },
        "attractions": {
            "001a01": {
                "id": "001a01",
                "title": "迎風狗公園",
                "subTitle": "台北市 松山區",
                "imgSrc": "./img/data-main-img/001-a-1.jpeg",
                "star": "4.4",
                "basci": {
                    "clock": "00:00–23:59",
                    "telephone": "02-87897158",
                    "house": "台北市松山區塔悠路332號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "364"
                    },
                    "geo": {
                        "check": true,
                        "num": "993"
                    },
                    "star": {
                        "check": false,
                        "num": "758"
                    },
                    "chat": {
                        "check": true,
                        "num": "769"
                    }
                },
                "cusScore": {
                    "spoon": "4.7",
                    "money": "5",
                    "smile": "4"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": false
                }
            }
        }
    },
    "002": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "003": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "004": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "005": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "006": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "007": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "008": {
        "restaurant": {
            "008r01": {
                "id": "008r01",
                "title": "浪浪別哭",
                "subTitle": "台中市 南屯區",
                "imgSrc": "./img/data-main-img/008-r-1.jpeg",
                "star": "4.6",
                "basci": {
                    "clock": "12:00–20:30",
                    "telephone": "04-22547018",
                    "house": "台中市南屯區干城街214巷1號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "324"
                    },
                    "geo": {
                        "check": true,
                        "num": "354"
                    },
                    "star": {
                        "check": true,
                        "num": "237"
                    },
                    "chat": {
                        "check": true,
                        "num": "206"
                    }
                },
                "cusScore": {
                    "spoon": "4.7",
                    "money": "4.5",
                    "smile": "4.3"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": true,
                    "adoption": true,
                    "petMeal": true
                }

            },
            "008r02": {
                "id": "008r02",
                "title": "攜旺cafe",
                "subTitle": "台中市 西區",
                "imgSrc": "./img/data-main-img/008-r-2.jpeg",
                "star": "4.7",
                "basci": {
                    "clock": "12:00–19:30",
                    "telephone": "0936 936 736",
                    "house": "台中市西區公益路117-3號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "136"
                    },
                    "geo": {
                        "check": true,
                        "num": "697"
                    },
                    "star": {
                        "check": true,
                        "num": "683"
                    },
                    "chat": {
                        "check": false,
                        "num": "596"
                    }
                },
                "cusScore": {
                    "spoon": "4.9",
                    "money": "4.3",
                    "smile": "4.7"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": true,
                    "adoption": true,
                    "petMeal": true
                }

            },
            "008r03": {
                "id": "008r03",
                "title": "踏踏地球",
                "subTitle": "台中市 西區",
                "imgSrc": "./img/data-main-img/008-r-3.jpeg",
                "star": "4.7",
                "basci": {
                    "clock": "11:00–20:00",
                    "telephone": "04-23270776",
                    "house": "台中市西區精誠九街10號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "23"
                    },
                    "geo": {
                        "check": false,
                        "num": "432"
                    },
                    "star": {
                        "check": false,
                        "num": "256"
                    },
                    "chat": {
                        "check": false,
                        "num": "343"
                    }
                },
                "cusScore": {
                    "spoon": "4.2",
                    "money": "4.0",
                    "smile": "4.7"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": false,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": true
                }

            },
            "008r04": {
                "id": "008r04",
                "title": "貳樓餐廳",
                "subTitle": "台中市 南屯區",
                "imgSrc": "./img/data-main-img/008-r-4.jpeg",
                "star": "4.3",
                "basci": {
                    "clock": "10:30–21:30",
                    "telephone": "04-23272527",
                    "house": "台中市南屯區公益路二段172號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "239"
                    },
                    "geo": {
                        "check": true,
                        "num": "977"
                    },
                    "star": {
                        "check": true,
                        "num": "923"
                    },
                    "chat": {
                        "check": false,
                        "num": "996"
                    }
                },
                "cusScore": {
                    "spoon": "4.6",
                    "money": "4.0",
                    "smile": "4.3"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": false,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": true
                }

            },
            "008r05": {
                "id": "008r05",
                "title": "森林小徑",
                "subTitle": "台中市 西屯區",
                "imgSrc": "./img/data-main-img/008-r-5.jpeg",
                "star": "4.7",
                "basci": {
                    "clock": "11:30–21:30",
                    "telephone": "04-23100638",
                    "house": "台中市西屯區大容西街53號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "104"
                    },
                    "geo": {
                        "check": false,
                        "num": "892"
                    },
                    "star": {
                        "check": false,
                        "num": "654"
                    },
                    "chat": {
                        "check": false,
                        "num": "778"
                    }
                },
                "cusScore": {
                    "spoon": "4.7",
                    "money": "4.6",
                    "smile": "4.8"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": false,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": true
                }

            },
            "008r06": {
                "id": "008r06",
                "title": "NAGO NAGO",
                "subTitle": "台中市 北屯區",
                "imgSrc": "./img/data-main-img/008-r-6.png",
                "star": "4.6",
                "basci": {
                    "clock": "10:00–18:00",
                    "telephone": "04-24269915",
                    "house": "台中市北屯區同榮路93號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "224"
                    },
                    "geo": {
                        "check": true,
                        "num": "670"
                    },
                    "star": {
                        "check": true,
                        "num": "878"
                    },
                    "chat": {
                        "check": false,
                        "num": "906"
                    }
                },
                "cusScore": {
                    "spoon": "4.3",
                    "money": "4.0",
                    "smile": "4.7"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": true,
                    "stopwatch": true
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": false,
                    "adoption": false,
                    "petMeal": true
                }

            },
        },
        "stay": {},
        "attractions": {
            "008a01": {
                "id": "008a01",
                "title": "櫻花鳥森林",
                "subTitle": "台中市 新社區",
                "imgSrc": "./img/data-main-img/008-a-1.jpeg",
                "star": "3.6",
                "basci": {
                    "clock": "08:00–18:00",
                    "telephone": "04-25815662",
                    "house": "台中市新社區協中街6號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": false,
                        "num": "108"
                    },
                    "geo": {
                        "check": false,
                        "num": "776"
                    },
                    "star": {
                        "check": false,
                        "num": "784"
                    },
                    "chat": {
                        "check": false,
                        "num": "669"
                    }
                },
                "cusScore": {
                    "spoon": "3.1",
                    "money": "3.9",
                    "smile": "4.2"
                },
                "placeRule": {
                    "ticket": true,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": false,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": false
                }

            },
            "008a02": {
                "id": "008a02",
                "title": "HiONE啵比星球",
                "subTitle": "台中市 北屯區",
                "imgSrc": "./img/data-main-img/008-a-2.jpeg",
                "star": "4.2",
                "basci": {
                    "clock": "10:00–18:00",
                    "telephone": "04-24269915",
                    "house": "台中市北屯區東山路二段151之2號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "431"
                    },
                    "geo": {
                        "check": false,
                        "num": "866"
                    },
                    "star": {
                        "check": false,
                        "num": "953"
                    },
                    "chat": {
                        "check": false,
                        "num": "904"
                    }
                },
                "cusScore": {
                    "spoon": "4.5",
                    "money": "3.9",
                    "smile": "4.2"
                },
                "placeRule": {
                    "ticket": true,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": false,
                    "adoption": false,
                    "petMeal": true
                }

            }
        }
    },
    "009": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "010": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "011": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "012": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "013": {
        "restaurant": {},
        "stay": {
            "013s01": {
                "id": "013s01",
                "title": "葉子。宿",
                "subTitle": "台南市 東區",
                "imgSrc": "./img/data-main-img/013-s-1.jpeg",
                "star": "4.4",
                "basci": {
                    "clock": "00:00–23:59",
                    "telephone": "0978185554",
                    "house": "台南市東區中華東路二段226巷3號"
                },
                "modalAction": {
                    "bookmark": {
                        "check": true,
                        "num": "12"
                    },
                    "geo": {
                        "check": false,
                        "num": "97"
                    },
                    "star": {
                        "check": false,
                        "num": "192"
                    },
                    "chat": {
                        "check": false,
                        "num": "146"
                    }
                },
                "cusScore": {
                    "spoon": "4.5",
                    "money": "4.0",
                    "smile": "4.8"
                },
                "placeRule": {
                    "ticket": false,
                    "minimum": false,
                    "stopwatch": false
                },
                "petRule": {
                    "onFloor": true,
                    "chair": true,
                    "cage": false,
                    "rope": true,
                    "adoption": false,
                    "petMeal": false
                }

            }
        },
        "attractions": {}
    },
    "014": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "015": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "016": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    },
    "017": {
        "restaurant": {},
        "stay": {},
        "attractions": {}
    }
};