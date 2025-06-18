import { Button } from "@/application/shared/components/button";
import { DataTable } from "@/application/shared/components/data-table";
import { ROUTES } from "@/core/routes/route-constants";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { usePagination } from "@/application/shared/hooks/use-pagination";
import { GetCompaniesListQuery } from "../../service/get-companies-list.query";

export const ListCompanies = () => {
  const navigate = useRouter();

  const redirectionToCreate = () => {
    navigate.push(ROUTES.COMPANY_CREATE);
  };

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

  const redirectToCompanyDetails = (row: { id: string }) => {
    navigate.push(ROUTES.COMPANY_DETAILS.replace(":id", row?.id));
  };
  return (
    <div className="flex h-full flex-col gap-2 p-2 md:p-4">
      <div className="mb-2 w-full flex justify-between items-center ">
        <h1 className="text-2xl text-card-foreground font-bold mb-4">
          Companhias
        </h1>
        <Button variant="default" onClick={redirectionToCreate} disabled>
          Adicionar Companhia
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
