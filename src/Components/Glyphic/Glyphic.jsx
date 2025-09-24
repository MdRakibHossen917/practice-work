import React, { useEffect, useRef } from 'react';
import './Glyphic.css'; // You'll need to create this CSS file

const Glyphic = () => {
  const tabTimeoutRef = useRef(null);

  useEffect(() => {
    // Load external scripts
    loadScripts();
    
    // Initialize Webflow and tab functionality
    initializeWebflow();
    
    // Set up form handlers
    setupFormHandlers();
    
    return () => {
      if (tabTimeoutRef.current) {
        clearTimeout(tabTimeoutRef.current);
      }
    };
  }, []);

  const loadScripts = () => {
    // Web Font Loader
    const webFontScript = document.createElement('script');
    webFontScript.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    webFontScript.onload = () => {
      window.WebFont.load({ google: { families: ["Inter:300,regular,500,600,700"] } });
    };
    document.head.appendChild(webFontScript);

    // Other external scripts would be loaded here...
  };

  const initializeWebflow = () => {
    // Fix for Safari
    if (navigator.userAgent.includes("Safari")) {
      document.querySelectorAll(".tab-button").forEach(t => {
        t.focus = function () {
          const x = window.scrollX, y = window.scrollY;
          const f = () => {
            setTimeout(() => window.scrollTo(x, y), 1);
            t.removeEventListener("focus", f);
          };
          t.addEventListener("focus", f);
          HTMLElement.prototype.focus.apply(this, arguments);
        };
      });
    }

    // Start Tabs with focus-safe loop
    tabLoop();
  };

  const tabLoop = () => {
    tabTimeoutRef.current = setTimeout(() => {
      const activeTag = document.activeElement.tagName;
      const activeType = document.activeElement.type;

      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeType === "email") {
        tabLoop();
        return;
      }

      const currentTab = document.querySelector(".tabs-menu .w--current:first-child");
      const nextTab = currentTab?.nextElementSibling;
      
      if (nextTab) {
        nextTab.click();
      } else {
        document.querySelector(".tab-button:first-child")?.click();
      }
      
      tabLoop();
    }, 5000);
  };

  const setupFormHandlers = () => {
    const forms = [
      { formId: "booking-1", emailId: "capture-1" },
      { formId: "booking-2", emailId: "capture-2" }
    ];

    forms.forEach(({ formId, emailId }) => {
      const form = document.getElementById(formId);
      const emailField = document.getElementById(emailId);

      if (form && emailField) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          handleFormSubmit(emailField.value.trim(), form);
        });
      }
    });
  };

  const handleFormSubmit = (email, form) => {
    if (!email) return;

    const redirectUrl = `https://meetings-eu1.hubspot.com/meet-glyphic/book-a-call?email=${encodeURIComponent(email)}`;
    window.open(redirectUrl, "_blank");

    setTimeout(() => {
      form.submit();
    }, 100);
  };

  const handleTabClick = () => {
    if (tabTimeoutRef.current) {
      clearTimeout(tabTimeoutRef.current);
    }
    tabLoop();
  };

  return (
    <div className="page-wrapper">
      <div className="global-styles">
        <style>
          {`
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
            }

            *[tabindex]:focus-visible,
            input[type="file"]:focus-visible {
              outline: 0.125rem solid #4d65ff;
              outline-offset: 0.125rem;
            }

            .inherit-color * {
              color: inherit;
            }

            .w-richtext > :not(div):first-child,
            .w-richtext > div:first-child > :first-child {
              margin-top: 0 !important;
            }

            .w-richtext > :last-child,
            .w-richtext ol li:last-child,
            .w-richtext ul li:last-child {
              margin-bottom: 0 !important;
            }

            .container-medium,
            .container-small,
            .container-large {
              margin-right: auto !important;
              margin-left: auto !important;
            }

            .text-style-3lines {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            .text-style-2lines {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .hide {
              display: none !important;
            }

            @media screen and (max-width: 991px) {
              .hide,
              .hide-tablet {
                display: none !important;
              }
            }
            @media screen and (max-width: 767px) {
              .hide-mobile-landscape {
                display: none !important;
              }
            }
            @media screen and (max-width: 479px) {
              .hide-mobile {
                display: none !important;
              }
            }

            .margin-0 { margin: 0rem !important; }
            .padding-0 { padding: 0rem !important; }
            .spacing-clean { padding: 0rem !important; margin: 0rem !important; }
            .margin-top { margin-right: 0rem !important; margin-bottom: 0rem !important; margin-left: 0rem !important; }
            .padding-top { padding-right: 0rem !important; padding-bottom: 0rem !important; padding-left: 0rem !important; }
            .margin-right { margin-top: 0rem !important; margin-bottom: 0rem !important; margin-left: 0rem !important; }
            .padding-right { padding-top: 0rem !important; padding-bottom: 0rem !important; padding-left: 0rem !important; }
            .margin-bottom { margin-top: 0rem !important; margin-right: 0rem !important; margin-left: 0rem !important; }
            .padding-bottom { padding-top: 0rem !important; padding-right: 0rem !important; padding-left: 0rem !important; }
            .margin-left { margin-top: 0rem !important; margin-right: 0rem !important; margin-bottom: 0rem !important; }
            .padding-left { padding-top: 0rem !important; padding-right: 0rem !important; padding-bottom: 0rem !important; }
            .margin-horizontal { margin-top: 0rem !important; margin-bottom: 0rem !important; }
            .padding-horizontal { padding-top: 0rem !important; padding-bottom: 0rem !important; }
            .margin-vertical { margin-right: 0rem !important; margin-left: 0rem !important; }
            .padding-vertical { padding-right: 0rem !important; padding-left: 0rem !important; }
          `}
        </style>
      </div>

      {/* Navigation - You'll need to implement this component */}
      <nav 
        data-w-id="86ce2a39-d039-6517-87e4-8ea6db0ed6ea"
        data-animation="default"
        data-collapse="medium"
        data-duration="500"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar w-nav"
      ></nav>

      <div className="main-wrapper">
        <section 
          data-w-id="50691dc1-53e7-567d-3490-7e108acbd47d"
          className="section"
        >
          <div className="relative-wrapper">
            <div className="container-xlarge">
              <div className="padding-global">
                <div className="padding-section-start home-hero">
                  <div className="banner-above-hero"></div>
                  <div className="banner-above-hero">
                    <div className="w-layout-layout hide wf-layout-layout">
                      <div className="w-layout-cell cell-5">
                        <img
                          src="https://cdn.prod.website-files.com/66ab57eb9a13567f4e2a1a82/67bc9454e807e9482444ef61_Glyphic%20x%20Pavilion%20logo.svg"
                          loading="lazy"
                          alt=""
                          className="glyphic-x-pavilion-logo-banner"
                        />
                        <div className="hero-lottie-heading-for-banner">
                          Practical AI Guide For Revenue Leaders
                        </div>
                      </div>
                      <div className="w-layout-cell cell-4">
                        <div className="banner-download-annotation">
                          Get the our latest guide
                        </div>
                        <a
                          href="/glyphic-pavilion-winning-with-behavioral-data"
                          className="button is-yellow w-button"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="g2-logo">
                    <a
                      href="https://www.g2.com/products/glyphic-glyphic/reviews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-block-3 w-inline-block"
                    >
                      <img
                        src="https://cdn.prod.website-files.com/66ab57eb9a13567f4e2a1a82/67bf203875926855c42c1f15_G2%20logo%20for%20glyphic%20ai.svg"
                        loading="lazy"
                        alt="G2 Reviews"
                        className="image-7"
                      />
                    </a>
                  </div>

                  <div className="heading-align-center-wrapper">
                    <div className="max-width-text-hero-home">
                      <h1 className="heading-style-h1 text-color-grey-900">
                        The agent platform for revenue teams
                      </h1>
                    </div>
                    <div className="spacer-small"></div>
                    <div className="max-width-text-xxl shorter-mobile">
                      <p className="text-size-medium-sub-headline">
                        Conversation intelligence that{" "}
                        <strong className="white_emphasis_2">learns</strong>,{" "}
                        <strong className="white_emphasis_2">acts</strong>, and{" "}
                        <strong className="white_emphasis_2">accelerates</strong> revenue
                      </p>
                    </div>
                    <div className="spacer-large"></div>
                    
                    <div className="cta-alt">
                      <div className="text-weight-medium text-color-alternate hide">
                        Ready to get started?
                      </div>
                      <a
                        href="https://www.glyphic.ai/book-a-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button is-yellow hide w-button"
                      >
                        Book a free demo
                      </a>
                      
                      <form
                        id="booking-1"
                        name="wf-form-Hero-Booking"
                        className="form"
                      >
                        <input
                          className="text-field-2 w-input"
                          maxLength="256"
                          name="email-4"
                          placeholder="Your work email"
                          type="email"
                          id="capture-1"
                          required
                        />
                        <input
                          type="submit"
                          data-wait="Please wait..."
                          className="button is-yellow w-button"
                          value="Get Started"
                        />
                      </form>
                    </div>

                    <div className="spacer-large"></div>
                    <div className="spacer-xxsmall"></div>
                    
                    <div className="button-wrapper cta-buttons">
                      <a
                        href="https://www.glyphic.ai/book-a-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button is-yellow hide w-button"
                      >
                        Book a demo
                      </a>
                      <a
                        href="https://app.storylane.io/share/4y6g0p7njdgz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button white w-button"
                      >
                        See it in action
                      </a>
                      <a
                        href="https://glynn.glyphic.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button blue w-button"
                      >
                        Talk to Glynn now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Lottie Section */}
            <div className="hero-lottie-wrapper">
              <div className="hero-content-container">
                <div className="hero-items-wrapper">
                  <div className="hero-lottie-heading">
                    How conversational intelligence accelerates your sales team
                  </div>
                  <div className="hero-items">
                    {/* Hero Item 1 */}
                    <div className="hero-item _1">
                      <div className="hero-card">
                        <div className="card-step">Step 01</div>
                        <div className="hero-visual-wrapper">
                          <img
                            src="https://cdn.prod.website-files.com/66ab57eb9a13567f4e2a1a82/66d8b93c83591e742299f232_identify-strategic-insights-glyphic.svg"
                            loading="lazy"
                            alt="Glyphic identify strategies going forward"
                            className="hero-visual-1"
                          />
                        </div>
                        <div className="hero-item-content">
                          <div className="heading-top">
                            <div className="icon-wrapper lg">
                              <svg
                                aria-hidden="true"
                                width="100%"
                                height="100%"
                                role="img"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <title>Search icon</title>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3 11C3 6.58173 6.58173 3 11 3C15.4183 3 19 6.58173 19 11C19 12.9387 18.3096 14.7174 17.1624 16.1017L20.7803 19.7197C21.0732 20.0126 21.0732 20.4874 20.7803 20.7803C20.4874 21.0732 20.0126 21.0732 19.7197 20.7803L16.1017 17.1624C14.7174 18.3096 12.9387 19 11 19C6.58173 19 3 15.4183 3 11ZM11 4.5C7.41015 4.5 4.5 7.41015 4.5 11C4.5 14.5899 7.41015 17.5 11 17.5C12.7951 17.5 14.4191 16.7733 15.5962 15.5962C16.7733 14.4191 17.5 12.7951 17.5 11C17.5 7.41015 14.5899 4.5 11 4.5Z"
                                />
                              </svg>
                            </div>
                            <div className="card-heading-lg text-color-alternate">
                              Identify strategic insights
                            </div>
                          </div>
                          <p>
                            Spot patterns across your sales team to understand
                            how you can improve your win rate.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hero Item 2 */}
                    <div className="hero-item _2">
                      <div className="hero-card _2">
                        <div className="card-step">Step 02</div>
                        <div className="hero-visual-wrapper">
                          <img
                            src="https://cdn.prod.website-files.com/66ab57eb9a13567f4e2a1a82/66d8b9b913022a46f5076c9e_platform-rep-coaching.svg"
                            loading="lazy"
                            alt="Glyphic platform rep coaching"
                            className="hero-visual-1"
                          />
                        </div>
                        <div className="hero-item-content">
                          <div className="heading-top">
                            <div className="icon-wrapper lg">
                              <svg
                                aria-hidden="true"
                                width="100%"
                                height="100%"
                                role="img"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <title>Stack icon</title>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M11.2695 3.17415C11.4403 3.03166 11.6655 2.9723 11.8843 3.01213L20.3843 4.55901C20.7408 4.62389 21 4.93447 21 5.29689V18.7031C21 19.0655 20.7408 19.3761 20.3843 19.441L11.8843 20.9879C11.6655 21.0277 11.4403 20.9684 11.2695 20.8259C11.0987 20.6834 11 20.4724 11 20.25V3.75001C11 3.52759 11.0987 3.31665 11.2695 3.17415ZM12.5 4.64881V19.3512L19.5 18.0773V5.92271L12.5 4.64881ZM7.75 4.00001C8.16421 4.00001 8.5 4.33579 8.5 4.75001V19.25C8.5 19.6642 8.16421 20 7.75 20C7.33579 20 7 19.6642 7 19.25V4.75001C7 4.33579 7.33579 4.00001 7.75 4.00001ZM3.75 5.00001C4.16421 5.00001 4.5 5.33579 4.5 5.75001V18.25C4.5 18.6642 4.16421 19 3.75 19C3.33579 19 3 18.6642 3 18.25V5.75001C3 5.33579 3.33579 5.00001 3.75 5.00001Z"
                                />
                              </svg>
                            </div>
                            <div className="card-heading-lg text-color-alternate">
                              Identify strategic insights
                            </div>
                          </div>
                          <p>
                            Automate your sales process to streamline the entire
                            journey from lead to closed.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hero Item 3 */}
                    <div className="hero-item _3">
                      <div className="hero-card _3">
                        <div className="card-step">Step 03</div>
                        <div className="hero-visual-wrapper">
                          <img
                            src="https://cdn.prod.website-files.com/66ab57eb9a13567f4e2a1a82/66d8b9fde964eef6c94f7d51_monitor-validate-breakdown.svg"
                            loading="lazy"
                            alt="Glyphic monitor validation chart breakdown"
                            className="hero-visual-1"
                          />
                        </div>
                        <div className="hero-item-content">
                          <div className="heading-top">
                            <div className="icon-wrapper lg">
                              <svg
                                aria-hidden="true"
                                width="100%"
                                height="100%"
                                role="img"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <title>Pie Chart icon</title>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M14.2586 2.18337C14.4229 2.04092 14.6409 1.97677 14.8562 2.00756C18.547 2.53549 21.4646 5.45306 21.9924 9.14381C22.0232 9.35906 21.9591 9.57708 21.8166 9.74136C21.6742 9.90564 21.4674 10 21.25 10H14.75C14.3358 10 14 9.66422 14 9.25V2.75C14 2.53256 14.0944 2.32582 14.2586 2.18337ZM15.5 3.67101V8.5H20.329C19.6834 6.16046 17.8396 4.31663 15.5 3.67101Z"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M10.5041 5.51613C6.59314 5.77142 3.5 9.02449 3.5 13C3.5 17.1421 6.85787 20.5 11 20.5C14.974 20.5 18.2262 17.4091 18.4836 13.5002H11.2541C10.8399 13.5002 10.5041 13.1644 10.5041 12.7502V5.51613ZM2 13C2 8.02944 6.02944 4 11 4C11.0926 4 11.1848 4.00141 11.2767 4.00418C11.682 4.01642 12.0041 4.34845 12.0041 4.75384V12.0002H19.2463C19.6517 12.0002 19.9838 12.3224 19.996 12.7276C19.9987 12.8185 20 12.9092 20 13C20 17.9705 15.9705 22 11 22C6.02943 22 2 17.9705 2 13Z"
                                />
                              </svg>
                            </div>
                            <div className="card-heading-lg text-color-alternate">
                              Train and create habits
                            </div>
                          </div>
                          <p>
                            Automate your sales process to streamline the entire
                            journey from lead to closed.
                          </p>
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
    </div>
  );
};

export default Glyphic;