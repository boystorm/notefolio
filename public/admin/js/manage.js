/**
 * =======================================
 * 설  명 : 카테고리 매니저 카테고리 리스트 호출
 * =======================================
 */
function fnCategoryInitList(){
    // 카테고리 매니저 목록
    $(".mng-category__all").remove();
    $(".mng-category__list").remove();

    if($(".mng-category__all").length === 0 && $(".mng-category__list").length === 0){
        $.ajax({
            type : "get",
            url : "/admin/manage/category/data",
            dataType : "JSON"
        })
        .done(function(json){
            // 카테고리 매니저 리스트 호출
            fnCategoryManageList(json);
            mainCategory();
            subCategory();
        })
        .fail(function(xhr, status, errorThrown){
            console.log("카테고리 매니저 Ajax failed")
        });
    }
};

/**
 * =======================================
 * 설  명 : 카테고리 매니저 카테고리 리스트 출력
 * =======================================
 */
 function fnCategoryManageList(json){
    let info = '';
    for(i = 0; i < json.rows1.length ; i++){
        let data = json.rows1[i];
        info += "<div class='mng-category__all'>";
        info += "<a href='javascript:;' data-main-id=" + data.main_id +" class=" + (data.main_id == 1 ? "active" : "") + ">" + data.main_title +"</a>";
        info += "</div>"

        info += "<ul class='mng-category__list'>"
        if(data.main_id === 1){
            for(let j = 0; j < json.rows2.length; j++) {
                let data2 = json.rows2[j];
                if(data2.main_id === 1){
                    info += "<li>";
                    info += "<a href='javascript:;' data-main-id=" + data2.main_id +" data-sub-id=" + data2.sub_id + ">" + data2.sub_title + "</a>";
                    info += "</li>";
                }
            }   
            info += "</ul>"
        }else{
            for(let k = 0; k < json.rows2.length; k++) {
                let data3 = json.rows2[k];
                if(data3.main_id === 2){
                    info += "<li>";
                    info += "<a href='javascript:;' data-main-id=" + data3.main_id +" data-sub-id=" + data3.sub_id + ">" + data3.sub_title + "</a>";
                    info += "</li>";
                }
            }
        }
    };
    $(".mng-category").append(info);
};

/**
 * =======================================
 * 설  명 : 카테고리 팝업 리스트 함수
 * =======================================
 */
function fnCategoryPopList(){
    $.ajax({
        type : "get",
        url : "/admin/manage/category/data",
        dataType : "JSON",
    })
    .done(function(json){
        $(".modal__generate_new").remove();
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
            $(".modal__generate--item").removeClass("on");
            
            // subID 텍스트 히든태그
            $("#categorySubIdInput").val(subId);
            $("#categoryNameInput").prop("readonly", false);
            $(".modal__mod--kinds").addClass("display-none");

            // 카테고리 이름
            let = categoryName = $(this).find('span').text();
            $("#categoryNameInput").val(categoryName);
            $("#categoryNameInput").focus();
        });

        // 새 카테고리 추가
        $("#categoryNewBtn").on("click", function(){
            $(".modal__tree--item").removeClass("on");
            $(".modal__mod--kinds").removeClass("display-none");
            $(".modal__generate--item").addClass("on");
            $("#categoryNameInput").focus();
            $("#categorySubIdInput").val("");
            $("#categoryNameInput").val("");

            if ($("#categoryNewItem")[0] === undefined) {                
                $(".modal__generate")[0].innerHTML 
                    += '<div class="modal__generate_new"><span id="categoryNewItem" class="modal__generate--item on">New Category</span><button type="button" class="generate-item-del">X</button></div>'

                $("#categoryNameInput").prop("readonly", false);
                $("#categoryNameInput").val("");
                $("#categoryNameInput").focus();
            }

            // 새 카테고리 클릭
            $(".modal__generate_new").on("click", function(){
                $(".modal__generate--item").addClass("on");
                $(".modal__mod--kinds").removeClass("display-none");
                $(".modal__tree--item").removeClass("on");

                $("#categorySubIdInput").val("");
                $("#categoryNameInput").val("");
                $("#categoryNameInput").focus();
            })

            // 새 카테고리 삭제
            $(".generate-item-del").on("click", function(){
                $(".modal__generate_new").remove();
            })
        });

         // 카테고리 삭제
         $(".category-item-del").on("click", function(){
            let subId = $(this).parent().data('value');
            let flag = window.confirm("삭제 하시겠습니까?");

            if(flag){
                $.ajax({
                    type : "DELETE",
                    url : "/admin/manage/category/" + subId,
                })
                .done(function(result){
                    
                    if(JSON.stringify(result.errno) == "1451"){ // 에러 메시지 외래키 삭제시 에러 코드
                        alert("카테고리 안에 게시글 먼저 삭제해 주세요.");
                    } else {
                        alert("삭제 하였습니다.");

                        fnCategoryPopList();
                        fnCategoryInitList();
                    }

                })
                .fail(function(xhr, status, errorThrown){
                    console.log("카테고리 삭제 Ajax failed")
                })
            }
        });
    })
    .fail(function(request,status,error){
        console.log(request, status, error);
    });
}

/**
 * =======================================
 * 설  명 : 메인 카테고리 클릭 함수
 * =======================================
 */
function mainCategory(){
    $(".mng-category__all a").on("click", function(){
        let self = $(this).hasClass("active");
        let element = $(".mng-category__all a");
        let elementAnother = $(".mng-category__list li a");
        let manageBtn = $(".mng__btn");

        if(!self){
            manageBtn.addClass("display-none");
            elementAnother.removeClass("active");
            element.removeClass("active");
            $(this).addClass("active");
        }
    });
}
/**
 * =======================================
 * 설  명 : 서브 카테고리 클릭 함수
 * =======================================
 */
function subCategory(){
    $(".mng-category__list li a").on("click", function(){
        let self = $(this).hasClass("active");
        let element = $(".mng-category__all a");
        let elementAnother = $(".mng-category__list li a");
        let manageBtn = $(".mng__btn");
        let mainId = $(this).data("mainId");
        let subId = $(this).data("subId");

        if(!self){
            manageBtn.removeClass("display-none");
            elementAnother.removeClass("active");
            element.removeClass("active");
            $(this).addClass("active");
            $("#boardAddBtn").attr("href", "/admin/board/boardAdd/" + mainId + "/" + subId);
        }

        $.ajax({
            type : "get",
            url : "/admin/manage/" + mainId + "/" + subId + "/page/" + 1,
            dataType : "JSON",
        })
        .done(function(json){
            
            // 테이블 초기화
            $(".mng__table table tbody").empty();
            // 페이징 초기화
            $(".pagination").empty();

            _.forEach(json.rows, function (val, key) {
                let listHtml = "";
                console.log(val);

                listHtml += "<tr>";
                listHtml += "<td class='mng__table--center item-box-chk'><input type='checkbox' name='boardChk[]' class='itemChk' value='" + val.idx + "'/></td>";
                listHtml += "<td class='mng__table--center'>" + val.idx + "</td>";
                listHtml += "<td class='mng__table--center'><a href='/admin/board/boardRead/'><img src='http://www.jeong9-9.com/img/thumbnail/card16_thumbnail.jpg' class='mng__table--thumb'/></a></td>";
                listHtml += "<td class='mng__table--center'></td>";
                listHtml += "<td class='mng__table--center'></td>";
                listHtml += "<td class='mng__table--center'></td>";
                listHtml += "<td class='mng__table--center'></td>";
                listHtml += "<td class='mng__table--center'></td>";
                listHtml += "<td class='mng__table--center'></td>";
                listHtml += "</tr>"

                $(".mng__table table tbody").append(listHtml);
            });

            // 페이징
            let pageHtml = "";
            for(let i = 0; i < json.rows.length / json.page_num; i++){
                pageHtml += "<li class=''><a href='javascript:;'>1111</a></li>"

                $(".pagination").append(pageHtml);
            }
            

            // alrHtml += "<div class='event-box'>";
            // alrHtml += "<div class='event-info-order'>" + (((page-1) * nPageLength) + (key+1)) + "</div>";
            // alrHtml += "<div class='event-info-icon " + fnGetAlrIcon(val.eventCode) + "'>";
            

        })
        .fail(function(request, status, error){
            console.log("서브 카테고리 게시판 목록 불러오기 Ajax failed");
        });
    });
}


$(function() {
    /**
     * =======================================
     * 설  명 : 메인 카테고리 클릭 호출
     * =======================================
     */
    mainCategory();
    /**
     * =======================================
     * 설  명 : 서브 카테고리 클릭 호출
     * =======================================
     */
    subCategory();
    
    /**
     * =======================================
     * 설  명 : 카테고리 팝업 오픈
     * =======================================
     */
    $("#categoryBtn").on("click", function(){
        $(".modal").removeClass("display-none");
        // 초기화
        $(".modal__tree--item").removeClass("on");
        $("#categoryNewItem").remove();
        $("#categoryNameInput").attr("readonly", true);

        fnCategoryPopList();
    });

    /**
     * =======================================
     * 설  명 : 카테고리 팝업 닫기
     * =======================================
    */
    $("#cancelBtn").on("click", function(){
        $(".modal").addClass("display-none");        
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
                        fnCategoryPopList();
                        fnCategoryInitList();
                    })
                    .fail(function(xhr, status, errorThrown){
                        console.log("카테고리 수정 Ajax failed")
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
                        fnCategoryPopList();
                        fnCategoryInitList();
                    })
                    .fail(function(xhr, status, errorThrown){
                        console.log("카테고리 등록 Ajax failed")
                    })
                }
            }
        });            
    });
    /**
     * =======================================
     * 설  명 : All 체크
     * =======================================
     */
    let boardAllChk = $("#boardAllChk");
    boardAllChk.change(function(){
        let self = $(this);
        
        let checked = self.prop("checked");
        $("input[name='boardChk[]']").prop('checked', checked);
    });

    let boardChk = $('input[name="boardChk[]"]');
    boardChk.change(function () {
        let boardChkLength = boardChk.length;
        let checkedLength = $('input[name="boardChk[]"]:checked').length;
        let selectAll = (boardChkLength == checkedLength);

        boardAllChk.prop('checked', selectAll);
    });

    /**
     * =======================================
     * 설  명 : 그리드 삭제
     * =======================================
     */
    $("#boardDelBtn").on("click", function(){
        if($("input[name='boardChk[]']:checked").is(':checked')){
            let chkArray = new Array();
            let chkCount = $("input[name='boardChk[]']:checked").length;
            let flag = window.confirm(chkCount + "건이 삭제됩니다. 확인해주세요.");

            if(flag){
                $("input[name='boardChk[]']:checked").each(function(){
                    let tmpVal = $(this).val();
                    chkArray.push(tmpVal);
                });

                $.ajax({
                    type : "get",
                    url : "/admin/board/boardDelete/" + chkArray,
                })
                .done(function(result){
                    alert("삭제 되었습니다.");

                    //0513 get board data
                    
                    
                })
                .fail(function(xhr, status, errorThrown){
                    console.log("게시판 삭제 Ajax failed")
                })

                // let url = location.origin + "/admin/board/boardDelete/" + chkArray;    
                // $(location).attr('href',url);
            }
        }else{
            alert("항목을 선택해주세요.");
        }
    });

    /**
     * =======================================
     * 설  명 : 페이지 클릭
     * =======================================
     */
    $(".pagination li").on("click", function(){
        alert("111");
    });
});

