Ext.define('comgensencha.store.UserStore', {
    extend: 'Ext.data.Store',
    alias: 'store.UserStore',
  
    fields: [
      { name: 'userno', type: 'string' },
      { name: 'userid', type: 'string' },
      { name: 'userpw', type: 'string' },
      { name: 'email', type: 'string' },
    ],
  
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8085/ujoin',
         
        reader: {
            type: 'json',
            rootProperty: 'manager_list'
        }
    },
  
    listeners: {
        load: function(store, records, success, operation, options) {
            
        }
    }
  }); 
