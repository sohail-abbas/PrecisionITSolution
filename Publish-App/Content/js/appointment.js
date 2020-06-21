$(function () {
    //OnSubmitClick();
    ValidateForm();
    BindDateTimePicker();
});


function OnSubmitClick() {
    //$('#request').on('click', function () {
    ajaxParam.data = JSON.stringify(
        {
            Param: $("#requestForm").serializeFormJSON(),
            ActionType: 'UserLogin'
        });
    ajaxParam.url = '/Appointment/AddRequest';
    ajaxParam.dataType = 'html'
    ajaxRequest(ajaxParam, Success, this.oComplate, this.oError);
    //});
}

function Success(responce) {
    $('#myModal .modal-body p').html(responce);
    $('#showMessage').click();
    /*if (responce.IsSuccess) {
        $('#myModal [data-dismiss="modal"]').click();
        $("#loadingMessage").click();
    }*/
    console.log(responce);
}

function ValidateForm() {
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg != value;
    }, "Value must not equal arg.");
    $.validator.addMethod("notEqual", function (value, element, param) {
        return this.optional(element) || value != $(param).val();
    }, "This has to be different...");
    $.validator.setDefaults({
        submitHandler: function () {
            OnSubmitClick();
        }
    });
    $("#requestForm").validate({
        rules: {
            PhoneNumber: {
                required: true,
                minlength: 10
            },
            AltPhoneNumber: {
                minlength: 10,
            },
            EmailID: {
                required: true,
                email: true
            },
            Name: "required",
            Address: "required",
            SystemTypeID: { valueNotEquals: "0" },
            AppointmentDateTime: {
                required: true,
                date: true
            },
            Problem: "required",
        },
        messages: {
            PhoneNumber: {
                required: "Please enter a PhoneNumber",
                minlength: "Please enter valid Phone Number"
            },
            AltPhoneNumber: {
                required: "Please enter a Alternate Phone Number",
                minlength: "Please enter valid Alternate Phone Number",
                notEqual: "Please enter different Alternate Phone Number"
            },
            EmailID: {
                required: "Please enter a Email Address",
                email: "Please enter valid Email Address"
            },
            Name: "Please enter a Name",
            Address: "Please enter a Address",
            SystemTypeID: { valueNotEquals: "Please select an item!" },
            AppointmentDateTime: {
                required: "Please enter a DateTime",
                date: "Please enter a Valid DateTime"
            },
            Problem: "Please enter a Prolem",
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
function BindDateTimePicker() {
    $('#AppointmentDateTime').datetimepicker({
        minDate: startDate,
        maxDate: endDate,
        minTime: '09:00',
        maxTime: '22:00',
        defaultTime: '09:00',
        onSelectTime: function () {
            console.log($('#AppointmentDateTime').val())
            ajaxParam.data = JSON.stringify(
                {
                    Param: { 'AppointmentDateTime': $('#AppointmentDateTime').val()}
                });
            ajaxParam.url = '/Appointment/IsAppointmentBooked';
            ajaxParam.dataType = 'html'
            ajaxRequest(ajaxParam, function (responce) {
                console.log(responce)
                if (responce.length > 0) {
                    $('#myModal .modal-body p').html(responce);
                    $('#showMessage').click();
                    $('#AppointmentDateTime').val('')
                }
            }, this.oComplate, this.oError);
        }
    });
}