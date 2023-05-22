# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-207 @T1IDE
Feature:  As an end-user I want to clone my GIT project into Cube 2.0 tools using CLI and GUI,
          so that I easily can work with my project.
          clone IDE fake repository into workspace using UI

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


    
    
