<Query Kind="Statements" />

var src = @"C:\personal\vscode-extensions\ionic2-extension\snippets";
var dest = @"";

var files = Directory.GetFiles(src, "*.json", SearchOption.TopDirectoryOnly);
foreach(var file in files)
{
	file.Dump();
	string[] contentArray = File.ReadAllLines(file);
	string content = File.ReadAllText(file);

	foreach(string line in contentArray)
	{
		if (line.IndexOf("<tabTrigger>") > -1) {
			string oldLine = line;
			string newLine = oldLine.Replace("ionic", "ioniccss");		
			content = content.Replace(oldLine, newLine);
		}
	}
	
	content.Dump();
	File.WriteAllText(file, content);
//string newFileName = File.Move(file, 
}