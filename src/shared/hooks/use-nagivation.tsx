import { useParams, useRouter } from "next/navigation";

export const useLocalizedRouter = () => {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  const push = (path: string) => {
    router.push(`/${lang}${path}`);
  };

  return {
    ...router,
    push,
  };
};
