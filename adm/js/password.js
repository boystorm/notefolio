$(function() {
    /**
     * =======================================
     * 설  명 : 비밀번호 힌트 확인 버튼 클릭
     * =======================================
     */
    $("#hintBtn").on("click", function(e){
        let passHint = $("input[name=passwordHint]").val();
        $.ajax({
            url : "/password_process",
            type : "POST",
            dataType : "JSON",
            data : {"passwordHint" : passHint}
        })

        .done(function(json){
            if(json.flag){
                console.log(json.flag);
                $(".password-check").text(json.passHint);
            } else {
                console.log(json.flag);
                alert("비밀번호가 틀렸습니다.");
                $(".password-check").text("비밀번호 힌트 재입력");
            }
        })

        .fail(function(xhr, status, errorThrown){
            console.log("Ajax failed")
        })
    });
});

