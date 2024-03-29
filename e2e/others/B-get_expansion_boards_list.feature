# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board
Feature: report list of expansion boards found in Finder

Background:
    Given user opens CubeStudio workspace in '../test_workspace'
    Given user sets viewport size to 'FullHD'

    Given user clicks Finder icon
    Given user builds list of 'Expansion Board'
    Given user clicks Finder icon
    
Scenario:
    When user adds 'Expansion Board' list to test report
