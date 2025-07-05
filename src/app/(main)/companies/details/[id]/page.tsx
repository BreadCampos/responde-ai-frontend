"use client";

import { DetailsCompany } from "@/feature/company/screen/details-company";

export default function DetailsCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  return <DetailsCompany />;
}
