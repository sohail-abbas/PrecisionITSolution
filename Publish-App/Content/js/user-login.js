$(function () {
    ValidateForm();
});
function ValidateForm() {
    $(".form-login").validate({
        rules: {
            PhoneNumber: {
                required: true,
                minlength: 10
            },
            AltPhoneNumber: {
                minlength: 10,
            },
            EmailID: {
                email: true
            }
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