//Interfaces
import { IJWT } from "interfaces/configInterface";

const jwt: IJWT = {
  secretKey: process.env.JWT_SECRET_KEY || "8723HGVAasi8213sajas2198^&#Q*",
};

export default jwt;
