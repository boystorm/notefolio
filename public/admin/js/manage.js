$(function() {
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 오픈
     * =======================================
     */
    $("#categoryBtn").on("click", function(){
        $(".modal").css("display","block");
    });

    /**
     * =======================================
     * 설  명 : 카테고리 팝업 닫기
     * =======================================
    */
    $("#cancelBtn").on("click", function(){
        $(".modal").css("display","none");
    });

    /**
     * =======================================
     * 설  명 : 카테고리 리스트 선택
     * =======================================
    */
    $(".modal__tree--item").on("click", function(){
        $(".modal__tree--item").removeClass("on");
        $(this).addClass("on");

        $("#categoryNameInput").prop("readonly", false);
    });

    /**
     * =======================================
     * 설  명 : 새 카테고리
     * =======================================
    */
    $("#categoryNewBtn").on("click", function(){
        $(".modal__tree--item").removeClass("on");
        if ($("#CategoryNewItem")[0] === undefined) {
            $(".modal__tree--list")[0].innerHTML 
                += '<li id="CategoryNewItem" class="modal__tree--item on">New Category</li>';

            $("#categoryNewBtn").unbind("click");
            $("#categoryNameInput").prop("readonly", false);
        }
    });

    /**
     * =======================================
     * 설  명 : 카테고리 팝업 아이템 추가 등록
     * =======================================
     */
    $(".btn-confirm").on("click", function(){
        let categoryForm = $("#categoryForm").validate({
            rules: {
                categoryName: {
                    required: true
                },
            },
            messages: {
                categoryName: {
                    required: "필수 항목입니다."
                }
            },
            submitHandler: function(form) {               
                // let formValObj = $("#categoryForm").serializeObject(),
                //     parameter = JSON.stringify(formValObj);
                let parameter = $("#categoryForm").serializeObject();

                console.log(parameter);

                // ajax type parameter 가지고와서
                //-> url -> route -> controller -> model -> ajax 
                $.ajax({
                    type : "POST",
                    url : "/admin/manage/manageCategoryProcess",
                    dataType : "JSON",
                    data : parameter
                })
        
                .done(function(json){
                    alert("저장되었습니다.");
                })
        
                .fail(function(xhr, status, errorThrown){
                    console.log("Ajax failed")
                })
            }
        });      
    })

});

