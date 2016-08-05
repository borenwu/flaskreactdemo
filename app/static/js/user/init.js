$(function () {
    $.material.init();



});

$("#billModal").on("show.bs.modal", function () {
    console.log('exec')
   $("#billModal").remove();
    console.log('exed')
});