import { Router } from 'express'
import * as authController from "../controller/auth.controller.js";
import {validateAuth} from '../validates/validate.js'
import * as schema from '../schemas/schema.js'
const router = Router();


router.post("/login", validateAuth(schema.login), authController.login);
router.post("/register",validateAuth(schema.register), authController.register);
router.delete("/delete", authController.deleteUser);
router.post("/logout", authController.logout); 
export default router;