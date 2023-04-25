@Smoke
Feature: Placing an order

    Feature Description: A user can place an order succesfully

    Background: Setup
        Given I am logged in the website

    Scenario: A user can place an order succesfully
        When I add the product 'Fleece Jacket' to the cart
        And I add the product 'Bike Light' to the cart
        And I open the cart
        Then I see that the number of products in my cart is 2 with a quantity of 1 for each
        
        When I remove the 'Bike Light' product from the cart
        Then I see that I have in the cart the following products:
            | Fleece Jacket |
        And I see that the number of products in my cart is 1 with a quantity of 1 for each
        
        When I initiate checkout using my name 'Peter' 'Parker' and postalCode '1234'
        Then I see that the number of products in my cart is 1 with a quantity of 1 for each
        When I finish the purchase
        Then my order is confirmed
        And I am logged out