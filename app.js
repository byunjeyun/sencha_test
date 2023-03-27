/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'comgensencha.Application',

    name: 'comgensencha',

    defaultToken: 'requestsdata',

    requires: [
        // This will automatically load all classes in the comgensencha namespace
        // so that application classes do not need to require each other.
        'comgensencha.*',
        'comgensencha.view.RequestsData',
        'comgensencha.store.Requests',
        'comgensencha.view.FactMst',
        'comgensencha.view.ManagerMst',
        'comgensencha.view.Login',
        'comgensencha.view.Join',
        'comgensencha.store.FactStore',
        'comgensencha.store.ManagerStore',
    ],

    stores: [
        'Requests',
        'FactStore',
        'ManagerStore'
    ],

    launch: function() {
        // Check if user is logged in
        if (!localStorage.getItem('isLoggedIn')) {
            Ext.create({
                xtype: 'loginform',
                floating: true,
                centered: true,
                modal: true
            });
        } else {
            // User is already logged in
            this.callParent();
        }
    },

    // The name of the initial view to create.
    mainView: 'comgensencha.view.main.Main'
});