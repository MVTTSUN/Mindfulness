import { QueryStatus } from "@reduxjs/toolkit/query";

type State = {
  mindfulnessApi: {
    queries: Record<string, { status: QueryStatus }>;
    mutations: Record<string, { status: "pending" }>;
  };
};

const getIsLoadingServer = (state: State) =>
  Object.values(state.mindfulnessApi.queries).some((query) => {
    return query && query.status === QueryStatus.pending;
  }) ||
  Object.values(state.mindfulnessApi.mutations).some((mutation) => {
    return mutation && mutation.status === QueryStatus.pending;
  });

export { getIsLoadingServer };
