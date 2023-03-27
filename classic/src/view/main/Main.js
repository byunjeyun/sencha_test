/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('comgensencha.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'comgensencha.view.main.MainController',
        'comgensencha.view.main.MainModel',
        'comgensencha.view.main.List',
        'comgensencha.view.RequestsData'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },
    
    tbar: {
        
        items: [
            '->',
            {
                xtype: 'label',
                text: '{userId}님이 로그인 중',
                // hidden: true, // 처음에는 숨김 처리
                itemId: 'loginStatusLabel' // itemId 지정
            },
            {
                text: '로그아웃',
                align: 'right',
                hidden: true, // 처음에는 숨김 처리
                handler: function() {
                    
                    Ext.Ajax.request({
                        url:'http://localhost:8085/logout',// 로그아웃 엔드포인트 URL
                        method: 'POST', // 로그아웃 요청 메서드
                        success: function(response) {
                            // 로그아웃 성공 시 처리할 코드
                            localStorage.removeItem('sessionId');
                            localStorage.removeItem('userId');
                            window.location.reload(); // 페이지 리로드
                        },
                        failure: function(response) {
                            // 로그아웃 실패 시 처리할 코드
                            Ext.Msg.alert('로그아웃 실패', '로그아웃 처리 중 오류가 발생했습니다.');
                        }
                    });
                },
                itemId: 'logoutButton' // itemId 지정
            }
        ]
    },
    listeners: {
        afterrender: function() {
            var sessionID = localStorage.getItem('sessionId'); // localStorage에서 세션ID 가져오기
            if (sessionID) {
                // 세션ID가 있으면 로그인 상태로 처리
                this.down('#loginStatusLabel').setVisible(true); // '로그인 중' 메시지 표시
                this.down('#logoutButton').setVisible(true); // 로그아웃 버튼 표시
            } else {
                // 세션ID가 없으면 로그아웃 상태로 처리
                this.down('#loginStatusLabel').setVisible(false); // '로그인 중' 메시지 숨김
                this.down('#logoutButton').setVisible(false); // 로그아웃 버튼 숨김
            }
        }
    },
    
    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'requestsdata',
            title: 'Requests Data',
            iconCls: 'fa-table'
        }, {
            xtype: 'factmst',
            title: 'Fact Master',
            iconCls: 'fa-table'
        },{
            xtype: 'managermst',
            title: 'Manager Master',
            iconCls: 'fa-table'
        }]
    }, {
        title: 'Login',
        iconCls: 'fa-user',
        xtype: 'loginform'
    }, {
        title: 'Join',
        iconCls: 'fa-user',
        xtype: 'joinform'
    }, {
        title: '유지보수 내역 조회',
        xtype: 'requestsdata',
        iconCls: 'fa-table'
    },{
        title: '사업장 관리',
        xtype: 'factmst',
        iconCls: 'fa-table'
    },{
        title: '담당자 관리',
        xtype: 'managermst',
        iconCls: 'fa-users',
        
    },{
        title: 'Settings',
        iconCls: 'fa-cog',
        bind: {
            html: '{loremIpsum}'
        }
    }]
});
