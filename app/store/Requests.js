Ext.define('comgensencha.store.Requests', {
  extend: 'Ext.data.Store',

  alias: 'store.requests',

  fields: [
    { name: 'no', type: 'int' },
    { name: 'requestsno', type: 'string' },
    { name: 'factnm', type: 'string' },
    { name: 'trequestgr', type: 'string' },
    { name: 'requesternm', type: 'string' },
    { name: 'requestdate', type: 'date', dateFormat: 'Y-m-d' },
    { name: 'requestcomment', type: 'string' },
    { name: 'managernm', type: 'string' },
    { name: 'resultstat', type: 'string' },
    { name: 'enddate', type: 'date', dateFormat: 'Y-m-d' },
    { name: 'processingTime', type: 'string' },
    { name: 'note', type: 'string' }
  ],

  proxy: {
      type: 'ajax',
      url: 'http://localhost:8085/requests',
      extraParams: {
        startDate: null,
        endDate: null,
        factnm: null,
        managernm: null
    },
      
      reader: {
          type: 'json',
          rootProperty: 'request_list'
      }
  },

  listeners: {
      load: function(store, records, success, operation, options) {
          
        console.log("filtered");
        // 데이터를 가져온 후 처리할 작업을 여기에 작성하세요.
      }
  }
}); 