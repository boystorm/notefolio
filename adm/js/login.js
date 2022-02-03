$(function() {
    /**
     * =======================================
     * 설  명 : 로그인 버튼 클릭
     * =======================================
     */
    $("#loginBtn").on("click", function(e){
        e.preventDefault();
        

        $('#loginForm').submit();
    });
     
});

