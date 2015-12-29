<?php

  $taglist = array();
  $tokenlist = array();

  $influencerfile = fopen("influencerinfo.txt", "r") or die("Unable to open influencerinfo.txt!");
  $content = fread($influencerfile,filesize("influencerinfo.txt"));
  $json = json_decode($content);
  $taglist = $json->hashtag;

  $handle = fopen("tokenlist.txt", "r") or die("Unable to open tokenlist.txt!");
  if ($handle) {
     while (($buffer = fgets($handle, 4096)) !== false) {
         array_push($tokenlist,trim($buffer));
     }
     if (!feof($handle)) {
         echo "Error: unexpected fgets() fail\n";
     }
     fclose($handle);
  }
  $html = array();
  for($i=0;$i<count($taglist);$i++)
  {
    for($j=0;$j<count($tokenlist);$j++)
    {
      $getlinkurl="https://api.instagram.com/v1/tags/".$taglist[$i]."/media/recent?access_token=".$tokenlist[$j];
      $getlinkjson = json_decode(file_get_contents($getlinkurl));
      if(isset($getlinkjson->data) && count($getlinkjson->data)>0)
      {
        for($k=0;$k<count($getlinkjson->data);$k++)
        {
          if(isset($getlinkjson->data[$k]->link))
          {
            $urllink = $getlinkjson->data[$k]->link;
            $embedurl = "http://api.instagram.com/oembed?url=".$urllink;
            $embedjson = json_decode(file_get_contents($embedurl));
            if(isset($embedjson) && isset($embedjson->html))
            {
              array_push($html,array("html"=>$embedjson->html,"createtime"=>$getlinkjson->data[$k]->created_time,"likes"=>$getlinkjson->data[$k]->likes->count));
            }
          }
        }
      }
      else
      {
        continue;
      }
    }
  }
  if($json->sort_by == "time")
  {
    usort($html, function($a, $b) {
      return $b['createtime'] - $a['createtime'];
    });
  }
  else if($json->sort_by == "like")
  {
    usort($html, 'likecmp');
  }

  function likecmp($a, $b)
  {
      if ($a['likes'] == $b['likes']) {
          return 0;
      }
      return ($a['likes'] < $b['likes']) ? 1 : -1;
  }
  echo json_encode($html);
  
?>