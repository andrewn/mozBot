 <?php
 
 // Make sure a url string is nicely formatted
function makeSafeUrl($myUrl, $allowSpace=0, $allowCase=0, $allowDot=0){
	$sSafe = 'abcdefghijklmnopqrstuvwxyz1234567890-_';
	$disallowed = array();
	$disallowed['c'] = '�';
	$disallowed['n'] = '�';
	$disallowed['y'] = '��';
	$disallowed['e'] = '����';
	$disallowed['a'] = '������';
	$disallowed['o'] = '�������';
	$disallowed['u'] = '����';
	$disallowed['i'] = '����';
	
	if(!$allowSpace) $disallowed['-'] = ' ';
	if($allowSpace) $sSafe .= ' ';
	
	if(!$allowDot) $disallowed['-'] = '.';
	if($allowDot) $sSafe .= '.';
	
	if($allowCase){
		$sSafe .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$disallowed['C'] = '�';
		$disallowed['N'] = '�';
		$disallowed['Y'] = 'ݟ';
		$disallowed['E'] = '����';
		$disallowed['A'] = '������';
		$disallowed['O'] = '�������';
		$disallowed['U'] = '����';
		$disallowed['I'] = '����';
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