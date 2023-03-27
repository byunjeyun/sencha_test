Ext.define('comgensencha.store.ManagerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ManagerStore',
  
    fields: [
      { name: 'managercd', type: 'string' },
      { name: 'managernm', type: 'string' },
    ],
  
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8085/mrequest',
        mathod : 'POST',
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
