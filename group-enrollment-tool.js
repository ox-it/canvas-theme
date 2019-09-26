/*****************************************************
* JavaScript Overrides for the Group Enrollment Tool *
*****************************************************/
(function() {
  
  // This ID must match the external tool ID assigned to GET in Canvas, listed in the URL when the tool is accessed
  // e.g. "1234" in https://ox.instructure.com/accounts/1/external_tools/1234
  var EXTERNAL_TOOL_ID = 9314;

  function createButton() {
    var link = document.createElement('a');
    link.innerHTML = 'Oxford Groups';
    link.href = location.origin + location.pathname.replace('users', 'external_tools/' + EXTERNAL_TOOL_ID);
    link.className = "btn canvas-group-enrollment__button";
    return link;
  }

  function isAuthorized() {
    var allowedRoles = ['root_admin', 'admin', 'teacher'];
    for (var i=0; i<ENV.current_user_roles.length; ++i) {
      var role = ENV.current_user_roles[i];
      if (allowedRoles.indexOf(role) >= 0) {
        return true;
      }
    }
    return false;
  }

  function courseLaunch() {
    if (isAuthorized()) {
      $('.ic-Action-header__Secondary').prepend(createButton());
    }
  }

  function accountLaunch() {
    var observer = new MutationObserver(function(e) {
      isAccountPeoplePath() ? createAccountButton() : deleteAccountButton();
    });
    observer.observe(document.getElementById('content'), {attributes:false, childList:true, subtree:false});
    if (isAccountPeoplePath()) {
      createAccountButton();
    }
  }

  function createAccountButton() {
    var div = document.createElement('div');
    var button = createButton();
    button.className += ' canvas-group-enrollment__account-button';
    $(div).append(button).addClass("canvas-group-enrollment__button-wrapper");
    $('#content-wrapper').prepend(div);
  }

  function deleteAccountButton() {
    $('.canvas-group-enrollment__button-wrapper').remove();
  }

  function isAccountPeoplePath() {
    if (location.pathname.indexOf('accounts/') > 0) {
      if (matchesIndexUsersPage() && $("#unauthorized_message").length <= 0) {
        return true;
      }
    }
    return false;
  }

  function matchesIndexUsersPage() {
    return (location.pathname.indexOf('/users') > 0 && location.pathname.match(/users\/[0-9]+/) === null)
  }

  window.addEventListener('load', function(event) {
    if (EXTERNAL_TOOL_ID === null) {
      console.error('EXTERNAL_TOOL_ID not set!');
    }

    if (location.pathname.indexOf('courses/') > 0) {
      if (matchesIndexUsersPage()) {
        courseLaunch();
      }
    } else if (location.pathname.indexOf('accounts/') > 0) {
      accountLaunch();
    }
  });

})();

/** End of JavaScript Overrides for the Group Enrollment Tool **/
