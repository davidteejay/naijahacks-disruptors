import generateToken from "../helpers/generateToken"
import { serverError } from "../helpers/errors";

export default class TokenController {
  static async refreshToken (req, res) {
    try {
      const { auth } = req.data
      const token = await generateToken(res, auth);

      return res.status(200).send({
        data: { token },
        message: 'Token Refreshed Successfully',
        error: false
      })
    } catch (err) {
      return serverError(res, err.message)
    }
  }
}
