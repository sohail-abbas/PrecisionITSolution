$(function () {
    $('#appRequests').DataTable();
    $('#status-nav li').on('click', function () {
        $('#status-nav li').removeClass('active');
        $(this).addClass('active');
        LoadStatusGridView($(this).find('a').data('id'));
    });
    UpdateAppointmentStatus();
});
function LoadStatusGridView(statusId) {
    ajaxParam.data = JSON.stringify(
        {
            Param: { 'appointmentstatusid': statusId }
        });
    ajaxParam.url = '/Admin/LoadAppointmentRequests';
    ajaxParam.dataType = 'html'
    ajaxRequest(ajaxParam, Success, this.oComplate, this.oError);
}

function Success(responce) {
    $('#loadList').html(responce);
    $('#appRequests').DataTable();
    UpdateAppointmentStatus();
}

function UpdateSuccess(responce) {
    $('ul.nav-tabs li.active').click();
}

function UpdateAppointmentStatus() {
    $('.updateStatus').on('change', function () {
        console.log($(this).parent().parent().find('.AppointmentID').html());
        ajaxParam.data = JSON.stringify(
            {
                Param: {
                    'AppointmentID': $(this).parent().parent().find('.AppointmentID').html(),
                    'appointmentstatusid': $(this).val(),
                }
            });
        ajaxParam.url = '/Admin/UpdateAppointmentStatus';
        ajaxParam.dataType = 'html'
        ajaxRequest(ajaxParam, UpdateSuccess, this.oComplate, this.oError);
    });
}