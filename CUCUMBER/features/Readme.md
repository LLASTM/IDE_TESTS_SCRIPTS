test-tools : contains files from test-tools/e2e :
	- that I needed to patch
	- that contains typescript procedures I added to original file steps.ts from test-tools/e2e/features/support

	These files must be copied inside test-tools/e2e directory before starting tests

scripts : this directory contains bash scripts used to launch tests

IDE : this directory contains the IDE tests files

others : this directory contains other tests that are not IDE tests

cucumber : contains a file settings.json that should be copied to build directory/.vscode, it is used to get completion with cucumber
