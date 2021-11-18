<?php
	$upperTable = $uCase;
	$allFields = [];
	echo "SELECT\n";
	$counter = 0;
	foreach($table_fields AS $name=>$values){
		$comma = "";
		if($counter<count($table_fields)-1){
			$comma = ",";
		}
		$fieldName = $values["COLUMN_NAME"];
		echo "\t\t$upperTable.$fieldName AS '$TABLE_NAME"."_".$fieldName."'$comma\n";
		$counter++;
	}
?>
FROM <?php echo "\t$TABLE_NAME";?> <?php echo $upperTable;?>

-- JOIN <?php echo "\t$TABLE_NAME";?> <?php echo $upperTable;?> ON <?php echo "$upperTable";?>.id = {FK_TABLE}.<?php echo $TABLE_NAME;?>_id

/*
<?php
$counter = 0;
foreach($table_fields AS $name=>$values){
	$comma = "";
	if($counter<count($table_fields)-1){
		$comma = ",";
	}
	$fieldName = $values["COLUMN_NAME"];
	echo "'$fieldName'=>$$TABLE_NAME" . "['" . $TABLE_NAME . "_" . $fieldName."']".$comma."\n";
	$counter++;
}
?>
*/