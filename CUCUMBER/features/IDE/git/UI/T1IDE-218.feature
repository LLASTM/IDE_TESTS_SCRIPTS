# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-218 @T1IDE @T1IDE-UI @T1IDE-robustness
Feature: As an end-user, I want to unstage a file for commit using CLI and GUI, so that I can work in the way I prefer.

    After cloning repository :
	  Create 5 new files into repository
	  Add files to staging Area
    Check that 5 files are in the staging area
	  Undo this command
	  Check that 0 file is in the staging area
                      
  Background:
    Given user opens CubeStudio workspace in '../../../initial_workspaces/wsp00'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    When user runs quick command 'Git: Clone...' to clone directory 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY'
    When user selects repository 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY' link
    When user pauses for 8 seconds

    When user clicks explorer icon
    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    When user clicks object containing text 'Files'
    When user creates a set of '5' new files
    When user clicks Source Control icon
    When user adds all files to staging area
    When user checks that '5' files are in the staging area
    Then user adds a screenshot to test report
    When user unstages all staged changes
    Then user adds a screenshot to test report
    When user checks that there are '5' unstaged changes
    
   
    
