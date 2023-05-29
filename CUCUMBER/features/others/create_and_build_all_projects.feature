# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE:others:no_board @IDEDEBUG
Feature: Creation and build of all projects for all MCU/Board

Background:
    Given user opens CubeStudio workspace in '../initial_workspaces/wsp01'
    Given user sets viewport size to '4K'
  
Scenario:
    When user clicks Finder icon
    When user builds list of 'MCU'
    When user builds list of 'Board'
    When user builds all projects for 'Board'
