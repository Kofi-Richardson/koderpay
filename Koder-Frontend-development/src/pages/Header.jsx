import React, { Form } from "react";
import { Route, BrowserRouter, Router, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";

const Header = () => {
  const history = useHistory();

  const logout = () => {
    /* eslint-disable */
    //const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    // if (toLogout) {
    localStorage.clear();
    history.push("/login");
    // }
  };

  return localStorage.getItem("user") ? (
    <body
      class="sidebar-mini layout-fixed sidebar-open"
      style={{ height: "auto;" }}
    >
      <div class="wrapper">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav ml-auto">
            <button
              type="button"
              class="btn btn-block btn-default"
              onClick={logout}
            >
              Logout
            </button>

            <li class="nav-item">
              <a
                class="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <i class="fas fa-th-large"></i>
              </a>
            </li>
          </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-light elevation-4">
          <a href="#" class="brand-link">
            <img
              src={`/images/koder-logo.png`}
              alt="Logo"
              class="brand-image "
            />
            <span class="brand-text font-weight-light">Koder </span>
          </a>

          <div class="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition">
            <div class="os-resize-observer-host observed">
              <div
                class="os-resize-observer"
                style={{ "left: 0px; right": "auto;" }}
              ></div>
            </div>
            <div
              class="os-size-auto-observer observed"
              style={{ "height: calc(100% + 1px); float": "left;" }}
            >
              <div class="os-resize-observer"></div>
            </div>
            <div
              class="os-content-glue"
              style={{ "margin: 0px -8px; width: 249px; height": "418px;" }}
            ></div>
            <div class="os-padding">
              <div
                class="os-viewport os-viewport-native-scrollbars-invisible os-viewport-native-scrollbars-overlaid"
                style={{ "overflow-y": "scroll;" }}
              >
                <div
                  class="os-content"
                  style={{ "padding: 0px 8px; height": "100%; width: 100%;" }}
                >
                  <nav class="mt-2">
                    <ul
                      class="nav nav-pills nav-sidebar flex-column"
                      data-widget="treeview"
                      role="menu"
                      data-accordion="false"
                    >
                      <li class="nav-item">
                        <Link to="/" class="nav-link">
                          <i class="nav-icon fas fa-home"></i>
                          <p>Koder Payment Home</p>
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link to="/pay-fees" class="nav-link">
                          <i class="nav-icon fas fa-money-bill-alt"></i>
                          <p>Pay Fees</p>
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link to="/transactions" class="nav-link">
                          <i class="nav-icon fas fa-money-bill-alt"></i>
                          <p>Transactions</p>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
              <div class="os-scrollbar-track">
                <div
                  class="os-scrollbar-handle"
                  style={{ width: "100%;", transform: "translate(0px, 0px);" }}
                ></div>
              </div>
            </div>
            <div class="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
              <div class="os-scrollbar-track">
                <div
                  class="os-scrollbar-handle"
                  style={{
                    height: "33.3068%;",
                    transform: "translate(0px, 0px);",
                  }}
                ></div>
              </div>
            </div>
            <div class="os-scrollbar-corner"></div>
          </div>
        </aside>
      </div>
      <script src="../assets/plugins/jquery-ui/jquery-ui.min.js"></script>
    </body>
  ) : (
    <div></div>
  );
};

export default Header;
