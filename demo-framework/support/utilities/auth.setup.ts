import {test as setup} from "@playwright/test";

const authFile = '.auth/user.json'

setup('setup the login shared state', async({request}) => {

    // Get access token
    const response = await request.post(process.env.ACCESS_TOKEN_BE as string, {
        data: {
            "user": {
                "email": `${process.env.LOGIN_EMAIL_BE}`,
                "password": `${process.env.LOGIN_PASSWORD_BE}`
            }}
    })
    // Save the storage state
    await request.storageState({path: authFile})
    const responseBody = await response.json()
    process.env['ACCESS_TOKEN'] = responseBody.user.token
    console.log(process.env.ACCESS_TOKEN)
})