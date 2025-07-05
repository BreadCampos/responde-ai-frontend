import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetSurveyResponsesQuery } from "@/feature/survey/service/get-survey-responses.query";
import { DataTable } from "@/shared/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "../../../../../../core/routes/route-constants";
import { SurveyResponseModel } from "../../../../model/survey-response";
import { responseColumns } from "./columns";

export const SurveyResponses = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const { company } = useAuthStore();
  const { pagination, fetchTable } = usePagination({
    limit: 5,
  });
  const navigate = useRouter();
  const { data, isFetching, refetch } = GetSurveyResponsesQuery({
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

  const redirectToDetails = (row: SurveyResponseModel) => {
    navigate.push(
      ROUTES.SURVEY_RESPONSE_DETAILS.replace(":surveyId", row.surveyId).replace(
        ":surveyResponseId",
        row.id
      )
    );
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
          onClickRow={redirectToDetails}
        />
      </CardContent>
    </Card>
  );
};
