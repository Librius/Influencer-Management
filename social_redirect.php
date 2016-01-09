<?php
    if($_GET['media']=='facebook')
        header("Location: https://www.facebook.com/");
    else if($_GET['media']=='instagram')
        header("Location: https://www.instagram.com/");
    else if($_GET['media']=='twitter')
        header("Location: https://twitter.com/");
?>