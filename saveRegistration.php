<?php

$myfile = fopen("allInfluencer.txt", "w") or die("Unable to open file!");
fwrite($myfile, "test");
fclose($myfile);
//$result = array("status"=>"success","message"=>"OK.");
//echo json_encode($result);

if(isset($_POST["data"]))
{
    $data = json_decode($_POST["data"]);

//    for($i = 0;$i<count($data->influencers);$i++)
//    {
//        if(!isset($data->influencers[$i]->first_name) || trim($data->influencers[$i]->first_name) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the first name of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->last_name) || trim($data->influencers[$i]->last_name) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the last name of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->blog) || trim($data->influencers[$i]->blog) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the blog of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->facebook) || trim($data->influencers[$i]->facebook) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the facebook of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->instagram) || trim($data->influencers[$i]->instagram) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the instagram of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->youtube) || trim($data->influencers[$i]->youtube) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the youtube of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->country) || trim($data->influencers[$i]->country) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the country of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->email) || trim($data->influencers[$i]->email) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the email of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//        if(!isset($data->influencers[$i]->status) || trim($data->influencers[$i]->status) == "")
//        {
//            $result = array("status"=>"error","message"=>"Please write the status of every influencer.");
//            echo json_encode($result);
//            return;
//        }
//    }

    $myfile = fopen("allInfluencer.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $_POST["data"]);
    fclose($myfile);
    $result = array("status"=>"success","message"=>"OK.");
    echo json_encode($result);
}

?>