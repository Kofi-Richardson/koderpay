import React, { useState, useEffect, Form } from "react";
import BackEndService from "../services/BackEndService";
import {useHistory} from "react-router-dom";
import Processing from "../compoents/ProcessingMessage";
import ProcessedRefundMessage from "../compoents/ProcessedRefundMessage";
import {decrypt } from "../utils/crypto";
import ConfirmRefund from "./ConfirmRefund";

export default function Transactions(props) {
  const initialTransactionState = {};
  const initialRefundPayload = {};
  const initialRefundState = {
    success: "",
    status_code: "",
    message: "",
    payment_details: {},
  };
  const history = useHistory();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [refundPayload, setRefundPayload] = useState(initialRefundPayload);
  const [transactions, setTransactions] = useState({});
  const [enterRefundReason, setEnterRefundReason] = useState(false);
  const [refund, setRefund] = useState(initialRefundState);
  
  useEffect(() => {
    BackEndService.getTransactions(1)
      .then(async (response) => {
        console.log(decrypt(response.data));
        const data = await JSON.parse(decrypt(response.data));
        console.log(data);
        setTransactions(data);
        console.log(transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  if (isProcessing) return <Processing type="Refund" />;
  if (isProcessed) return <ProcessedRefundMessage refund={refund} />;
  if (!enterRefundReason)
    return (
      <div class="content-wrapper" style={{ "min-height": "1416.81px;" }}>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Card/Mobile Transaction</h1>
              </div>
            </div>
          </div>
        </section>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">
                      Please find below your Transactions
                      </h3>
                  </div>
                  <div class="card-body">
                    <div
                      id="example1_wrapper"
                      class="dataTables_wrapper dt-bootstrap4"
                    >
                      <div class="row">
                        <div class="col-sm-12 col-md-6">
                          <div class="dataTables_length" id="example1_length">
                            <label>
                              Show{" "}
                              <select
                                name="example1_length"
                                aria-controls="example1"
                                class="custom-select custom-select-sm form-control form-control-sm"
                              >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>{" "}
                                entries
                              </label>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                          <div id="example1_filter" class="dataTables_filter">
                            <label>
                              Search:
                                <input
                                type="search"
                                class="form-control form-control-sm"
                                placeholder=""
                                aria-controls="example1"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <table
                            id="example1"
                            class="table table-bordered table-striped dataTable dtr-inline"
                            role="grid"
                            aria-describedby="example1_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  class="sorting_asc"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-sort="ascending"
                                  aria-label="Rendering engine: activate to sort column descending"
                                >
                                  Payment Reference #
                                  </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Payment Method
                                  </th>

                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="CSS grade: activate to sort column ascending"
                                >
                                  Card # / Wallet #
                                  </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Amount
                                  </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Currency
                                  </th>
                                  <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Student Name
                                  </th>
                                  
                                  <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Student Class
                                  </th>
                                  <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Semester
                                  </th>
                                  <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                 
                                 Fee Type
                                  </th>
                                  <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                Fee Description
                                  </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="CSS grade: activate to sort column ascending"
                                >     
                                  Payment Status
                                  </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="CSS grade: activate to sort column ascending"
                                >
                                  Transaction Date
                                  </th>

                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="example1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="CSS grade: activate to sort column ascending"
                                >
                                  Action
                                  </th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactions.success == true &&
                                transactions.transaction_details.map(
                                  (transaction_detail) => (
                                    <tr role="row" class="odd">
                                      <td tabindex="0" class="sorting_1">
                                        {
                                          transaction_detail.transaction_reference
                                        }
                                      </td>
                                      <td>
                                        {" "}
                                        {transaction_detail.is_card
                                          ? "Card"
                                          : "Mobile"}
                                      </td>
                                      <td>
                                        {" "}
                                        {transaction_detail.is_card
                                          ? transaction_detail.payer_card_no
                                          : transaction_detail.payer_wallet_no}
                                      </td>
                                      <td> {transaction_detail.amount}</td>
                                      <td> {transaction_detail.ccy}</td>

                                      <td> {transaction_detail.first_name} {transaction_detail.middle_name} {transaction_detail.surname}</td>
                                      <td> {transaction_detail.class}</td>
                                      <td> {transaction_detail.semester}</td>
                                      <td> {transaction_detail.type}</td>
                                      <td> {transaction_detail.description}</td>
  

                                      <td>
                                        {" "}
                                        {
                                          transaction_detail.transaction_status
                                        }
                                      </td>
                                      <td>
                                        {" "}
                                        {transaction_detail.transaction_date}
                                      </td>
                                      <td>
                                        <div class="form-group">
                                          {transaction_detail.is_card ? (
                                            <button
                                              type="button"
                                              class="btn btn-block btn-danger btn-xs"
                                              id={transaction_detail}
                                              onClick={() => {
                                                setRefundPayload((prev) => ({
                                                  ...prev,
                                                  transaction_payment_id:
                                                    transaction_detail.id,
                                                }));
                                                setEnterRefundReason(true);
                                              }}
                                            >
                                              Refund
                                            </button>
                                          ) : (
                                              <button
                                                type="button"
                                                class="btn btn-block btn-danger disabled"
                                              >
                                                Refund
                                              </button>
                                            )}
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th rowspan="1" colspan="1">
                                  Payment Ref #
                                  </th>
                                <th rowspan="1" colspan="1">
                                  Payment Method
                                  </th>

                                <th rowspan="1" colspan="1">
                                  Card / Wallet #
                                  </th>
                                <th rowspan="1" colspan="1">
                                  Amount
                                  </th>
                                <th rowspan="1" colspan="1">
                                  Currency
                                  </th>
                                  <th rowspan="1" colspan="1">
                                  Student Name
                                  </th>
                                  <th rowspan="1" colspan="1">
                                  Student Class
                                  </th>
                                  <th rowspan="1" colspan="1">
                                  Student Semester
                                  </th>
                                  <th rowspan="1" colspan="1">
                                  Fee Type
                                  </th>
                                  <th rowspan="1" colspan="1">
                                  Fee Description 
                                  </th>
                                <th rowspan="1" colspan="1">
                                  Payment Status
                                  </th>
                                <th rowspan="1" colspan="1">
                                  Transaction Date
                                  </th>
                                <th rowspan="1" colspan="1">
                                  Action
                                  </th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12 col-md-5">
                          <div
                            class="dataTables_info"
                            id="example1_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 1 to 10 of 57 entries
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-7">
                          <div
                            class="dataTables_paginate paging_simple_numbers"
                            id="example1_paginate"
                          >
                            <ul class="pagination">
                              <li
                                class="paginate_button page-item previous disabled"
                                id="example1_previous"
                              >
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="0"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  Previous
                                  </a>
                              </li>
                              <li class="paginate_button page-item active">
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="1"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  1
                                  </a>
                              </li>
                              <li class="paginate_button page-item ">
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="2"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  2
                                  </a>
                              </li>
                              <li class="paginate_button page-item ">
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="3"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  3
                                  </a>
                              </li>
                              <li class="paginate_button page-item ">
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="4"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  4
                                  </a>
                              </li>
                              <li class="paginate_button page-item ">
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="5"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  5
                                  </a>
                              </li>
                              <li class="paginate_button page-item ">
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="6"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  6
                                  </a>
                              </li>
                              <li
                                class="paginate_button page-item next"
                                id="example1_next"
                              >
                                <a
                                  href="#"
                                  aria-controls="example1"
                                  data-dt-idx="7"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  Next
                                  </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  if (enterRefundReason) return (<ConfirmRefund transactions={transactions} setIsProcessing={setIsProcessing} setIsProcessed={setIsProcessed} refund={refund} setRefund={setRefund} setRefundPayload={setRefundPayload} refundPayload={refundPayload} />)
}