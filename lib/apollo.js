import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

const origin = process.browser !== 'undefined' ? 'http://raspberrypi.local:3000' : 'http://localhost:3000';

// can also be a function that accepts a `context` object (SSR only) and returns a config
const config = {
    link: new HttpLink({
        mode: 'no-cors',
        credentials: 'omit', // Additional fetch() options like `credentials` or `headers`
        uri: `${origin}/api/graphql`, // Server URL
    })
}

export default withData(config)