import { DataTable } from "@/shared/components/data-table";
import { columns } from "./columns";
import { usePagination } from "@/shared/hooks/use-pagination";
import { GetWebhooksQuery } from "../../service/get-webhooks-list.query";
import { CreateWebhooksModal } from "./components/create-webhooks-modal";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";

export const ListHebhooks = () => {
  const { company } = useAuthStore();
  const { pagination, fetchTable } = usePagination();

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
    </div>
  );
};
