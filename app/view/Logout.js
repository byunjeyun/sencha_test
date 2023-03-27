Ext.create('Ext.Button', {
    text: '로그아웃',
    handler: function() {
        Ext.Ajax.request({
            url: '/logout', // 로그아웃 엔드포인트 URL
            method: 'POST', // 로그아웃 요청 메서드
            success: function(response) {
                // 로그아웃 성공 시 처리할 코드
                window.location.reload(); // 페이지 리로드
            },
            failure: function(response) {
                // 로그아웃 실패 시 처리할 코드
                Ext.Msg.alert('로그아웃 실패', '로그아웃 처리 중 오류가 발생했습니다.');
            }
        });
    }
});