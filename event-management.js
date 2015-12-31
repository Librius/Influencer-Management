/**
 * Created by developer on 12/29/15.
 */

var singleEventJsonObj;
var events;
var tags = [];

function readFromJson(){

}

function writeToJson(){
    events = {
        "id":0,
        "name":jQuery("#modal_name_input").val(),
        "time_begin":jQuery("#modal_begin_time").val(),
        "time_end":jQuery("#modal_end_time").val(),
        "brief":jQuery("#modal_intro").val(),
        "event_hashtag":tags,
        "big_image":[],
        "middle_image":[]
    }

    var bigImages = jQuery("#big_img_div .chunk_div");
    //var bigImages = jQuery("#big_img_div input[type=file]");
    for(var i=0; i<bigImages.length; i++){
        events.big_image[i] = {"url": "#","main_title":bigImages[i].children[2].value,"subtitle":bigImages[i].children[3].value,"link":bigImages[i].children[4].value}
    }
    var middleImages = jQuery("#middle_img_div .chunk_div");
    for(var i=0; i<middleImages.length; i++){
        events.middle_image[i] = {"url": "#","main_title":middleImages[i].children[2].value,"subtitle":middleImages[i].children[3].value,"link":middleImages[i].children[4].value}
    }

    console.log(events);
}
jQuery(document).ready(function() {

    jQuery("#save_button").click(function(){
        writeToJson();
    });

    //// modal save button - input validation
    //jQuery("#save_button").click(function(){
    //    //if(jQuery("#modal_name_input").val().length < 1) alert("Please input name!");
    //    //if(jQuery("#modal_begin_time").val().length < 1) alert("Please select begin time!");
    //    //if(jQuery("#modal_end_time").val().length < 1) alert("Please select end time!");
    //    //if(jQuery("#modal_intro").val().length < 1) alert("Please input brief introduction!");
    //    //if(tags.length < 1) alert("Please choose some tags!");
    //    var bigImages = jQuery("#big_img_div input[type=file]");
    //    for(var i=0; i<bigImages.length; i++){
    //
    //    }
    //    console.log(jQuery("#big_img_div input[type=file]"));
    //});

    //chunk add

    jQuery("#big_img_add_btn").click(function(){
        jQuery("#big_img_div").append(
            "<div class=\"chunk_div\">" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
            "Main Title: <input type=\"text\" class=\"entry_input\">" +
            "Subtitle: <input type=\"text\" class=\"entry_input\">" +
            "Link: <input type=\"text\" class=\"entry_input\">" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "</div>"
        );
    });

    jQuery("#middle_img_add_btn").click(function(){
        jQuery("#middle_img_div").append(
            "<div class=\"chunk_div\">" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
            "Main Title: <input type=\"text\" class=\"entry_input\">" +
            "Subtitle: <input type=\"text\" class=\"entry_input\">" +
            "Link: <input type=\"text\" class=\"entry_input\">" +
            "</div>"
        );
    });

    //tag pool

    jQuery("#create_button").click(function () {
        createInfluencer();
    });

    jQuery("#reset_button").click(function () {
        newJSON = oldJSON;
        newJsonObj = JSON.parse(newJSON);
        parseJSON(oldJsonObj);
    });

    var input_open = false;
    var new_tag_content = "";

    jQuery("#add_tag_button").click(function () {

        if (input_open) {
            new_tag_content = encodeURI(jQuery("#new_tag_input").val());
            console.log(new_tag_content);
            input_confirm();
        }
        else {
            jQuery("#tag_pool").append("<input type=\"text\" name=\"input\" id=\"new_tag_input\">");
            input_open = true;
            jQuery("#new_tag_input").keypress(function (event) {
                if (event.which == 13) {
                    new_tag_content = encodeURI(jQuery("#new_tag_input").val());
                    input_confirm();
                }
            });
        }

    });

    function input_confirm() {
        if (new_tag_content.length != 0) {
            jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
            tags.push(jQuery("#new_tag_input").val());
            //newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
            jQuery("#new_tag_input").remove();
            input_open = false;
            jQuery(".tag_button").click(function (event) {
                remove_hashtag_button(event)
            });
        }
    }
});