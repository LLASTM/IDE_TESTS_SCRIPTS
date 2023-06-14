# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @robustness
Feature: Creation and build of all projects for all MCU/Board

Background:
    Given user opens CubeStudio workspace in '../initial_workspaces/wsp01'
    #Given user sets viewport size to 'FullHD'
    Given user clicks Finder icon
    
    Given user synchronizes database
    #When user clicks button 'Synchronize' 
    Given user pauses for 10 seconds

Scenario:
    
	When user builds list of 'MCU'
    # flags on line below : products, create project, delete project at end of test , check context, build project,  open pinout view, open clock view, number of tests to run
    # -1 means all tests to be run
    When user starts IDE tests for 'MCU' 'true' 'true' 'true' 'true' 'false' 'false' '5'

    #When user builds list of 'Board'
    # flags on line below : products, create project, delete project at end of test , check context, build project,  open pinout view, open clock view, number of tests to run
    #When user starts IDE tests for 'Board' 'true' 'true' 'true' 'true' 'false' 'false' '2'

