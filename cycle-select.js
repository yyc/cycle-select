"use strict";
(function() {
  jQuery.fn.cycleSelect = function(opts) {
    // Delay from the last click to changing the select and firing the change element
    var delay = opts.delay || 0;

    // Apply it to every element in the selector
    this.map(function(index, select) {
      var clickElement = $("<a href='#'>val</a>");

      // Hide the source select
      $(select).before(clickElement).hide();
      var value = $(select).val();

      // Add CSS classes for styling
      // Then make the value match the select's
      $(clickElement)
        .addClass("select-cycle")
        .attr("data-value", value)
        .html($(select).children(`option[value='${value}']`).html());

      // Add the click binds
      $(clickElement).click(function() {
        // Get the current selected option
        var currentOption = $(select).children(`option[value='${value}']`);

        // Get the next option (or the first, if the current is the last)
        var nextOption = $(currentOption).next("option").first();
        if (nextOption.length == 0) {
          nextOption = $(currentOption).siblings().first();
        }

        value = $(nextOption).attr("value");

        $(clickElement).attr("data-value", value).html($(nextOption).html());

        // Reset timer
        var timeout = $(clickElement).attr("data-timeout-id");
        if (timeout != undefined) {
          window.clearTimeout(timeout);
        }

        timeout = window.setTimeout(() => {
          $(select).val(value).change();
        }, delay);
        $(clickElement).attr("data-timeout-id", timeout);
      });
    });
    return this;
  };
})();
