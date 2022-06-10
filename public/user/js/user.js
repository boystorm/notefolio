function fnCategoryInitList(){
    $.ajax({
        type : "get",
        url : "/admin/manage/category/data",
        dataType : "JSON"
    })
    .done(function(json){
        let info = '';
        info += "<li><a href='javascript:;'>프로필</a></li>";
        for(i = 0; i < json.rows1.length ; i++){
            let data = json.rows1[i];
            console.log(data);
            info += "<li><a href='javascript:;'>"+ data.main_title +"</a></li>";

        };
        $("#mainCategory").append(info);


        /* Project 클릭시 서브 메뉴 및 게시판 전체 나오게 에이젝스 처리*/

    })
    .fail(function(xhr, status, errorThrown){
        console.log("카테고리 매니저 Ajax failed")
    });
    
}

$(function() {
    /**
     * =======================================
     * 설  명 : 메인 카테고리 및 전체 프로젝트
     * =======================================
     */
     fnCategoryInitList();

});

