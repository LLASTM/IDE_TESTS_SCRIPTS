# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board @tutu
Feature: get theia extensions versions and add them to test report

  Background:
    Given user opens CubeStudio workspace in '../initial_workspaces/wsp01'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clears notifications list
    When user selects menu 'Help/About'
    When user gets theia extensions
    When user adds a screenshot to test report
    When user clicks button 'OK'
    When user adds a screenshot to test report
    When user gets notifications after 'get theia extensions versions'
