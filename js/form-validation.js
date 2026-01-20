(function ($) {
  "use strict";

  const initBootstrapValidation = () => {
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  const initJqueryValidation = () => {
    if (!$.fn.validate) return;
    $(".validate-form").each(function () {
      $(this).validate({
        errorClass: "is-invalid",
        validClass: "is-valid",
        errorElement: "div",
        errorPlacement: (error, element) => {
          error.addClass("invalid-feedback");
          error.insertAfter(element);
        },
      });
    });
  };

  $(document).ready(() => {
    initBootstrapValidation();
    initJqueryValidation();
  });
})(jQuery);
