# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@T1IDE @IDE:others @IDE:others:no_board @IDE-version @T1IDE-robustness
Feature: get cubestudio version using About menu and add it to test report

  Background:
    Given user opens CubeStudio workspace in '../test_workspace'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clears notifications list
    When user selects menu 'Help/About'
    When user gets cube studio version
    When user adds a screenshot to test report
    When user clicks button 'OK'
    When user adds a screenshot to test report
    
