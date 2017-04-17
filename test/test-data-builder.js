const cmdSubmitter = require('ap-mysql').cmdSubmitter
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const aoBuilder = require(path.resolve('./src/core/ao-builder'))

var masterAccessionNo = '17-8171'
var testDataRowsFilePath = 'testDataRows.' + masterAccessionNo + '.json'
var testDataObjectFilePath = 'testDataObject.' + masterAccessionNo + '.json'

var sql = 'Set @MasterAccessionNo = \'' + masterAccessionNo + '\'; CALL prcGetAccessionOrder(@MasterAccessionNo);'

cmdSubmitter.submit(sql, function (err, rows) {
  CleanPatientInfo(rows)
  var rowJSON = JSON.stringify(rows)
  fs.writeFile(testDataRowsFilePath, rowJSON, function (err) {
    if(err) return callback(err)
    aoBuilder.build(rows, function (err, ao) {
      var objectJSON = JSON.stringify(ao)
      fs.writeFile(testDataObjectFilePath, objectJSON, function (err) {
        console.log('All done.')
      })
    })
  })
})

function CleanPatientInfo(rows) {
  var aoRaw = _.find(rows, function(o) { return o.tablename == 'tblAccessionOrder'})
  aoRaw.PLastName = "MOUSE"
  aoRaw.PFirstname = "MICKEY"
  aoRaw.PSSN = "111-11-1111"
  aoRaw.SvhAccount = '999999'
  aoRaw.SvhMedicalRecord = '999999'
}
