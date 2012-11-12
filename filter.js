var inidata = {"blocks": {
        "block1":{
            "title":"Брэнды",
            "items":{"nokia":"Nokia",15:"Samsung",45:"Simens","ap":"Apple"}
        },
        "block2":{
            "title":"Диагональ экрана",
            "items":['11"','13"','14"','15.6"']
        },
    }};
var settings = {
    "prefix": ""
}
$(document).ready(function() {
    
    //alert(inidata["blocks"]["block1"]["title"]);
    $.each(inidata["blocks"], function(index, value){
        var bl = "<div class='filter-search-block'>";
        bl += '<span class="filter-search-caption"><i class="filter-search-arrow"></i>' + value["title"] + '</span><br/>';
        bl += '<div class="filter-search-fields">';
        $.each(value["items"], function(ind,val) {
            bl += "<input type='checkbox' class='filter-search-check' value='" + ind + "' /> " + val + "<br />"
        });
        bl += "</div></div>";
        $('#filter-box').append(bl);
    });
    
    $(".filter-search-check").click(function(){
        var pos = $(this).position();
        $(".filter-search-result").css("margin-top",pos.top);
        $(".filter-search-result").css("display", "block");
        // $(".filter-search-result").delay(2000).fadeOut();
    });

    $(".filter-search-caption").click(function(){
        toggleFields($(this));
    });
});

function toggleFields(e) {
    e.parent().children(".filter-search-fields").toggle(500);
    current_arrow = e.children("i").css('background-position');
    if (current_arrow == '-456px -72px') {
        e.children("i").css('background-position', '-313px -119px');
    } else {
        e.children("i").css('background-position', '-456px -72px');
    }
}