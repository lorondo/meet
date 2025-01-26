Feature: Specify Number of Events

  Scenario: User does not type in the number-of-events field
    Given the user opens the app
    When user hasn’t typed in the number-of-events field
    Then textbox input field has a default value of 32

  Scenario: User types a number in the number-of-events field
    Given the user opens the app
    When user types in the textbox
    Then the textbox value updates
    And I should be able to see a list of events with the number I typed as the length