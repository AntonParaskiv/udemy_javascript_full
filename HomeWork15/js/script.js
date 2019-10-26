$(document).ready(function() {
  let btnChooseTour = $(".main_btna:first"),
    btnGetConsult = $(".main_btn:first"),
    btnTourSchedule = $(".main_nav:first li:eq(1)"),
    overlay = $(".overlay:first"),
    modal = $(".modal:first"),
    btnModalClose = $(".modal:first .close:first");

  btnChooseTour.on("click", modalShow);
  btnGetConsult.on("click", modalShow);
  btnTourSchedule.on("click", modalShow);
  btnModalClose.on("click", modalHide);

  function modalShow() {
    overlay.animate(
      {
        opacity: "toggle"
      },
      1000
    );
    modal.animate(
      {
        opacity: "toggle",
        height: "toggle"
      },
      1000
    );
  }

  function modalHide() {
    overlay.animate(
      {
        opacity: "toggle"
      },
      1000
    );
    modal.animate(
      {
        opacity: "toggle",
        height: "toggle"
      },
      1000
    );
  }
});
