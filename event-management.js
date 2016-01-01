/**
 * Created by developer on 12/29/15.
 */

var singleEventJsonObj;
var events;
//var tags = [];

var oldJSONObj;
var newJSONObj;

var ROWS_PER_PAGE=1;
var current_page=0;


function showPage(page_num)
{
  var table_body_html = "";
  for(var i =page_num*ROWS_PER_PAGE;i<newJSONObj.events.length && i<page_num*ROWS_PER_PAGE+ROWS_PER_PAGE;i++)
  {
    table_body_html+="<tr>";
    table_body_html+=getEventEntry(newJSONObj.events[i].id,newJSONObj.events[i].name,newJSONObj.events[i].time_begin,newJSONObj.events[i].time_end,newJSONObj.events[i].brief);
    table_body_html+="</tr>";
  }
  jQuery("#tableBody").html(table_body_html);
  if(current_page == 0)
    jQuery("#previous_button").css("display","none");
  else
    jQuery("#previous_button").css("display","block");
  if((current_page+1)*ROWS_PER_PAGE >= newJSONObj.events.length)
    jQuery("#next_button").css("display","none");
  else
    jQuery("#next_button").css("display","block");
}

function previousPage()
{
  if(current_page == 0)
    return;
  current_page--;
  showPage(current_page);

}

function nextPage()
{
  if((current_page+1)*ROWS_PER_PAGE >= newJSONObj.events.length)
    return;
  current_page++;
  showPage(current_page);
}

function UpLoadFile(event)
{
    var fd = new FormData();
    fd.append("fileToUpload", event.target.files[0]);
    jQuery.ajax({
        type:"POST",
        url:"uploadfile.php",
        processData: false,
        contentType: false,
        data:fd,
        async: false,
        success:function(result)
        {
            var target = event.target;
            var parent = target.parentElement;
            var imgtag = parent.getElementsByTagName("img")[0];
            jQuery(imgtag).attr("src",result);
        },
        error:function()
        {
            alert("error!");
        }
    });
}

function getEventEntry(id,name, timeBegin, timeEnd, briefIntro ){
    return "<td>" + name + "</td>" +
        "<td>" + timeBegin + "</td>" +
        "<td>" + timeEnd + "</td>" +
        "<td>" + briefIntro + "</td>" +
        "<td><button class=\"btn btn-link\" id=\"editbutton"+id+"\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"viewandedit(event)\">view&amp;edit </button></td>";
}

function viewandedit(event)
{
  var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("editbutton")+10);//get the influencer's id
  var id = parseInt(id_str);
  var i;
  for(i = 0;i<newJSONObj.events.length;i++)
  {
    if(newJSONObj.events[i].id == id)
      break;
  }
  var currentEvent = newJSONObj.events[i];
  readFromJson(currentEvent);
}


function getChunk(imgSrc, mainTitle, subTitle, link){
    return "<div class=\"chunk_div\">" +
    "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
    "<img class=\"entry_picture\" src=\"" + imgSrc + "\" alt=\"No file chosen\"/>" +
    "Main Title: <input type=\"text\" class=\"entry_input\" value=\""+ mainTitle +"\">" +
    "Subtitle: <input type=\"text\" class=\"entry_input\" value=\""+ subTitle +"\">" +
    "Link: <input type=\"text\" class=\"entry_input\" value=\""+ link +"\">" +
    "<button class=\"remove_chunk_buttons\" onclick=\"closestDiv()\">Remove</button>" +
    "</div>";
}

/*
var eventsJsonObj = {
    "id":0,
    "enabled":0,
    "name": "Test Name",
    "time_begin":"2015-01-01T01:00",
    "time_end":"2015-12-31T12:59",
    "brief":"lalalala brief description",
    "event_hashtag": ["tag1", "tag2", "tag3"],
    "big_image":[{"url": "#","main_title":"b1m","subtitle":"b1s","link":"b1l"},{"url": "#","main_title":"b2m","subtitle":"b2s","link":"b2l"}],
    "middle_image":[{"url": "#","main_title":"m1m","subtitle":"m1s","link":"m1l"},{"url": "#","main_title":"m2m","subtitle":"m2s","link":"m2l"}]
};*/

var event_id;
function readFromJson(eventsJsonObj){
    event_id = eventsJsonObj.id;
    jQuery("#modal_name_input").val(eventsJsonObj.name);
    if(eventsJsonObj.enabled==1) {
        jQuery("#modal_status").text("On");
        jQuery("#status_control_button").html("Disable");
    }
    else {
        jQuery("#modal_status").text("Off");
        jQuery("#status_control_button").html("Enable");
    }
    jQuery("#modal_begin_time").val(eventsJsonObj.time_begin);
    jQuery("#modal_end_time").val(eventsJsonObj.time_end);
    jQuery("#modal_intro").val(eventsJsonObj.brief);
    jQuery("#tag_pool").html("<button id=\"add_tag_button\" class=\"btn btn-primary\" onclick=\"addTag()\">Add</button>");
    for(var i=0; i<eventsJsonObj.event_hashtag.length; i++) jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + eventsJsonObj.event_hashtag[i] + "</button>");
    jQuery("#big_img_div").html("");
    for(var i=0; i<eventsJsonObj.big_image.length; i++) {
        var bigImgJson = eventsJsonObj.big_image[i]
        jQuery("#big_img_div").append(getChunk(bigImgJson.url, bigImgJson.main_title, bigImgJson.subtitle, bigImgJson.link));
    }
    jQuery("#middle_img_div").html("");
    for(var i=0; i<eventsJsonObj.middle_image.length; i++) {
        var middleImgJson = eventsJsonObj.middle_image[i]
        jQuery("#middle_img_div").append(getChunk(middleImgJson.url, middleImgJson.main_title, middleImgJson.subtitle, middleImgJson.link));
    }
}

function writeToJson(){
    var status;
    if (jQuery("#modal_status").text()=="On") status = 1;
    else status = 0;
    var tags = [];
    for (var i=0; i<jQuery("#tag_pool button").length-1; i++) tags.push(jQuery("#tag_pool button")[i].innerHTML);
    events = {
        "id":0,
        "enabled": status,
        "name":jQuery("#modal_name_input").val(),
        "time_begin":jQuery("#modal_begin_time").val(),
        "time_end":jQuery("#modal_end_time").val(),
        "brief":jQuery("#modal_intro").val(),
        "event_hashtag":tags,
        "big_image":[],
        "middle_image":[]
    };

    var bigImages = jQuery("#big_img_div .chunk_div");
    //var bigImages = jQuery("#big_img_div input[type=file]");
    for(var i=0; i<bigImages.length; i++){
        events.big_image[i] = {"url": "#","main_title":bigImages[i].children[2].value,"subtitle":bigImages[i].children[3].value,"link":bigImages[i].children[4].value};
    }
    var middleImages = jQuery("#middle_img_div .chunk_div");
    for(var i=0; i<middleImages.length; i++){
        events.middle_image[i] = {"url": "#","main_title":middleImages[i].children[2].value,"subtitle":middleImages[i].children[3].value,"link":middleImages[i].children[4].value};
    }

    console.log(events);
}

//remove image div
function closestDiv(){
    ((event.currentTarget).closest("div")).remove();
}

function createEvent(){
    var emptyJson = {
        "id":0,
        "enabled":0,
        "name": "",
        "time_begin":"",
        "time_end":"",
        "brief":"",
        "event_hashtag": [],
        "big_image":[{"url": "","main_title":"","subtitle":"","link":""},{"url": "","main_title":"","subtitle":"","link":""}],
        "middle_image":[{"url": "","main_title":"","subtitle":"","link":""},{"url": "","main_title":"","subtitle":"","link":""}]
    };
    readFromJson(emptyJson);
}

//tag pool

var input_open = false;
var new_tag_content = "";

function addTag() {

    console.log("click");

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

}

function input_confirm() {
    if (new_tag_content.length != 0) {
        jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
        //tags.push(jQuery("#new_tag_input").val());
        //newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
        jQuery("#new_tag_input").remove();
        input_open = false;
        jQuery(".tag_button").click(function (event) {
            event.target.remove();
        });
    }
}

jQuery(document).ready(function() {

  jQuery.ajax({
    type:"GET",
    url:"geteventinfo.php",
    success:function(result)
    {
      oldJSONObj = JSON.parse(result);
      newJSONObj = JSON.parse(result);
      showPage(0);
    },
    error:function()
    {
      alert("error!");
    }
  });
  
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

    jQuery("#status_control_button").click(function(event){
        if(jQuery("#modal_status").text()=="Off"){
            jQuery("#modal_status").text("On");
            jQuery("#status_control_button").html("Disable");
        }
        else{
            jQuery("#modal_status").text("Off");
            jQuery("#status_control_button").html("Enable");
        }
    });

    jQuery("#big_img_add_btn").click(function(){
        jQuery("#big_img_div").append(
            getChunk("", "", "", "")
        );
    });

    jQuery("#middle_img_add_btn").click(function(){
        jQuery("#middle_img_div").append(
            getChunk("", "", "", "")
        );
    });

    jQuery("#create_button").click(function () {
        createEvent();
    });

    jQuery("#reset_button").click(function () {
        newJSON = oldJSON;
        newJsonObj = JSON.parse(newJSON);
        parseJSON(oldJsonObj);
    });

    ////tag pool
    //
    //var input_open = false;
    //var new_tag_content = "";
    //
    //jQuery("#add_tag_button").click(function () {
    //
    //    if (input_open) {
    //        new_tag_content = encodeURI(jQuery("#new_tag_input").val());
    //        console.log(new_tag_content);
    //        input_confirm();
    //    }
    //    else {
    //        jQuery("#tag_pool").append("<input type=\"text\" name=\"input\" id=\"new_tag_input\">");
    //        input_open = true;
    //        jQuery("#new_tag_input").keypress(function (event) {
    //            if (event.which == 13) {
    //                new_tag_content = encodeURI(jQuery("#new_tag_input").val());
    //                input_confirm();
    //            }
    //        });
    //    }
    //
    //});
    //
    //function input_confirm() {
    //    if (new_tag_content.length != 0) {
    //        jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
    //        tags.push(jQuery("#new_tag_input").val());
    //        //newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
    //        jQuery("#new_tag_input").remove();
    //        input_open = false;
    //        jQuery(".tag_button").click(function (event) {
    //            remove_hashtag_button(event);
    //        });
    //    }
    //}
});