# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-217 @T1IDE

Feature:  As an end-user, I want to stage a file for commit using CLI and GUI, 
          so that I can work in the way I prefer.

  Background:
    Given user opens CubeStudio workspace in "./features/resources"

  Scenario:
    Then user clicks Source Control icon
    Then user adds a screenshot to test report
    Then user uses palette command to clone repository "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY"
    Then user adds a screenshot to test report
    
    Then user clicks explorer icon
    Then user searches for string "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY" in current page
    Then user adds a screenshot to test report

    Then user expands fake repo project directories
    Then user adds a screenshot to test report
    Then user creates a set of "5" new files
    Then user adds a screenshot to test report
    
    Then user clicks Source Control icon
    Then user adds all files to staging area
    Then user adds a screenshot to test report
    Then user checks that "5" files are in the staging area
    Then user adds a screenshot to test report
