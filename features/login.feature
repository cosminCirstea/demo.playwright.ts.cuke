@Login
Feature: Log in the website

    Feature Description: A user can log in the website succesfully

    Background: Setup
        Given I am on the base url

    Scenario: A user can log in the website using valid credentials
        When I log in with the username 'locked_out_user' and password 'secret_sauce'
        Then I am logged in succesfully