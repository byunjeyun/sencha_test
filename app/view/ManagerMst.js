Ext.define('comgensencha.view.ManagerMst', {
    extend: 'Ext.grid.Panel',
    xtype: 'managermst',
    title: 'Manager Master',

    requires: [
        'comgensencha.store.ManagerStore'
    ],
    store: {
        type: 'ManagerStore', 
        autoLoad: true
      },
    columns: [
        { text: 'Manager Code',  dataIndex: 'managercd' },
        { text: 'Manager Name', dataIndex: 'managernm', editor: 'textfield'}
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
            managercd: '',
            managernm: '',
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
                    managernm: selectedRecord.get('managernm'),
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
        var grid = btn.up('managermst');
        var store = grid.getStore();
        var newRecords = store.getNewRecords();
      
          var requestData = [];
          Ext.each(newRecords, function(record) {
                  
            var requestDataItem = {
              managernm: record.get('managernm'),
            };
            requestData.push(requestDataItem);
          });

          var postData = {
            requestList: requestData
          };
            // 백엔드로 데이터를 전송
            Ext.Ajax.request({
              url: 'http://localhost:8085/minsert',
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
            var grid = btn.up('managermst');
            var selection = grid.getSelection();
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var requestData = {
            requestList: [{
                managercd: selectedRecord.get('managercd')
            }]
        };
            if (selection.length > 0) {
                var managercd = selection[0].get('managercd');
    
                Ext.Msg.confirm('Delete', 'Are you sure you want to delete this item?', function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'http://localhost:8085/mdelete',
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
          grid.down('#managercd').reset();
          grid.down('#managernm').reset();
          var store = grid.getStore();
          store.getProxy().setExtraParams({
            managercd: null, 
            managernm: null
          }); 
          store.load();
          location.reload();
        }
      }]
  }],

        });