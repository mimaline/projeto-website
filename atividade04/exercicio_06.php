<!-- 6. Faça um script PHP que imprima "second" and "Red" a partir do array abaixo:
Scolor = array ("color" =› array ("a"=> "Red", "6" =*Green", ""=> "White"),
"numbers" => array (1,2,3,4,5,6),
"'holes"=> array ( "First", 5 =› "Second", "Third")); -->

<?php

$color = array ("color"=> array ("a"=> "Red", "b" =>"Green", "c"=>"White"),
                "numbers" => array (1,2,3,4,5,6),
                "holes"=> array ( "First", 5 => "Second", "Third"));

echo $color['holes']['5'] . ' ' .$color['color']['a'];