# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@T1IDE-import_projects

Feature:  As an end-user, I want to import projects from file system, and check context value after clicking on .gpdsc file

  Background:
    Given user opens CubeStudio workspace in '../test_workspace'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user imports project '<projectName>' from directory '<projectPath>'

    Scenarios:
    |projectPath|projectName|
    |project_STM32U535CBT6-CS217|project_STM32U535CBT6|
    |project_STM32U545CET6-CS217|project_STM32U545CET6|
