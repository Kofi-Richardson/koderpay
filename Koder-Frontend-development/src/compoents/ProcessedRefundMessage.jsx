import React from "react";
import logo from "../assets/animation/loading.gif";

export default function ProcessedRefundMessage({ refund }) {

  return (
    <div class="content-wrapper " style={{ "min-height": "1244.06px;" }}>
      <div class="row">
      <div class="col-md-3 ">
        </div>
        <div class="col-md-6 ">
          <div class="card ">
            
            {refund.success == false ? 
              <div class="alert alert-danger alert-dismissible">
                <h5>
                  <i class="icon fas fa-ban"></i> Processing Failed
                </h5>
              </div>
             : 
              <div class="alert alert-success alert-dismissible">
                <h5>
                  <i class="icon fas fa-check"></i> Processing Successful
                </h5>
              </div>
            }
            {console.log(refund.succes)}
            {refund.success === false ? 
              <div class="card-body text-center">
                <h4 class="m-0 text-dark">
                  Sorry your Trasaction failed. Response was:{refund.message}{" "}
                </h4>
          
              </div>
             : 
              <div class="card-body text-center">
                <h4 class="m-0 text-dark">
                  Transaction was Successfully Processed. Response was: {refund.message}{" "}
                </h4>

            
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
