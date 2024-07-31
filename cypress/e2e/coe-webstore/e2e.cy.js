// <reference types="cypress" />

import Global from "../../pageElements/Global";
import Checkout from "../../pageElements/Checkout";
import AddToCart from "../../pageElements/Cart";
import Logout from "../../pageElements/Logout";



describe("Login functionality", () => {
  const EMAIL = Cypress.env("username");
  const PASSWORD = Cypress.env("password");


  beforeEach(() => {
    cy.login(EMAIL, PASSWORD);
  });

  // Jira link (https://tdlschool.atlassian.net/browse/TSS22N-299)
  it("Login Validation", () => { 
    cy.visit("/");
    // after successfull login homepage should open.
    cy.homepageValidation();
  });
  
// Jira link (https://tdlschool.atlassian.net/jira/software/c/projects/TSS22N/boards/274?assignee=63f335e2e76fc61320f3f3a1&selectedIssue=TSS22N-300)
  it("Add an item to cart ", () => {
    // navigate to cart page and delete items if already present
    cy.visit("/cart");

    // To validate "Cart" page is open.
    cy.title().should("eq", "Cart");

    // Delete items in cart if alreday present.
    AddToCart.deleteItemsFromCart();

    // Validate items are deleted from cart
    AddToCart.isItemDeleted();

    //Go back to home page.
    Global.navigateSideBar.openPage("Home");

    // To validate whether we are returned to homepage or not.
    cy.homepageValidation();

    // To select a product from the homepage and validate that the user chose the correct product.
    AddToCart.selectItemAndValidate("Medusa T-Shirt");

    // Choose size 'L' and color 'White'
    AddToCart.selectProductAttributesAndValidate("L", "White");

    // to add item to cart and validate.
    AddToCart.addToCartAndValidate("Medusa T-Shirt");
  });

  // Jira link (https://tdlschool.atlassian.net/jira/software/c/projects/TSS22N/boards/274?assignee=63f335e2e76fc61320f3f3a1&selectedIssue=TSS22N-301)
  it("Check out item from cart", () => {
    //Go to Cart page
    cy.visit("/cart");

    // To validate "Cart" page is open.
    cy.title().should("eq", "Cart");
    Global.elements.storeOfExclenece().should("be.visible");

    // To go to check out page and validate.
    Checkout.gotoCheckoutAndValidate("Medusa T-Shirt");

    // Fill address details
    Checkout.editAddress();

    // Fill address details
    Checkout.fillAddressField("shipping-first-name-input", "jass");
    Checkout.fillAddressField("shipping-last-name-input", "Kaniyath");
    Checkout.fillAddressField("shipping-address-input", "ABC street 101");
    Checkout.fillAddressField("shipping-postal-code-input", "333");
    Checkout.fillAddressField("shipping-city-input", "New York");
    Checkout.fillAddressField("shipping-country-select", "United States", true);

    //Submit address and validate it.
    Checkout.submitAddressAndValidate();

    // Select "FakeEx Standard" from delivery options
    Checkout.selectAndValidateDelivery("FakeEx Standard");

    // validate payment option is selected
    Checkout.validatePayment();

    // To click review button and validate.
    Checkout.validateReview();

    // Place and validate order
    Checkout.placeAndValidateOrder();
  });

  // Jira link (https://tdlschool.atlassian.net/jira/software/c/projects/TSS22N/boards/274?assignee=63f335e2e76fc61320f3f3a1&selectedIssue=TSS22N-302)
  it("Logs out from webstore", () => {
    cy.visit("/");
    cy.homepageValidation();

    // logout from home page and validate it
    Logout.selectAndValidateLogout();
  });
});
