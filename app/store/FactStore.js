Ext.define('comgensencha.store.FactStore', {
    extend: 'Ext.data.Store',
    alias: 'store.FactStore',
  
    fields: [
      { name: 'factcd', type: 'string' },
      { name: 'factnm', type: 'string' },
    ],
  
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8085/frequest',
         
        reader: {
            type: 'json',
            rootProperty: 'fact_list'
        }
    },
  
    listeners: {
        load: function(store, records, success, operation, options) {
            
        }
    }
  }); 