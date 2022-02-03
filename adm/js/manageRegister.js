$(function() {
    /**
     * =======================================
     * 설  명 : file uploader library
     * =======================================
     */   
     $('#ssi-upload').ssi_uploader({
        url: 'http://ssinput.com/php/upload.php'
    });

    /**
     * =======================================
     * 설  명 : smart editor2.0 library
     * =======================================
     */   
    var oEditors = [];
    
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "ir1",
        sSkinURI: "../../lib/smarteditor2/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });
});

