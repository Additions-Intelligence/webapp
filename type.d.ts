interface ICompanyIdentifier {
  ai_code: string | null;
  isin: string | null;
  registration_number: string | null;
}

interface ICompanyInformation {
  date_of_incorporation: string | null;
  incorporation_note: string | null;
  name: string;
  holding_company: string | null;
  description: string | null;
  corporate_action: string | null;
  status: string | null;
  accounting_standard: string | null;
}

interface IMarketInformation {
  listed: boolean;
  listings: Record<string, string | null>[];
}

interface ILocation {
  continent: string | null;
  sub_continent: string | null;
  country_of_incorporation: string | null;
  region: string | null;
  head_office_location: string | null;
  gps_coordinates: string | null;
  postal_address: string | null;
  digital_address: string | null;
}

interface IContact {
  telephone_no: string | null;
  fax: string | null;
  website: string | null;
  email_address: string | null;
}

interface ISector {
  sector: string | null;
  subsector_activities: string | null;
  nace_sector: string | null;
  operational_classification: string | null;
  state_owned: string | null;
  keywords_products_activities: string | null;
}

interface IEmployeeCount {
  year: number | null;
  number_of_employees: string | null;
}

interface IKeyPerson {
  name: string | null;
  title: string | null;
  profession: string | null;
  age: string | null;
  nationality: string | null;
  education_qualification: string | null;
  year: number | null;
}

interface ICompetitor {
  name: string | null;
}

interface IBranchCount {
  year: number | null;
  number_of_branches: string | null;
}

interface IAuditor {
  year: number | null;
  name: string | null;
}

interface ISolicitor extends IAuditor {}

interface ICompany {
  identifier: ICompanyIdentifier;
  company_information: ICompanyInformation;
  market_information: IMarketInformation;
  location: ILocation;
  contact: IContact;
  sector: ISector;

  number_of_employees: IEmployeeCount[];
  key_people: IKeyPerson[];
  competitors: ICompetitor[];
  number_of_branches: IBranchCount[];
  auditors: IAuditor[];
  solicitors: ISolicitor[];

  created_at: string | null; // ISO date string
  updated_at: string | null; // ISO date string
}

interface IBeneficialOwner {
  name: string;
  amount: number;
  percentage: number;
  country: string;
  owner_type: "E" | "C" | "IC" | "I" | "F" | "NI";
  year: number | null;
}

interface IOwnership {
  identifier: ICompanyIdentifier;
  name: string;
  year: number;
  total_shares: number;
  total_percentage: number;
  beneficial_owners: IBeneficialOwner[];
  created_at: string | null;
  updated_at: string | null;
}

interface IFinancialItem {
  year: number;
  currency_code: string;
  financial_item_name: string;
  financial_item_value: string | null;
  eps_currency?: string;
  sub_category?: string;
}

interface IFinancialRatio {
  year: number;
  financial_item_name: string;
  financial_item_value: string | null;
  sub_category?: string;
}

interface IFinancialRatiosResponse {
  identifier: ICompanyIdentifier;
  financial_ratios: IFinancialRatio[];
  created_at: string | null;
  updated_at: string | null;
}

interface IQuantitativeDisclosure {
  identifier: ICompanyIdentifier;
  quantitative_disclosures: IFinancialRatio[];
  created_at: string | null;
  updated_at: string | null;
}

interface ISubsidiary {
  entity_name: string;
  subsidiary_type: string;
  ownership_type: string;
  country: string;
}

interface ISubsidiaryResponse {
  identifier: ICompanyIdentifier;
  subsidiaries: ISubsidiary[];
  created_at: string | null;
  updated_at: string | null;
}

interface IFinancialStatement {
  identifier: ICompanyIdentifier;
  accounting_standard: string;
  currency: {
    currency_name: string;
    currency_code: string;
    symbol: string;
  };
  income_statements: IFinancialItem[];
  balance_sheets: IFinancialItem[];
  cash_flow_statements: IFinancialItem[];
  created_at: string | null;
  updated_at: string | null;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
  error: string | null;
}

// Crime-related types
interface IEntityIdentifier {
  entity_id: number;
  entity_name: string;
  aliases: string | null;
  id_type: string;
  id_number: string;
}

interface IEntityInformation {
  entity_type: string;
  photo: string | null;
  notice: string | null;
  nationality: string | null;
  age: string | null;
  current_age: string | null;
  sex: string | null;
  height: string | null;
  complexion: string | null;
  title: string;
  associated_institution: string;
}

interface ICrimeInformation {
  sub_crime_type: string;
  crime_type: string;
  alert: string;
  description: string;
  money_involved: string;
  date_of_incidence: string | null;
  sanctioned_authority: string;
  country: string;
}

interface IEntityCrimeStatus {
  case_status: string;
  status: string;
  date: string | null;
  comment: string | null;
}

interface ICrime {
  crime_information: ICrimeInformation;
  entity_crime_status: IEntityCrimeStatus[];
}

interface ICrimeRecord {
  identifier: IEntityIdentifier;
  entity_information: IEntityInformation;
  crimes: ICrime[];
  created_at: string | null;
  updated_at: string | null;
}
