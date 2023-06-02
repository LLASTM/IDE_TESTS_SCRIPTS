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
    Given user opens CubeStudio workspace in '../initial_workspaces/wsp01'
    Given user sets viewport size to 'FullHD'
    Given user clicks Finder icon
    
    Given user clicks button 'Synchronize'
    Given user pauses for '10' seconds

  Scenario: First
    
    Given user creates application project '<project>' with board '<board>'
    Given user adds a new software project '<swProject>' in application project panel
    #Given user adds a new software component to project '<swProject>' in application project panel
    Given user clears notifications list
    Given user gets notifications after 'project creation'
   
    When user selects menu 'Terminal/Run Build Task'
    When user converts project '<project>'
    When user pauses for '10' seconds
    When user gets notifications after 'project conversion'

    When user selects menu 'Terminal/Run Build Task' 
    When user builds project '<project>' '<swProject>' '<releaseToBuild>'
    When user pauses for '10' seconds
    When user gets notifications after 'project build'

    When user builds verdict from notifications

Scenarios:
    | project        | board           | swProject                 | releaseToBuild   |
    | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | release          |
    | ApplicationPrj | B-U585I-IOT02A  | SWProject-B-U585I-IOT02A  | debug            |
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | release          |
    # | ApplicationPrj | NUCLEO-U575ZI-Q | SWProject-NUCLEO-U575ZI-Q | debug            |
