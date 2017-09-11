<?php
    $teamName = $_POST['teamName'];
    $noTrialVisits = (int)$_POST['noTrialVisits'];
    $currLevel = (int)$_POST['currLevel'];
    $noQuestions =(int) $_POST['noQuestions'];

    $score = (int)((10*$currLevel*$currLevel)/($noQuestions))-$noTrialVisits;
    $file = "../data/Ranking.csv";
    $rankfile = file("../data/Ranking.csv");
    $size = sizeof($rankfile);
    $teamNameList = array();
    $scoreList = array();

    if( $size == 0) {
    	exit("No names in ranklist error.");
    }
    for($i = 0;$i<$size-1;$i++) {
        $parts = explode(",",$rankfile[$i]);
        if($teamName <> $parts[1]){
		$teamNameList[$i] = $parts[1];
		$scoreList[$i] = (int)substr($parts[2],0,sizeof($parts[2])-2);
	}
    }

    $rankfile = fopen($file,"w");

    if($size == 1){
        $data = ($j+1).",".$teamName.",".$score."\n";
        fwrite($rankfile,$data);
    }
    else{
        $save = $size-1;
        for ($j=0; $j <$size-1 ; $j++) {

            if($score > $scoreList[$j]){
                $save = $j;
            	break;
            }
            else{
                $data = ($j+1).",".$teamNameList[$j].",".$scoreList[$j]."\n";
                fwrite($rankfile,$data);
            }
        }

        $data = ($save+1).",".$teamName.",".$score."\n";
        fwrite($rankfile,$data);

        for ($k=$save; $k <$size-1 ; $k++) {

            $data = ($k+2).",".$teamNameList[$k].",".$scoreList[$k]."\n";
            fwrite($rankfile,$data);
        }
    }
    //echo var_dump($scoreList);
    //echo var_dump($scoreList);
    fclose($rankfile);

    echo var_dump($teamNameList);
    //echo $score
    //echo var_dump($scoreList);
 ?>
