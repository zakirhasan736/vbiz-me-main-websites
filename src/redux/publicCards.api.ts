import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { normalizePublicCardsResponse } from '@/lib/publicCards/mapPublicCards'
import { buildPublicCardsQueryPath } from '@/lib/publicCards/publicCardsSearch'
import type { PublicCardsQueryResult, PublicCardsResponse, PublicCardsSearchParams } from '@/lib/publicCards/types'

export const publicCardsApi = createApi({
  reducerPath: 'publicCardsApi',
  keepUnusedDataFor: 300,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/vbiz-public',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json')
      return headers
    },
  }),
  tagTypes: ['PublicCards'],
  endpoints: (build) => ({
    getPublicCards: build.query<PublicCardsQueryResult, PublicCardsSearchParams | void>({
      query: (params) => buildPublicCardsQueryPath(params ?? undefined).replace(/^\//, ''),
      transformResponse: (response: PublicCardsResponse) => normalizePublicCardsResponse(response),
      providesTags: ['PublicCards'],
    }),
  }),
})

export const { useGetPublicCardsQuery, useLazyGetPublicCardsQuery } = publicCardsApi
