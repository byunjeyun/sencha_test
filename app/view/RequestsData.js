Ext.define('comgensencha.view.RequestsData', {
  extend: 'Ext.grid.Panel',
  xtype: 'requestsdata',
  requires: ['comgensencha.store.Requests'],
  store: {
    type: 'requests', 
    autoLoad: false
  },

  columns: [
    { text: '요청번호', dataIndex: 'requestno', width: 100 },
    { text: '사업장', dataIndex: 'factnm', width: 100,
  editor:{
      xtype: 'combobox',
      width: 300,
      store: Ext.create('Ext.data.Store', {
        fields: ['factnm'],
        proxy: {
          type: 'ajax',
          url: 'http://localhost:8085/requests',
          reader: {
            type: 'json',
            rootProperty: 'f_list'
          }
        },
        autoLoad: true
      }),
      displayField: 'factnm',
      valueField: 'factnm',
      name: 'factnm',
      itemId: 'factnm'
    }
  },
    { text: '업무구분', dataIndex: 'requestgr', width: 200, editor: 'textfield' },
    { text: '요청자', dataIndex: 'requesternm', width: 100, editor: 'textfield' },
    { text: '요청일', dataIndex: 'requestdate', width: 100, xtype: 'datecolumn', format: 'Y-m-d' , editor: {xtype:'datefield', format: 'Y-m-d', editable: true} },
    { text: '요청내역', dataIndex: 'requestcomment', width: 600, editor: 'textfield' },
    { text: '담당자', dataIndex: 'managernm', width: 100,
     editor : {
      xtype: 'combobox',
      width: 300,
      store: Ext.create('Ext.data.Store', {
        fields: ['managernm'],
        proxy: {
          type: 'ajax',
          url: 'http://localhost:8085/requests',
          reader: {
            type: 'json',
            rootProperty: 'm_list'
          }
        },
        autoLoad: true
      }),
      displayField: 'managernm',
      valueField: 'managernm',
      name: 'managernm',
      itemId: 'managernm'     
    }},
    { text: '처리결과', dataIndex: 'resultstat', width: 600, editor: 'textfield' },
    { text: '처리완료일', dataIndex: 'enddate', width: 100 ,xtype: 'datecolumn', format: 'Y-m-d', editor: {xtype:'datefield', format: 'Y-m-d', editable: true}  },
    { text: '작업소요시간', dataIndex: 'note', width: 100, editor: 'textfield' }
  ],

  selType: 'rowmodel',
  plugins: [{
    ptype: 'cellediting',
    clicksToEdit: 2
    }],
  
  dockedItems: [{
    //검색 옵션
    xtype: 'toolbar',
    dock: 'top',
    items: [{
        xtype: 'datefield',
        fieldLabel: 'Search Date Range:',
        labelWidth: 120,
        format: 'Y-m-d',
        submitFormat: 'Y-m-d',
        width: 300,
        name: 'sdate',
        itemId: 'sdate'
      }, {
        xtype: 'datefield',
        format: 'Y-m-d',
        submitFormat: 'Y-m-d',
        width: 200,
        name: 'edate',
        itemId: 'edate'
      }, {
        xtype: 'combobox',
        fieldLabel: '사업장:',
        labelWidth: 80,
        width: 300,
        store: Ext.create('Ext.data.Store', {
          fields: ['factnm'],
          
          proxy: {
            type: 'ajax',
            url: 'http://localhost:8085/requests',
            reader: {
              type: 'json',
              rootProperty: 'f_list'
            }
          },
          autoLoad: true
        }),
        displayField: 'factnm',
        valueField: 'factnm',
        name: 'factnm',
        itemId: 'factnm',
        
      }, {
        xtype: 'combobox',
        fieldLabel: '담당자:',
        labelWidth: 100,
        width: 300,
        store: Ext.create('Ext.data.Store', {
          fields: ['managernm'],
          proxy: {
            type: 'ajax',
            url: 'http://localhost:8085/requests',
            reader: {
              type: 'json',
              rootProperty: 'm_list'
            }
          },
          autoLoad: true
        }),
        displayField: 'managernm',
        valueField: 'managernm',
        name: 'managernm',
        itemId: 'managernm'
      },{
        xtype: 'button',
        text: 'Search',
        handler: function(btn) {
          var grid = btn.up('requestsdata');
          var store = grid.getStore();
          var sdate = grid.down('#sdate').getValue();
          var edate = grid.down('#edate').getValue();
          var factnm = grid.down('#factnm').getValue();
          var managernm = grid.down('#managernm').getValue();
         
          store.clearFilter();
          
          store.getProxy().setExtraParams({
            sdate: Ext.Date.format(sdate, 'Y-m-d'),
            edate: Ext.Date.format(edate, 'Y-m-d'),
            factnm: factnm,
            managernm: managernm
          },
          );

          store.load({
            callback: function(records, operation, sucess){
              // console.log('filter:',store.getFilters());
            }
          });
        }
      }]
  },{
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
      {

        xtype: 'button',
        text: 'Add',
        handler: function(btn) {
          var grid = btn.up('requestsdata');
          var store = grid.getStore();
          var Model = store.getModel();
          var newRecord = new Model({
            requestno: '',
            factnm: '',
            requestgr: '',
            requesternm: '',
            requestdate: '',
            requestcomment: '',
            managernm: '',
            resultstat: '',
            enddate: '',
            note: ''
          });
          var insertBtn = grid.down('#insertBtn'); // insert 버튼 찾기
          var saveBtn = grid.down('#saveBtn');
          insertBtn.setVisible(true); 
           // insert 버튼 찾기
          saveBtn.setVisible(false); 
          store.add(newRecord);
          
          grid.editingPlugin.startEdit(newRecord, 0);
        }
      }, {
        xtype: 'button',
        text: 'Save',
        itemId: 'saveBtn',
        // style: {backgroundColor: 'green'}
        // align: 'right',
        handler: function(btn) {
          var grid = btn.up('requestsdata');
          var store = grid.getStore();
          var selectedRecord = grid.getSelectionModel().getSelection()[0];
      
          if (selectedRecord) {
            var requestdate = Ext.Date.format(selectedRecord.get('requestdate'), 'Y-m-d');
            var enddate = Ext.Date.format(selectedRecord.get('enddate'), 'Y-m-d');
              var requestData = {
                  requestList: [{
                    factnm: selectedRecord.get('factnm'),
                    requestgr: selectedRecord.get('requestgr'),
                    requesternm: selectedRecord.get('requesternm'),
                    requestdate : requestdate,
                    requestcomment: selectedRecord.get('requestcomment'),
                    managernm: selectedRecord.get('managernm'),
                    resultstat: selectedRecord.get('resultstat'),
                    enddate: enddate,
                    note:  selectedRecord.get('note'),
                    requestno: selectedRecord.get('requestno')
                  }]
              };
      
              Ext.Ajax.request({
                  url: 'http://localhost:8085/update',
                  method: 'POST',
                  jsonData: requestData,
                  success: function() {
                      Ext.Msg.alert('Success', 'Changes saved successfully.');
                  },
                  failure: function() {
                      Ext.Msg.alert('Error', 'Failed to save changes.');
                  }
              });
          }
          else {
              Ext.Msg.alert('Error', 'Please select a record to save changes.');
          } 
      }
      },{
        xtype: 'button',
        text: 'insert',
        itemId:"insertBtn",
        hidden : true, 
        handler: function(btn) {
          var grid = btn.up('requestsdata');
          var store = grid.getStore();
          var newRecords = store.getNewRecords();
      
          var requestData = [];
          Ext.each(newRecords, function(record) {
            var requestdate = Ext.Date.format(record.get('requestdate'), 'Y-m-d');
            var enddate = Ext.Date.format(record.get('enddate'), 'Y-m-d');
      
            var requestDataItem = {
              factnm: record.get('factnm'),
              requestgr: record.get('requestgr'),
              requesternm: record.get('requesternm'),
              requestdate: requestdate,
              requestcomment: record.get('requestcomment'),
              managernm: record.get('managernm'),
              resultstat: record.get('resultstat'),
              enddate: enddate,
              note: record.get('note')
            };
            requestData.push(requestDataItem);
          });

          var postData = {
            requestList: requestData
          };
            // 백엔드로 데이터를 전송
            Ext.Ajax.request({
              url: 'http://localhost:8085/insert',
              method: 'POST',
              jsonData: postData,
              success: function() {
                Ext.Msg.alert('Success', 'Changes saved successfully.', function() {
                  location.reload();
                });
              },
              failure: function() {
                Ext.Msg.alert('Error', 'Failed to save changes.');
              }
            });
          }
        },
        {
          xtype: 'button',
          text: 'delete',
          style: {
            backgroundColor: 'red', // 배경색 변경
        },
          handler: function(btn) {
              var grid = btn.up('requestsdata');
              var selection = grid.getSelection();
      var selectedRecord = grid.getSelectionModel().getSelection()[0];
              var requestData = {
                requestList: [{
                  requestno: selectedRecord.get('requestno')
                }]
            };
              if (selection.length > 0) {
                  var requestNo = selection[0].get('request_no');
      
                  Ext.Msg.confirm('Delete', 'Are you sure you want to delete this item?', function(btn) {
                      if (btn == 'yes') {
                          Ext.Ajax.request({
                              url: 'http://localhost:8085/delete',
                              method: 'POST',
                              jsonData: requestData,
                              success: function() {
                                  Ext.Msg.alert('Success', 'Item deleted successfully.',
                                      function() {
                                          location.reload();
                                      });
                              },
                              failure: function() {
                                  Ext.Msg.alert('Error', 'Failed to delete item.');
                              }
                          });
                      }
                  });
              }
          }
      },{
      xtype: 'button',
        text: 'Cancel',
        // align: 'right',
        handler: function(btn) {
          var grid = btn.up('requestsdata');
          grid.down('#sdate').reset();
          grid.down('#edate').reset();
          grid.down('#factnm').reset();
          grid.down('#managernm').reset();
          var store = grid.getStore();
          store.getProxy().setExtraParams({
            sdate: null,
            edate: null,
            factnm: null,
            managernm: null
          }); 
          store.load();
          location.reload();
        }
      }]
  }],

  initComponent: function() {
    var me = this;

    me.callParent(arguments);
    // store에서 데이터 가져오기
    var store = me.getStore();
    store.load();
  }
});