<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\PackageModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Package Description
	 * Long Package Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Package extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function serveGet()
		{
			$packages = array();
			$results = PackageModel::get();
			
			foreach ($results AS $k => $package) {
				$packages[] = self::format($package);
			}
			// ----
			View::render_json($packages);
			exit(0);
		}
		
		private static function format($package)
		{
			return $package;
		}
		
	}
