<html>
<body>

    <?php
    function validate_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
      };

    # Derive the content of issue report form.
        $issueContent = validate_input($_POST["issue"]).PHP_EOL;
        $address = validate_input($_POST["address"]).PHP_EOL;
        $addressNum = explode(", ", $address)[0].PHP_EOL;
        $addressSub = explode(", ", $address)[1].PHP_EOL;
        
    # write the issue report content to a txt file on server
        $issueDataFile = fopen('errorReportData.txt', "a+");
        fwrite($issueDataFile, $issueContent);
        fwrite($issueDataFile, $addressNum);
        fwrite($issueDataFile, $addressSub);
        fclose($issueDataFile);

    ?>
</body>
</html>