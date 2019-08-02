<?php
	header("Content-type:text/html;charset=utf-8");
	
	$conn = mysql_connect("localhost","root","root");

	if(!$conn){
			echo "失败";
			
	    }
	    mysql_select_db("suning",$conn);	

	    $result= mysql_query("select * from youlike"); 

	    $results = array();	//定一个空数组
	    // $row = mysql_fetch_array($result);

	    if($result) {
	    	while ($row = mysql_fetch_array($result)) {
	    		 $results[] = $row;
	    	}
	    }

	    function gbk2utf8($results)
		{
		 if(is_array($results))
		  {
		    return array_map('gbk2utf8', $results);
		  }
		 return iconv('gbk','utf-8',$results);
		}

		$rows = mysql_num_rows($result);

	    if($results){
	      	echo json_encode(gbk2utf8($results),JSON_UNESCAPED_UNICODE);//将数组转换为JSON格式      
	      	// echo $rows;
	    }

	mysql_close($conn)
?>