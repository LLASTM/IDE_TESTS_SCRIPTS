# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board @IDEDEBUG

Feature: report list of Parts found in Finder

Background:
    Given user opens CubeStudio workspace in "./features/resources/sample-files1"
    
    Given user clicks Finder icon
    Given user builds list of "Part"
    Given user clicks Finder icon
    
Scenario:
    Then user adds "Part" list to test report