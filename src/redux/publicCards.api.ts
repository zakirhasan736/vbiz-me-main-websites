import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { normalizePublicCardsResponse } from '@/lib/publicCards/mapPublicCards'
import { buildPublicCardsQueryPath } from '@/lib/publicCards/publicCardsSearch'
import type { PublicCardsQueryResult, PublicCardsResponse, PublicCardsSearchParams } from '@/lib/publicCards/types'
import type { LandingDemoCard, LandingDemoCardsResponse } from '@/lib/landingDemoCards/types'

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
  tagTypes: ['PublicCards', 'LandingDemoCards'],
  endpoints: (build) => ({
    getPublicCards: build.query<PublicCardsQueryResult, PublicCardsSearchParams | void>({
      query: (params) => buildPublicCardsQueryPath(params ?? undefined).replace(/^\//, ''),
      transformResponse: (response: PublicCardsResponse) => normalizePublicCardsResponse(response),
      providesTags: ['PublicCards'],
    }),
    getLandingDemoCards: build.query<LandingDemoCard[], undefined>({
      query: () => 'landing/demo-cards',
      transformResponse: (response: LandingDemoCardsResponse): LandingDemoCard[] => {
        if (!response.success || !Array.isArray(response.data)) return []
        return response.data
      },
      providesTags: ['LandingDemoCards'],
    }),
  }),
})

export const { useGetPublicCardsQuery, useLazyGetPublicCardsQuery, useGetLandingDemoCardsQuery } = publicCardsApi
