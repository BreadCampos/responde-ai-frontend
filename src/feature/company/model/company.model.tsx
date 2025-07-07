export type CompanyModel = {
  addressLine: string;
  addressLineComplement: string | null;
  billingAddressLine: string | null;
  createdAt: Date;
  document: string;
  fantasyName: string;
  id: string;
  legalName: string;
  logoUrl: string;
  ownerId: string;
  settings: {
    always_display_logo: boolean;
  };
  theme: {
    primary: string;
  };
  updatedAt: Date;
};
