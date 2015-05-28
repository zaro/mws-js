var client, dump, fs, loginInfo, print, ref, reports;

reports = require('../lib/reports');

ref = require('./cfg'), loginInfo = ref.loginInfo, dump = ref.dump, print = ref.print;

fs = require('fs');

client = new reports.Client(loginInfo);

client.getReportList({}, function(reportInfoList, res) {
  var fn, i, len, reportInfo;
  fn = function(reportInfo) {
    return client.getReport({
      ReportId: reportInfo.ReportId
    }, function(report, res) {
      var file, id;
      id = reportInfo.ReportId;
      file = "report-" + id + ".txt";
      if ((res != null ? res.responseType : void 0) === 'Error') {
        print("failed to fetch report with id : " + id);
        return print(res != null ? res.error : void 0);
      } else {
        print("Writing " + report.length + " bytes  to " + file);
        return fs.writeFileSync(file, report);
      }
    });
  };
  for (i = 0, len = reportInfoList.length; i < len; i++) {
    reportInfo = reportInfoList[i];
    print("Fetching  report: " + reportInfo.ReportId + " with type: " + reportInfo.ReportType);
    fn(reportInfo);
  }
  if (res.nextToken != null) {
    return res.getNext();
  }
});
