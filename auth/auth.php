<?php
#######################################################################
#
# Auth layout file included by index.php, variable from it:
# 
# $ss - session
# $db - DB connection
# $page - html page to print out
# $ma["$menu"] - selected module from modules array
#
#######################################################################


if ($ss->isAuth()) {
    $page .= file_get_contents($ma["$menu"]->folder.'/logout.html');
} else {
    $page .= file_get_contents($ma["$menu"]->folder.'/login.html');
}

?>
