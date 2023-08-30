import {prisma} from "../../../utils";
import {Location_Info, Prisma} from "@prisma/client";


export const createLocationService = async(data:Prisma.Location_InfoCreateInput):Promise<Location_Info> => {
    return prisma.location_Info.create({  
        data,
    });
};

export const readLocationService = async(locationWhereInput:Prisma.Location_InfoWhereUniqueInput):Promise<Location_Info | null>  => {
    return prisma.location_Info.findUnique({
        where:locationWhereInput
    });
};
export const removeLocationService = async(locationWhereInput:Prisma.Location_InfoWhereUniqueInput) => {
    return prisma.location_Info.delete({
        where:locationWhereInput
    })
}
export const updateLocationService = async(params:{
    where:Prisma.Location_InfoWhereUniqueInput,
    data:Prisma.Location_InfoUpdateInput
}) => {
    const { where, data } = params;
    return  prisma.location_Info.update({
      data,
      where,
    });
};

export const readManyLocationsService = async(LocationWhereInput:Prisma.Location_InfoWhereInput) => {
    return prisma.location_Info.findMany({
        where:LocationWhereInput
    });
};
export const readAllLocationsService = async() => {
        return  prisma.location_Info.findMany();
};