#!/bin/bash

# This script was designed to:
#	1 - create some directories used as workspaces for tests
#	2 - launch IDE tests (by default, all available tests are launched)
#
# input parameter to this script : 	$1, the tag to use for tests

tags_to_use=$1

if [ "${tags_to_use}" == "" ]; then
	tags_to_use="@notest"
fi

echo launch_custom_tests.bash : tag to use=${tags_to_use}

echo ======================================== command : overwritting some files in test-tools/e2e
cat ../test-tools/e2e/features/support/steps_diff.ts >> ../../../test-tools/e2e/features/support/steps.ts
echo ======================================== command : overwritting some files in test-tools/e2e done

# we go to test-tools repo to launch tests
cd ../../../test-tools/e2e

yarn e2e:tests:custom "${tags_to_use}"

# tags available to customize IDE tests
#
#	@IDE:git:ui		: all IDE tests using UI
#	@T1IDE			: all T1IDE jira related tests
#	@IDE @IDE:git:ui @T1IDE-207 @T1IDE	../IDE/git/UI/T1IDE-207.feature
#	@IDE:git:ui @T1IDE-215 @T1IDE		../IDE/git/UI/T1IDE-215.feature
#	@IDE @IDE:git:ui @T1IDE-217 @T1IDE	../IDE/git/UI/T1IDE-217.feature
#	@IDE @IDE:git:ui @T1IDE-218 @T1IDE	../IDE/git/UI/T1IDE-218.feature
#	@IDE @IDE:git:ui @T1IDE-222 @T1IDE	../IDE/git/UI/T1IDE-222.feature
#	@IDE @IDE:git:ui @T1IDE-736 @T1IDE	../IDE/git/UI/T1IDE-736.feature

# other tags available for tests non directly linked to IDE
# @IDE:others				: other tests , both using board and no board
# @IDE:others:no_board	: other tests not using board ( build mcus,mpus,boards lists , get cube studio version,...)
# @IDE:others:with_board	: test creating,building,debugging with a board B-U585I-IOT02A

