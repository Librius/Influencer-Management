/**
 * Created by developer on 12/29/15.
 */

var singleEventJsonObj;
var events;
var tags = [];

function getEventEntry(name, timeBegin, timeEnd, briefIntro ){
    return "<td>" + timeBegin + "</td>" +
        "<td>" + timeEnd + "</td>" +
        "<td>" + briefIntro + "</td>" +
        "<button class=\"btn btn-link\" id=\"editbutton\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"viewandedit(event)\">view&amp;edit </button>" +
        "<button class=\"btn btn-link\" id=\"deletebutton\" onclick=\"deleteentry(event)\">disable</button></td>"
}
function getChunk(imgSrc, mainTitle, subTitle, link){
    return "<div class=\"chunk_div\">" +
    "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
    "<img class=\"entry_picture\" src=\"" + imgSrc + "\" alt=\"No file chosen\"/>" +
    "Main Title: <input type=\"text\" class=\"entry_input\" value=\""+ mainTitle +"\">" +
    "Subtitle: <input type=\"text\" class=\"entry_input\" value=\""+ subTitle +"\">" +
    "Link: <input type=\"text\" class=\"entry_input\" value=\""+ link +"\">" +
    "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
    "</div>"
}

var eventsJsonObj = {
    "id":0,
    "name": "Test Name",
    "time_begin":"2015-01-01T01:00",
    "time_end":"2015-12-31T12:59",
    "brief":"lalalala brief description",
    "event_hashtag": ["tag1", "tag2", "tag3"],
    "big_image":[{"url": "#","main_title":"b1m","subtitle":"b1s","link":"b1l"},{"url": "#","main_title":"b2m","subtitle":"b2s","link":"b2l"}],
    "middle_image":[{"url": "#","main_title":"m1m","subtitle":"m1s","link":"m1l"},{"url": "#","main_title":"m2m","subtitle":"m2s","link":"m2l"}]
}

function readFromJson(){
    jQuery("#modal_name_input").val(eventsJsonObj.name);
    jQuery("#modal_begin_time").val(eventsJsonObj.time_begin);
    jQuery("#modal_end_time").val(eventsJsonObj.time_end);
    jQuery("#modal_intro").val(eventsJsonObj.brief);
    for(var i=0; i<eventsJsonObj.event_hashtag.length; i++) jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + eventsJsonObj.event_hashtag[i] + "</button>");
    for(var i=0; i<eventsJsonObj.big_image.length; i++) {
        var bigImgJson = eventsJsonObj.big_image[i]
        jQuery("#big_img_div").append(getChunk(bigImgJson.url, bigImgJson.main_title, bigImgJson.subtitle, bigImgJson.link));
    }
    for(var i=0; i<eventsJsonObj.middle_image.length; i++) {
        var middleImgJson = eventsJsonObj.middle_image[i]
        jQuery("#middle_img_div").append(getChunk(middleImgJson.url, middleImgJson.main_title, middleImgJson.subtitle, middleImgJson.link));
    }
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
            getChunk("", "", "", "")
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