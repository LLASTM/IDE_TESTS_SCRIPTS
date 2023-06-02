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
    Given user opens CubeStudio workspace in '../initial_workspaces/wsp01'
    Given user sets viewport size to 'FullHD'
    Given user clicks Finder icon
    Given user clicks button 'Synchronize'
    Given user pauses for '10' seconds

  Scenario: First
    Given user creates application project '<project>' with board '<board>'
    Given user adds a new software project '<swProject>' in application project panel
    #Given user adds a new software component to project '<swProject>' in application project panel
    When user clears notifications list
    When user gets notifications after 'project creation'
    
    When user clicks explorer icon
    When testuser opens file main.c of sw project '<swProject>' of application '<project>'
    When testuser patches file main.c
    When user adds a screenshot to test report

    When testuser clicks on line with incremented i
    When user selects menu 'Run/Toggle Breakpoint'

    When user adds a screenshot to test report
    When user selects menu 'File/Save All'

    When user selects menu 'Terminal/Run Build Task'
    When user converts project '<project>'
    When user pauses for '5' seconds
    When user gets notifications after 'project conversion'
    When user gets conversion log messages from console
    When user sets a conversion verdict

    When user selects menu 'Terminal/Run Build Task'
    When user builds project '<project>' '<swProject>' '<releaseToBuild>'
    When user pauses for '5' seconds
    When user adds a screenshot to test report
    When user gets build log messages from console
    When user sets a build verdict from console traces
    When user gets notifications after 'project build'

    When user selects menu 'View/Debug Console'
    When user adds a screenshot to test report

    When user selects debug context for application '<project>', sw project '<swProject>' and '<releaseToBuild>' version
    When user adds a screenshot to test report

    When user selects menu 'Run/Start Debugging'
    When user selects launch configuration 'Cube (PoC): Generic Context Based STM32 Launch'
    When user adds a screenshot to test report

    When user selects menu 'File/Save All'
    When user adds a screenshot to test report
  
    When user selects menu 'Run/Start Debugging'
    When user pauses for '10' seconds
    When user gets notifications after 'starting debugger'

    When testuser performs '<loops>' loops on breakpoints
    When user gets notifications after 'performing loops'

    When user builds verdict from notifications

Scenarios:
    | project        | board           | swProject                 | releaseToBuild   | loops |
    | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | debug            | 4     |

    # | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | release            | 
    # for the 2 following boards , the device:... field is missing in file csolution.yml
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | release          |
    # | ApplicationPrj | STM32U575I-EV   | SWProject-STM32U575I-EV   | release          |
    # | ApplicationPrj | STM32U575I-EV   | SWProject-STM32U575I-EV   | debug            |
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | debug            |
