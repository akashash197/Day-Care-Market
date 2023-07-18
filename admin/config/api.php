<?php 
include("dbconnect.php");

$api_name=$_GET['api_name'];

/*****
	API For : Country List
*****/

if($api_name=="country_list")
{
		$country_query="select * from tbl_country";
		$country_data=$conn->query($country_query);
		$final_arr=array();
		$cnt=0;
		while($row=$country_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"Country List","data"=>$final_arr));
	die();
}

/*****
	API For : Login
*****/
if($api_name=="userlogin")
{
	if(isset($_GET['loginArr']) && !empty($_GET['loginArr']))
	{
		$loginArr = json_decode($_GET['loginArr'], true);
        $username = $loginArr['userName'];
        $password = md5($loginArr['userPassword']);
		$login_query="select * from tbl_user where email='".$username."' and password='".$password."'";
		$login_data=$conn->query($login_query);
		$final_arr=array();
		$cnt=0;
		

		if ($login_data->num_rows > 0){
			while($row=$login_data->fetch_assoc())
			{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['username']=$row['email'];
            $final_arr[$cnt]['first_name']=$row['first_name'];
            $final_arr[$cnt]['last_name']=$row['last_name'];
			
			$cnt++;	
			}
			
		}	

		
		
		echo json_encode(array("status"=>true,"msg"=>"Login Data!","data"=>$final_arr));
		die();
	}
	else
	{
		echo json_encode(array("status"=>0,"msg"=>"Invalid Paramter"));
		die();
	}
}


/*****
	API For : Country Add
*****/
if ($api_name == "countryAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $countryaddArr = json_decode($postData, true);

        if (isset($countryaddArr['countryName']) && !empty($countryaddArr['countryName'])) {
            $name = $countryaddArr['countryName'];
            $today_date = date("y-m-d");

            $userquery = "INSERT INTO tbl_country(name, created_on, updated_on) VALUES('" . $name . "','" . $today_date . "','" . $today_date . "')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Country Edit
*****/
if ($api_name == "countryEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $countryEditArr = json_decode($postData, true);

        if (isset($countryEditArr) && !empty($countryEditArr)) {
            $name = $countryEditArr['countryName'];
			$country_id = $countryEditArr['id'];
            $today_date = date("y-m-d");

            $userquery="update tbl_country set name='".$name."',updated_on='".$today_date."' where id='".$country_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Country Delete
*****/
if ($api_name == "countryDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $countryDeleteArr = json_decode($postData, true);

        if (isset($countryDeleteArr) && !empty($countryDeleteArr)) {
           
			$country_id = $countryDeleteArr['id'];
           

            $delete_query="delete from tbl_country where id='".$country_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : State List
*****/

if($api_name=="state_list")
{
		$state_query="select tbl_state.*,tbl_country.name as country_name from tbl_state
									 join tbl_country on tbl_state.country_id=tbl_country.id";
		$state_data=$conn->query($state_query);
		$final_arr=array();
		$cnt=0;
		while($row=$state_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$final_arr[$cnt]['country_name']=$row['country_name'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"State List","data"=>$final_arr));
	die();
}

/*****
	API For : State Add
*****/
if ($api_name == "stateAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $stateaddArr = json_decode($postData, true);

        if (isset($stateaddArr) && !empty($stateaddArr)) {
            $name = $stateaddArr['stateName'];
			$country_id = $stateaddArr['countryId'];

            $today_date = date("y-m-d");

            $userquery="insert into tbl_state(name,country_id,created_on,updated_on) values('".$name."','".$country_id."','".$today_date."','".$today_date."')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : State Edit
*****/
if ($api_name == "stateEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $stateEditArr = json_decode($postData, true);

        if (isset($stateEditArr) && !empty($stateEditArr)) {
            $name = $stateEditArr['stateName'];
			$country_id = $stateEditArr['countryId'];
			$state_id = $stateEditArr['id'];
            $today_date = date("y-m-d");

            $userquery="update tbl_state set name='".$name."',country_id='".$country_id."',updated_on='".$today_date."' where id='".$state_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : State Delete
*****/
if ($api_name == "stateDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $stateDeleteArr = json_decode($postData, true);

        if (isset($stateDeleteArr) && !empty($stateDeleteArr)) {
           
			$state_id = $stateDeleteArr['id'];
           

            $delete_query="delete from tbl_state where id='".$state_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : City List
*****/

if($api_name=="city_list")
{
    $city_query="select tbl_city.*,tbl_country.name as country_name,tbl_state.name as state_name from tbl_city 
                 join tbl_state on tbl_city.state_id=tbl_state.id 
                 join tbl_country on tbl_city.country_id=tbl_country.id;";
		$city_data=$conn->query($city_query);
		$final_arr=array();
		$cnt=0;
		while($row=$city_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$final_arr[$cnt]['country_name']=$row['country_name'];
            $final_arr[$cnt]['state_name']=$row['state_name'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"City List","data"=>$final_arr));
	die();
}

/*****
	API For : City Add
*****/
if ($api_name == "cityAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $cityaddArr = json_decode($postData, true);

        if (isset($cityaddArr) && !empty($cityaddArr)) {
            $name = $cityaddArr['cityName'];
			$country_id = $cityaddArr['countryId'];
            $state_id = $cityaddArr['stateId'];

            $today_date = date("y-m-d");

            $userquery="insert into tbl_city(name,country_id,state_id,created_on,updated_on) values('".$name."','".$country_id."','".$state_id."','".$today_date."','".$today_date."')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : City Edit
*****/
if ($api_name == "cityEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $cityEditArr = json_decode($postData, true);

        if (isset($cityEditArr) && !empty($cityEditArr)) {
            $name = $cityEditArr['cityName'];
			$country_id = $cityEditArr['countryId'];
            $state_id = $cityEditArr['stateId'];
            $city_id = $cityEditArr['id'];

            $today_date = date("y-m-d");

            $userquery="update tbl_city set name='".$name."',country_id='".$country_id."',state_id='".$state_id."',updated_on='".$today_date."' where id='".$city_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : City Delete
*****/
if ($api_name == "cityDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $cityDeleteArr = json_decode($postData, true);

        if (isset($cityDeleteArr) && !empty($cityDeleteArr)) {
           
			$city_id = $cityDeleteArr['id'];
           

            $delete_query="delete from tbl_city where id='".$city_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Location List
*****/

if($api_name=="location_list")
{
    $location_query="select tbl_location.*,tbl_country.name as country_name,tbl_state.name as state_name,tbl_city.name as city_name from tbl_location 
                    join tbl_state on tbl_location.state_id=tbl_state.id 
                    join tbl_country on tbl_location.country_id=tbl_country.id 
                    join tbl_city on tbl_location.city_id=tbl_city.id;";
		$location_data=$conn->query($location_query);
		$final_arr=array();
		$cnt=0;
		while($row=$location_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$final_arr[$cnt]['country_name']=$row['country_name'];
            $final_arr[$cnt]['state_name']=$row['state_name'];
            $final_arr[$cnt]['city_name']=$row['city_name'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"Location List","data"=>$final_arr));
	die();
}

/*****
	API For : Location Add
*****/
if ($api_name == "locationAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $locationaddArr = json_decode($postData, true);

        if (isset($locationaddArr) && !empty($locationaddArr)) {
            $name = $locationaddArr['locationName'];
			$country_id = $locationaddArr['countryId'];
            $state_id = $locationaddArr['stateId'];
            $city_id = $locationaddArr['cityId'];

            $today_date = date("y-m-d");

            $userquery="insert into tbl_location(name,country_id,state_id,city_id,created_on,updated_on) values('".$name."','".$country_id."','".$state_id."','".$city_id."','".$today_date."','".$today_date."')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Location Edit
*****/
if ($api_name == "locationEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $locationEditArr = json_decode($postData, true);

        if (isset($locationEditArr) && !empty($locationEditArr)) {
            $name = $locationEditArr['locationName'];
			$country_id = $locationEditArr['countryId'];
            $state_id = $locationEditArr['stateId'];
            $city_id = $locationEditArr['cityId'];
            $location_id = $locationEditArr['id'];

            $today_date = date("y-m-d");

            $userquery="update tbl_location set name='".$name."',country_id='".$country_id."',state_id='".$state_id."',city_id='".$city_id."',updated_on='".$today_date."' where id='".$location_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Location Delete
*****/
if ($api_name == "locationDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $locationDeleteArr = json_decode($postData, true);

        if (isset($locationDeleteArr) && !empty($locationDeleteArr)) {
           
			$location_id = $locationDeleteArr['id'];
           

            $delete_query="delete from tbl_location where id='".$location_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}


/*****
	API For : Category List
*****/

if($api_name=="category_list")
{
		$category_query="select * from tbl_category";
		$category_data=$conn->query($category_query);
		$final_arr=array();
		$cnt=0;
		while($row=$category_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"Category List","data"=>$final_arr));
	die();
}

/*****
	API For : Category Add
*****/
if ($api_name == "categoryAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $categoryAddArr = json_decode($postData, true);

        if (isset($categoryAddArr) && !empty($categoryAddArr)) {
            $name = $categoryAddArr['categoryName'];
            $today_date = date("y-m-d");

            $userquery = "INSERT INTO tbl_category(name, created_on, updated_on) VALUES('" . $name . "','" . $today_date . "','" . $today_date . "')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Category Edit
*****/
if ($api_name == "categoryEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $categoryEditArr = json_decode($postData, true);

        if (isset($categoryEditArr) && !empty($categoryEditArr)) {
            $name = $categoryEditArr['categoryName'];
            $category_id = $categoryEditArr['id'];

            $today_date = date("y-m-d");

            $userquery="update tbl_category set name='".$name."',updated_on='".$today_date."' where id='".$category_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Category Delete
*****/
if ($api_name == "categoryDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $categoryDeleteArr = json_decode($postData, true);

        if (isset($categoryDeleteArr) && !empty($categoryDeleteArr)) {
           
			$category_id = $categoryDeleteArr['id'];
           

            $delete_query="delete from tbl_category where id='".$category_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Brand List
*****/

if($api_name=="brand_list")
{
		$brand_query="select * from tbl_brand";
		$brand_data=$conn->query($brand_query);
		$final_arr=array();
		$cnt=0;
		while($row=$brand_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"Brand List","data"=>$final_arr));
	die();
}

/*****
	API For : Brand Add
*****/
if ($api_name == "brandAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $brandAddArr = json_decode($postData, true);

        if (isset($brandAddArr) && !empty($brandAddArr)) {
            $name = $brandAddArr['brandName'];
            $today_date = date("y-m-d");

            $userquery = "INSERT INTO tbl_brand(name, created_on, updated_on) VALUES('" . $name . "','" . $today_date . "','" . $today_date . "')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Brand Edit
*****/
if ($api_name == "brandEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $brandEditArr = json_decode($postData, true);

        if (isset($brandEditArr) && !empty($brandEditArr)) {
            $name = $brandEditArr['brandName'];
            $brand_id = $brandEditArr['id'];

            $today_date = date("y-m-d");

            $userquery="update tbl_brand set name='".$name."',updated_on='".$today_date."' where id='".$brand_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Brand Delete
*****/
if ($api_name == "brandDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $brandDeleteArr = json_decode($postData, true);

        if (isset($brandDeleteArr) && !empty($brandDeleteArr)) {
           
			$brand_id = $brandDeleteArr['id'];
           

            $delete_query="delete from tbl_brand where id='".$brand_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Tax List
*****/

if($api_name=="tax_list")
{
		$tax_query="select * from tbl_tax";
		$tax_data=$conn->query($tax_query);
		$final_arr=array();
		$cnt=0;
		while($row=$tax_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
            $final_arr[$cnt]['slab']=$row['slab'];
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"Tax List","data"=>$final_arr));
	die();
}

/*****
	API For : Tax Add
*****/
if ($api_name == "taxAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $taxAddArr = json_decode($postData, true);

        if (isset($taxAddArr) && !empty($taxAddArr)) {
            $name = $taxAddArr['taxName'];
            $slab = $taxAddArr['slab'];
            $today_date = date("y-m-d");

            $userquery = "INSERT INTO tbl_tax(name, slab, created_on, updated_on) VALUES('" . $name . "','" . $slab . "','" . $today_date . "','" . $today_date . "')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Tax Edit
*****/
if ($api_name == "taxEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $taxEditArr = json_decode($postData, true);

        if (isset($taxEditArr) && !empty($taxEditArr)) {
            $name = $taxEditArr['taxName'];
            $slab = $taxEditArr['slab'];
            $tax_id = $taxEditArr['id'];

            $today_date = date("y-m-d");

            $userquery="update tbl_tax set name='".$name."',slab='".$slab."',updated_on='".$today_date."' where id='".$tax_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : Tax Delete
*****/
if ($api_name == "taxDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $taxDeleteArr = json_decode($postData, true);

        if (isset($taxDeleteArr) && !empty($taxDeleteArr)) {
           
			$tax_id = $taxDeleteArr['id'];
           

            $delete_query="delete from tbl_tax where id='".$tax_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : User List
*****/

if($api_name=="user_list")
{
		$user_query="select * from tbl_user";
		$user_data=$conn->query($user_query);
		$final_arr=array();
		$cnt=0;
		while($row=$user_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['first_name']=$row['first_name'];
            $final_arr[$cnt]['last_name']=$row['last_name'];
            $final_arr[$cnt]['email']=$row['email'];
            $final_arr[$cnt]['user_role']=$row['user_role'];
            
			$cnt++;	
	}

	echo json_encode(array("status"=>1,"msg"=>"User List","data"=>$final_arr));
	die();
}

/*****
	API For : User Add
*****/
/*****
	API For : User Add
*****/
if ($api_name == "userAdd") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $userAddArr = json_decode($postData, true);

        if (isset($userAddArr) && !empty($userAddArr)) {
            $first_name = $userAddArr['firstName'];
            $last_name = $userAddArr['lastName'];
            $email = $userAddArr['email'];
            $password = md5($userAddArr['password']);
            $user_role = $userAddArr['userRole'];
            
            $today_date = date("y-m-d");

            $data_check=$conn->query("select * from tbl_user where email='".$email."'");

            if ($data_check->num_rows > 0){
                echo json_encode(array("status" => 0, "msg" => "Email Already Exist"));
                die();

            }

            else{
            $userquery="insert into tbl_user(first_name,last_name,email,password,created_on,updated_on,user_role) values('".$first_name."','".$last_name."','".$email."','".$password."','".$today_date."','".$today_date."','".$user_role."')";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();
            }
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : User Edit
*****/
if ($api_name == "userEdit") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $userEditArr = json_decode($postData, true);

        if (isset($userEditArr) && !empty($userEditArr)) {
            $first_name = $userEditArr['firstName'];
            $last_name = $userEditArr['lastName'];
            $email = $userEditArr['email'];
            $user_role = $userEditArr['userRole'];
            $user_id = $userEditArr['id'];
            
            $today_date = date("y-m-d");

            $userquery="update tbl_user set first_name='".$first_name."',last_name='".$last_name."',email='".$email."',user_role='".$user_role."',updated_on='".$today_date."' where id='".$user_id."'";

            $result = $conn->query($userquery);
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();

        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : User Edit Password
*****/
if ($api_name == "userEditPass") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $userEditPassArr = json_decode($postData, true);

        if (isset($userEditPassArr) && !empty($userEditPassArr)) {

            $password = md5($userEditPassArr['password']);
            $user_id = $userEditPassArr['id'];
            
            $today_date = date("y-m-d");

            $userquery="update tbl_user set password='".$password."',updated_on='".$today_date."' where id='".$user_id."'";

            $result = $conn->query($userquery);
            
            echo json_encode(array("status" => 1, "msg" => "Successful."));
			die();

        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

/*****
	API For : User Delete
*****/
if ($api_name == "userDelete") {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Check if the request method is POST
        $postData = file_get_contents('php://input');
        $userDeleteArr = json_decode($postData, true);

        if (isset($userDeleteArr) && !empty($userDeleteArr)) {
           
			$user_id = $userDeleteArr['id'];
           

            $delete_query="delete from tbl_user where id='".$user_id."'";

            $conn->query($delete_query);
            echo json_encode(array("status" => 1, "msg" => "Successfully deleted"));
			die();
        } 
		
		else {
            echo json_encode(array("status" => 0, "msg" => "Invalid Parameter"));
        }

    } 
	
	else {
        echo json_encode(array("status" => 0, "msg" => "Invalid Request Method"));
    }
}

?>



<?php
/*****
	API For : State List in dropdown
*****/

if($api_name=="state_droplist")
{
	if(isset($_GET['country_id']) && !empty($_GET['country_id']))
	{
		$country_id=$_GET['country_id'];
		$state_query="select * from tbl_state where country_id='".$country_id."'";
		$state_data=$conn->query($state_query);
		$final_arr=array();
		$cnt=0;
		while($row=$state_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$cnt++;
		}
		
		echo json_encode(array("status"=>1,"msg"=>"Country List","data"=>$final_arr));
		die();
	}
	else
	{	
		
		echo json_encode(array("status"=>0,"msg"=>"Invalid Paramter"));
		die();
	}
}

/*****
	API For : City List in dropdown
*****/
if($api_name=="city_droplist")
{
	if(isset($_GET['state_id']) && !empty($_GET['state_id']))
	{
		$state_id=$_GET['state_id'];
		$city_query="select * from tbl_city where state_id='".$state_id."'";
		$city_data=$conn->query($city_query);
		$final_arr=array();
		$cnt=0;
		while($row=$city_data->fetch_assoc())
		{
			$final_arr[$cnt]['id']=$row['id'];
			$final_arr[$cnt]['name']=$row['name'];
			$cnt++;
		}
		
		echo json_encode(array("status"=>1,"msg"=>"State List","data"=>$final_arr));
		die();
	}
	else
	{
		echo json_encode(array("status"=>0,"msg"=>"Invalid Paramter"));
		die();
	}
}

?>

