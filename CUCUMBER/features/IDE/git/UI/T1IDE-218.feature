# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-218 @T1IDE
Feature: As an end-user, I want to unstage a file for commit using CLI and GUI, so that I can work in the way I prefer.

          After cloning repository :
	  Create a new file into repository
	  Add file to staging Area
	  Undo this command
	  Check that no more file is present in staging area
                      

  Background:
    Given user opens CubeStudio workspace in '../../../initial_workspaces/wsp00'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    When user runs quick command 'Git: Clone...' to clone directory 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY'
    When user selects repository 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY' link
    When user pauses for '8' seconds

    Then user clicks Source Control icon
    When user adds new file 'testFile02.txt'
    Then user clicks on staging all changes button
    Then user  reverts command
    Then user checks that 0 file are in staging area
    Then user adds a screenshot to test report

    Then user selects menu 'View/History'
    Then user adds a screenshot to test report
    
