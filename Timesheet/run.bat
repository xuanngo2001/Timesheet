SET TIMESHEET_HOME=%~dp0
CALL ant -f %TIMESHEET_HOME%\build.xml
"C:\Program Files (x86)\Mozilla Firefox\firefox.exe" %TIMESHEET_HOME%\release\timesheet.html
