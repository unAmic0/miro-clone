import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";

export const useApiMutation = <T extends FunctionReference<"mutation">>(
  mutationFunc: T,
) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunc);

  const mutation = (payload: Parameters<typeof apiMutation>[0]) => {
    setPending(true);
    return apiMutation(payload).finally(() => setPending(false));
  };

  return [mutation, pending] as const;
};
