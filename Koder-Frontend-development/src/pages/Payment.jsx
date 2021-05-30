import React, { useState, useEffect, Form } from "react";
import Processed from "../compoents/ProcessedPaymentMessage";
import Processing from "../compoents/ProcessingMessage";
import SearchStudent from "./Search";
import ChoosePaymentOption from "./PaymentOption";
import ConfirmPayment from "./ConfirmPayment";
import Checkout from "./Checkout";
export default function Payment() {

  const initialFeesState = {
    success: false,
    status_code: "",
    message: "",
  };


  //States
  const [payment, setPayment] = useState();
  const [fees, setFees] = useState(initialFeesState);
  const initialPayload = {};
  const [paymentPayload, setPaymentPayload] = useState(initialPayload);
  const [isFeeItemNotSelected, setIsFeeItemNotSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [feeId, setFeeId] = useState("");
  const [isCard, setIsCard] = useState(false);
  const [appState, setAppState] = useState("SEARCH");
  
  if (isProcessing) return <Processing type="Payment" />;
  if (isProcessed) return <Processed payment={payment} />;
  if (appState === "SEARCH") return (<SearchStudent fees={fees} setFees={setFees} setAppState={setAppState} />);
  if (appState === "CHOOSE_PAY_OPT") return (<ChoosePaymentOption fees={fees} paymentPayload={paymentPayload} setPaymentPayload={setPaymentPayload} setIsFeeItemNotSelected={setIsFeeItemNotSelected} setIsCard={setIsCard} isFeeItemNotSelected={isFeeItemNotSelected} feeId={feeId} setAppState={setAppState} />);
  if (appState === "CHECKOUT") return (<Checkout isCard={isCard}   setPaymentPayload={setPaymentPayload}  setAppState={setAppState} />);
  if (appState === "CONFIRM") return (<ConfirmPayment setIsProcessing={setIsProcessing} setPayment={setPayment} setIsProcessed={setIsProcessed} fees={fees} paymentPayload={paymentPayload} setAppState={setAppState} />);
}