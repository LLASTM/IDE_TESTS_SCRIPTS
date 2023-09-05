test-tools : contains files from test-tools/e2e : - that I needed to patch - that contains typescript procedures I added to original file steps.ts from test-tools/e2e/features/support

    These files must be copied inside test-tools/e2e directory before starting tests

scripts : this directory contains bash scripts used to launch tests

- launch_IDE_customApp_tests.bash : used to build/launch tests using the IDE browser app 

- build_cube_studio.bash : used to build Cube Studio from repo 

- launch_cube_studio_test.bash : used to launch one test using Cube Studio

- launch_all_cube_studio_tests.bash : used to serialize several tests , each calling launch_cube_studio_test.bash

IDE : this directory contains the IDE tests files

others : this directory contains other tests that are not IDE tests

cucumber : contains a file settings.json that should be copied to build directory/.vscode, it is used to get completion with cucumber
