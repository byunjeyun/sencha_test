Ext.define('comgensencha.view.FactMst', {
    extend: 'Ext.grid.Panel',
    xtype: 'factmst',
    title: 'Fact Master',

    requires: [
        'comgensencha.store.FactStore'
    ],
    store: {
        type: 'FactStore', 
        autoLoad: true
      },
    columns: [
        { text: 'Fact Code',  dataIndex: 'factcd' },
        { text: 'Fact Name', dataIndex: 'factnm', editor: 'textfield'}
    ],

    initComponent: function() {
    var me = this;

    me.callParent(arguments);
    // store에서 데이터 가져오기
    var store = me.getStore();
    store.load();
    },
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
        xtype: 'button',
        text: 'Add',
        handler: function(btn) {
        var grid = btn.up('grid');
        var store = grid.getStore();
        var Model = store.getModel();
        var newRecord = new Model({
            factcd: '',
            factnm: '',
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
        var grid = btn.up('factmst');
        var store = grid.getStore();
        var newRecords = store.getNewRecords();
      
          var requestData = [];
          Ext.each(newRecords, function(record) {
                  
            var requestDataItem = {
              factnm: record.get('factnm'),
            };
            requestData.push(requestDataItem);
          });

          var postData = {
            requestList: requestData
          };
            // 백엔드로 데이터를 전송
            Ext.Ajax.request({
              url: 'http://localhost:8085/finsert',
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
            var grid = btn.up('factmst');
            var selection = grid.getSelection();
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var requestData = {
            requestList: [{
                factcd: selectedRecord.get('factcd')
            }]
        };
            if (selection.length > 0) {
                var factcd = selection[0].get('factcd');
    
                Ext.Msg.confirm('Delete', 'Are you sure you want to delete this item?', function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'http://localhost:8085/fdelete',
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

        });