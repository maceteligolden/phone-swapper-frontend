import { sungloApi } from "../lib/api";

export const assetEndpoint = sungloApi.injectEndpoints({
    endpoints: (build) => ({
        search: build.mutation({
            query: (body) => ({
                url: "devices/search",
                method: "POST",
                body,
            })
        }),
        addProvider: build.mutation({
            query: (body) => ({
                url: "devices/create-provider",
                method: "POST",
                body,
            })
        }),
        addModel: build.mutation({
            query: (body) => ({
                url: "devices/create-model",
                method: "POST",
                body,
            })
        }),
        addDevice: build.mutation({
            query: (body) => ({
                url: "devices/create-device",
                method: "POST",
                body,
            })
        }),
        addStorage: build.mutation({
            query: (body) => ({
                url: "devices/create-storage",
                method: "POST",
                body,
            })
        }),
        getProviders: build.query<any, void>({
            query: () => `devices/providers`
        }),
        getStorages: build.query({
            query: ({ id }) => `devices/storages/${id}`
        }),
        getModels: build.query < any, { id: string }>({
            query: ({ id }) => `devices/model/${id}`
        }),
    })
});

export const {
    useGetModelsQuery,
    useGetStoragesQuery,
    useGetProvidersQuery,
    useAddDeviceMutation,
    useAddModelMutation,
    useAddProviderMutation,
    useAddStorageMutation,
    useSearchMutation
} = assetEndpoint;