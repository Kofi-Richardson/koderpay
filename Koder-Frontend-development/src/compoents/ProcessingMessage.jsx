import React from "react";
import logo from "../assets/animation/loader.gif";

export default function ProcessingMessage({type}) {
  return (
    <div class="content-wrapper " style={{ "min-height": "1244.06px;" }}>
      <div class="row">
       
      <div class="col-md-3">
        </div>
        <div class="col-md-6">
          <div class="card">
          <div class="alert alert-info alert-dismissible">
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5><i class="icon fas fa-info"></i>  Processing </h5>
                  
                </div>

            <div class="card-body text-center" >
            

              <div>
                <img src={logo} alt="loading..." />
              </div>
              <h3>
              {type} is in Progress...
              </h3>
              <p>Please wait until the status changes </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
