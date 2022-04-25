/**
 * =======================================
 * 설  명 : 카테고리 팝업 리스트 함수
 * =======================================
 */
function fnCategoryList(){
    $.ajax({
        type : "get",
        url : "/admin/manage/category/data",
        dataType : "JSON"
    })
    .done(function(json){
        $("#categoryNewItem").remove();
        $(".modal__tree--item").remove();
        $("#categoryNameInput").attr("readonly", true);
        $("#categoryNameInput").val("");

        if($(".modal__tree--item").length === 0){
            _.forEach(json.rows2, function (val, key) {
                let info = '';

                info += "<li data-value=" + val.sub_id + " class='modal__tree--item " + (val.main_id === 1 ? "category1" : "category2") + "'>";
                info += "<span>" + val.sub_title + "</span>";
                info += "<button type='button' class='category-item-del'>X</button>";
                info += "</li>";

                $(".modal__tree--list").append(info);
            });
        }
        
        // 카테고리 리스트 선택
        $(".modal__tree--item").on("click", function(){
            let subId = $(this).data('value');

            $(".modal__tree--item").removeClass("on");
            $(this).addClass("on");
            
            // subID 텍스트 히든태그
            $("#categorySubIdInput").val(subId);
            $("#categoryNameInput").prop("readonly", false);

            // 카테고리 이름
            let = categoryName = $(this).find('span').text();
            $("#categoryNameInput").val(categoryName);
            $("#categoryNameInput").focus();
        });

        // 새 카테고리 추가
        $("#categoryNewBtn").on("click", function(){
            $(".modal__tree--item").removeClass("on");
            
            if ($("#categoryNewItem")[0] === undefined) {
                $("#categorySubIdInput").val("");
                $(".modal__generate")[0].innerHTML 
                    += '<div id="categoryNewItem" class="modal__generate--item">New Category</div>';

                $("#categoryNameInput").prop("readonly", false);
                $("#categoryNameInput").val("");
                $("#categoryNameInput").focus();
            }
        });

         // 카테고리 삭제
         $(".category-item-del").on("click", function(){
            let subId = $(this).parent().data('value');
            console.log(subId)
            $.ajax({
                type : "DELETE",
                url : "/admin/manage/category/" + subId,
            })
            .done(function(result){
                alert("삭제 되었습니다.");

                fnCategoryList();
            })
            .fail(function(xhr, status, errorThrown){
                console.log("Ajax failed")
            })
        });
    })
    .fail(function(xhr, status, errorThrown){
        console.log("Ajax failed")
    })
}

$(function() {
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 오픈
     * =======================================
     */
    $("#categoryBtn").on("click", function(){
        $(".modal").css("display","block");

        // 초기화
        $(".modal__tree--item").removeClass("on");
        $("#categoryNewItem").remove();
        $("#categoryNameInput").attr("readonly", true);

        fnCategoryList();
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
     * 설  명 : 카테고리 팝업 아이템 추가 등록
     * =======================================
     */
    $("#confirmBtn").on("click", function(){
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
                let subIdVal = $("#categorySubIdInput").val();
                let parameter = $("#categoryForm").serializeObject();                
                
                // ajax type parameter 가지고와서
                //-> url -> route -> controller -> model -> ajax 
                if(subIdVal !== ""){
                    // update
                    $.ajax({
                        type : "POST",
                        url : "/admin/manage/manageCategoryUpdateProcess",
                        dataType : "JSON",
                        data : parameter
                    })
                    .done(function(json){
                        alert("수정되었습니다.");

                        // 카테고리 리스트 호출
                        fnCategoryList();
                    })
                    .fail(function(xhr, status, errorThrown){
                        console.log("Ajax failed")
                    })

                } else {
                    // insert
                    $.ajax({
                        type : "POST",
                        url : "/admin/manage/manageCategoryProcess",
                        dataType : "JSON",
                        data : parameter
                    })
                    .done(function(json){
                        alert("등록하였습니다.");

                        // 카테고리 리스트 호출
                        fnCategoryList();
                    })
                    .fail(function(xhr, status, errorThrown){
                        console.log("Ajax failed")
                    })
                }
            }
        });            
    });

    


});

