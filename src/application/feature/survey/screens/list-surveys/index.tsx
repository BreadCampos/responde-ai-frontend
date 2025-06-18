import { Button } from "@/application/shared/components/button";
import { DataTable } from "@/application/shared/components/data-table";
import { ROUTES } from "@/core/routes/route-constants";
import { GetListSurveysQuery } from "../../service/get-survey-list.query";
import { columns } from "./columns";
import { usePagination } from "@/application/shared/hooks/use-pagination";
import { useAuthStore } from "@/application/feature/authentication/store/use-auth.store";
import { useRouter } from "next/navigation";
export const ListSurveys = () => {
  const navigate = useRouter();

  const redirectionToCreate = () => {
    navigate.push(ROUTES.SURVEY_CREATE);
  };

  const { pagination, fetchTable } = usePagination();
  const { company } = useAuthStore();

  console.log({ company });
  const { data, isFetching, refetch } = GetListSurveysQuery({
    companyId: company?.id || "",
    pagination: pagination,
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

  const redirectToDetails = (row: { id?: string }) => {
    if (row.id) navigate.push(ROUTES.SURVEY_DETAILS.replace(":id", row.id));
  };

  return (
    <div className="flex h-full flex-col gap-2 p-2 md:p-4">
      <div className="mb-2 w-full flex justify-between items-center ">
        <h1 className="text-2xl text-card-foreground font-bold mb-4">
          Questionários
        </h1>
        <Button variant="default" onClick={redirectionToCreate}>
          Adicionar nova enquete
        </Button>
      </div>

      <DataTable
        loading={isFetching}
        searchMode
        columns={columns}
        data={data?.data || []}
        pagination={data?.meta}
        onFetchData={fetch}
        onClickRow={redirectToDetails}
      />
    </div>
  );
};
