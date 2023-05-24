# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board
Feature: Project creation and build
  
  Background:
    Given user opens CubeStudio workspace in "../initial_workspaces/wsp01"
    Given user sets viewport size to "4K"
    Given user clicks Finder icon
    Given user clicks on Synchronize button

  Scenario: First
    
    Given user creates application project '<project>' with board '<board>'
    Given user adds a new software project '<swProject>' in application project panel
    Given user adds a new software component to project '<swProject>' in application project panel
    Then user clears notifications list
    Then user gets notifications after "project creation"
   
    Then user converts project '<project>'
    Then user pauses for "5" seconds
    Then user gets notifications after "project conversion"

    Then user builds project '<project>' '<swProject>' '<releaseToBuild>'
    Then user pauses for "5" seconds
    Then user gets notifications after "project build"

    Then user builds verdict from notifications

Scenarios:
    | project        | board           | swProject                 | releaseToBuild   |
    | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | release          |
    | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | debug            |
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | release          |
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | debug            |
