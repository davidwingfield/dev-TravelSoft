<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CurrencyModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Currency Description
	 * Long Currency Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Currency extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function get(array $params = []): array
		{
			Log::$debug_log->trace("Currency::get()");
			Log::$debug_log->info($params);
			// ----
			
			$currencies = [];
			
			return $currencies;
		}
		
		public static function formatCurrency(array $currency = null): array
		{
			Log::$debug_log->trace("Currency::formatCurrency()");
			Log::$debug_log->info($currency);
			// ----
			
			$formattedCurrency = [];
			
			if (is_null($currency)) {
				return $formattedCurrency;
			}
			
			$currencyId = (isset($currency["currency_id"]) && (int)$currency["currency_id"] > 0) ? (int)$currency["currency_id"] : null;
			$currencyName = (isset($currency["currency_name"])) ? $currency["currency_name"] : null;
			$currencySymbol = (isset($currency["currency_symbol"])) ? $currency["currency_symbol"] : null;
			$currencyISO = (isset($currency["currency_iso"])) ? $currency["currency_iso"] : null;
			$currencySortOrder = (isset($currency["currency_sort_order"])) ? $currency["currency_sort_order"] : null;
			$currencyCreatedBy = (isset($currency["currency_created_by"]) && (int)$currency["currency_created_by"] > 0) ? (int)$currency["currency_created_by"] : null;
			$currencyModifiedBy = (isset($currency["currency_modified_by"]) && (int)$currency["currency_modified_by"] > 0) ? (int)$currency["currency_modified_by"] : null;
			$currencyDateCreated = (isset($currency["currency_date_created"])) ? $currency["currency_date_created"] : null;
			$currencyDateModified = (isset($currency["currency_date_modified"])) ? $currency["currency_date_modified"] : null;
			$currencyEnabled = (isset($currency["currency_enabled"])) ? $currency["currency_enabled"] : 1;
			$currencyNote = (isset($currency["currency_note"])) ? $currency["currency_note"] : null;
			$currencyMinorUnit = (isset($currency["currency_minor_unit"])) ? $currency["currency_minor_unit"] : null;
			
			$formattedCurrency["created_by"] = $currencyCreatedBy;
			$formattedCurrency["date_created"] = $currencyDateCreated;
			$formattedCurrency["date_modified"] = $currencyDateModified;
			$formattedCurrency["enabled"] = $currencyEnabled;
			$formattedCurrency["id"] = $currencyId;
			$formattedCurrency["iso"] = $currencyISO;
			$formattedCurrency["minor_unit"] = $currencyMinorUnit;
			$formattedCurrency["modified_by"] = $currencyModifiedBy;
			$formattedCurrency["name"] = $currencyName;
			$formattedCurrency["note"] = $currencyNote;
			$formattedCurrency["sort_order"] = $currencySortOrder;
			$formattedCurrency["symbol"] = $currencySymbol;
			
			return $formattedCurrency;
		}
		
	}
