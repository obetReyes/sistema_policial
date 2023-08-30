import {prisma} from "../../utils/";
import {Prisma, Summary} from "@prisma/client";

export const createSummaryService = async(data:Prisma.SummaryCreateInput):Promise<Summary> => {
    return prisma.summary.create({
        data
    });
};

export const getSummaryService = async(summaryWhereUniqueInput:Prisma.SummaryWhereUniqueInput):Promise<Summary | null> => {
    return prisma.summary.findUnique({
        where:summaryWhereUniqueInput
    });
};

export const getSummariesService = async(
    params:{
        skip:number
        take:number,
    }
):Promise<Summary[] | null > => {
    const {take,  skip} = params;
    return prisma.summary.findMany({
        take,
        skip,
        orderBy:{
            createdAt:"desc"
        }
    });
};

export const getManySummariesService = async(
    params:{
        skip:number
        take:number,
        where:Prisma.SummaryWhereInput
    }
):Promise<Summary[] | null > => {
    const {skip, take,  where} = params;
    return prisma.summary.findMany({
        skip,
        take,
        where,
        orderBy:{
            createdAt:"desc"
        }
    });
};


