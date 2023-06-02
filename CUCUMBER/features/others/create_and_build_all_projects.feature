# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @toto
Feature: Creation and build of all projects for all MCU/Board

Background:
    Given user opens CubeStudio workspace in '../initial_workspaces/wsp01'
    Given user sets viewport size to 'FullHD'
    Given user clicks Finder icon
    
    #Given user synchronizes database
    When user clicks button 'Synchronize' 
    Given user pauses for '10' seconds

Scenario:
    #When user builds list of 'Board'
    #When user builds all projects for 'Board'
    When user builds list of 'MCU'
    #When user builds all projects for 'MCU'

    # flags on line below : products, create project, delete project at end of test , check context, build project,  open pinout view, open clock view
    # MCU, create project, delete project at end of test , check context
    When user starts IDE tests for 'MCU' 'true' 'true' 'true' 'false' 'false' 'false'

