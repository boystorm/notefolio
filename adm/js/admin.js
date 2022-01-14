$(function() {
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 아이템 추가
     * =======================================
     */
    let projectNum = 1;
    let artworkNum = 1;
    $("#categoryNewBtn").on("click", function(){
        // 카테고리 생성 버튼을 클릭시
        let categoryItem = $("input:radio[name='newCategory']:checked").val();

        if(categoryItem == "project"){
            if(projectNum <= 3){
                $("#categoryProjectSoltable").append(
                    `<li><a href="javascript:;" data-value="project${projectNum}">카테고리${projectNum}</a></li>`
                )
            } else {
                alert("카테고리는 3개 이상 추가 하실 수 없습니다.");
            }
            projectNum++;
        } else {
            if(artworkNum <= 2){
                $("#categoryArtworkSoltable").append(
                    `<li><a href="javascript:;" data-value="artwork${artworkNum}">카테고리${artworkNum}</a></li>`
                )
            } else {
                alert("카테고리는 2개 이상 추가 하실 수 없습니다.");
            }
            artworkNum++;
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
     * 설  명 : 카테고리 아이템 텍스트
     * =======================================
     */
    $(document).on("click", "#categoryProjectSoltable li a, #categoryArtworkSoltable li a",function(e){
        let text = $(this).text();
        let data = $(this).attr('data-value');
        
        $("#categoryModForm").val(text);
        $("#categoryModForm").attr("data-value", data);

        e.preventDefault();
    });

    // $("#categoryModForm").focus(function(){
    //     let data = $(this).data('value');
    //     let dataVal = $("#categoryModForm").val();
    //     let item = $("#categoryProjectSoltable li a, #categoryArtworkSoltable li a");
        
    //     $(item).each(function( index, element ) {
    //         if(data == $(this).data('value')){
    //             $(this).text(dataVal);
    //             $(this).attr("data-value", dataVal);
    //         }
    //     });
    // });

    $('#categoryModForm').blur(function(e){
        let inputVal = $(this).attr('data-value'); 
        //console.log("<input>" + inputVal);
        // 절대 안바뀌는 key 값으로 유지해야 바뀜***** 이로직이 필요
        let dataVal = $("#categoryModForm").val();

        let item = $("#categoryProjectSoltable li a, #categoryArtworkSoltable li a"); 
        
        $(item).each(function( index, element ) {
            if(inputVal == $(this).attr('data-value')){
                $(this).text(dataVal);
                $(this).attr("data-value", dataVal);
            }
        });
    });




});