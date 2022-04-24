$(function() {
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 오픈
     * =======================================
     */
    $("#categoryBtn").on("click", function(){
        $(".modal").css("display","block");
        // 초기화
        $("#CategoryNewItem").remove();

         // 새 카테고리 추가
         $("#categoryNewBtn").on("click", function(){
            $(".modal__tree--item").removeClass("on");
    
            if ($("#CategoryNewItem")[0] === undefined) {
                $("#categoryNewBtn").unbind("click");
                
                $(".modal__tree--list")[0].innerHTML 
                    += '<li id="CategoryNewItem" class="modal__tree--item on">New Category</li>';
                
                $("#categoryNameInput").prop("readonly", false);
            }
        });

        $.ajax({
            type : "get",
            url : "/admin/manage/category/data",
            dataType : "JSON"
        })
        .done(function(json){
            if($(".modal__tree--item").length === 0){
                _.forEach(json.rows2, function (val, key) {
                    let info = '';
    
                    info += "<li class='modal__tree--item " + (val.main_id === 1 ? "category1" : "category2") + "'>";
                    info += "<span>" + val.sub_title + "</span>";
                    info += "<button type='button'>X</button>";
                    info += "</li>";
    
                    $(".modal__tree--list").append(info);
                });
            }
            
            // 카테고리 리스트 선택
            $(".modal__tree--item").on("click", function(){
                $(".modal__tree--item").removeClass("on");
                $(this).addClass("on");
        
                $("#categoryNameInput").prop("readonly", false);
            });
            
        })
        .fail(function(xhr, status, errorThrown){
            console.log("Ajax failed")
        })
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
                let parameter = $("#categoryForm").serializeObject();                

                // ajax type parameter 가지고와서
                //-> url -> route -> controller -> model -> ajax 
                $.ajax({
                    type : "POST",
                    url : "/admin/manage/manageCategoryProcess",
                    dataType : "JSON",
                    data : parameter
                })
        
                .done(function(json){
                    // 등록 완료 후 결과
                    $.ajax({
                        type : "get",
                        url : "/admin/manage",
                        dataType : "JSON"
                    })
                    .done(function(json){
                        console.log(json);

                        // <li class="modal__tree--item category1 on">
                    //                         <span>Project 카테고리1</span>
                    //                         <button type="button">X</button>
                    //                     </li>
                    //                     <li class="modal__tree--item category2 ">
                    //                         <span>Artwork 카테고리2</span>
                    //                         <button type="button">X</button>
                    //                     </li>



                    })
                    .fail(function(xhr, status, errorThrown){
                        console.log("Ajax failed")
                    })

                })
        
                .fail(function(xhr, status, errorThrown){
                    console.log("Ajax failed")
                })
            }
        });      
    })

});

