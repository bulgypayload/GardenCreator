<?php
   $json = json_decode($_POST['x'], false);

   /* sanity check */
   if ($json != null)
   {
     $file = fopen('garden2.json','w+');
     fwrite($file, $json);
     fclose($file);
   }   
?>
