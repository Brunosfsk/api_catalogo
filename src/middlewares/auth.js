import jwt from "jsonwebtoken";


export function AuthMiddlewares(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(404).json({ error: "Token not provided" });

  const [, token] = authorization.split(" ");

  try {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) return res.status(401).json({ auth: false, error: 'Token invalid' });

      const { id } = decoded;
      req.userId = id;
      next();
    });

  } catch (error) {
    if (!authorization) return res.status(500).json({ error: "Token intern error", errorDetails: err });
  }
}