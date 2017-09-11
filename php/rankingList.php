<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="refresh" content="10">
        <title>Ranklist</title>
        <link rel="stylesheet" href="../css/uikit.min.css">
    </head>
    <body>
        <?php
            echo "<html><body><div class='uk-overflow-auto'><table class='uk-table'>\n\n";
            echo "<thead><tr>
                <th>Rank</th><th>Team Name</th><th>Score</th></tr></thead>";
            $f = fopen("../data/Ranking.csv", "r");
            while (($line = fgetcsv($f)) !== false) {
                echo "<tr>";
                foreach ($line as $cell) {
                    echo "<td>" . htmlspecialchars($cell) . "</td>";
                }
                echo "</tr>\n";
            }
            fclose($f);
            echo "\n</table></div></body></html>";
        ?>
    </body>
</html>
