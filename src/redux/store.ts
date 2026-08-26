import { configureStore } from '@reduxjs/toolkit'
import { publicCardsApi } from '@/redux/publicCards.api'

export const store = configureStore({
  reducer: {
    [publicCardsApi.reducerPath]: publicCardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(publicCardsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
