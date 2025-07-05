import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { DataTable } from "@/shared/components/data-table";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useState } from "react";
import { WebhooksModel } from "../../model/webhooks.model";
import { GetWebhooksQuery } from "../../service/get-webhooks-list.query";
import { generateWebhookColumns } from "./columns";
import { CreateWebhooksModal } from "./components/create-webhooks-modal";
import { UpdateWebhooksModal } from "./components/update-webhooks-modal";

export const ListWebhooks = () => {
  const { company } = useAuthStore();
  const { pagination, fetchTable } = usePagination();

  const [modalUpdate, setModalUpdate] = useState<{
    open: boolean;
    webhook: WebhooksModel | null;
  }>({
    open: false,
    webhook: null,
  });

  const setWebhookToEdit = (webhook: WebhooksModel) => {
    setModalUpdate({
      open: true,
      webhook,
    });
  };

  const handleCloseModal = () => {
    setModalUpdate({
      open: false,
      webhook: null,
    });
  };
  const columns = generateWebhookColumns({
    setWebhookToEdit,
  });

  const { data, isFetching, refetch } = GetWebhooksQuery({
    pagination,
    companyId: company?.id,
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
    <div className="flex h-full flex-col gap-2 p-2 md:p-4">
      <div className="mb-2 w-full flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-2xl text-card-foreground font-bold mb-4">
          Webhooks
        </h1>
        <CreateWebhooksModal />
      </div>

      <DataTable
        loading={isFetching}
        searchMode
        columns={columns}
        data={data?.data || []}
        pagination={data?.meta}
        onFetchData={fetch}
      />

      <UpdateWebhooksModal
        webhook={modalUpdate.webhook}
        open={modalUpdate.open}
        toggleModal={handleCloseModal}
      />
    </div>
  );
};
