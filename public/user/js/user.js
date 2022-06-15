function fnCategoryInitList(){
    /* 프로필 */
    let profile = '';
    profile += "<div id='container' class='container'>";
    profile += "<div class='profile'>";
    // profile += "<h1>프로필 영역입니다.</h1>";
    // profile += "<img src='http://www.jeong9-9.com/img/index/index_img.jpg'>";
    profile += "</div>";
    profile += "</div>";
    $("#wrap").append(profile);

    /* 네이게이션 */
    $.ajax({
        type : "get",
        url : "/category/data",
        dataType : "JSON"
    })
    .done(function(json){
        let info = '';
        info += "<li><a href='/'>프로필</a></li>";
        for(i = 0; i < json.rows1.length ; i++){
            let data = json.rows1[i];
            info += "<li><a href='javascript:;' data-main-id='" + data.main_id + "'>"+ data.main_title +"</a></li>";
        };
        $("#mainCategory").append(info);

        /* 네이게이션 메인 메뉴 클릭 */
        $("#mainCategory li a").on("click", function(){            
            let mainId = $(this).data('mainId');
            let notefolio = "";          
            
            if(mainId != undefined){
                $.ajax({
                    type : "get",
                    url : "/" + mainId + "/page/" + 1,
                    dataType : "JSON"
                })
                .done(function(json){
                    /* 바디 초기화 */
                    $("#container").remove();

                    if(mainId == 1){
                        /* 서브 카테고리 */
                        notefolio += "<div id='container' class='container'>";
                        notefolio += "<div class='note'>";
                        notefolio += "<ul id='subCategory' class='sub-category'>";
                        notefolio += "<li><a href='javascript:;'>Project ALL</a></li>";
                        for(i = 0; i < json.rows2.length ; i++){
                            let data = json.rows2[i];
                            if(data.main_id == 1){
                                notefolio += "<li><a href='javascript:;'>" + data.sub_title + "</a></li>";
                            }
                        };
                        notefolio += "</ul>";
                        /* 전체 데이터 추출 */
                        notefolio += "<div class='note-list'>";

                        for(i = 0; i < json.rows3.length ; i++){
                            let data = json.rows3[i];
                            notefolio += "<div class='note-item'>";
                            notefolio += "<a href='javascript:;'>";
                            notefolio += "<div class='note-img'>";
                            notefolio += "<img src='"+ data.image +"'>";
                            notefolio += "</div>";
                            notefolio += "<div class='note-info'>";
                            notefolio += "<p>"+ data.title +"</p>";
                            notefolio += "</div>";
                            notefolio += "</a>";
                            notefolio += "</div>";
                        };
                        notefolio += "</div>";

                        $("#wrap").append(notefolio);
                    }else if(mainId == 2){
                        /* 서브 카테고리 */
                        notefolio += "<div id='container' class='container'>";
                        notefolio += "<div class='note'>";
                        notefolio += "<ul id='subCategory' class='sub-category'>";
                        notefolio += "<li><a href='javascript:;'>Artwork ALL</a></li>";
                        for(i = 0; i < json.rows2.length ; i++){
                            let data = json.rows2[i];
                            if(data.main_id == 2){
                                notefolio += "<li><a href='javascript:;'>" + data.sub_title + "</a></li>";
                            }
                        };
                        notefolio += "</ul>";
                        /* 전체 데이터 추출 */
                        notefolio += "<div class='note-list'>";

                        for(i = 0; i < json.rows3.length ; i++){
                            let data = json.rows3[i];
                            console.log(data);
                            notefolio += "<div class='note-item'>";
                            notefolio += "<a href='javascript:;'>";
                            notefolio += "<div class='note-img'>";
                            notefolio += "<img src='"+ data.image +"'>";
                            notefolio += "</div>";
                            notefolio += "<div class='note-info'>";
                            notefolio += "<p>"+ data.title +"</p>";
                            notefolio += "</div>";
                            notefolio += "</a>";
                            notefolio += "</div>";
                        };
                        notefolio += "</div>";

                        $("#wrap").append(notefolio);
                    }
                })
                .fail(function(xhr, status, errorThrown){
                    console.log("게시판 및 카테고리 Ajax failed")
                });
            }
        })
    })
    .fail(function(xhr, status, errorThrown){
        console.log("카테고리 데이타 Ajax failed")
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

