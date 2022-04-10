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
     * 설  명 : 카테고리 팝업 아이템 추가(New)
     * =======================================
     */
    $(".btn-confirm").on("click", function(){
        let id = $(".dropdown__handle a").data('id');
        let title = $(".dropdown__handle a").data('value');
        
        $.ajax({
            url : "/admin/manage/manageCategoryProcess",
            type : "POST",
            dataType : "JSON",
            data : {
                "id" : id,
                "title" : title
            }
        })

        .done(function(json){
            alert("저장되었습니다.");
            
            

        })

        .fail(function(xhr, status, errorThrown){
            console.log("Ajax failed")
        })
    })



    
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 아이템 추가
     * =======================================
     */
    let projectNum = 0;
    let artworkNum = 0;
    $("#categoryNewBtn").on("click", function(){
        // 카테고리 생성 버튼을 클릭시
        let categoryItemVal = $('.dropdown__handle a.active').attr('data-value');
        if(categoryItemVal === "largeMenuProject") {
            if(projectNum < 3){
                $("#categoryProjectSoltable").append(
                    `<li><a href="javascript:;" data-value="project${projectNum}">새 카테고리</a><div class="drag"></div><button class="del del__btn">X</button></li>`
                )
                projectNum++;
            } else {
                alert("카테고리는 3개 이상 추가 하실 수 없습니다.");
            }
        } else if(categoryItemVal === "largeMenuArtwork") {
            if(artworkNum < 2){
                $("#categoryArtworkSoltable").append(
                    `<li><a href="javascript:;" data-value="artwork${artworkNum}">새 카테고리</a><div class="drag"></div><button class="del del__btn">X</button></li>`
                )
                artworkNum++;
            } else {
                alert("카테고리는 2개 이상 추가 하실 수 없습니다.");
            }
        }
    });

    /**
     * =======================================
     * 설  명 : jQuery Ui Sortable
     * =======================================
     */
     $("#categoryProjectSoltable").sortable();
     $("#categoryArtworkSoltable").sortable();

   

    

     /**
     * =======================================
     * 설  명 : 카테고리 매니저 클릭 이벤트
     * =======================================
     */
     $(".mng-category a").on("click", function(){
         $(".mng-category a").removeClass("active");
         $(this).addClass("active");
     });

    
});

