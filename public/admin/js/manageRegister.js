$(function() {
    /**
     * =======================================
     * 설  명 : init
     * =======================================
     */   
    $("#registerTitle").focus();

    /**
     * =======================================
     * 설  명 : file uploader lib
     * =======================================
     */   
     $('#ssi-upload').ssi_uploader({
        url: 'http://ssinput.com/php/upload.php'
    });

    /**
     * =======================================
     * 설  명 : summernote lib
     * =======================================
     */   
     $('#summernote').summernote({
        height: 300,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: false,                  // set focus to editable area after initializing summernote
        styleTags: [
            'p',{ title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
            'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        ],
        lineHeights: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
        fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
        fontNamesIgnoreCheck: ['Merriweather'],
        toolbar: [
            ['style', ['style']], 
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['height', ['height']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {

        }
      });

    /**
     * =======================================
     * 설  명 : 등록,수정 취소 버튼
     * =======================================
     */   
    $("#boardCancelBtn").on("click",function(){
        history.go(-1);
    });

    /**
     * =======================================
     * 설  명 : 글쓰기 등록
     * =======================================
     */   
    $("#boardAddBtn").on("click", function(){
        let boardAddForm = $("#boardAddForm").validate({
            rules: {
                title: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: "필수 항목입니다."
                }
            },
            submitHandler: function(form) {
                let parameter = $("#boardAddForm").serializeObject();    
                
                $.ajax({
                    type : "POST",
                    url : "/admin/board/boardAddProcess",
                    dataType : "JSON",
                    data : parameter
                })
                .done(function(json){
                    if(json.mainId === "1"){
                        window.location = "/admin/manage/1/page/1#pr" + json.subId ;
                    }else{
                        window.location = "/admin/manage/1/page/1#ar" + json.subId ;
                    }
                })
                .fail(function(xhr, status, errorThrown){
                    console.log("글쓰기 등록 Ajax failed")
                })
            }
        });            
    });

    /**
     * =======================================
     * 설  명 : 글쓰기 수정
     * =======================================
     */
    $("#boardModBtn").on("click", function(){
        let boardModForm = $("#boardModForm").validate({
            rules: {
                title: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: "필수 항목입니다."
                }
            },
            submitHandler: function(form) {
                // logic
                let parameter = $("#boardModForm").serializeObject();

                $.ajax({
                    type : "POST",
                    url : "/admin/board/boardUpdateProcess",
                    dataType : "JSON",
                    data : parameter
                })
                .done(function(json){
                    if(json.mainId === "1"){
                        window.location = "/admin/manage/1/page/1#pr" + json.subId ;
                    }else{
                        window.location = "/admin/manage/1/page/1#ar" + json.subId ;
                    }
                })
                .fail(function(xhr, status, errorThrown){
                    console.log("글쓰기 등록 Ajax failed")
                })
            }
        });            
    });
});

