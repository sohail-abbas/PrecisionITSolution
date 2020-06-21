$(function () {
    ValidateForm();
});

function TrimText() {
    $('#Message').val($.trim($('#Message').val()));
}
function OnSubmitClick() {
    TrimText();
    ajaxParam.data = JSON.stringify(
        {
            Param: $("#contactUsForm").serializeFormJSON(),
            ActionType: 'AddContactUs'
        });
    ajaxParam.url = '/Home/Contact';
    ajaxParam.dataType = 'html'
    ajaxRequest(ajaxParam, Success, this.oComplate, Error);
}

function Success(responce) {
    $('#myModal .modal-body p').html(responce);
    $('#showMessage').click();
    $('#contactUsForm')[0].reset();
}
function Error(responce) {
    $('#myModal .modal-body p').html(responce);
    $('#showMessage').click();
    $('#contactUsForm')[0].reset();
}

function ValidateForm() {
    $.validator.setDefaults({
        submitHandler: function () {
            OnSubmitClick();
        }
    });
    $("#contactUsForm").validate({
        rules: {
            EmailID: {
                required: true,
                email: true
            },
            Name: "required",
            Message: "required"
        },
        messages: {
            EmailID: {
                required: "Please enter a Email Address",
                email: "Please enter valid Email Address"
            },
            Name: "Please enter a Name",
            Message: "Please enter a Message"
        },
        errorPlacement: function (error, element) {
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("has-success").removeClass("has-error");
        },
        onclick: function (element) {
            console.log(element);
        }
    });
}