import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetSurveyResponses } from "@/feature/survey/service/get-survey-responses";
import { DataTable } from "@/shared/components/data-table";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { usePagination } from "@/shared/hooks/use-pagination";
import { responseColumns } from "./columns";

interface Props {
  surveyId: string;
}

export const SurveyResponses = ({ surveyId }: Props) => {
  const { company } = useAuthStore();
  const { pagination, fetchTable } = usePagination();
  const { data, refetch } = GetSurveyResponses({
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
    <>
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
          data={data?.data || []}
          pagination={pagination}
        />
      </CardContent>
    </>
  );
};
