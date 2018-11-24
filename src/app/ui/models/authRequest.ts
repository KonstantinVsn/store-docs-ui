export class AuthRequest {
    username: string
    portal: Portal
    constructor(){
        this.portal = new Portal();
    }
}

class Portal {
    id: string
    key: string
    constructor(){
        
    }
}