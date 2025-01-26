Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user opens the app
    When the event list is displayed
    Then each event element should be collapsed by default

  Scenario: User can expand an event to see details
    Given the event list is displayed
    When the user clicks on an event
    Then the event details should be shown

  Scenario: User can collapse an event to hide details
    Given the event details are visible
    When the user clicks on the event again
    Then the event details should be hidden
