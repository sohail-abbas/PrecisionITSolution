$(function () {
    ValidateForm();
    BindDateTimePicker();
});

function ValidateForm() {
    $.validator.setDefaults({
        submitHandler: function () {
            OnSubmitClick();
        }
    });
    $("#requestForm").validate({
        rules: {
            PhoneNumber: {
                minlength: 10,
                maxlength: 10
            }
        },
        messages: {
            PhoneNumber: {
                required: "Please enter a PhoneNumber",
                minlength: "Please enter valid Phone Number",
                maxlength: "Please enter valid Phone Number"
            }
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
function OnSubmitClick() {
    //$('#request').on('click', function () {
    ajaxParam.data = JSON.stringify(
        {
            Param: $("#requestForm").serializeFormJSON(),
            ActionType: 'UserLogin'
        });
    ajaxParam.url = '/Appointment/SearchAppointment';
    ajaxParam.dataType = 'html'
    ajaxRequest(ajaxParam, Success, this.oComplate, this.oError);
    //});
}

function Success(responce) {
    $('#search').html(responce);
}

function BindDateTimePicker() {
    $('#AppointmentDateTime').datetimepicker({
        timepicker: false,
        startDate: '2017/05/21'
        , format: 'Y/m/d'
        ,formatDate: 'Y/m/d'
    });
}