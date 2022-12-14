const { verify } = require("./jwt-utils");

const authJWT = (req, res, next) => {
  console.log(req.headers)
  if (req.headers.authorization) {
    b = /[a-zA-Z]/
    if (b.test(req.headers.authorization)) {
      req.headers.authorization = req.headers.authorization.replace(/\"/gi, ""); 
    }
    const token = req.headers.authorization; // header에서 access token을 가져옵니다.
    const result = verify(token); // token을 검증합니다.
    if (result.ok) {
      // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
      req.myId = result.id;
      next();
    } else {
      // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
      res.status(402).send({
        ok: false,
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
      });
    }
  } else {
    //세션 스토리지에 access 토큰이 없는 경우
    return res.status(401).send({
      ok: false,
      message: "accessToken이 지급되지 않았습니다",
    });
  }
};

module.exports = authJWT;
