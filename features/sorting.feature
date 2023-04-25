@Smoke
Feature: Sorting

    Feature Description: A user can sort products succesfully

    Background: Setup
        Given I am logged in the website

    Scenario: A user can sort products by name
        When I sort products by 'Name (A to Z)'
        Then I see that the products are sorted '(A to Z)' by 'name'

        When I sort products by 'Name (Z to A)'
        Then I see that the products are sorted '(Z to A)' by 'name'
        And I am logged out

    Scenario: A user can sort products by price
        When I sort products by 'Price (low to high)'
        Then I see that the products are sorted '(low to high)' by 'price'

        When I sort products by 'Price (high to low)'
        Then I see that the products are sorted '(high to low)' by 'price'
        And I am logged out