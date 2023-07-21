#!/bin/bash

tags_to_use=$1

echo ======================================== command : removing cloud directories from ~/AppData/Local/Temp
rm -rf ${HOME}/AppData/Local/Temp/cloud*

# =====================================================================
# first we are copying 2 files into plugins directory to get git access
if [ -d ../../plugins ]; then
	rm -rf ../../plugins
	mkdir ../../plugins
else
	mkdir ../../plugins
fi
pushd ../../plugins
powershell.exe -inputformat none -noprofile wget -Uri https://open-vsx.org/api/vscode/git/1.77.0/file/vscode.git-1.77.0.vsix -OutFile vscode.git-1.77.0.vsix
unzip -d vscode.git ./vscode.git-1.77.0.vsix
powershell.exe -inputformat none -noprofile wget -Uri https://open-vsx.org/api/vscode/git-base/1.77.0/file/vscode.git-base-1.77.0.vsix -Outfile vscode.git-base-1.77.0.vsix
unzip -d vscode.git-base ./vscode.git-base-1.77.0.vsix
popd

# =====================================================================

cd ../.. # go to cube-ide directory

if [ -d ../test-tools ]; then
	rm -rf ../test-tools
fi

if [ ! -d ../test-tools ]; then
	echo test-tools is not installed, cloning it
	cd ..
	if [ -d cube-e2e-test-tools ]; then
		rm -rf cube-e2e-test-tools
	fi
	git clone https://github.com/PRG-Cube/cube-e2e-test-tools
	mv cube-e2e-test-tools e2e
	mkdir test-tools
	mv e2e test-tools/.
	echo installation of test-tools is done
	cd cube-ide
	echo path is $PWD before copy
	cat features/test-tools/e2e/features/support/steps_diff.ts >> ../test-tools/e2e/features/support/steps.ts
	status_cat=$?
	echo status after cat of file steps.ts : ${status_cat}
	cp features/test-tools/e2e/features/models/theia-app.ts ../test-tools/e2e/features/models/.
	status_copy=$?
	echo status after copy of file theia-app.ts : ${status_copy}
fi

# to avoid to get the error : Address already in use, we must kill the process listening to the port
pidList=`netstat -ano | findstr :3000 | awk '{print $NF}'`
for pid in `echo ${pidList}`;do
	if [ "${pid}" != "0" ]; then
		echo taskkill //PID ${pid} //F
		taskkill //PID ${pid} //F
	fi
done

echo ======================================== command : building IDE custom Application
yarn 
yarn_build_status=$?
if [ ${yarn_build_status} -ne 0 ]; then
        echo command yarn failed, stopping script
        exit 100
fi

echo ======================================== command : starting IDE custom Application
yarn start:browser &
yarn_start_status=$?
if [ ${yarn_start_status} -ne 0 ]; then
        echo command yarn start:browser start failed, stopping script
        exit 101
fi
sleep 40

echo Deleting directory traces from test-tools/e2e
rm -rf ../test-tools/e2e/traces
echo Directory from test-tools/e2e/traces deleted

if [ ! -d $HOME/tests_artifacts ]; then
	mkdir -p $HOME/tests_artifacts
fi

echo ================================ running yarn command
cd features/scripts
echo path $PWD before stating yarn command
yarn --cwd ../../../test-tools/e2e e2e:tests:custom "${tags_to_use}" --remote-server localhost:3000
cd ../..
echo ======================================== command : End of IDE custom Application tests

traces_directory=${HOME}/tests_artifacts/traces_`date | sed -e "s/ /_/g" -e "s/:/_/g"`
cp -rf ../test-tools/e2e/traces ${traces_directory}
echo tests artifacts saved to directory ${traces_directory}

