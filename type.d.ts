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

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
  error: string | null;
}
