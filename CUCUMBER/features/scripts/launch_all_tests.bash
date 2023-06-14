#!/bin/bash

# tags available to customize IDE tests
#
#       @IDE:git:ui             : all IDE tests using UI
#       @T1IDE                  : all T1IDE jira related tests
#       @IDE @IDE:git:ui @T1IDE-207 @T1IDE      ../IDE/git/UI/T1IDE-207.feature
#       @IDE:git:ui @T1IDE-215 @T1IDE           ../IDE/git/UI/T1IDE-215.feature
#       @IDE @IDE:git:ui @T1IDE-217 @T1IDE      ../IDE/git/UI/T1IDE-217.feature
#       @IDE @IDE:git:ui @T1IDE-218 @T1IDE      ../IDE/git/UI/T1IDE-218.feature
#       @IDE @IDE:git:ui @T1IDE-222 @T1IDE      ../IDE/git/UI/T1IDE-222.feature
#       @IDE @IDE:git:ui @T1IDE-736 @T1IDE      ../IDE/git/UI/T1IDE-736.feature*

#./launch_test.bash @T1IDE 1
#./launch_test.bash @robustness 1

./launch_test.bash "@T1IDE or @robustness" 1

