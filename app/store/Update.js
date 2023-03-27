Ext.define('comgensencha.view.RequestsUpdate', {
    extend: 'Ext.window.Window',
    xtype: 'requestsupdate',
    alias: 'store.update',
    title: 'Update Request',
  
    items: [{
      xtype: 'form',
      reference: 'updateForm',
      bodyPadding: 10,
      items: [{
        xtype: 'textfield',
        name: 'no',
        fieldLabel: 'No.',
        allowBlank: false
      }, {
        xtype: 'textfield',
        name: 'requestsno',
        fieldLabel: 'Requests No.',
        allowBlank: false
      }, {
        xtype: 'textfield',
        name: 'factnm',
        fieldLabel: 'Factnm'
      }, {
        xtype: 'textfield',
        name: 'trequestgr',
        fieldLabel: 'Trequestgr'
      }, {
        xtype: 'textfield',
        name: 'requesternm',
        fieldLabel: 'Requesternm'
      }, {
        xtype: 'datefield',
        name: 'requestdate',
        fieldLabel: 'Requestdate',
        format: 'Y-m-d'
      }, {
        xtype: 'textareafield',
        name: 'requestcomment',
        fieldLabel: 'Requestcomment'
      }, {
        xtype: 'textfield',
        name: 'managernm',
        fieldLabel: 'Managernm'
      }, {
        xtype: 'textfield',
        name: 'resultstat',
        fieldLabel: 'Resultstat'
      }, {
        xtype: 'datefield',
        name: 'enddate',
        fieldLabel: 'Enddate',
        format: 'Y-m-d'
      }, {
        xtype: 'textfield',
        name: 'processingTime',
        fieldLabel: 'ProcessingTime'
      }, {
        xtype: 'textareafield',
        name: 'note',
        fieldLabel: 'Note'
      }]
    }],
  
    buttons: [{
      text: 'Update',
      handler: function() {
        var form = this.up('window').down('form').getForm();
  
        if (form.isValid()) {
          form.submit({
            url: 'http://localhost:8085/requests/update',
            method: 'POST',
            success: function(form, action) {
              Ext.Msg.alert('Success', action.result.msg);
            },
            failure: function(form, action) {
              Ext.Msg.alert('Failed', action.result.msg);
            }
          });
        }
      }
    }]
  });