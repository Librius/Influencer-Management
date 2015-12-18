<?php

if(isset($_POST["data"]))
{
  $data = json_decode($_POST["data"]);
  if(!isset($data->sort_by))
  {
    $result = array("status"=>"error","message"=>"Please choose a way to sort.")
    echo json_encode($result);
    return;
  }
  if(!isset($data->hashtag) || count($data->hashtag) == 0)
  {
    $result = array("status"=>"error","message"=>"Please add at least one hashtag.")
    echo json_encode($result);
    return;
  }
  if(!isset($data->influencers) || count($data->influencers) == 0)
  {
    $result = array("status"=>"error","message"=>"Please add at least one influencer.")
    echo json_encode($result);
    return;
  }
  for($i = 0;$i<count($data->influencers);$i++)
  {
    if(!isset($data->influencer[$i]->name) || trim($data->influencer[$i]->name) == "")
    {
      $result = array("status"=>"error","message"=>"Please write the names of every influencer.")
      echo json_encode($result);
      return;
    }
    if(!isset($data->influencer[$i]->profile_icon) || trim($data->influencer[$i]->profile_icon) == "")
    {
      $result = array("status"=>"error","message"=>"Please add a profile icon for every influencer.")
      echo json_encode($result);
      return;
    }
    if(!isset($data->influencer[$i]->description) || trim($data->influencer[$i]->description) == "")
    {
      $result = array("status"=>"error","message"=>"Please write a description for every influencer.")
      echo json_encode($result);
      return;
    }
    if(!isset($data->influencer[$i]->big_image) || trim($data->influencer[$i]->big_image))
    {
      $result = array("status"=>"error","message"=>"Please add a big image for every influencer.")
      echo json_encode($result);
      return;
    }
    if(!isset($data->influencer[$i]->blog) || count($data->influencer[$i]->blog) == 0)
    {
      $result = array("status"=>"error","message"=>"Each influencer should have at least one blog.")
      echo json_encode($result);
      return;
    }
    //check each blog
    for($j = 0;$j<count($data->influencer[$i]->blog);$j++)
    {
      if(!isset($data->influencer[$i]->blog[$j]->img))
      {
        $result = array("status"=>"error","message"=>"Each blog should have an image.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->blog[$j]->description))
      {
        $result = array("status"=>"error","message"=>"Each blog should have a description.")
        echo json_encode($result);
        return;
      }
    }
    if(!isset($data->influencer[$i]->style) || count($data->influencer[$i]->style) == 0)
    {
      $result = array("status"=>"error","message"=>"Each influencer should have at least one style.")
      echo json_encode($result);
      return;
    }
    //check each style
    for($j = 0;$j<count($data->influencer[$i]->style);$j++)
    {
      if(!isset($data->influencer[$i]->style[$j]->img))
      {
        $result = array("status"=>"error","message"=>"Each style should have an image.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->style[$j]->main_title))
      {
        $result = array("status"=>"error","message"=>"Each style should have a main title.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->style[$j]->subtitle))
      {
        $result = array("status"=>"error","message"=>"Each style should have a subtitle.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->style[$j]->link))
      {
        $result = array("status"=>"error","message"=>"Each style should have a link.")
        echo json_encode($result);
        return;
      }
    }
    if(!isset($data->influencer[$i]->picks) || count($data->influencer[$i]->picks) == 0)
    {
      $result = array("status"=>"error","message"=>"Each influencer should have at least one pick.")
      echo json_encode($result);
      return;
    }
    //check each pick
    for($j = 0;$j<count($data->influencer[$i]->picks);$j++)
    {
      if(!isset($data->influencer[$i]->picks[$j]->img))
      {
        $result = array("status"=>"error","message"=>"Each pick should have an image.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->picks[$j]->description))
      {
        $result = array("status"=>"error","message"=>"Each pick should have a description.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->picks[$j]->money))
      {
        $result = array("status"=>"error","message"=>"Each pick should have a prize.")
        echo json_encode($result);
        return;
      }
      if(!isset($data->influencer[$i]->picks[$j]->link))
      {
        $result = array("status"=>"error","message"=>"Each pick should have a link.")
        echo json_encode($result);
        return;
      }
    }
  }
  
  $myfile = fopen("influencerinfo.txt", "w") or die("Unable to open file!");
  fwrite($myfile, $_POST["data"]);
  fclose($myfile);
  
}

?>