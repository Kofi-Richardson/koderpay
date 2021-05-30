import React, { Form } from "react";
export default function Login() {
  return (
    <div class="content-wrapper" style={{"min-height": "363px;"}}>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Online Fees Payment</h1>
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
                  <h3 class="card-title">Online Payment
                    
                  </h3>

                  <div class="card-tools">
                    <button
                      type="button"
                      class="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-tool"
                      data-card-widget="remove"
                      data-toggle="tooltip"
                      title="Remove"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                 Welcome to Koder Academy Fees Payment Platform. This plaform gives you the opportunity to easily and efficiently pay student fees online  using the variety of payment channels available. Financial clearance takes effect after successful completion of transaction.
                </div>
                <div class="card-footer">Copyright (C) 2021. All Rights Reserved. Koder International Academy Department of Information Systems</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
