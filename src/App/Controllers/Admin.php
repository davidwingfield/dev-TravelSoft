<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\Core\Controller;
	use Framework\Core\View;
	
	/**
	 * Short Admin Description
	 * Long Admin Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Admin extends Controller
	{
		
		/**
		 * inherit parent construct
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function pageEdit(array $params = null)
		{
			$data = Page::getDetails(21);
			// ----
			View::render_template("pages/page_edit", $data);
			exit(0);
		}
		
	}
