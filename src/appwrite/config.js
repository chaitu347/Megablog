import conf from "../conf/conf";
import { Client,Databases,Storage,ID, Query } from "appwrite";


export class Service{

    client = new Client;
    databases;
    bucket;

    constructor(){
        this.client 
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases= new Databases(this.client)
        this.bucket= new Storage(this.client)
    }

    async createPost({title,content,slug,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug,//slug is the document id
                        {
                            title,
                            content,
                            featuredImage,
                            status,
                            userId
                        }

            )
        } catch (error) {
            throw error
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
           
        } catch (error) {
            throw error
          
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }


    async getPost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(query =[
                    Query.equal("status","active")
                ]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, //no need of slug becase we want all documents not a specific document.for specific docujment we use the slug
                query
            )
        } catch (error) {
            throw error
        }
    }


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            ) 
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileID){ //it is a generally a fast response method so there is no need of the async await function.Even if you want you can write
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }

    // for better usage refer to the document

   
}
const service = new Service();
export default service