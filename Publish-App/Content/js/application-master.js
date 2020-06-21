var baseUrl = 'http://localhost:63724/';
var ajaxParam = {
    type: "Post",
    url: "",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({ name: 'Name' }),
};

function ajaxRequest(aParam, oSuccess, oComplate, oError) {
    $.ajax({
        type: aParam.type,
        url: aParam.url,
        contentType: aParam.contentType,
        dataType: aParam.dataType,
        data: aParam.data,
        success: oSuccess,
        failure: oError,
        compplate: oComplate
    });
}



/*---LEFT BAR ACCORDION----*/
$(function () {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});
function AjaxStartStop() {
    $(document).ajaxStart(function () {
        $("#loadingModal").show();
    });
    $(document).ajaxStop(function () {
        $("#loadingModal").hide();
    });
}

function LoadPageByUrl(pUrl, typeOfPage) {
    if (typeOfPage == 'angular') {
        ajaxParam.url = baseUrl + pUrl;
        ajaxParam.dataType = 'html';
        ajaxRequest(ajaxParam, sPSuccess, this.oComplate, this.oError);
    } else {
        $('#innerPage').load(baseUrl + pUrl);
    }
}

$(function () {
    AjaxStartStop();
});