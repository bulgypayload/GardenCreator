<?php   
header("Content-Type: application/json; charset=UTF-8");
$json = $_POST["x"]; 
   /* sanity check */
   if ($json != null)
   {
     $file = fopen("garden2.json","w+");
     fwrite($file, $json);
     fclose($file);
   }  
   echo("Saved");   
?>
