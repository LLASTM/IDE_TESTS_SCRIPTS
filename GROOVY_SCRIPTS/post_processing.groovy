// File : post_processing.groovy
// It is called to parse artifacts files
// to set and display build, tests results
// In order to run,  it needs to find files (from archive_dir directory) into a directory called TEST_RESULTS

use_functional_mode=true // set to false when using dev. environment
use_manager=true

display_project_configuration_traces_table=true
display_build_traces_table=true
display_debug_traces_table=true
display_registers_traces_table=false

import groovy.io.FileType
import groovy.transform.Field
import static java.util.Calendar.*

// =================================================================

def trace(String msg)
{
	if (use_functional_mode.equals(true))
	{
		if (use_manager.equals(false))
		{
			listener.logger.println(msg)
		}
		else
		{
			manager.listener.logger.println(msg)
		}
	}
	else
	{
		System.out.println(msg);
	}
}

if (use_functional_mode.equals(true))
{
	//import hudson.Util;
	def someClass
	try {
		someClass = "hudson.Util" as Class
	} catch (Exception ex) {
		someClass = "java.io.File" as Class
	}
	def someInstance = someClass.newInstance()
	trace("Created instance of : " + someInstance.getClass().getName() + " class")
}
import groovy.xml.MarkupBuilder

error_to_run_job=false

if (use_functional_mode.equals(true))
{
	map=manager.build.getBuildVariables()
	buildID = manager.build.id
	buildNumber = manager.build.number
	buildResult = manager.build.result
	jobName = manager.build.parent.name
	test_duration=(int)  ( (System.currentTimeMillis() - manager.build.startTimeInMillis)/1000)

	archive_dir = manager.build.getArtifactsDir().toString() + "/"
	archive_results_dir = archive_dir
	summary = manager.createSummary("graph.gif")

	header_summary = "Job status for build #${buildNumber}"
	buildTag = "${jobName}-${buildNumber}"

	// get JOB_TEST_TAG parameter value
	test_tag = manager.build.buildVariableResolver.resolve('JOB_TEST_TAG')
	if (test_tag.equals(null))
	{
		trace("JOB_TEST_TAG parameter was not found")
	}
	else
	{
		trace("Found parameter JOB_TEST_TAG:" + test_tag)
	}
	ide_branch_to_build = manager.build.buildVariableResolver.resolve('JOB_IDE_BRANCH_TO_BUILD')
	if (ide_branch_to_build.equals(null))
	{
		trace("JOB_IDE_BRANCH_TO_BUILD parameter was not found")
	}
	else
	{
		trace("Found parameter JOB_IDE_BRANCH_TO_BUILD:" + ide_branch_to_build)
	}
}
else
{
	archive_results_dir="c:/Users/lavernhe/archive"
	trace("archive_results_dir set")
}

if (use_functional_mode.equals(true))
{
	trace("========================== printing env ================================")
	def env = System.getenv()
	trace("=================== System.getenv")
	try{
		env.each { name, value -> manager.listener.logger.println "name: $name , value $value" }
	} catch(Exception ex)
	{
		trace("An exception occured while trying to get env content !!")
	}
	trace("=================== manager.build.getBuildVariables()")
	def myVar = manager.build.getBuildVariables()
	try{
		myVar.each { name, value -> manager.listener.logger.println "name: $name , value $value" }
	} catch(Exception ex)
	{
		trace("An exception occured while trying to get myVar content !!")
	}
	trace("==========================================================")
}

// =================================================================

def find_traces(String logFile,String matchingPattern)
{
	def returned_string=""

	def file_pointer=new File(logFile)
	if (file_pointer.exists())
	{
		def contents = file_pointer.getText()
		//trace(contents)
		def pattern=matchingPattern
		def Matcher = contents =~ pattern

		trace("find_traces:pattern=[" + pattern + "]")	
		trace("find_traces:found " + Matcher.getCount() + " matching items")

		returned_string +="<h3>" +  matchingPattern + " traces"  + "</h3>"
		if ( Matcher.getCount() != 0)
		{
			trace("File:" + logFile + ":" + " traces containing : " + matchingPattern)
			returned_string += "<div class=\" " + logFile + " " + pattern + "\">"
			Matcher.each
			{
				matching_line=Matcher.group(0)
				returned_string += "<p class=\" " + logFile + " " + pattern + "\">"
				trace("matching line:" + matching_line)
				returned_string += matching_line + "</p>"
			}
			returned_string += "</div>"
		}
		else {
			returned_string += "<div class=\" " + pattern + " \"></div>"
		}
	}
	else
	{
		trace("find_fatal_traces: File " + build_log_file + " not found")
	}
	return returned_string
}

// =================================================================
// <link rel="stylesheet" href="styles.css">
def generate_html_header()
{
	def returned_string=""

	returned_string +="<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Document</title></head><body>"

	return returned_string
}

// =================================================================

def close_html_file()
{
	def returned_string=""
	returned_string +="</body></html>"

	return returned_string
}

// =================================================================

def createTextFile(String fileName,String output_string)
{
	new File(fileName).withWriter
	{ out ->
		out.writeLine(output_string)
	}
}

// =================================================================

html_string=generate_html_header()

trace("searching for .log files")
def filesToParse = new FileNameByRegexFinder().getFileNames(archive_results_dir + "/LOGFILES",".log")
if (filesToParse != null)
{
	filesToParse.each
	{	fileName->
		trace("File found:" + fileName)
		html_string += "<h2>" + "File " + fileName + "</h2>"
		html_string += find_traces(fileName,/.*fatal:.*/)
		html_string += find_traces(fileName,/.*Error:.*/)
		html_string += find_traces(fileName,/.*Failed to.*/)
	}
}
html_string +=close_html_file()

createTextFile(archive_results_dir + "/tests_results.html", html_string)