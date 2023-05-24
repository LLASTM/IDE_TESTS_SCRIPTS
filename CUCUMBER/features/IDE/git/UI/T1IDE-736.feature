# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-736 @T1IDE
Feature:  As a squad leader, I want to get a running integration test on community GIT repo
          initialization feature so that I can support squad quality commitment

  Background:
    Given user opens CubeStudio workspace in "../../../initial_workspaces/wsp00"
    Given user sets viewport size to "4K"

  Scenario:
    Then user clicks Source Control icon
    Then testuser performs git repo init command
    Then testuser adds files to staging area
    Then testuser checks that 2 files are in the staging area
    Then user adds a screenshot to test report
    # Then user commits changes
    # Then user adds a screenshot to test report
    # Then user adds a commit message
    # Then user adds a screenshot to test report