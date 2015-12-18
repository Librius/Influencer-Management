/**
 * Created by developer on 12/12/15.
 */

var oldJSON;
var oldJsonObj;
var newJSON;
var newJsonObj;

//display the page with JSON object
function parseJSON(JSONObj)
{
  //set sort by
  document.getElementById("sort_order_select").value = JSONObj.sort_by;
  
  //set hashtag
  jQuery(".tag_button").remove();
  for(var i = 0;i<JSONObj.hashtag.length;i++)
  {
    jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + JSONObj.hashtag[i] + "</button>");
    jQuery(".tag_button").click(function (event){remove_hashtag_button(event)} );
  }

  //set table
  var entrieshtml = "";
  entrieshtml += "<table class='table'>";
  //header of table
  entrieshtml += "<thead>";
  entrieshtml += "<tr>";
  entrieshtml += "<th>Profile Image</th>";
  entrieshtml += "<th>Name</th>";
  entrieshtml += "<th>Operations</th>";
  entrieshtml += "</tr>";
  entrieshtml += "</thead>";
  
  entrieshtml += "<tbody>";
  for(var i = 0;i<JSONObj.influencers.length;i++)
  {
    entrieshtml += "<tr>";
    entrieshtml += "<th><img class='icon' src='"+JSONObj.influencers[i].profile_icon+"'></img></th>";
    entrieshtml += "<th class=\"name\">"+JSONObj.influencers[i].name+"</th>";
    entrieshtml += "<th class=\"function_button_wrapper\"><button class=\"btn btn-link\" id='editbutton"+JSONObj.influencers[i].id+"' data-toggle=\"modal\" data-target=\"#myModal\" onclick='viewandedit(event)'>view&edit</button><br><button class=\"btn btn-link\" id='deletebutton"+JSONObj.influencers[i].id+"' onclick='deleteentry(event)'>delete</button></th>";
    entrieshtml += "</tr>";
  }
  entrieshtml += "</tbody>";
  entrieshtml += "</table>";
  jQuery("#entries").html(entrieshtml);
}

//view and edit an influencer entry
function viewandedit(event)
{
  //alert(jQuery(event.target).attr("id"));
  var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("editbutton")+10);//get the influencer's id
  var id = parseInt(id_str);
  var i;
  for(i = 0;i<newJsonObj.influencers.length;i++)
  {
    if(newJsonObj.influencers[i].id == id)
      break;
  }
  var currentInfluencer = newJsonObj.influencers[i];
  readFromJson(currentInfluencer);
}

function createInfluencer(){
    var emptyJson = jQuery.parseJSON('{"id":0,"name":"","profile_icon":"","description":"","big_image":"","blog":[{"img":  "","description": ""}],'+
        '"style":[{"img":"","main_title":"","subtitle":"","link":""}],'+
        '"picks":[{ "img":"","description":"","money":"","link": ""}]}');
        readFromJson(emptyJson);
}

function remove_hashtag_button(event)
{
  //find the removed hashtag content in newjsonobj
  var j = 0;
  for(;j<newJsonObj.hashtag.length;j++)
  {
    if(newJsonObj.hashtag[j] == event.currentTarget.innerHTML)
      break;
  }
  newJsonObj.hashtag.splice(j,1);
  event.currentTarget.remove();
}


//delete an influencer entry
function deleteentry(event)
{
  //alert(jQuery(event.target).attr("id"));
  if(confirm("Are you sure to delete?") == false)
    return;
  var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("deletebutton")+12);//get the influencer's id
  var id = parseInt(id_str);
  //delete the influencer with this id
  var i;
  for(i = 0;i<newJsonObj.influencers.length;i++)
  {
    if(newJsonObj.influencers[i].id == id)
      break;
  }
  newJsonObj.influencers.splice(i,1);
  parseJSON(newJsonObj);
}

//remove image div
function test(){
    ((event.currentTarget).closest("div")).remove();
}


var influencer_id;

//write the detail page into json object
function writeToJson(){
  var jsonStr = "{";
  var jsonObj;
  jsonStr += "\"id\": " + influencer_id + ", ";
  var modalbody = jQuery(".modal-body")[0];
  var name = jQuery("#name")[0].value;
  jsonStr += "\"name\": \"" + name + "\", ";
  var profile_icon = jQuery("#icon_img", modalbody).attr("src");
  jsonStr += "\"profile_icon\": \"" + profile_icon + "\", ";
  var description = (jQuery("#description", modalbody)[0]).value;
  jsonStr += "\"description\": \"" + description + "\", ";
  var big_image = jQuery("#background_img", modalbody).attr("src");
  jsonStr += "\"big_image\": \"" + big_image + "\", ";

  var blog_div = jQuery("#blog_div");
  var blogs = jQuery(".chunk_div", blog_div);
  jsonStr += "\"blog\": ";
  jsonStr += "[";
  for (var i=0; i<blogs.length; i++){
      jsonStr += "{";

      jsonStr += "\"img\": \"" + jQuery("img", blogs[i]).attr("src") + "\", ";
      jsonStr += "\"description\": \"" + (jQuery("textarea", blogs[i])[0]).value + "\"";

      if(i==blogs.length-1)  jsonStr += "} ";
      else jsonStr += "}, ";
  }
  jsonStr += "], ";

  var style_div = jQuery("#style_div");
  var styles = jQuery(".chunk_div", style_div);
  jsonStr += "\"style\": ";
  jsonStr += "[";
  for (var i=0; i<styles.length; i++){
      jsonStr += "{";

      jsonStr += "\"img\": \"" + jQuery("img", styles[i]).attr("src") + "\", ";
      jsonStr += "\"main_title\": \"" + jQuery("input", styles[i])[1].value + "\", ";
      jsonStr += "\"subtitle\": \"" + jQuery("input", styles[i])[2].value + "\", ";
      jsonStr += "\"link\": \"" + jQuery("input", styles[i])[3].value + "\"";

      if(i==styles.length-1)  jsonStr += "} ";
      else jsonStr += "}, ";
  }
  jsonStr += "], ";

  var pick_div = jQuery("#pick_div");
  var picks = jQuery(".chunk_div", pick_div);
  jsonStr += "\"picks\": ";
  jsonStr += "[";
  for (var i=0; i<picks.length; i++){
      jsonStr += "{";

      jsonStr += "\"img\": \"" + jQuery("img", picks[i]).attr("src") + "\", ";
      jsonStr += "\"description\": \"" + (jQuery("textarea", picks[i])[0]).value + "\", ";
      jsonStr += "\"money\": \"" + jQuery("input", picks[i])[1].value + "\", ";
      jsonStr += "\"link\": \"" + jQuery("input", picks[i])[2].value + "\"";

      if(i==blogs.length-1)  jsonStr += "} ";
      else jsonStr += "}, ";
  }

  jsonStr += "]";

  jsonStr += ("}");

  jsonObj = JSON.parse(jsonStr);

  //change new Json Object
  if(influencer_id == 0)
  {
    jsonObj.id = newJsonObj.global_available_id;
    newJsonObj.global_available_id++;
    newJsonObj.influencers.push(jsonObj);
  }
  else
  {
    var j = 0;
    for(;j<newJsonObj.influencers.length;j++)
    {
      if(newJsonObj.influencers[j].id == influencer_id)
        break;
    }
    newJsonObj.influencers[j] = jsonObj;
  }
  parseJSON(newJsonObj);
}

jQuery("#save_button").click(function(){
    writeToJson();
});


//read json and display the detail page
function readFromJson(data){
    jQuery("#blog_div").html("");
    jQuery("#style_div").html("");
    jQuery("#pick_div").html("");
    influencer_id = data["id"];
    jQuery("#name").val(data["name"]);
    jQuery("#icon_img").attr("src", data["profile_icon"]);
    jQuery("#description").val(data["description"]);

    var blogs = data["blog"];
    for(var i=0; i<blogs.length; i++){
        jQuery("#blog_div").append(
            "<div class=\"chunk_div\">" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<input type=\"file\" class=\"fileUpload\"  onchange='UpLoadFile(event)'>" +
            "<img class=\"entry_picture\" src=\"" +
            data["blog"][i]["img"] +
            "\" alt=\"No file chosen\"/>" +
            "<div class=\"entry\">Description: <textarea class=\"blog_description_textarea entry_textarea\">" +
            data["blog"][i]["description"] +
            "</textarea></div></div>"
        );
    }

    var styles = data["style"];
    for(var i=0; i<styles.length; i++){
        jQuery("#style_div").append(
            "<div class=\"chunk_div\">" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<img class=\"entry_picture\" src=\"" +
            data["style"][i]["img"] +
            "\" alt=\"No file chosen\"/>\ " +
            "<div class=\"entry\">Main Title: <input type=\"text\" class=\"style_main_title_input entry_input\" value=\"" +
            data["style"][i]["main_title"] +
            "\"/></div>" +
            "<div class=\"entry\">Subtitle: <input type=\"text\" class=\"style_subtitle_input entry_input\" value=\"" +
            data["style"][i]["subtitle"] +
            "\"/></div>" +
              "<div class=\"entry\">Link: <input type=\"text\" class=\"style_link_input entry_input\" value=\"" +
                data["style"][i]["link"] +
                "\"/></div>" +"</div>"
        );
    }

    var picks = data["picks"];
    for(var i=0; i<picks.length; i++){
        jQuery("#pick_div").append(
            "<div class=\"chunk_div\">" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
            "<div class=\"entry\">Money: <input type=\"text\" class=\"pick_money_input entry_input\" value=\"" +
            data["picks"][i]["money"] +
            "\"/></div>" +
            "<div class=\"entry\">Link: <input type=\"text\" class=\"pick_link_input entry_input\" value=\"" +
            data["picks"][i]["link"] +
            "\"/></div>" +
            "<div class=\"entry\">Description: <textarea class=\"pick_description_textarea entry_textarea\">" +
            data["picks"][i]["description"]  +
            "</textarea></div></div>"
        );
    }


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
    success:function(result)
    {
      //alert(result);
      var target = event.target;
      var parent = target.parentElement;
      var imgtag = parent.getElementsByTagName("img")[0];
      jQuery(imgtag).attr("src",result);
      //jQuery("#showimg").attr("src",result);
    },
    error:function()
    {
      alert("error!");
    }
  });
}

function updateAll()
{
  if(confirm("Are you sure to update?") == false)
    return;
  var sortby = document.getElementById("sort_order_select");
  var selectedvalue = sortby.options[sortby.selectedIndex].value;
  newJsonObj.sort_by = selectedvalue;
  newJSON = JSON.stringify(newJsonObj);
  jQuery.ajax({
    type:"POST",
    data:{"data":newJSON},
    url:"saveinfluencerinfo.php",
    success: function(result)
    {
      var resultJson = JSON.parse(result);
      if(resultJson.status == "error")
      {
        alert(resultJson.message);
        return;
      }
      else
      {
        oldJSON = JSON.stringify(newJsonObj);
        oldJsonObj = JSON.parse(oldJSON);
        parseJSON(oldJsonObj);
        alert("Update succeeded!");
      }
    },
    error:function()
    {
      alert("error!");
    }
  });
}

jQuery(document).ready(function(){
  
    jQuery.ajax({
    type:"GET",
    url:"getinfluencerinfo.php",
    success:function(result)
    {
      oldJSON = result;
      oldJsonObj = JSON.parse(result);
      newJSON = result;
      newJsonObj = JSON.parse(result);
      parseJSON(oldJsonObj);
    },
    error:function()
    {
      alert("error!");
    }
  });
  

    jQuery("#create_button").click(function(){
        createInfluencer();
    });
  
  jQuery("#reset_button").click(function(){
    newJSON = oldJSON;
    newJsonObj = JSON.parse(newJSON);
    parseJSON(oldJsonObj);
  });

    var input_open = false;
    var new_tag_content = "";
    var tags = [];

    jQuery("#add_tag_button").click(function(){

        if(input_open){
                new_tag_content = jQuery("#new_tag_input").val();
                input_confirm();
        }
        else{
            jQuery("#tag_pool").append("<input type=\"text\" name=\"input\" id=\"new_tag_input\">");
            input_open = true;
            jQuery("#new_tag_input").keypress(function (event) {
                if (event.which == 13) {
                    new_tag_content = jQuery("#new_tag_input").val();
                    input_confirm();
                }
            });
        }

    });

    function input_confirm() {
        if(new_tag_content.length != 0) {
            jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
            newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
            jQuery("#new_tag_input").remove();
            input_open = false;
            jQuery(".tag_button").click(function (event){remove_hashtag_button(event)} );
        }
    }
  
    



    //Chunk

    jQuery("#blog_add_button").click(function(){
        jQuery("#blog_div").append(
            "<div class=\"chunk_div\">\n                            <!--<button class=\"choose_file_buttons btn btn-link\">Choose File</button>-->\n                            <input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>\n                            <button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>\n                            <!--<div class=\"entry_picture\">-->\n                            <img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>\n                            <!--</div>-->\n                            <div class=\"entry\">Description: <textarea class=\"blog_description_textarea entry_textarea\"></textarea></div>\n                        </div>"
        );
    });

    jQuery("#style_add_button").click(function(){
        console.log("style_add_button clicked");
        jQuery("#style_div").append(
            "<div class=\"chunk_div\">\n                            <!--<button class=\"choose_file_buttons btn btn-link\">Choose File</button>-->\n                            <input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>\n                            <button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>\n                            <!--<div class=\"entry_picture\">-->\n                            <img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>\n                            <!--</div>-->\n\n                            <div class=\"entry\">Main Title: <input type=\"text\" class=\"style_main_title_input entry_input\"/></div>\n                            <div class=\"entry\">Subtitle: <input type=\"text\" class=\"style_subtitle_input entry_input\"/></div>\n                            <div class=\"entry\">Link: <input type=\"text\" class=\"style_link_input entry_input\"/></div>\n                            <div class=\"entry\">Description: <textarea class=\"style_description_textarea entry_textarea\"></textarea></div>\n                        </div>"
        );
    });

    jQuery("#pick_add_button").click(function(){
        jQuery("#pick_div").append(
            "<div class=\"chunk_div\">\n                            <!--<button class=\"choose_file_buttons btn btn-link\">Choose File</button>-->\n                            <input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>\n                            <button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>\n                            <!--<div class=\"entry_picture\">-->\n                            <img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>\n                            <!--</div>-->\n\n                            <div class=\"entry\">Money: <input type=\"text\" class=\"pick_money_input entry_input\"/></div>\n                            <div class=\"entry\">Link: <input type=\"text\" class=\"pick_link_input entry_input\"/></div>\n                            <div class=\"entry\">Description: <textarea class=\"pick_description_textarea entry_textarea\"></textarea></div>\n                        </div>"
        );
    });


});