import { prisma } from "../../utils";
import { Prisma, User } from "@prisma/client";


export const createUserService = async (data: Prisma.UserCreateInput): Promise<User> => {
    return prisma.user.create({
        data,
    });
};


export const getUserService = async (
    where: Prisma.UserWhereUniqueInput,
) => {
    return prisma.user.findUnique({
        where,
        select: {
            createdAt: true,
            cuip: true,
            groupName: true,
            id: true,
            location: true,
            name: true,
            password: true,
            role: true,
            updatedAt: true,
            token:true,
            _count:{
                select:{
                    reports:true,
                    summaries:true
                }
            }
        }
    });
};

export const updateUserService = async (params: {
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
}): Promise<User> => {
    const { where, data } = params;
    return prisma.user.update({
        data,
        where,
    });
};

export const getManyUsersService = async (  params:{
    skip:number,
    take:number,
    where:Prisma.UserWhereInput
}) => {
    const {skip, take, where} = params;
    return prisma.user.findMany({
        skip,
        take,
        where,
       select:{
        id:true,
            name: true,
            role: true,
            updatedAt: true,
            createdAt: true,
            groupName:true,
        _count:{
            select:{
                reports:true,
                summaries:true
            }
        }
       },
       orderBy:{
        createdAt:"desc"
       }
    });
};

export const getAllUsersService = async (params:{
    where?:Prisma.ReportWhereInput
      take:number
      skip:number
  }) => {
    const {take,skip, where} = params;
    return prisma.user.findMany({
        
        select: {
            id:true,
            name: true,
            role: true,
            updatedAt: true,
            createdAt: true,
            groupName:true,
            _count:{
                select:{
                    reports:true,
                    summaries:true
                }
            }
        },
        take,
        where,
        skip,
        orderBy:{
            createdAt:"desc"
        }
    });
};

export const deleteUserService = async (userWhereUniqueInput: Prisma.UserWhereUniqueInput) => {
    return prisma.user.delete({
        where: userWhereUniqueInput
    });
};