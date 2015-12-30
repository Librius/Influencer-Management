/**
 * Created by developer on 12/29/15.
 */
jQuery(document).ready(function() {

    //chunk add

    jQuery("#big_img_add_btn").click(function(){
        jQuery("#big_img_div").append(
            "<div class=\"chunk_div\">" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
            "</div>"
        );
    });

    jQuery("#middle_img_add_btn").click(function(){
        jQuery("#middle_img_div").append(
            "<div class=\"chunk_div\">" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
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
    var tags = [];

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
            //newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
            jQuery("#new_tag_input").remove();
            input_open = false;
            jQuery(".tag_button").click(function (event) {
                remove_hashtag_button(event)
            });
        }
    }
});