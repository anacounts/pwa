// react
import React from "react";
import { createRoot } from "react-dom/client";

// react-router
import { BrowserRouter } from "react-router-dom";

// apollo, gql-client
import { ApolloProvider } from "@apollo/client";
import client from "./app/apollo";

// app
import App from "./App";
import { AuthProvider } from "./features/auth/context";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
