import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { Button } from "@/shared/components/button";
import { DataTable } from "@/shared/components/data-table";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslation } from "@/shared/hooks/use-translation";
import { useRouter } from "next/navigation";
import { GetListSurveysQuery } from "../../service/get-survey-list.query";
import { useColumns } from "./columns";

export const ListSurveys = () => {
  const navigate = useRouter();
  const t = useTranslation("surveys");

  const { columns } = useColumns();

  const redirectionToCreate = () => {
    navigate.push(ROUTES.SURVEY_CREATE);
  };

  const { pagination, fetchTable } = usePagination();
  const { company } = useAuthStore();

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
      <div className="mb-2 w-full flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-2xl text-card-foreground font-bold mb-4">
          {t("surveys.title")}
        </h1>
        <Button variant="default" onClick={redirectionToCreate}>
          {t("surveys.addNew")}
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
