<?php
if(isset($_POST["data"]))
{
    for($i = 0;$i<count($data->events);$i++)
    {
        if(!isset($data->events[$i]->name) || trim($data->events[$i]->name) == "")
        {
            $result = array("status"=>"error","message"=>"Please write the name of every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->time_begin) || trim($data->events[$i]->time_begin) == "")
        {
            $result = array("status"=>"error","message"=>"Please select a beginning time for every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->time_end) || trim($data->events[$i]->time_end) == "")
        {
            $result = array("status"=>"error","message"=>"Please select an end time for every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->brief) || trim($data->events[$i]->brief) == "")
        {
            $result = array("status"=>"error","message"=>"Please write a brief introduction for every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->event_hashtag) || count($data->events[$i]->event_hashtag) == 0)
        {
            $result = array("status"=>"error","message"=>"Please add at least one hashtag.");
            echo json_encode($result);
            return;
        }

        // check big images
        if(!isset($data->events[$i]->big_image) || count($data->events[$i]->big_image) == 0)
        {
            $result = array("status"=>"error","message"=>"Each event should have at least one big image.");
            echo json_encode($result);
            return;
        }
        for($j = 0;$j<count($data->events[$i]->blog);$j++)
        {
            if(!isset($data->events[$i]->big_image[$j]->url) || trim($data->events[$i]->big_image[$j]->url) == "")
            {
                $result = array("status"=>"error","message"=>"Each blog should have an image.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->big_image[$j]->main_title) || trim($data->events[$i]->big_image[$j]->main_title) == "")
            {
                $result = array("status"=>"error","message"=>"Each blog should have a main title.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->big_image[$j]->subtitle) || trim($data->events[$i]->big_image[$j]->subtitle) == "")
            {
                $result = array("status"=>"error","message"=>"Each blog should have a subtitle.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->big_image[$j]->link) || trim($data->events[$i]->big_image[$j]->link) == "")
            {
                $result = array("status"=>"error","message"=>"Each blog should have a link.");
                echo json_encode($result);
                return;
            }
        }

//
//        if(!isset($data->events[$i]->style) || count($data->events[$i]->style) == 0)
//        {
//            $result = array("status"=>"error","message"=>"Each event should have at least one style.");
//            echo json_encode($result);
//            return;
//        }
//        //check each style
//        $n = count($data->events[$i]->style);
//        if ($n!=5) {
//            $result = array("status"=>"error","message"=>"There should be five images for style.");
//            echo json_encode($result);
//            return;
//        }
//        for($j = 0;$j<count($data->events[$i]->style);$j++)
//        {
//            if(!isset($data->events[$i]->style[$j]->img) || trim($data->events[$i]->style[$j]->img) == "")
//            {
//                $result = array("status"=>"error","message"=>"Each style should have a image.");
//                echo json_encode($result);
//                return;
//            }
////      if(!isset($data->events[$i]->style[$j]->main_title) || trim($data->events[$i]->style[$j]->main_title) == "")
////      {
////        $result = array("status"=>"error","message"=>"Each style should have a main title.");
////        echo json_encode($result);
////        return;
////      }
////      if(!isset($data->events[$i]->style[$j]->subtitle) || trim($data->events[$i]->style[$j]->subtitle) == "")
////      {
////        $result = array("status"=>"error","message"=>"Each style should have a subtitle.");
////        echo json_encode($result);
////        return;
////      }
//            if(!isset($data->events[$i]->style[$j]->link) || trim($data->events[$i]->style[$j]->link) == "")
//            {
//                $result = array("status"=>"error","message"=>"Each style should have a link.");
//                echo json_encode($result);
//                return;
//            }
//        }
//        if(!isset($data->events[$i]->picks) || count($data->events[$i]->picks) == 0)
//        {
//            $result = array("status"=>"error","message"=>"Each event should have at least one pick.");
//            echo json_encode($result);
//            return;
//        }
//        //check each pick
//        for($j = 0;$j<count($data->events[$i]->picks);$j++)
//        {
//            if(!isset($data->events[$i]->picks[$j]->img) || trim($data->events[$i]->picks[$j]->img) == "")
//            {
//                $result = array("status"=>"error","message"=>"Each pick should have an image.");
//                echo json_encode($result);
//                return;
//            }
//            if(!isset($data->events[$i]->picks[$j]->description) || trim($data->events[$i]->picks[$j]->description) == "")
//            {
//                $result = array("status"=>"error","message"=>"Each pick should have a description.");
//                echo json_encode($result);
//                return;
//            }
//            if(!isset($data->events[$i]->picks[$j]->money) || trim($data->events[$i]->picks[$j]->money) == "")
//            {
//                $result = array("status"=>"error","message"=>"Each pick should have a prize.");
//                echo json_encode($result);
//                return;
//            }
//            if(!isset($data->events[$i]->picks[$j]->link) || trim($data->events[$i]->picks[$j]->link) == "")
//            {
//                $result = array("status"=>"error","message"=>"Each pick should have a link.");
//                echo json_encode($result);
//                return;
//            }
//        }
    }
}
?>