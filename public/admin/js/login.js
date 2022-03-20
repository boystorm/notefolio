$(function() {
    /**
     * =======================================
     * 설  명 : 로그인
     * =======================================
     */
    let loginForm = $("#loginForm").validate({
        rules: {
            id: {
                required: true
            },
            password: {
                required: true,
                password: true   // 재정의
            }
        },
        messages: {
            id: {
                required: "필수 항목입니다."
            }
		},
		submitHandler: function(form) {
            $("#loginForm").unbind("submit").submit(); 
		}
    });
});

