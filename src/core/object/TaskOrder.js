var ObjectId = require('bson-objectid')
var moment = require('moment')

module.exports.construct = (pso, values) => {
  var objectId = ObjectId().toString()

  var to = {
    TaskOrder: {
      ObjectId: objectId,
      TaskOrderId: objectId,
      MasterAccessionNo: pso.PanelSetOrder.MasterAccessionNo,
      ReportNo: pso.PanelSetOrder.ReportNo,
      PanelSetName: pso.PanelSetOrder.PanelSetName,
      TaskName: values.TaskName,
      OrderDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      OrderedById: values.OrderedById,
      OrderedByInitials: values.OrderedByInitials
    }
  }

  return to
}
