import React from "react";
import {Link} from "react-router-dom";
export default function PageNotFound() {
 
  return (
    <div  style={{ "min-height": "1244.06px;" }}>
     <section class="content">
      <div class="error-page">
        <h2 class="headline text-warning"> 404</h2>

        <div class="error-content">
          <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

          <p>
            We could not find the page you were looking for.
            Meanwhile, you may  <Link to="/">return to dashboard</Link>
          </p>

          <form class="search-form">
            <div class="input-group">
           

        
            </div>
         
          </form>
        </div>
       
      </div>
   
    </section>
    </div>
  );
}
