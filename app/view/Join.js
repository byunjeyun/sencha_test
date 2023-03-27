Ext.define('comgensencha.view.Join', {
    extend: 'Ext.form.Panel',
    xtype: 'joinform',
    title: '회원가입',
    bodyPadding: 10,
    width: '70%',
    height: 530,
    items: [{
        xtype: 'fieldset',
        title: '회원 정보',
        defaults: {
            labelWidth: 50,
            anchor: '100%',
            xtype: 'textfield'
        },
        items: [{
            fieldLabel: 'ID',
            name: 'requestList[0].userid',
            allowBlank: false
        }, {
            fieldLabel: 'PW',
            name: 'requestList[0].userpw',
            inputType: 'password',
            allowBlank: false
        }, {
            fieldLabel: 'Email',
            name: 'requestList[0].email',
            vtype: 'email',
            allowBlank: false
        }]
    }],
    buttons: [{
        text: '회원가입',
        formBind: true,
        handler: function() {
            var formData = {
                requestList: [{
                    userid: this.up('form').getForm().findField('requestList[0].userid').getValue(),
                    userpw: this.up('form').getForm().findField('requestList[0].userpw').getValue(),
                    email: this.up('form').getForm().findField('requestList[0].email').getValue()
                }]
            };
            Ext.Ajax.request({
                url: 'http://localhost:8085/joinok',
                method: 'POST',
                jsonData: formData,
                success: function(response) {
                    var result = Ext.decode(response.responseText);
                    Ext.Msg.alert('성공', result.msg);
                },
                failure: function(response) {
                    var result = Ext.decode(response.responseText);
                    Ext.Msg.alert('실패', result.msg);
                }
            });
        }
    }, {
        text: '로그인',
        handler: function() {
            Ext.create('comgensencha.view.Login').show();
        }
    }]
});