$(function() {
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 오픈
     * =======================================
     */
    $("#btn").on("click", function(){
        $(".modal").css("display","block");
        $("#categoryProjectRadio").trigger("click");
    });
    
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
     * 설  명 : 카테고리 대메뉴 아이템 텍스트 수정
     * =======================================
     */
    $("#categoryProjectRadio, #categoryArtworkRadio").on("click", function(){
        $("#categoryProjectRadio, #categoryArtworkRadio, #categoryProjectSoltable li a, #categoryArtworkSoltable li a").removeClass("active");
        $(this).addClass("active");

        let categoryItemVal = $(this).attr('data-value');
        let text = $(this).text();
        let data = $(this).attr('data-value');

        $("#categoryModForm").focus();
        $("#categoryModForm").val(text);
        $("#categoryModForm").attr("data-value", data);
    });


    /**
     * =======================================
     * 설  명 : 카테고리 하위메뉴 아이템 텍스트 수정
     * =======================================
     */
    $(document).on("click", "#categoryProjectSoltable li a, #categoryArtworkSoltable li a",function(e){
        $("#categoryProjectRadio, #categoryArtworkRadio, #categoryProjectSoltable li a, #categoryArtworkSoltable li a").removeClass("active");
        $(this).addClass("active");

        let text = $(this).text();
        let data = $(this).attr('data-value');

        $("#categoryProjectSoltable li a, #categoryArtworkSoltable li a").removeClass("active");
        $(this).addClass("active");
        
        $("#categoryModForm").focus();
        $("#categoryModForm").val(text);
        $("#categoryModForm").attr("data-value", data);

        e.preventDefault();
    });

    $('#categoryModForm').blur(function(e){
        let inputVal = $(this).attr('data-value'); 
        let dataVal = $("#categoryModForm").val();
        let item = $("#categoryProjectSoltable li a, #categoryArtworkSoltable li a"); 
        
        $(item).each(function( index, element ) {
            if(inputVal == $(this).attr('data-value')){ // a tag this
                if(dataVal != ''){
                    $(this).text(dataVal); // 
                }else{
                    $(this).trigger("click");
                }
            }
        });
        
        // large Category
        if(inputVal === "largeMenuProject"){
            if(dataVal != ''){
                $("#categoryProjectRadio").text(dataVal);
            }else{
                $(this).trigger("click");
            }
        } else if (inputVal === "largeMenuArtwork") {
            if(dataVal != ''){
                $("#categoryArtworkRadio").text(dataVal);
            }else{
                $(this).trigger("click");
            }
        }
    });

    $("#categoryModForm").keydown(function(keyNum){ 
        //현재의 키보드의 입력값을 keyNum으로 받음 
        if(keyNum.keyCode == 13){ 
            $("#categoryModForm").blur();
        } 
    })

    /**
     * =======================================
     * 설  명 : 카테고리 아이템 삭제
     * =======================================
     */
     $(document).on("click", ".del__btn", function(e){
        // category number reset
        if($(this).parent().parent("ul").attr("id") === "categoryProjectSoltable") {
            $(this).closest("li").remove();
            let projectItem = $("#categoryProjectSoltable li a");
            $(projectItem).each(function( index, element ) {
                $(element).attr('data-value', "project" + index);
            });
            // categoryModForm data-value reset
            $("#categoryModForm").attr('data-value', "");
            // categoryModForm Text reset
            $("#categoryModForm").val("");

            projectNum--;
        } else if($(this).parent().parent("ul").attr("id") === "categoryArtworkSoltable") {
            $(this).closest("li").remove();
            let artworkItem = $("#categoryArtworkSoltable li a");
            $(artworkItem).each(function( index, element ) {
                console.log(index);
                console.log(element);
                $(element).attr('data-value', "artwork" + index);
            });

            // categoryModForm data-value reset
            $("#categoryModForm").attr('data-value', "");
            // categoryModForm Text reset
            $("#categoryModForm").val("");

            artworkNum--;
        }
     });
});