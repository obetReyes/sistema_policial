import {prisma} from "../../utils";
import { Prisma, Report } from "@prisma/client";

export const createReportService = async(data:Prisma.ReportCreateInput) => {
    return await prisma.report.create({
        data
    });
};

export const getReportService = async(reportWhereUniqueInput:Prisma.ReportWhereUniqueInput): Promise<Report | null> => {
    return await  prisma.report.findUnique({
        where:reportWhereUniqueInput
    });
};

export const getReportsService = async(params:{
  where?:Prisma.ReportWhereInput
    take:number
    skip:number
})  => {
    const {take,skip, where} = params;
    return await prisma.report.findMany({
        take,
        where,
        skip,
        orderBy:{
            createdAt:"desc"
        }
    });
};


export const getManyReportsService = async(
    params:{
        skip:number,
        take:number,
        where:Prisma.ReportWhereInput
    }
) => {
    const {skip, take, where} = params;
    return await prisma.report.findMany({
        skip,
        take,
        where,
        orderBy:{
            createdAt:"desc"
        }
    });
};
