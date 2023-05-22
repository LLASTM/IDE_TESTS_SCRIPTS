# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board @IDEDEBUG

Feature: report list of MPUs found in Finder

Background:
    Given user opens CubeStudio workspace in "./features/resources/sample-files1"
    
    Given user clicks Finder icon
    Given user builds list of "MPU"
    Given user clicks Finder icon
    
Scenario:
    Then user adds "MPU" list to test report