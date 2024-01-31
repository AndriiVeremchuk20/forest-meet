"use client";

import { env } from "@/env";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { type ReactNode } from "react";

const PayPalClientId = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const initialOptions = {
  clientId: PayPalClientId,
  currency: "USD",
  intent: "capture",
};

const PayPalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
