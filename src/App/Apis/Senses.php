<?php
	
	namespace Framework\App\Apis;
	
	use Framework\Core\Api;
	use Framework\Logger\Log;
	use SoapClient;
	use SoapFault;
	use SoapHeader;
	use SoapVar;
	
	class Senses extends Api
	{
		static $username = "";
		static $password = "";
		static $wsdl = "";
		static $headerNS = "";
		static $settings = [];
		protected static $Header;
		protected static $Request;
		static $Language = "EN";// IT, EN, RU
		protected $UsernameTokenNode;
		protected $SecurityNode;
		protected $UsernameNode;
		protected $PasswordNode;
		protected static $Client;
		protected $ResponseFile;
		protected $RequestFile;
		
		public function __construct()
		{
			parent::__construct();
		}
		
		private static function buildHeader(): SoapHeader
		{
			$usernameNode = new SoapVar(static::$username, XSD_STRING, null, null, "Username", static::$headerNS);
			$passwordNode = new SoapVar(static::$password, XSD_STRING, null, null, "Password", static::$headerNS);
			$UsernameTokenNode = new SoapVar([
				$usernameNode,
				$passwordNode,
			], SOAP_ENC_OBJECT, null, null, "UsernameToken", static::$headerNS);
			$SecurityNode = new SoapVar([$UsernameTokenNode], SOAP_ENC_OBJECT, null, null, "Security", static::$headerNS);
			
			$header = new SoapHeader(static::$headerNS, "Security", $SecurityNode);
			var_dump($header);
			
			return $header;
		}
		
		public static function init()
		{
			self::$username = "supervisor@trips2italy.com";
			self::$password = "2mZQeasXdbCL3W5_K7Vf";
			self::$wsdl = "https://cm-s5s.absolutent.it/Booking.svc?wsdl";
			self::$headerNS = "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd";
			self::$Language = "EN";
			self::$settings = [
				"trace" => 1,
				"exceptions" => 0,
				"cache_wsdl" => 0,
				"soap_version" => SOAP_1_1,
				"classmap" => array(
					"credential_complex_type" => "CredentialObject",
				),
			];
			
			static::$Header = static::buildHeader();
			
			self::$Client = new SoapClient(static::$wsdl, static::$settings);
			self::$Client->__setSoapHeaders(static::$Header);
		}
		
		public static function send()
		{
		
		}
		
		public static function searchAccommodations(array $params = [])
		{
			static::init();
			extract($params);
			$Criteria = array();
			
			if (isset($HotelCode)) {
				$Criteria["HotelCode"] = $HotelCode;
			}
			
			if (isset($IDRegione)) {
				$Criteria["IDRegione"] = $IDRegione;
			}
			
			if (isset($IDProvincia)) {
				$Criteria["IDProvincia"] = $IDProvincia;
			}
			
			if (isset($IDComune)) {
				$Criteria["IDComune"] = $IDComune;
			}
			
			if (isset($IDLocalita)) {
				$Criteria["IDLocalita"] = $IDLocalita;
			}
			
			if (isset($MaxResults)) {
				$Criteria["MaxResults"] = $MaxResults;
			} else {
				$Criteria["MaxResults"] = 20;
			}
			
			$start = "2022-05-01";
			$end = "2022-05-05";
			$Adults = 1;
			$Children = array();
			$OnlyAvailables = 1;
			$BudgetMin = 0;
			$BudgetMax = 5000;
			$HotelCode = "";      //FID001
			$IDRegione = "";      //9.00
			$IDProvincia = "";    //48_00  ESTERO
			$IDComune = "5392.00";//5392.00
			$IDLocalita = "";
			
			self::$Header = self::buildHeader();
			self::$Request = array(
				"Language" => "En",
				"Start" => $start,
				"End" => $end,
				"RoomRequests" => array(
					"BookingRoomRequest" => array(
						"Adults" => $Adults,
						"Children" => $Children,
					),
				),
				"OnlyAvailables" => $OnlyAvailables,
				"BudgetMin" => $BudgetMin,
				"BudgetMax" => $BudgetMax,
				"Criteria" => array(
					"HotelCode" => $HotelCode,
					"IDRegione" => $IDRegione,
					"IDProvincia" => $IDProvincia,
					"IDComune" => $IDComune,
					"IDLocalita" => $IDLocalita,
					"MaxResults" => 30,
				),
			);
			
			try {
				$response = self::$Client->SearchAccomodations(self::$Request);
				echo "<pre>" . var_export($response, 1) . "</pre>";
				
				return $response;
			} catch (SoapFault $fault) {
				echo printf($fault, 1);
				
				return [];
			}
			
		}
		
		public static function getHotels(array $params = []): array
		{
			static::init();
			extract($params);
			$Criteria = array();
			
			if (isset($HotelCode)) {
				$Criteria["HotelCode"] = $HotelCode;
			}
			
			if (isset($IDRegione)) {
				$Criteria["IDRegione"] = $IDRegione;
			}
			
			if (isset($IDProvincia)) {
				$Criteria["IDProvincia"] = $IDProvincia;
			}
			
			if (isset($IDComune)) {
				$Criteria["IDComune"] = $IDComune;
			}
			
			if (isset($IDLocalita)) {
				$Criteria["IDLocalita"] = $IDLocalita;
			}
			
			if (isset($MaxResults)) {
				$Criteria["MaxResults"] = $MaxResults;
			} else {
				$Criteria["MaxResults"] = 20;
			}
			
			$start = "2022-01-01";
			$end = "2022-01-05";
			$Adults = 1;
			$Children = array();
			$OnlyAvailables = 0;
			$BudgetMin = 0;
			$BudgetMax = 15000;
			$HotelCode = "";      //FID001
			$IDRegione = "";      //9.00
			$IDProvincia = "";    //48_00  ESTERO
			$IDComune = "";       //5392.00
			$IDLocalita = "";
			
			self::$Header = self::buildHeader();
			self::$Request = array(
				"Language" => "En",
				"Start" => $start,
				"End" => $end,
				"RoomRequests" => array(
					"BookingRoomRequest" => array(
						"Adults" => $Adults,
						"Children" => $Children,
					),
				),
				"OnlyAvailables" => $OnlyAvailables,
				"BudgetMin" => $BudgetMin,
				"BudgetMax" => $BudgetMax,
				"Criteria" => array(
					"HotelCode" => $HotelCode,
					"IDRegione" => $IDRegione,
					"IDProvincia" => $IDProvincia,
					"IDComune" => $IDComune,
					"IDLocalita" => $IDLocalita,
					"MaxResults" => 30,
				),
			);
			
			try {
				//var_dump(self::$Client->GetHotels(self::$Request), 0);
				
				$hotels = [];
				$results = json_decode(json_encode(self::$Client->GetHotels(self::$Request)), true);
				echo "REQUEST HEADERS:\n" . self::$Client->__getLastRequestHeaders() . "\n";
				echo printf(self::$Client, 1);
				if (isset($results["Success"])) {
					if (isset($results["Hotels"])) {
						$hotels = $results["Hotels"];
						
						if (isset($hotels["BookingHotel"])) {
							$bookingHotel = $hotels["BookingHotel"];
							$facilities = (isset($hotels["Facilities"])) ? $hotels["Facilities"] : [];
							
							//foreach ($results["BookingHotel"] AS $result) {
							//	$hotels[] = self::formatResults($result);
							//}
						}
					}
					
				}
				
				return $results;
			} catch (SoapFault $fault) {
				echo printf($fault, 1);
				
				return array(
					"error" => $fault,
				);
			}
		}
		
		private static function formatResults(array $results = []): array
		{
			return array();
		}
		
	}
