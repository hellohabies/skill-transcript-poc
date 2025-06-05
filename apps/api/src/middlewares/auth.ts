import jwt from "@elysiajs/jwt";
import { Role } from "@prisma/client";
import Elysia from "elysia";
import { ERROR_RESPONSES } from "../error";
import { prisma } from "../config/prisma";

type AuthOptions = {
  requireAuth: boolean;
  allowedRoles?: Role[];
};

export const authPlugin = new Elysia({
  name: "middlewares/auth",
}).use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET as string,
  }).macro({
    auth: (options: AuthOptions) => ({
      resolve: async ({ jwt, cookie: { accessToken }, set, error }) => {
        try {
          const { requireAuth, allowedRoles } = options;

          if (!requireAuth) return;

          // 1. Check if JWT is present
          if (!accessToken || !accessToken.value) {
            return error(401, ERROR_RESPONSES.unauthorized);
          }

          // 2. Verify JWT
          const jwtPayload = await jwt.verify(accessToken.value);

          if (!jwtPayload) {
            set.status = 401;
            return error(401, ERROR_RESPONSES.unauthorized);
          }

          // 3. Check JWT expiration
          if (jwtPayload.exp && jwtPayload.exp < Date.now() / 1000) {
            set.status = 401;
            return error(401, ERROR_RESPONSES.unauthorized);
          }

          // 4. Query user from database
          const dbUser = await prisma.user.findUnique({
            where: {
              id: jwtPayload.sub,
            },
            include: {
              admin: true,
              student: {
                include: {
                  affiliatedCurriculum: {
                    include: {
                      faculty: {
                        include: {
                          university: true,
                        },
                      },
                    },
                  },
                },
              },
              teacher: {
                include: {
                  affiliatedCurriculum: {
                    include: {
                      faculty: {
                        include: {
                          university: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (!dbUser) {
            set.status = 401;
            return error(401, ERROR_RESPONSES.unauthorized);
          }

          // 5. Check user roles
          if (allowedRoles && !allowedRoles.includes(dbUser.role)) {
            set.status = 403;
            return error(401, ERROR_RESPONSES.accessDenied);
          }

          return {
            authUser: dbUser,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  })
);
