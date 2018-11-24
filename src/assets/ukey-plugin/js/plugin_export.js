'use strict';

/**
 * UKey plugin
 * @returns {object} Functions to work with plugin
 */
export const UKeyPlugin = (function () {
  /**
   * Default plugin configuration.
   */
  var defaultConfiguration = {
    targetUrl: "https://api.ukey.net.ua",
    name: "Test name",
    identifier: "Test identifier",
    timeoutPeriod: 100000,
    portalId: '',
    portalKey: '',
    auth_token: function () {
      return localStorageCtrl.get("ukey_auth_token");
    }
  };

  var pluginWindow = {
    body: function () {
      return '<div id="ukeyPluginWindow" class="ukey-plugin-window">\n' +
        '  <div class="ukey-plugin-window-content">\n' +
        '    <div class="ukey-plugin-window-header">\n' +
        '      <div class="ukey-logo"></div>\n' +
        '      <span class="ukey-font">UKey</span>\n' +
        '    </div>\n' +
        '    <div class="ukey-plugin-window-body">\n' +
        '      <div id="ukeyPluginWindowProcessing" class="ukey-plugin-processing ukey-plugin-font-info">\n' +
        '        <div class="ukey-plugin-processing-loader">\n' +
        '          <span></span>\n' +
        '        </div>\n' +
        '        <div class="ukey-plugin-processing-message">\n' +
        '          <span id="pluginProcessingMessage"> </span>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '      <div id="ukeyPluginLoginType" class="ukey-plugin-font-info" align="center">\n' +
        '        <div style="padding-bottom: 40px; font-size: 16px">\n' +
        '          <span>Увійти в UKey</span>\n' +
        '        </div>\n' +
        '        <div>\n' +
        '          <div class="ukey-user-wrapper" onclick="UKeyPlugin.loginTypeScreen.authorizeByLogin()" style="width: 50%; display: none;">\n' +
        '            <div class="ukey-login-item" style="margin: 5px; display: block;">\n' +
        '              <div class="ukey-logintype-img-login"></div>\n' +
        '              <div class="ukey-user-info">\n' +
        '                за допомогою логіну та паролю\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="ukey-user-wrapper" onclick="UKeyPlugin.loginTypeScreen.authorizeByMobile()">\n' +
        '            <div class="ukey-login-item" style="margin: 5px; display: block;">\n' +
        '              <div class="ukey-logintype-img-mobile"></div>\n' +
        '              <div class="ukey-user-info">\n' +
        '                за допомогою мобільного додатку\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '      <div id="ukeyPluginMobileLogin">\n' +
        '        <form name="ukeyPluginWindowloginFormScreen"\n' +
        '              action="javascript: UKeyPlugin.loginTypeScreen.onSubmit()" class="ukey-plugin-login">\n' +
        '          <i class="ukey-plugin-icon ukey-plugin-mail-icon"></i>\n' +
        '          <div class="ukey-plugin-login-group">\n' +
        '            <input id="ukeyPluginWindowLoginUserName" type="text" required>\n' +
        '            <span class="highlight"></span>\n' +
        '            <span class="bar"></span>\n' +
        '            <label class="ukey-plugin-font">Адреса ел. пошти</label>\n' +
        '          </div>\n' +
        '          <button class="ukey-plugin-submit-btn ukey-plugin-font" type="submit">\n' +
        '            УВІЙТИ\n' +
        '          </button>\n' +
        '        </form>\n' +
        '        <div class="ukey-change-user" style="padding: 0;">\n' +
        '          <a href="javascript:UKeyPlugin.loginTypeScreen.onCancel()">Відмінити</a>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '      <div id="ukeyPluginWindowUserInfo" class="ukey-plugin-user ukey-plugin-font-info" hidden="hidden">\n' +
        '        <div class="ukey-user-wrapper" onclick="UKeyPlugin.userInfoScreen.onChooseUserClick()">\n' +
        '          <div class="ukey-user-item">\n' +
        '            <div class="ukey-user-avatar">\n' +
        '              <img id="ukeyPluginWindowUserImage" alt=" "/>\n' +
        '            </div>\n' +
        '            <div class="ukey-user-info">\n' +
        '              <span id="ukeyPluginWindowUserName" class="user-name"></span>\n' +
        '              <span id="ukeyPluginWindowUserEmail"></span>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="ukey-change-user">\n' +
        '          <a href="javascript:UKeyPlugin.userInfoScreen.onChangeUserClick()">Увійти іншим користувачем</a>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n';
    },
    open: function () {
      if (!pluginWindow.opened) {
        $("#ukeyPluginWindow").stop(true, true).fadeIn(200);
        pluginWindow.opened = true;
      }
    },
    close: function () {
      if (pluginWindow.opened) {
        $("#ukeyPluginWindow").stop(true, true).fadeOut(200);
        pluginWindow.opened = false;
      }
    },
    init: function () {
      $("#ukeyPluginWindow").remove();
      $("body").append(pluginWindow.body());
      window.onclick = function (event) {
        var modalWindow = $("#ukeyPluginWindow")[0];
        if (event.target === modalWindow) {
          $("#ukeyPluginWindow").trigger('ukeyPluginWindowFadeOutEvent');
          pluginWindow.close();
        }
      }
    },
    opened: false,
    showScreen: function (type, message) {
      switch (type) {
        case UKeyConstants.screenTypes.loginScreen:
          $("#ukeyPluginLoginType").show();
          $("#ukeyPluginWindowProcessing").hide();
          $("#ukeyPluginWindowUserInfo").hide();
          $("#ukeyPluginMobileLogin").hide();
          break;
        case UKeyConstants.screenTypes.loginMobileScreen:
          $("#ukeyPluginLoginType").hide();
          $("#ukeyPluginWindowProcessing").hide();
          $("#ukeyPluginWindowUserInfo").hide();
          $("#ukeyPluginMobileLogin").show();
          break;
        case UKeyConstants.screenTypes.userInfoScreen:
          $("#ukeyPluginLoginType").hide();
          $("#ukeyPluginWindowProcessing").hide();
          $("#ukeyPluginWindowUserInfo").show();
          $("#ukeyPluginMobileLogin").hide();
          break;
        case UKeyConstants.screenTypes.processingScreen:
          pluginWindow.setProcessingMessage(message);
          $("#ukeyPluginLoginType").hide();
          $("#ukeyPluginWindowProcessing").show();
          $("#ukeyPluginWindowUserInfo").hide();
          $("#ukeyPluginMobileLogin").hide();
          break;
        default:
          break;
      }
    },
    setProcessingMessage: function (message) {
      $("#pluginProcessingMessage").text(message);
    },
    setUserProfileInfo: function (userProfile) {
      $("#ukeyPluginWindowUserName").text(userProfile.displayName);
      $("#ukeyPluginWindowUserEmail").text(userProfile.username);
      $("#ukeyPluginWindowUserImage").attr("src", defaultConfiguration.targetUrl + userProfile.profileImageURL);
    }
  };

  /**
   * Getting guid for new request.
   * @param {object} configuration - object that contain custom configuration for plugin.
   */
  var init = function (configuration) {
    defaultConfiguration = $.extend(defaultConfiguration, configuration);
    pluginWindow.init();
  };

  /**
   * User info screen object.
   */
  var userInfoScreen = (function () {
    var _onChooseUserSuccess
      , _onChooseUserError
      , _onLoginError
      , userProfile;

    var show = function (onChooseUserSuccess, onChooseUserError, onLoginError) {
      _onChooseUserSuccess = onChooseUserSuccess;
      _onChooseUserError = onChooseUserError;
      _onLoginError = onLoginError;

      pluginWindow.showScreen(UKeyConstants.screenTypes.processingScreen, UKeyConstants.defaultMessagesUA.processing.gettingUserProfile);

      var onGetProfileSuccess = function (response) {
        userProfile = response.data;
        pluginWindow.setUserProfileInfo(userProfile);
        pluginWindow.showScreen(UKeyConstants.screenTypes.userInfoScreen);
      };

      userModule.getProfile(onGetProfileSuccess, _onChooseUserError);
    };

    var onChooseUserClick = function () {
      if (typeof _onChooseUserSuccess === "function") {
        _onChooseUserSuccess(userProfile);
      }
    };

    var onChangeUserClick = function () {
      pluginWindow.showScreen(UKeyConstants.screenTypes.processingScreen, UKeyConstants.defaultMessagesUA.processing.logout);

      var onChangeUserSuccess = function () {
        _onLoginError();
      };

      //TODO Logout
      authenticateModule.signOut(onChangeUserSuccess, _onChooseUserError);
    };

    return {
      show: show,
      onChooseUserClick: onChooseUserClick,
      onChangeUserClick: onChangeUserClick
    }
  }());

  /**
   * User info screen object.
   */
  var loginTypeScreen = (function () {
    var _onChooseByLogin
      , _onChooseByMobile;

    var show = function (onChooseByLogin, onChooseByMobile) {
      _onChooseByLogin = onChooseByLogin;
      _onChooseByMobile = onChooseByMobile;

      pluginWindow.showScreen(UKeyConstants.screenTypes.loginScreen);
    };

    var authorizeByLogin = function () {
      pluginWindow.close();
      _onChooseByLogin();
    };

    var authorizeByMobile = function () {
      pluginWindow.showScreen(UKeyConstants.screenTypes.loginMobileScreen);
    };

    var onSubmit = function () {
      pluginWindow.showScreen(UKeyConstants.screenTypes.processingScreen, UKeyConstants.defaultMessagesUA.processing.waitingAccessingByMobile);
      requestModule.createMobile($("#ukeyPluginWindowLoginUserName").val(), onDoRequestSuccess, onDoRequestError);
      //_onChooseByMobile($("#ukeyPluginWindowLoginUserName").val());
    };

    var onCancel = function () {
      pluginWindow.close();
    };

    return {
      show: show,
      authorizeByLogin: authorizeByLogin,
      authorizeByMobile: authorizeByMobile,
      onCancel: onCancel,
      onSubmit: onSubmit
    }
  }());

  // #region AUTHENTICATE MODULE
  var authenticateModule = {
    authenticateWithSign: function (signData, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.loginUserWithGettingSign);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.loginUserWithGettingSign);
        console.log(response);
      };

      signDataModule.signDataWithAuth(signData, onSuccess, onError);
    },
    authenticate: function (onSuccess, onError) {
      debugger
      onSuccess = onSuccess || function (response) {
        console.log(response)
      };

      onError = onError || function (response) {
        console.log(response)
      };

      var onCheckSuccess = function (response) {
        if (response && response.isAuthenticated) {
          response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.errors.simpleLogin, localStorageCtrl.get("ukey_auth_token"));
          onSuccess(response);
        }
        else {
          onCheckError();
        }
      };

      var onChooseByLogin = function () {
        var result = {
          onSuccess: onSuccess || function () {
          },
          onError: onError || function () {
          },
          authWindow: null
        };

        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (500 / 2)) + dualScreenLeft;
        var top = ((height / 2) - (600 / 2)) + dualScreenTop;
        result.authWindow = window.open(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.oauth2LandingApi.replace("{0}", defaultConfiguration.portalId), "UKey", 'width=550, height=650, top=' + top + ', left=' + left);

        var timer = setInterval(function () {
          if (!result.authWindow || result.authWindow.closed) {
            afterWindowClosed();
            var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.simpleLogin, UKeyConstants.defaultMessagesUA.info.requestWasCanceled);
            onError(response)
          }
        }, 1000);

        var afterWindowClosed = function () {
          clearInterval(timer);
          window.removeEventListener("message", listner, true);
        };

        var listner = function (event) {
          handleMessage(event, result, afterWindowClosed);
        };

        window.addEventListener("message", listner, true);
      };

      var onDoRequestSuccess = function (response, interval) {
        if (response.status === "APPROVED") {
          pluginWindow.close();
          var token = response.token.access_token;
          response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.simpleLogin, token);
          localStorageCtrl.set("ukey_auth_token", token);
          clearInterval(interval);
          onSuccess(response);
        } else if (response.status === UKeyConstants.requestStatuses.expired || response.status === UKeyConstants.requestStatuses.canceled) {
          pluginWindow.close();
          var message = response.status === UKeyConstants.requestStatuses.expired ? UKeyConstants.defaultMessagesUA.info.requestWasExpired : UKeyConstants.defaultMessagesUA.info.requestWasCanceled;
          response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, message);
          clearInterval(interval);
          onError(response);
        }
      };

      var onDoRequestError = function (error) {
        pluginWindow.close();
        var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, error.message || JSON.stringify(error));
        onError(response);
      };

      var onChooseByMobile = function (username) {
        requestModule.createMobile(username, onDoRequestSuccess, onDoRequestError);
      };

      var onCheckError = function () {
        pluginWindow.open();
        loginTypeScreen.show(onChooseByLogin, onChooseByMobile);
      };

      authenticateModule.checkAuthTokenValid(onCheckSuccess, onCheckError);
    },
    checkAuthTokenValid: function (onSuccess, onError) {
      var auth_token = defaultConfiguration.auth_token();

      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.checkingIfAuthenticated);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.checkingIfAuthenticated);
        console.log(response);
      };

      if (!auth_token) {
        onError();
        return;
      }

      ajaxRequestCtrl.get(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.checkAuthApi, onSuccess, onError);
    },
    signOut: function (onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.userLogout);
        console.log(response);
      };
      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.userLogout);
        console.log(response);
      };

      ajaxRequestCtrl.putOrPost(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.signOutApi, "POST", "",
        function (response) {
          localStorageCtrl.remove("ukey_auth_token");
          pluginWindow.close();
          onSuccess(response);
        },
        onError);
    }
  };
  // #endregion


  // #region REQUESTS MODULE
  var requestModule = {
    createMobile: function (username, onSuccess, onError) {
      onSuccess = onSuccess || function (signData, response) {
        console.log(UKeyConstants.defaultMessagesUA.success.signingRequest);
        console.log(response);
      };

      onError = onError || function (signData, response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.signingRequest);
        console.log(response);
      };

      var requestModel = JSON.stringify({
        username: username,
        portal: {
          id: defaultConfiguration.portalId,
          key: defaultConfiguration.portalKey
        }
      });

      var onRequestFinish = function (response) {
        var id = response.id;
        var interval = setInterval(function () {
          var onCallStatusSuccess = function (data) {
            onSuccess(data, interval);
          };

          var onCallStatusError = function (error) {
            if (interval) {
              pluginWindow.close();
              clearInterval(interval);
            }
            onError(error)
          };

          requestModule.getMobile(id, onCallStatusSuccess, onCallStatusError);
        }, 3000);

        $("#ukeyPluginWindow").on('ukeyPluginWindowFadeOutEvent', function (e) {
          e.preventDefault();
          if (interval) {
            pluginWindow.close();
            clearInterval(interval);
          }
          var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, UKeyConstants.defaultMessagesUA.info.requestWasCanceled);
          onError(response);
        });
      };

      ajaxRequestCtrl.putOrPost(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.requestsAuthApi, "POST", requestModel, onRequestFinish, onError);
    },
    createFileRequest: function (file, onWait, onSuccess, onError) {
      onWait = onWait || function () {
        console.log(UKeyConstants.defaultMessagesUA.info.waitingSigningProcess);
      };

      onSuccess = onSuccess || function (response, interval) {
        console.log(UKeyConstants.defaultMessagesUA.success.signingRequest);
        console.log(response);
        if (interval)
          clearInterval(interval);
      };

      onError = onError || function (response, interval) {
        console.log(UKeyConstants.defaultMessagesUA.errors.signingRequest);
        console.log(response);
        if (interval)
          clearInterval(interval);
      };

      const id = guid();

      var requestModel = JSON.stringify({
        "requestId": id,
        "filePayload": {
          "payload": [{
            "name": file.name,
            "size": file.size
          }]
        },
        "status": "PENDING",
        "timeoutPeriod": 1000000,
        "requestInitiator": {
          "initType": "WEB",
          "name": defaultConfiguration.name,
          "description": defaultConfiguration.identifier + ". Підписання файла.",
          "identifier": defaultConfiguration.identifier
        }
      });

      var data = new FormData();
      data.append(file.name, file);
      data.append('request_model', requestModel);

      ajaxRequestCtrl.postMultipart(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.requestsV1ApiFile, data, onWait, onError);

      var interval = setInterval(function () {
        var onCallStutusSuccess = function (data) {
          onSuccess(data, interval)
        };

        var onCallStutusError = function (error) {
          onError(error, interval)
        };

        requestModule.getFileRequest(id, onCallStutusSuccess, onCallStutusError);
      }, 3000);

      return id;
    },
    create: function (signData, onWait, onSuccess, onError) {
      onWait = onWait || function () {
          console.log(UKeyConstants.defaultMessagesUA.info.waitingSigningProcess);
        };

      onSuccess = onSuccess || function (signData, response, interval) {
          console.log(UKeyConstants.defaultMessagesUA.success.signingRequest);
          console.log(response);
          if (interval)
            clearInterval(interval);
        };

      onError = onError || function (signData, response, interval) {
          console.log(UKeyConstants.defaultMessagesUA.errors.signingRequest);
          console.log(response);
          if (interval)
            clearInterval(interval);
        };

      const id = guid();

      var requestModel = JSON.stringify({
        requestId: id,
        bufferEncoding: signData.BufferEncoding || UKeyConstants.bufferEncoding.RAW,
        buffer: signData.Buffer,
        status: 'PENDING',
        timeoutPeriod: defaultConfiguration.timeoutPeriod,
        key: defaultConfiguration.portalKey,
        signInitiator: {
          initType: "WEB",
          name: defaultConfiguration.name,
          description: signData.Description || "",
          identifier: defaultConfiguration.identifier
        }
      });

      ajaxRequestCtrl.putOrPost(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.requestsApi, "POST", requestModel, onWait, onError);

      var interval = setInterval(function () {
        var onCallStutusSuccess = function (data) {
          onSuccess(signData, data, interval)
        };

        var onCallStutusError = function (error) {
          onError(signData, error, interval)
        };

        requestModule.get(id, onCallStutusSuccess, onCallStutusError);
      }, 3000);

      return id;
    },
    cancel: function (requestId, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.requestCanceling);
        console.log(response);
      };
      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.requestCanceling);
        console.log(response);
      };

      ajaxRequestCtrl.putOrPost(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.cancelRequestApi.replace("{0}", requestId), "PUT", "", onSuccess, onError);
    },
    get: function (requestId, onSuccess, onError) {
      ajaxRequestCtrl.get(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.getRequestApi.replace("{0}", requestId).replace("{1}", "full"), onSuccess, onError);
    },
    getFileRequest: function (requestId, onSuccess, onError) {
      ajaxRequestCtrl.get(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.getRequestV1FileApi.replace("{0}", requestId).replace("{1}", "full"), onSuccess, onError);
    },
    getMobile: function (requestId, onSuccess, onError) {
      ajaxRequestCtrl.get(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.checkRequestsAuthApi.replace("{0}", requestId), onSuccess, onError);
    }
  };
  // #endregion


  // #region SIGN MODULE
  var signDataModule = {
    signData: function (signData, onSuccess, onError) {
      var onDoRequestSuccess = function (request, response, interval) {
        var requestStatus = response["status"];
        if (requestStatus === UKeyConstants.requestStatuses.signed) {
          var signatureId = response["signatureId"];

          var getSignatureSuccess = function (data) {
            clearInterval(interval);
            console.log(data);
            request.Buffer = data["buffer"];
            request.Sign = data["sign"];
            var allCertificates = data["keyDetails"]["key"]["certsInfo"];
            if (allCertificates && allCertificates.length > 0) {
              var certificateSerialNumber = data["keyDetails"]["certificateSerialNumber"];
              for (var i = 0; i < allCertificates.length; i++) {
                if (allCertificates[i]["serialNumber"] === certificateSerialNumber) {
                  request.Certificate = allCertificates[i];
                  break;
                }
              }
            }
            response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.dataSigning, request);
            onSuccess(response);
          };
          var getSignatureError = function (error) {
            onDoRequestError(request, error, interval);
          };

          signDataModule.getSignature(signatureId, getSignatureSuccess, getSignatureError);
        } else if (requestStatus === UKeyConstants.requestStatuses.expired || requestStatus === UKeyConstants.requestStatuses.canceled) {
          var message = requestStatus === UKeyConstants.requestStatuses.expired ? UKeyConstants.defaultMessagesUA.info.requestWasExpired : UKeyConstants.defaultMessagesUA.info.requestWasCanceled;
          response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, message);
          clearInterval(interval);
          onError(response);
        }
      };

      var onDoRequestError = function (request, error, interval) {
        var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, error.message || JSON.stringify(error));
        clearInterval(interval);
        onError(response);
      };

      pluginWindow.showScreen(UKeyConstants.screenTypes.processingScreen, UKeyConstants.defaultMessagesUA.processing.waitingForSign);
      return requestModule.create(signData, null, onDoRequestSuccess, onDoRequestError);
    },
    signFile: function (file, onSuccess, onError) {
      var onDoRequestSuccess = function (response, interval) {
        var requestStatus = response["status"];
        if (requestStatus === UKeyConstants.requestStatuses.signed) {
          var signatureId = response["resultId"];

          var getSignatureSuccess = function (data) {
            clearInterval(interval);
            response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.dataSigning, data);
            onSuccess(response);
          };

          var getSignatureError = function (error) {
            onDoRequestError(error, interval);
          };

          signDataModule.getFileSignature(signatureId, getSignatureSuccess, getSignatureError);
        } else if (requestStatus === UKeyConstants.requestStatuses.expired || requestStatus === UKeyConstants.requestStatuses.canceled) {
          var message = requestStatus === UKeyConstants.requestStatuses.expired ? UKeyConstants.defaultMessagesUA.info.requestWasExpired : UKeyConstants.defaultMessagesUA.info.requestWasCanceled;
          response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, message);
          clearInterval(interval);
          onError(response);
        }
      };

      var onDoRequestError = function (error, interval) {
        var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, error.message || JSON.stringify(error));
        clearInterval(interval);
        onError(response);
      };

      pluginWindow.showScreen(UKeyConstants.screenTypes.processingScreen, UKeyConstants.defaultMessagesUA.processing.waitingForSign);
      return requestModule.createFileRequest(file, null, onDoRequestSuccess, onDoRequestError);
    },
    signDataWithAuth: function (signData, onSuccess, onError) {
      var requestId;

      $("#ukeyPluginWindow").on('ukeyPluginWindowFadeOutEvent', function () {
        if (requestId) {
          requestModule.cancel(requestId);
        } else {
          var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, UKeyConstants.defaultMessagesUA.info.requestWasCanceled);
          onError(response);
        }
      });

      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.dataSigning);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.dataSigning);
        console.log(response);
      };

      var beforeOnError = function (response) {
        requestId = null;
        pluginWindow.close();
        onError(response);
      };

      var beforeOnSuccess = function (response) {
        requestId = null;
        pluginWindow.close();
        onSuccess(response);
      };

      if (!signData) {
        beforeOnError(UKeyConstants.defaultMessagesUA.errors.signDataIsUndefined);
        return;
      }

      var onChooseUserSuccess = function (response) {
        requestId = signDataModule.signData(signData, beforeOnSuccess, beforeOnError);
      };

      var onLoginError = function () {
        authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
      };

      var onAuthenticateSuccess = function (response) {
        pluginWindow.open();
        userInfoScreen.show(onChooseUserSuccess, beforeOnError, onLoginError);
      };

      authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
    },
    signDataArrayWithAuth: function (signData, onSuccess, onError) {
      var requestIds = [],
        signedData = [],
        canceled = false;

      $("#ukeyPluginWindow").on('ukeyPluginWindowFadeOutEvent', function (e) {
        e.preventDefault();
        canceled = true;
        if (requestIds && requestIds.length > 0) {
          for (var i = 0; i < requestIds.length; i++) {
            requestModule.cancel(requestIds[i]);
          }
        }
        var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, UKeyConstants.defaultMessagesUA.info.requestWasCanceled);
        onError(response);
      });

      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.dataSigning);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.dataSigning);
        console.log(response);
      };

      var beforeOnError = function (response) {
        var request = response.data;
        signedData.push({
          status: UKeyConstants.responseCodes.error,
          data: request,
          message: UKeyConstants.defaultMessagesUA.errors.dataSigning
        });
        if (signedData.length === signData.length && !canceled) {
          pluginWindow.close();
          response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.dataSigning, signedData);
          onSuccess(response);
        }
      };

      var beforeOnSuccess = function (response) {
        var request = response.data;
        signedData.push({
          status: UKeyConstants.responseCodes.ok,
          data: request,
          message: UKeyConstants.defaultMessagesUA.success.dataSigning
        });
        if (signedData.length === signData.length && !canceled) {
          pluginWindow.close();
          response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.dataSigning, signedData);
          onSuccess(response);
        }
      };

      if (!signData || signData.length === 0) {
        beforeOnError(UKeyConstants.defaultMessagesUA.errors.signDataIsUndefined);
        return;
      }

      var onChooseUserSuccess = function (response) {
        for (var i = 0; i < signData.length; i++)
          requestIds.push(signDataModule.signData(signData[i], beforeOnSuccess, beforeOnError));
      };

      var onLoginError = function () {
        authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
      };

      var onAuthenticateSuccess = function (response) {
        pluginWindow.open();
        userInfoScreen.show(onChooseUserSuccess, beforeOnError, onLoginError);
      };

      authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
    },
    getSignature: function (signatureId, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.getSignature);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.getSignature);
        console.log(response);
      };

      var url = defaultConfiguration.targetUrl + UKeyConstants.apiUrls.getSignature.replace("{0}", signatureId).replace("{1}", "full");
      ajaxRequestCtrl.get(url, onSuccess, onError);
    },
    getFileSignature: function (signatureId, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
          console.log(UKeyConstants.defaultMessagesUA.success.getSignature);
          console.log(response);
        };

      onError = onError || function (response) {
          console.log(UKeyConstants.defaultMessagesUA.errors.getSignature);
          console.log(response);
        };

      var url = defaultConfiguration.targetUrl + UKeyConstants.apiUrls.getFileSignature.replace("{0}", signatureId).replace("{1}", "full");
      ajaxRequestCtrl.get(url, onSuccess, onError);
    },
    signFileWithAuth: function (file, onSuccess, onError) {
      debugger
      var requestId;

      $("#ukeyPluginWindow").on('ukeyPluginWindowFadeOutEvent', function () {
        if (requestId) {
          requestModule.cancel(requestId);
        } else {
          var response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.dataSigning, UKeyConstants.defaultMessagesUA.info.requestWasCanceled);
          onError(response);
        }
      });

      onSuccess = onSuccess || function (response) {
          console.log(UKeyConstants.defaultMessagesUA.success.dataSigning);
          console.log(response);
        };

      onError = onError || function (response) {
          console.log(UKeyConstants.defaultMessagesUA.errors.dataSigning);
          console.log(response);
        };

      var beforeOnError = function (response) {
        requestId = null;
        pluginWindow.close();
        onError(response);
      };

      var beforeOnSuccess = function (response) {
        requestId = null;
        pluginWindow.close();
        onSuccess(response);
      };

      if (!file) {
        beforeOnError(UKeyConstants.defaultMessagesUA.errors.signDataIsUndefined);
        return;
      }

      var onChooseUserSuccess = function (response) {
        requestId = signDataModule.signFile(file, beforeOnSuccess, beforeOnError);
      };

      var onLoginError = function () {
        authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
      };

      var onAuthenticateSuccess = function (response) {
        pluginWindow.open();
        userInfoScreen.show(onChooseUserSuccess, beforeOnError, onLoginError);
      };

      authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
    }
  };
  // #endregion


  //#region KEYS MODULE
  var keysModule = {
    get: function (onSuccess, onError) {
      pluginWindow.setProcessingMessage(UKeyConstants.defaultMessagesUA.processing.gettingUserKeys);
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.gettingKeys);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.gettingKeys);
        console.log(response);
      };

      var onSuccessGettingKeys = function (response) {
        response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.gettingKeys, response);
        onSuccess(response);
      };

      ajaxRequestCtrl.get(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.getKeysApi.replace("{0}", "all"), onSuccessGettingKeys, onError);
    },
    getUserKeysIfAuthenticated: function (onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.gettingKeys);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.gettingKeys);
        console.log(response);
      };

      var beforeOnError = function (response) {
        response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.gettingKeys, response);
        pluginWindow.close();
        onError(response)
      };

      var onChooseUserSuccess = function (response) {
        var onSuccessGettingKeys = function (response) {
          pluginWindow.close();
          onSuccess(response);
        };

        pluginWindow.showScreen(UKeyConstants.screenTypes.processingScreen, UKeyConstants.defaultMessagesUA.processing.gettingUserKeys);
        keysModule.get(onSuccessGettingKeys, beforeOnError);
      };

      var onLoginError = function () {
        authenticateModule.authenticate(onAuthenticateSuccess, beforeOnError);
      };

      var onAuthenticateSuccess = function (response) {
        pluginWindow.open();
        userInfoScreen.show(onChooseUserSuccess, beforeOnError, onLoginError); //TODO CHANGE beforeOnError on login error
      };

      authenticateModule.authenticate(onAuthenticateSuccess, onError);
    }
  };
  //#endregion


  // #region USER MODULE
  var userModule = {
    getProfile: function (onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.gettingUserProfile);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.gettingUserProfile);
        console.log(response);
      };

      var onSuccessGettingProfile = function (response) {
        response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.gettingUserProfile, response);
        onSuccess(response);
      };

      ajaxRequestCtrl.get(defaultConfiguration.targetUrl + UKeyConstants.apiUrls.profileApi, onSuccessGettingProfile, onError)
    }
  };
  // #endregion

  // #region PRIVATE METHODS
  /**
   * Getting guid for new request.
   * @return {string} A string.
   */
  var guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  /**
   * Getting parameter from url.
   * @param {string} sParam - parameter to get.
   * @return {string} A parameter.
   */
  var getUrlParameter = function (sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&');
    var sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  /**
   * Creating response object
   * @param {string} statusCode - request status code
   * @param {string} message - request message
   * @param {object} data - request got data
   * @returns {object} Response object
   */
  var createResponse = function (statusCode, message, data) {
    return {
      statusCode: statusCode,
      message: message,
      data: data
    }
  };

  /**
   * Catching message posting event from modal window
   * @param {object} model
   * @param {Event} event
   * @param {Function} afterWindowClosed
   */
  function handleMessage(event, model, afterWindowClosed) {
    event.stopPropagation();
    event.preventDefault();
    afterWindowClosed();
    model.authWindow.close();
    var response;

    const message = event;

    if (event.origin !== defaultConfiguration.targetUrl) {
      //TODO default message
      response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.simpleLogin, "Невідомий сервіс з якого прийшли дані");
      model.onError(response);
      return;
    }

    const result = JSON.parse(message.data);

    if (result && (result.error || result.errorDescription)) {
      response = createResponse(UKeyConstants.responseCodes.error, UKeyConstants.defaultMessagesUA.errors.simpleLogin, result.errorDescription || result.error);
      model.onError(response);
    } else {
      response = createResponse(UKeyConstants.responseCodes.ok, UKeyConstants.defaultMessagesUA.success.simpleLogin, result.code);
      localStorageCtrl.set("ukey_auth_token", result.code);
      model.onSuccess(response);
    }
  }

  // #endregion

  // #region CONTROLLERS
  var localStorageCtrl = {
    set: function (key, value) {
      localStorage.setItem(key, value);
    },
    get: function (key) {
      return localStorage.getItem(key);
    },
    remove: function (key) {
      localStorage.removeItem(key);
    }
  };

  var ajaxRequestCtrl = {
    putOrPost: function (url, method, data, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.putRequestCreating);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.putRequestCreating);
        console.log(response);
      };

      $.ajax({
        url: url,
        type: method,
        data: data,
        contentType: 'application/json',
        headers: {
          "Authorization": "Bearer " + localStorageCtrl.get("ukey_auth_token")
        },
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: onSuccess,
        error: onError
      });
    },
    postMultipart: function (url, data, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
          console.log(UKeyConstants.defaultMessagesUA.success.putRequestCreating);
          console.log(response);
        };

      onError = onError || function (response) {
          console.log(UKeyConstants.defaultMessagesUA.errors.putRequestCreating);
          console.log(response);
        };

      $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        headers: {
          "Authorization": "Bearer " + localStorageCtrl.get("ukey_auth_token")
        },
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: onSuccess,
        error: onError
      });
    },
    get: function (url, onSuccess, onError) {
      onSuccess = onSuccess || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.success.getRequestCreating);
        console.log(response);
      };

      onError = onError || function (response) {
        console.log(UKeyConstants.defaultMessagesUA.errors.getRequestCreating);
        console.log(response);
      };

      $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        headers: {
          "Authorization": "Bearer " + defaultConfiguration.auth_token()
        },
        success: onSuccess,
        error: onError
      });
    }
  };
  // #endregion


  return {
    init: init,
    authenticateModule: authenticateModule,
    userInfoScreen: userInfoScreen,
    loginTypeScreen: loginTypeScreen,
    signDataModule: signDataModule,
    keysModule: keysModule
  }
}());
