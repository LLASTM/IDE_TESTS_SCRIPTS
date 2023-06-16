# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @T1IDE-750 @T1IDE-UI @T1IDE-robustness
Feature: Creation and build of 1 project for Board U5
	How to:
		- Start from nothing.
		- Add a project to workspace
		- Double check status bar .. you should have [NO CONTEXT] as part of context widget
		- Open main.c file being part of a Cube2.0 software project. You should see context widget updated

Background:
    Given user opens CubeStudio workspace in '../../../initial_workspaces/wsp00'
    Given user clears notifications list
    Given user sets viewport size to 'FullHD'
    Given user clicks Finder icon
    
    Given user synchronizes database
    #When user clicks button 'Synchronize' 
    Given user pauses for 10 seconds

Scenario:

    When user builds list of 'Board'
    # flags on line below : products, create project, delete project at end of test , check context, build project,  open pinout view, open clock view, number of tests to run
    When user starts IDE tests for 'Board' 'true' 'true' 'true' 'false' 'false' 'false' '1'
