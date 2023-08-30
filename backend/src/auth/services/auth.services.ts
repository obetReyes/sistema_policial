import {prisma} from "../../utils";
import { Prisma, User } from "@prisma/client";

export const tokenService = async(params:{where:Prisma.UserWhereUniqueInput,data:Prisma.UserUpdateInput}):Promise<User> => {
    const { where, data } = params;
    return prisma.user.update({
        data,
        where,
    });
};

export const updateTokenService = async(
  params:{
    data: Prisma.UserUpdateInput,
    where:Prisma.UserWhereUniqueInput
  }): Promise<User >   => {
    const {data,where} = params;
    return prisma.user.update({
      data,
      where,
    });
};

