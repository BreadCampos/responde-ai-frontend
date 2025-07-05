import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { GetSurveyCustomLinkQuery } from "@/feature/survey/service/get-survey-custom-link.query";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useParams } from "next/navigation";
import { usePagination } from "@/shared/hooks/use-pagination";
import { DataTable } from "@/shared/components/data-table";
import { generateCustomLinkColumns } from "./columns";
import { ModalCreateCustomLink } from "./create-custom-link ";
import { useState } from "react";
import { SurveyCustomLink } from "@/feature/survey/model/survey-custom-link";
import { ModalUpdateCustomLink } from "./update-custom-link";

export const SurveyCustomLinks = () => {
  const { company } = useAuthStore();

  const { surveyId } = useParams<{ surveyId: string }>();

  const { pagination, fetchTable } = usePagination({
    limit: 5,
    page: 1,
  });
  const {
    data: customLinks,
    isFetching,
    refetch,
  } = GetSurveyCustomLinkQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
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

  const [modalUpdate, setModalUpdate] = useState<{
    open: boolean;
    customLink: SurveyCustomLink | null;
  }>({
    open: false,
    customLink: null,
  });

  const setCustomLinkToEdit = (customLink: SurveyCustomLink) => {
    setModalUpdate({
      open: true,
      customLink,
    });
  };

  const handleCloseModal = () => {
    setModalUpdate({
      open: false,
      customLink: null,
    });
  };
  const customLinkColumns = generateCustomLinkColumns({
    setCustomLinkToEdit,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 items-center justify-between md:flex-row">
          <h3 id={"survey-custom-links"}>Links Customizados</h3>

          <ModalCreateCustomLink />
        </CardTitle>
        <CardDescription>
          Acompanhe a performance de diferentes canais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={customLinkColumns}
          onFetchData={fetch}
          loading={isFetching}
          data={customLinks?.data || []}
          pagination={customLinks?.meta}
        />
      </CardContent>
      <ModalUpdateCustomLink
        open={modalUpdate.open}
        onClose={handleCloseModal}
        customLink={modalUpdate.customLink}
      />
    </Card>
  );
};
