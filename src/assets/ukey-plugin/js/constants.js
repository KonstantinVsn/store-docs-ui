const UKeyConstants = {
  apiUrls: {
    checkAuthApi: "/api/auth/check",
    requestsApi: "/api/requests",
    requestsV1Api: "/api/v1/requests",
    requestsV1ApiFile: "/api/v1/requests/file",
    getRequestApi: "/api/requests/{0}?mode={1}",
    getRequestV1FileApi: "/api/v1/requests/file/{0}?mode={1}",
    cancelRequestApi: "/api/requests/{0}/cancel",
    getSignature: "/api/signatures/{0}?mode={1}",
    getFileSignature: "/api/v1/signatures/file/{0}?mode={1}",
    keysApi: "/api/keys",
    getKeysApi: "/api/keys?mode={0}",
    cancelKeyApi: "/api/keys/{0}/cancel",
    activateKeyApi: "/api/keys/{0}/activate",
    profileApi: "/api/profile",
    authApi: "/api/auth",
    signInApi: "/api/auth/signin",
    signOutApi: "/api/auth/signout",
    oauth2Api: "/api/oauth2",
    oauth2CodeApi: '/api/oauth2/authorize?client_id={0}&response_type=token',//code&redirect_uri={1}
    oauth2LandingApi: '/api/oauth2/landing?client_id={0}&response_type=token',
    oauth2TokenApi: '/api/oauth2/token',
    checkOAuth2Api: '/api/oath2/valid',
    requestsAuthApi: '/api/auth/request',
    checkRequestsAuthApi: '/api/auth/request/{0}/check'
  },
  defaultMessages: {
    processing: {
      waitingForSign: "Waiting for sign from mobile device...",
      checkIfAuthenticated: "Checking if user had already authenticated...",
      authenticatingProcess: "Authenticating...",
      logout: "Logout...",
      gettingUserProfile: "Getting user profile info...",
      gettingUserKeys: "Getting user keys..."
    },
    errors: {
      serverIsNotAvailable: "Server is not available now. Please, try later",
      signDataIsUndefined: "Data for signing is null or undefined.",
      postRequestCreating: "Error while creating post request.",
      putRequestCreating: "Error while creating put request.",
      getRequestCreating: "Error while creating get request.",
      checkingIfAuthenticated: "Error while checking user authentication.",
      signingRequest: "Error while making signing request.",
      requestCanceling: "Error while canceling request.",
      gettingKeys: "Error while getting keys request.",
      gettingUserProfile: "Error while getting profile request.",
      gettingUserProfileImage: "Error while getting user profile image request.",
      cancelingKey: "Error while canceling key request.",
      activatingUserKey: "Error while activating key request.",
      userLogin: "Error while user login request.",
      userLogout: "Error while user logout request.",
      loginUserWithGettingSign: "Error while user login with getting sign request.",
      simpleLogin: "Error while simple user login request.",
      dataSigning: "Error while data signing succeed.",
      userIsNotAuthenticated: "User is not authenticated.",
      getSignature: "An error happened when try to lod signature"
    },
    success: {
      postRequestCreating: "Creating post request succeed.",
      putRequestCreating: "Creating put request succeed.",
      getRequestCreating: "Creating get request succeed.",
      checkingIfAuthenticated: "Checking if user authentication succeed.",
      signingRequest: "Signing request successfully proceed.",
      requestCanceling: "Canceling request successfully proceed",
      gettingKeys: "Getting keys succeed.",
      gettingUserProfile: "Getting user profile succeed.",
      gettingUserProfileImage: "Getting user profile image succeed.",
      cancelingKey: "Canceling key succeed",
      activatingUserKey: "Activating user key succeed.",
      userLogin: "User login succeed.",
      userLogout: "User logout succeed.",
      loginUserWithGettingSign: "Login user with getting sign succeed.",
      simpleLogin: "Simple login succeed.",
      dataSigning: "Data signing succeed.",
      getSignature: "Signature loaded successfully"
    },
    info: {
      requestWasCanceled: "Request was canceled",
      requestWasExpired: "Request was expired",
      waitingSigningProcess: "Waiting for signing request is processing."
    }
  },
  defaultMessagesUA: {
    processing: {
      waitingForSign: "Очікую підпис з мобільного девайсу...",
      checkIfAuthenticated: "Перевірка авторизації користувача...",
      authenticatingProcess: "Авторизація...",
      logout: "Вихід з облікового запису...",
      gettingUserProfile: "Отримання профілю користувача...",
      gettingUserKeys: "Отримання ключів користувача...",
      waitingAccessingByMobile: "Очікую підтвердження з мобільного девайсу..."
    },
    errors: {
      serverIsNotAvailable: "Нажаль, сервер зараз недоступний. Будь ласка, спробуйте пізніше",
      signDataIsUndefined: "Дані для підпису пусті",
      postRequestCreating: "Помилка створення POST запиту",
      putRequestCreating: "Помилка створення PUT запиту",
      getRequestCreating: "Помилка створення GET запиту",
      checkingIfAuthenticated: "Помилка перевірки авторизації користувача",
      signingRequest: "Помилка створення запиту на підпис",
      requestCanceling: "Помилка відхилення запиту на підпис",
      gettingKeys: "Помилка отримання ключів користувача",
      gettingUserProfile: "Помилка отримання профілю користувача",
      gettingUserProfileImage: "Помилка отримання зображення профілю користувача",
      cancelingKey: "Помилка відхилення запиту ключа",
      activatingUserKey: "Помилка запиту активації ключа",
      userLogin: "Помилка запиту авторизації користувача",
      userLogout: "Помилка запиту виходу з облікового запису",
      loginUserWithGettingSign: "Помилка запиту авторизації користувача з підписом",
      simpleLogin: "Помилка запиту авторизації користувача",
      dataSigning: "Помилка запиту на підпис даних",
      userIsNotAuthenticated: "Користувач не авторизований",
      getSignature: "Помилка отримання підпису"
    },
    success: {
      postRequestCreating: "Створення POST запиту",
      putRequestCreating: "Створення PUT запиту",
      getRequestCreating: "Створення GET запиту",
      checkingIfAuthenticated: "Перевірка чи користувач авторизований",
      signingRequest: "Запит на підпис пройшов успішно",
      requestCanceling: "Запит відхилення підпису пройшов успішно",
      gettingKeys: "Запит на отримання ключів користувача пройшов успішно",
      gettingUserProfile: "Запит на отримання профілю користувача пройшов успішно",
      gettingUserProfileImage: "Запит на отримання зображення профілю користувача пройшов успішно",
      cancelingKey: "Запит відхилення ключа користувача пройшов успішно",
      activatingUserKey: "Запит на активацію ключа користувача пройшов успішно",
      userLogin: "Авторизація успішна",
      userLogout: "Вихід з облікового запису успішний",
      loginUserWithGettingSign: "Авторизація з підписом пройшла успішно",
      simpleLogin: "Авторизація пройшла успішно",
      dataSigning: "Підписання данних пройшло успішно",
      getSignature: "Підпис отримано"
    },
    info: {
      requestWasCanceled: "Запит було відхилено",
      requestWasExpired: "Термін дії запиту вийшов",
      waitingSigningProcess: "Очікування запиту на підпис"
    }
  },
  screenTypes: {
    loginScreen: "login screen",
    userInfoScreen: "user info screen",
    processingScreen: "porcessing screen",
    loginMobileScreen: "login mobile screen"
  },
  requestStatuses: {
    expired: "EXPIRED",
    canceled: "CANCELLED",
    signed: "SIGNED"
  },
  responseCodes: {
    error: "ERROR",
    ok: "OK"
  },
  bufferEncoding: {
    RAW: "RAW",
    BASE64: "BASE64",
    HEX: "HEX"
  }
};
