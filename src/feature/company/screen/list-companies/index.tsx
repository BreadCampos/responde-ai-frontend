import { ROUTES } from "@/core/routes/route-constants";
import { Button } from "@/shared/components/button";
import { DataTable } from "@/shared/components/data-table";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslation } from "react-i18next";
import { GetCompaniesListQuery } from "../../service/get-companies-list.query";
import { useColumns } from "./columns";

export const ListCompanies = () => {
  const navigate = useNavigation();

  const redirectionToCreate = () => {
    navigate.push(ROUTES.COMPANY_CREATE);
  };

  const { columns } = useColumns();
  const { pagination, fetchTable } = usePagination();

  const { data, isFetching, refetch } = GetCompaniesListQuery({
    pagination,
  });

  const fetch = ({
    page,
    search,
    isRefetch = false,
  }: {
    page?: number;
    search?: string;
    isRefetch?: boolean;
  }) => {
    fetchTable({
      page,
      search,
      isRefetch,
      refetch,
    });
  };
  const { t } = useTranslation("company");

  const redirectToCompanyDetails = (row: { id: string }) => {
    navigate.push(ROUTES.COMPANY_DETAILS.replace(":id", row?.id));
  };
  return (
    <div className="flex h-full flex-col gap-2 p-2 md:p-4">
      <div className="mb-2 w-full flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-2xl text-card-foreground font-bold mb-4">
          {t("companies.title")}
        </h1>
        <Button variant="default" onClick={redirectionToCreate} disabled>
          {t("companies.addNew")}
        </Button>
      </div>

      <DataTable
        loading={isFetching}
        searchMode
        onClickRow={redirectToCompanyDetails}
        columns={columns}
        data={data?.data || []}
        pagination={data?.meta}
        onFetchData={fetch}
      />
    </div>
  );
};
