# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:with_board
Feature: Project creation for board B-U585I-IOT02A, builds its debug configuration and step over a breakpoint added in an infinite loop
  
  Background:
    Given user opens CubeStudio workspace in "./features/resources/sample-files1"
    Given user clicks Finder icon
    Given user clicks on Synchronize button

  Scenario: First
    Given user creates application project '<project>' with board '<board>'
    Given user adds a new software project '<swProject>' in application project panel
    Given user adds a new software component to project '<swProject>' in application project panel
    Then user clears notifications list
    Then user gets notifications after "project creation"
    
    Then testuser opens file main.c of sw project '<swProject>' of application '<project>'
    Then testuser patches file main.c
    Then user adds a screenshot to test report
    Then testuser adds breakpoints to file main.c
    Then user adds a screenshot to test report
    Then user saves all files

    Then user converts project '<project>'
    Then user pauses for "5" seconds
    Then user gets notifications after "project conversion"
    Then user gets conversion log messages from console
    Then user sets a conversion verdict

    Then user builds project '<project>' '<swProject>' '<releaseToBuild>'
    Then user pauses for "5" seconds
    Then user adds a screenshot to test report
    Then user gets build log messages from console
    Then user sets a build verdict from console traces
    Then user gets notifications after "project build"

    Then user adds debugger console
    Then user adds a screenshot to test report

    Then user selects debug context for application '<project>', sw project '<swProject>' and '<releaseToBuild>' version
    Then user adds a screenshot to test report

    Then user creates a debug configuration
    Then user adds a screenshot to test report

    Then user saves all files
    Then user adds a screenshot to test report
  
    Then user starts debugger
    Then user pauses for "5" seconds
    Then user gets notifications after "starting debugger"

    Then user performs '<loops>' loops on breakpoints
    Then user gets notifications after "performing loops"

    Then user builds verdict from notifications

Scenarios:
    | project        | board           | swProject                 | releaseToBuild   | loops |
    | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | debug            | 4     |

    # | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | release            | 
    # for the 2 following boards , the device:... field is missing in file csolution.yml
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | release          |
    # | ApplicationPrj | STM32U575I-EV   | SWProject-STM32U575I-EV   | release          |
    # | ApplicationPrj | STM32U575I-EV   | SWProject-STM32U575I-EV   | debug            |
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | debug            |
