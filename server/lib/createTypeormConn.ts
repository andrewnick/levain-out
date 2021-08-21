import { getConnectionOptions, createConnection } from 'typeorm'
export const createTypeormConn = async () => {
    if (process.env.NODE_ENV !== 'production') {
        const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
        return createConnection({ ...connectionOptions, name: 'default' })
    } else {
        return createConnection()
    }
}
