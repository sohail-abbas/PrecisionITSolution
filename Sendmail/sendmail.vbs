
Public strTo
Public strSubject
Public strBody
Public xlsPath
Public valuev


xlsPath = "C:\Others\PrecisionWebsite\Sendmail\SendMail.xlsx"

Call ReadDataFromDB(1)

'call ReadExcelCell(xlsPath)

Call SendMail(strTo,strSubject,strBody)

'Msgbox strTo
'Msgbox strSubject
'Msgbox strBody



Function SendMail(mailto,mailsub,mailbody)
			Set objMessage = CreateObject("CDO.Message") 
			objMessage.Subject = mailsub
			objMessage.From = "precisionitsol@gmail.com" 
			objMessage.To = mailto
			objMessage.TextBody = mailbody
			objMessage.Configuration.Fields.Item _
			("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2 
			objMessage.Configuration.Fields.Item _
			("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.gmail.com"
			objMessage.Configuration.Fields.Item _
			("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1 
			objMessage.Configuration.Fields.Item _
				("http://schemas.microsoft.com/cdo/configuration/sendusername") = "precisionitsol@gmail.com"
			objMessage.Configuration.Fields.Item _
			("http://schemas.microsoft.com/cdo/configuration/sendpassword") = "Precision@786"
			objMessage.Configuration.Fields.Item _
			("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = True
			objMessage.Configuration.Fields.Item _
			("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25
			objMessage.Configuration.Fields.Update
			objMessage.Send
End Function

Function ReadExcelCell(strPath)
	Dim objExcel 
	Dim objWorkbook 
	Dim objSheet 
	Dim objCells
	Set objExcel = CreateObject("Excel.Application") 
	objExcel.visible = false 
	Set objWorkbook = objExcel.Workbooks.open(strPath) 
	Set objSheet = objWorkbook.Worksheets("Sheet1") 
	Set objCells = objSheet.Cells
	'ReadExcelCell = objCells(nrownum,ncolnum).Value
	
	strTo = objCells(2,1).Value 
	strSubject = objCells(2,2).Value
	strBody = objCells(2,3).Value
	
	Call objExcel.ActiveWorkbook.Close(False)
	objExcel.Application.Quit
	
End Function



Function ReadDataFromDB(strmailid)
	Dim sServer,sDataBaseName ,sConn,oConn,oRS
	Dim sUserName,sPassWord 
 
	sServer = "sg1-wsq1.a2hosting.com"
	sDataBaseName = "precis12_aps"
	sUserName = "precis12_precision"
	sPassWord = "Precision@786"
 
	sConn="DRIVER={SQL Server};Provider=SQLOLEDB.1;SERVER=" & sServer & ";DATABASE=" & sDataBaseName & ";Encrypt=Yes;"
	Set oConn = CreateObject("ADODB.Connection")
	Set oRs = CreateObject("ADODB.Recordset")
	oConn.CommandTimeout = 36000
	oConn.Open sConn, sUserName, sPassWord

	
	'Set oRs = oConn.Execute("select * from precis12_precision.Mailer_Table where id = 1")
	oRs.open "select * from precis12_precision.Mailer_Table where id = "&strmailid, oConn
	If oRs.EOF Then 
		wscript.echo "There are no records to retrieve; Check that you have the correct job number."
	Else
		Do While NOT oRs.Eof 
			strTo = oRs("to_address")
			strSubject = oRs("subject")
			strBody =  oRs("body")
			oRs.MoveNext 
		Loop
	End If

End Function