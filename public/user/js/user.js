/**
* =======================================
* 설  명 : 프로필 화면
* =======================================
*/
function fnProfileInitList(){
    let profile = '';
    profile += "<div id='container' class='container'>";
    profile += "<div class='profile'>";
    profile += "<h1>프로필 영역입니다.</h1>";
    profile += "<img src='https://reefer.eyecargo.com/images/login_v1.jpg'>";
    profile += "</div>";
    profile += "</div>";
    $("#wrap").append(profile);
}
/**
* =======================================
* 설  명 : 네비게이션 헤더
* =======================================
*/
function fnCategoryInitList(){
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

        /* 포트폴리오 메뉴 */
        $("#mainCategory li a").on("click", function(){       
            let mainId = $(this).data('mainId');
            fnMainCategory(mainId);
        });
    })
    .fail(function(xhr, status, errorThrown){
        console.log("카테고리 데이타 Ajax failed")
    });
    
}

/**
* =======================================
* 설  명 : 포트폴리오 메뉴 클릭
* =======================================
*/
function fnMainCategory(mainId){
    if(mainId != undefined){
        $.ajax({
            type : "get",
            url : "/" + mainId + "/page/" + 1,
            dataType : "JSON"
        })
        .done(function(json){
            fnNoteList(json);
        })
        .fail(function(xhr, status, errorThrown){
            console.log("게시판 및 카테고리 Ajax failed")
        });
    }
}

/**
* =======================================
* 설  명 : 포트폴리오 리스트
* =======================================
*/
function fnNoteList(json){
    let notefolio = "";
    /* 바디 초기화 */
    $("#container").remove();

    notefolio += "<div id='container' class='container'>";
    notefolio += "<div class='note'>";
    notefolio += "<ul id='subCategory' class='sub-category'>";

    if(json.mainId == 1){
        notefolio += "<li><a href='javascript:;'>Project ALL</a></li>";
    }else{
        notefolio += "<li><a href='javascript:;'>Artwork ALL</a></li>";
    }

    /* 서브 카테고리 */
    for(i = 0; i < json.rows2.length ; i++){
        let data = json.rows2[i];
        if(data.main_id == json.mainId){
            notefolio += "<li><a href='javascript:;'>" + data.sub_title + "</a></li>";
        }
    };
    notefolio += "</ul>";
    /* 전체 데이터 추출 */
    notefolio += "<div class='note-list'>";

    for(var i = (json.page * json.page_num) - json.page_num; i < (json.page * json.page_num); i++) {
        if(i > json.length){
            i++;
        }else{
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
        }
    };
    notefolio += "</div>";

    /* 페이지 */
    notefolio += "<div class='note-page'>";
    notefolio += "<ul>"
    for(let i = 0; i < json.rows3.length / json.page_num; i++){
        let data = json.rows3[i];
        notefolio += "<li class='" + (json.page == i+1 ? 'active' : '') + "'>";
        notefolio += "<a href='javascript:;' data-main-id='"+ data.main_id +"' data-page='" + (i + 1) + "'>" + (i + 1) + "</a>";
        notefolio += "</li>";
    }
    notefolio += "</ul>"
    notefolio += "</div>";

    $("#wrap").append(notefolio);

    /* 페이지 클릭 */
    $(".note-page li a").on("click", function(){
        let mainId = $(this).data("mainId");
        let page = $(this).data("page");

        $.ajax({
            type : "get",
            url : "/" + mainId + "/page/" + page,
            dataType : "JSON",
        })
        .done(function(json){
            $(".note-list").remove();
            $(".note-page").remove();

             /* 전체 데이터 추출 */
            notefolio += "<div class='note-list'>";

            for(var i = (json.page * json.page_num) - json.page_num; i < (json.page * json.page_num); i++) {
                if(i > json.length){
                    i++;
                }else{
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
                }
            };
            notefolio += "</div>";

            /* 페이지 */
            notefolio += "<div class='note-page'>";
            notefolio += "<ul>"
            for(let i = 0; i < json.rows3.length / json.page_num; i++){
                let data = json.rows3[i];
                notefolio += "<li class='" + (json.page == i+1 ? 'active' : '') + "'>";
                notefolio += "<a href='javascript:;' data-main-id='"+ data.main_id +"' data-page='" + (i + 1) + "'>" + (i + 1) + "</a>";
                notefolio += "</li>";
            }
            notefolio += "</ul>"
            notefolio += "</div>";

            $("#wrap").append(notefolio);
        })
        .fail(function(request, status, error){
            console.log("페이징 불러오기 Ajax failed");
        });

    });
}
    


$(function() {
    fnCategoryInitList(); // 상단 헤더
    fnProfileInitList(); // 프로필 화면
    
   

     

});

