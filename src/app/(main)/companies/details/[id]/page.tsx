"use client";

import { DetailsCompany } from "@/application/feature/company/screen/details-company";

export default function DetailsCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  return <DetailsCompany id={params?.id} />;
}
