import { getConnectionOptions, createConnection } from 'typeorm'
export const createTypeormConn = async () => {
    // console.log("process", process.env.NODE_ENV);

    // if (process.env.NODE_ENV !== 'production') {
    // const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    // return createConnection({ ...connectionOptions, })
    // } else {
    //     return createConnection()
    // }
    return createConnection()

}
