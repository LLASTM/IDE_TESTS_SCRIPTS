# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-207
Feature: clone IDE fake repository into workspace using UI

  Background:
    Given user opens CubeStudio workspace in "./features/resources"

  Scenario:
    Then user goes to SCM view
    Then user adds a screenshot to test report
    Then user uses palette command to clone repository "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY"
    Then user adds a screenshot to test report
    
    Then user goes to explorer view
    Then user searches for "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY"
    Then user adds a screenshot to test report


    