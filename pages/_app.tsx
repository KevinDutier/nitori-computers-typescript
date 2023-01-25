import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css"; /* bootstrap style for header */
import { SSRProvider } from 'react-bootstrap';
import Head from 'next/head'

// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cart from "../reducers/cart";
import cartTotal from "../reducers/cartTotal";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

export default function App({ Component, pageProps }: AppProps) {
  const reducers = combineReducers({ cart, cartTotal });
  const persistConfig = { key: "cart", storage };

  const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  const persistor = persistStore(store);

  return (
    <SSRProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Nijika Computers</title>
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SSRProvider>
  )
}
