 <?php
 
 // Make sure a url string is nicely formatted
function makeSafeUrl($myUrl, $allowSpace=0, $allowCase=0, $allowDot=0){
	$sSafe = 'abcdefghijklmnopqrstuvwxyz1234567890-_';
	$disallowed = array();
	$disallowed['c'] = 'ç';
	$disallowed['n'] = 'ñ';
	$disallowed['y'] = 'ýÿ';
	$disallowed['e'] = 'èéêë';
	$disallowed['a'] = 'àáâãäå';
	$disallowed['o'] = 'ðóòôõöø';
	$disallowed['u'] = 'ùúûü';
	$disallowed['i'] = 'ìíîï';
	
	if(!$allowSpace) $disallowed['-'] = ' ';
	if($allowSpace) $sSafe .= ' ';
	
	if(!$allowDot) $disallowed['-'] = '.';
	if($allowDot) $sSafe .= '.';
	
	if($allowCase){
		$sSafe .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$disallowed['C'] = 'Ç';
		$disallowed['N'] = 'Ñ';
		$disallowed['Y'] = 'ÝŸ';
		$disallowed['E'] = 'ÈÉÊË';
		$disallowed['A'] = 'ÀÁÂÃÄÅ';
		$disallowed['O'] = 'ÐÓÒÔÕÖØ';
		$disallowed['U'] = 'ÙÚÛÜ';
		$disallowed['I'] = 'ÌÍÎÏ';
	}else{
		$myUrl = strtolower($myUrl);
	}
 
	$newString = array();
 
	for($i = 0; $i<strlen($myUrl); $i++){
		$thisChar = $myUrl[$i];
		if(stristr($sSafe, $thisChar)){
			$newString[$i] = $thisChar;
		}else{
			foreach($disallowed as $key => $var){
				if(stristr($var, $thisChar)){
					$newString[$i] = $key;
				}
			}
		}
	}
	return implode('', $newString);
}

?>