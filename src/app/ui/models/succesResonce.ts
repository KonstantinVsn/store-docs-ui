export interface SuccessResponce{
    id: string
    createDate: string
    expiryDate: string
    status: string
    token: Token
}

export class Token{
    access_token: string
    token_type: String
}

