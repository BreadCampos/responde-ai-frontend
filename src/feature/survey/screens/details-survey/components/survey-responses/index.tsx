import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetSurveyResponses } from "@/feature/survey/service/get-survey-responses";
import { DataTable } from "@/shared/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { usePagination } from "@/shared/hooks/use-pagination";
import { responseColumns } from "./columns";
import { useParams } from "next/navigation";

export const SurveyResponses = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const { company } = useAuthStore();
  const { pagination, fetchTable } = usePagination({
    limit: 5,
  });
  const { data, isFetching, refetch } = GetSurveyResponses({
    companyId: company?.id,
    surveyId,
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Respostas</CardTitle>
        <CardDescription>
          Visualize as respostas individuais recebidas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={responseColumns}
          onFetchData={fetch}
          loading={isFetching}
          data={data?.data || []}
          pagination={data?.meta}
        />
      </CardContent>
    </Card>
  );
};
