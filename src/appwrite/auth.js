import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite"

export class AuthService {
    client = new Client;
    account;//we cannot assign the the this.client here becuase client didnt got the setendpoint and setproject 

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)//setendpoint is of appwrite url
            .setProject(conf.appwriteProjectId)//setproject is of project id

        this.account = new Account(this.client)//now here we assign to the account using the Account we have taken from the appwrite
    }

    async createAccount({email,password,name}){
        try{
            const useraccount = await this.account.create(ID.unique(),email,password,name)
            if(useraccount){
                return this.login({email,password})
            }
            else{
                return useraccount
            }
            // await this.account.create(ID.unique(),email,password,name)
            // return this.login({email,password})
            //this is also enough without if else block
        }
        catch(error){
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("There is no user logged in",error)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

}

const authService = new AuthService();

export default authService

