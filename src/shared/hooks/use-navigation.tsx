import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  return router;
};
