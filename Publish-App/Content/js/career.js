$(function () {
    ValidateForm();
    OnFileUploaderChange();
    $('#btnOpening').on('click', function () {
        $('#openings').show();
    });
});


function OnSubmitClick() {
    if ($('#FilePath').val() != '0' && $('#FilePath').val() != '') {
        ajaxParam.data = JSON.stringify(
            {
                Param: $("#careerFrom").serializeFormJSON(),
                ActionType: 'AddCareer'
            });
        ajaxParam.url = '/Home/Career';
        ajaxParam.dataType = 'html'
        ajaxRequest(ajaxParam, Success, this.oComplate, this.oError);
    }
    else {
        $('[type="file"]').addClass("has-error").removeClass("has-success");
    }
}

function OnFileUploaderChange() {
    $('[type="file"]').change(function () {
        var data = new FormData();
        var files = $(this).get(0).files;
        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "/FileUploader/Upload",
            contentType: false,
            processData: false,
            data: data
        });
        ajaxRequest.done(function (xhr, textStatus) {
            $('[type="file"]').val('');
            $('#FilePath').val(xhr);
            $('.upload-file').show();
        });
    });
}

function Success(responce) {
    $('#myModal .modal-body p').html('Successfully Submitted');
    $('#showMessage').click();
    $('.upload-file').hide();
    $('#FilePath').val('0');
    $("#careerFrom")[0].reset();
}

function ValidateForm() {
    $.validator.addMethod("checkFilePath", function (value, element, arg) {
        console.log(value);
        console.log(element);
        console.log(arg);
        return false;
    }, "Value must not equal arg.");
    $.validator.addMethod("notEqual", function (value, element, param) {
        return this.optional(element) || value != $(param).val();
    }, "This has to be different...");
    $.validator.setDefaults({
        submitHandler: function () {
            OnSubmitClick();
        }
    });
    $("#careerFrom").validate({
        rules: {
            PhoneNo: {
                required: true,
                minlength: 10
            },
            EmailID: {
                required: true,
                email: true
            },
            FirstName: "required",
            LastName: "required",
            FilePath: "required"
        },
        messages: {
            PhoneNo: {
                required: "Please enter a PhoneNumber",
                minlength: "Please enter valid Phone Number"
            },
            EmailID: {
                required: "Please enter a Email Address",
                email: "Please enter valid Email Address"
            },
            FirstName: "Please enter a Name",
            LastName: "Please enter a Address",
            FilePath: { valueNotEquals: "Please upload file" }
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