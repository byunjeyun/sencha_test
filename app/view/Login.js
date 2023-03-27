Ext.define('comgensencha.view.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    title: '로그인',
    bodyPadding: 5,
    width: '50%',
    height: 530,
    items: [{
    xtype: 'fieldset',
    title: '로그인 정보',
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
    name:  'requestList[0].userpw',
    inputType: 'password',
    allowBlank: false
    }]
    }],
    buttons: [{
    text: '로그인',
    formBind: true,
    handler: function() {
    var formData = {
        requestList : [{
            userid : this.up('form').getForm().findField('requestList[0].userid').getValue(),
            userpw : this.up('form').getForm().findField('requestList[0].userpw').getValue()
        }]
    };
    Ext.Ajax.request({
        url: 'http://localhost:8085/loginok',
        method: 'POST',
        jsonData:formData,
        success: function(response) {
            var data = Ext.decode(response.responseText);
            if (data.errorMessageList.length === 0) {
                
                Ext.Msg.alert('성공', data.msg, function() {
                    localStorage.setItem('sessionId', data.sessionId);
                    console.log(localStorage.getItem('sessionId'));
                    localStorage.setItem('userId', data.id);
                    console.log(localStorage.getItem('userId'));
                    location.reload();
                });
            } else {
                Ext.Msg.alert('로그인 실패', data.errorMessageList.join('<br>'));
            }
        },
        failure: function(response) {
            var data = Ext.decode(response.responseText);
            Ext.Msg.alert('실패', data.msg);
        }
    });
}
}, {
text: '회원가입',
handler: function() {
    Ext.create('comgensencha.view.Login').show();
}
}]
});