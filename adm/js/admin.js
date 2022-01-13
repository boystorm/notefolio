$(function() {
    /**
     * =======================================
     * 설  명 : jQuery Ui Sortable
     * 작성자/작성일 : 양동준/2022.01.13
     * =======================================
     */
    $("#categoryProjectSoltable").sortable();
    $("#categoryArtworkSoltable").sortable();

    /**
     * =======================================
     * 설  명 : 카테고리 아이템 추가
     * 작성자/작성일 : 양동준/2022.01.13
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
                    `<li><a href="javascript:;">카테고리${projectNum}</a></li>`
                )
            } else {
                alert("카테고리는 3개 이상 추가 하실 수 없습니다.");
            }
            projectNum++;
        } else {
            if(artworkNum <= 2){
                $("#categoryArtworkSoltable").append(
                    `<li><a href="javascript:;">카테고리${artworkNum}</a></li>`
                )
            } else {
                alert("카테고리는 2개 이상 추가 하실 수 없습니다.");
            }
            artworkNum++;
        }
        
    });
});