/**
* =======================================
* 설  명 : 프로필 화면
* =======================================
*/
function fnProfileInitList(){
    $("#note").addClass("display-none");

    let profile = '';
    profile += "<h1>프로필 영역입니다.</h1>";
    profile += "<img src='https://reefer.eyecargo.com/images/login_v1.jpg'>";
    $("#profile").append(profile);
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
    let notefolioCate= ""; // 카테고리
    let notefolio = ""; // 리스트
    let notefolioPage = ""; // 페이지
    /* 바디 초기화 */
    $("#profile").addClass("display-none");
    $("#note").removeClass("display-none");
    $("#subCategory").empty();
    $("#noteList").empty();
    $("#notePage").empty();

    if(json.mainId == 1){
        notefolioCate += "<li><a href='javascript:;' data-main-id=" + json.mainId + ">Project ALL</a></li>";
    }else{
        notefolioCate += "<li><a href='javascript:;' data-main-id=" + json.mainId + ">Artwork ALL</a></li>";
    }

    /* 서브 카테고리 */
    for(i = 0; i < json.rows2.length ; i++){
        let data = json.rows2[i];
        if(data.main_id == json.mainId){
            notefolioCate += "<li><a href='javascript:;' data-main-id=" + data.main_id + "  data-sub-id=" + data.sub_id + ">" + data.sub_title + "</a></li>";
        }
    };

    $("#subCategory").append(notefolioCate);


    /* 전체 데이터 추출 */

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
    $("#noteList").append(notefolio);

    /* 페이지 */
    notefolioPage += "<ul>"
    for(let i = 0; i < json.rows3.length / json.page_num; i++){
        let data = json.rows3[i];
        notefolioPage += "<li class='" + (json.page == i+1 ? 'active' : '') + "'>";
        notefolioPage += "<a href='javascript:;' data-main-id='"+ data.main_id +"' data-page='" + (i + 1) + "'>" + (i + 1) + "</a>";
        notefolioPage += "</li>";
    }
    notefolioPage += "</ul>"

    $("#notePage").append(notefolioPage);

    /* 페이지 클릭 */
    $(document).on("click", ".note-page li a", function(){
        let mainId = $(this).data("mainId");
        let page = $(this).data("page");

        $.ajax({
            type : "get",
            url : "/" + mainId + "/page/" + page,
            dataType : "JSON",
        })
        .done(function(json){
            $("#noteList").empty();
            $("#notePage").empty();

            let notefolioList = "";
            let notefolioPage = "";
            
             /* 전체 데이터 추출 */

            for(var i = (json.page * json.page_num) - json.page_num; i < (json.page * json.page_num); i++) {
                if(i > json.length){
                    i++;
                }else{
                    let data = json.rows3[i];
                    notefolioList += "<div class='note-item'>";
                    notefolioList += "<a href='javascript:;'>";
                    notefolioList += "<div class='note-img'>";
                    notefolioList += "<img src='"+ data.image +"'>";
                    notefolioList += "</div>";
                    notefolioList += "<div class='note-info'>";
                    notefolioList += "<p>"+ data.title +"</p>";
                    notefolioList += "</div>";
                    notefolioList += "</a>";
                    notefolioList += "</div>";
                }
            };

            $("#noteList").append(notefolioList);

            notefolioPage += "<div class='note-page'>";
            notefolioPage += "<ul>"
            for(let i = 0; i < json.rows3.length / json.page_num; i++){
                let data = json.rows3[i];
                notefolioPage += "<li class='" + (json.page == i+1 ? 'active' : '') + "'>";
                notefolioPage += "<a href='javascript:;' data-main-id='"+ data.main_id +"' data-page='" + (i + 1) + "'>" + (i + 1) + "</a>";
                notefolioPage += "</li>";
            }
            notefolioPage += "</ul>"
            notefolioPage += "</div>";

            $("#notePage").append(notefolioPage);
        })
        .fail(function(request, status, error){
            console.log("페이징 불러오기 Ajax failed");
        });
    });
}

$(function() {
    fnCategoryInitList(); // 상단 헤더
    fnProfileInitList(); // 프로필 화면
    
    $(document).on("click", "#subCategory li a", function(){
        let mainId = $(this).data("mainId");
        let subId = $(this).data("subId");
        let selfAcive = $(this).hasClass("active");

        // 초기화 
        $("#noteList").empty();
        $("#notePage").empty();

        // 서브 카테고리
        if(!selfAcive){
            $("#subCategory li a").removeClass("active");
            $(this).addClass("active");
        }

        if(subId == undefined){ // All click
            $.ajax({
                type : "get",
                url : "/main/" + mainId + "/page/" + 1,
                dataType : "JSON"
            })
            .done(function(json){
                console.log(json);
                


            })
            .fail(function(xhr, status, errorThrown){
                console.log("게시판 및 카테고리 Ajax failed")
            });
        }else{
            // $.ajax({
            //     type : "get",
            //     url : "/main/" + mainId + "/sub/" + subId + "/page/" + 1,
            //     dataType : "JSON"
            // })
            // .done(function(json){
            //     console.log(json);
            // })
            // .fail(function(xhr, status, errorThrown){
            //     console.log("게시판 및 카테고리 Ajax failed")
            // });
        }
    })


});

