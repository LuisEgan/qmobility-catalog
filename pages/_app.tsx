import { AppProps } from "next/app";
import Head from "next/head";
import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, {
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";

import "rsuite/lib/styles/index.less";
import "../src/scss/index.scss";

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

const setApolloClient = ({ initialState }) => {
  return new ApolloClient({
    uri: "https://api.whyxapp.com/whyx/graphql",
    cache: new InMemoryCache().restore(initialState || {}),
    request: async (operation) => {
      try {
        const authorization = "login";
        const headers = { authorization };

        operation.setContext({
          headers,
        });
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });
};

const App = ({ Component, pageProps, apollo }: IProps) => {
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>Cesfam</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default withApollo(setApolloClient)(App);
