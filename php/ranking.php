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

    for($i = 0;$i<$size;$i++) {
        $parts = explode(",",$rankfile[$i]);
        $teamNameList[$i] = $parts[1];
        $scoreList[$i] = (int)substr($parts[2],0,sizeof($parts[2])-2);
    }

    $rankfile = fopen($file,"w");

    $scoreList[array_search($teamName,$teamNameList)] = $score;
    array_multisort($scoreList, SORT_NUMERIC, SORT_DESC, $teamNameList);

    for ($j=0; $j <$size ; $j++) {
        $data = ($j+1).",".$teamNameList[$j].",".$scoreList[$j]."\n";
        fwrite($rankfile,$data);
    }
    echo var_dump($scoreList);
    //echo var_dump($scoreList);
    fclose($rankfile);

    //echo var_dump($teamNameList);
    //echo $score
    //echo var_dump($scoreList);
 ?>
