var inidata = {"blocks": {
        "block1":{
            "title":"Брэнды",
            "type": "checkbox",
            "hideBlock": false,
            "items":{"nokia":"Nokia",15:"Samsung",45:"Simens","ap":"Apple"}
        },
        "block2":{
            "title":"Диагональ экрана",
            "type": "checkbox",
            "items":['11"','13"','14"','15.6"']
        },
        "block3":{
            "title":"Цена",
            "type": "slider",
            "hideBlock": true,
            "min": 200,
            "max": 2000
        }
    }};
var settings = {
    "hideBlock": true,
    "min":0,
    "max":10,
    "step":1
}
$(document).ready(function() {
    
    init(inidata);
    
    $(".filter-search-check").click(function(){
        var pos = $(this).position();
        $(".filter-search-result").css("margin-top",pos.top);
        $(".filter-search-result").css("display", "block");
        if ($('.filter-search-check:checked').length == 0) {
            $(".filter-search-result").fadeOut(1000);
        }
    });

    $(".filter-search-caption").click(function(){
        toggleFields($(this));
    });
});

function toggleFields(e, action) {
    if(typeof(action)==='undefined') action = 'none';

    switch (action) {
        case 'show':
            e.parent().children(".filter-search-fields").show();
            e.children("i").css('background-position', '-313px -119px');
            break;
        case 'hide':
            e.parent().children(".filter-search-fields").hide();
            e.children("i").css('background-position', '-456px -72px');
            break;
        case 'none':
            e.parent().children(".filter-search-fields").toggle(500);
            current_arrow = e.children("i").css('background-position');
            if (current_arrow == '-456px -72px') {
                e.children("i").css('background-position', '-313px -119px');
            } else {
                e.children("i").css('background-position', '-456px -72px');
            }
            break;
    }
    
}

function init(dat) {
    $.each(dat["blocks"], function(index, value){
        var local_setting = {};
        var bl = "<div class='filter-search-block'>";
        bl += '<span class="filter-search-caption"><i class="filter-search-arrow"></i>' + value["title"] + '</span><br/>';
        bl += '<div class="filter-search-fields ' + value["type"] +'">';
        if (value["type"] == "checkbox") {
            $.each(value["items"], function(ind,val) {
                bl += "<input type='checkbox' class='filter-search-check' value='" + ind + "' /> " + val + "<br />"
            });
        } else if (value["type"] == "slider") {
            if (typeof(value["min"]) != "undefined") {
                local_setting["min"] = value["min"];
            } else {
                local_setting["min"] = settings["min"];
            }
            if (typeof(value["max"]) != "undefined") {
                local_setting["max"] = value["max"];
            } else {
                local_setting["max"] = settings["max"];
            }
            if (typeof(value["step"]) != "undefined") {
                local_setting["step"] = value["step"];
            } else {
                local_setting["step"] = settings["step"];
            }
            bl += "<div>from <input type='text' class='sliderValue' data-index='0' value='"+local_setting["min"]+"' /> to <input type='text' class='sliderValue' data-index='1' value='"+local_setting["max"]+"' /></div>";
            bl += "<div class='slider'></div>";
        }
        
        if (typeof(value["hideBlock"]) === "undefined") {
            local_setting["hideBlock"] = settings["hideBlock"];
        } else {
            local_setting["hideBlock"] = value["hideBlock"];
        }

        bl += "</div></div>";
        $('#filter-box').append(bl);
        
        if (local_setting["hideBlock"]) {
            toggleFields($(".filter-search-caption:last"),"hide");
        }

        $(".filter-search-fields").children(".slider").slider({
                min: local_setting["min"],
                max: local_setting["max"],
                step: local_setting["step"],
                values: [local_setting["min"], local_setting["max"]],
                slide: function(event, ui) {
                    for (var i = 0; i < ui.values.length; ++i) {
                        $("input.sliderValue[data-index=" + i + "]").val(ui.values[i]);
                    }
                }
            });
    });
}