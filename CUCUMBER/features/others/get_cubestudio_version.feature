# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board
Feature: get cubestudio version using About menu and add it to test report

  Background:
    Given user opens CubeStudio workspace in "../initial_workspaces/wsp01"
    Given user sets viewport size to "4K"

  Scenario:
    Then user clears notifications list
    Then user opens About menu
    Then user gets cube studio version
    Then user adds a screenshot to test report
    Then user closes About menu
    
